import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

// Cria um cliente Supabase com permissões de serviço (service_role)
// IMPORTANTE: Este cliente tem permissões elevadas e deve ser usado apenas em
// contextos seguros, como scripts de migração ou funções serverless protegidas
const createServiceClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase URL ou Service Role Key não encontrados nas variáveis de ambiente');
  }
  
  return createClient<Database>(supabaseUrl, supabaseServiceKey);
};

/**
 * Executa um script SQL usando o cliente de serviço do Supabase
 * @param sql Script SQL a ser executado
 * @returns Resultado da execução
 */
export const executeSql = async (sql: string) => {
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });
    
    if (error) throw error;
    
    return { success: true, data };
  } catch (error) {
    console.error('Erro ao executar SQL:', error);
    return { success: false, error };
  }
};

/**
 * Cria uma tabela se ela não existir
 * @param tableName Nome da tabela
 * @param columns Definição das colunas
 * @returns Resultado da execução
 */
export const createTableIfNotExists = async (tableName: string, columns: string) => {
  const sql = `
    CREATE TABLE IF NOT EXISTS ${tableName} (
      ${columns}
    );
  `;
  
  return executeSql(sql);
};

/**
 * Cria uma política RLS (Row Level Security) para uma tabela
 * @param policyName Nome da política
 * @param tableName Nome da tabela
 * @param operation Operação (SELECT, INSERT, UPDATE, DELETE)
 * @param using Expressão USING para a política
 * @param withCheck Expressão WITH CHECK para a política (opcional)
 * @returns Resultado da execução
 */
export const createPolicy = async (
  policyName: string,
  tableName: string,
  operation: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE' | 'ALL',
  using: string,
  withCheck?: string
) => {
  let sql = `
    CREATE POLICY "${policyName}"
    ON ${tableName}
    FOR ${operation}
    USING (${using})
  `;
  
  if (withCheck) {
    sql += `WITH CHECK (${withCheck})`;
  }
  
  sql += ';';
  
  return executeSql(sql);
};

/**
 * Habilita RLS (Row Level Security) para uma tabela
 * @param tableName Nome da tabela
 * @returns Resultado da execução
 */
export const enableRls = async (tableName: string) => {
  const sql = `ALTER TABLE ${tableName} ENABLE ROW LEVEL SECURITY;`;
  return executeSql(sql);
};

/**
 * Cria a tabela de perfis e configura as políticas de segurança
 * @returns Resultado da execução
 */
export const setupProfilesTable = async () => {
  try {
    // Criar tabela de perfis
    await createTableIfNotExists('profiles', `
      id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
      user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
      profile_type VARCHAR(255),
      company_name VARCHAR(255),
      industry VARCHAR(255),
      goals TEXT[],
      onboarding_completed BOOLEAN DEFAULT false,
      is_admin BOOLEAN DEFAULT false,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    `);
    
    // Habilitar RLS
    await enableRls('profiles');
    
    // Criar políticas
    await createPolicy(
      'Users can read own profile',
      'profiles',
      'SELECT',
      'auth.uid() = user_id'
    );
    
    await createPolicy(
      'Users can update own profile',
      'profiles',
      'UPDATE',
      'auth.uid() = user_id'
    );
    
    await createPolicy(
      'Users can insert own profile',
      'profiles',
      'INSERT',
      'auth.uid() = user_id',
      'auth.uid() = user_id'
    );
    
    // Criar trigger para atualizar o campo updated_at
    await executeSql(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = now();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);
    
    await executeSql(`
      DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
      CREATE TRIGGER update_profiles_updated_at
      BEFORE UPDATE ON profiles
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
    `);
    
    return { success: true };
  } catch (error) {
    console.error('Erro ao configurar tabela de perfis:', error);
    return { success: false, error };
  }
};

/**
 * Define um usuário como administrador
 * @param userEmail Email do usuário
 * @returns Resultado da operação
 */
export const setUserAsAdmin = async (userEmail: string) => {
  try {
    const supabase = createServiceClient();
    
    // Buscar o usuário pelo email
    const { data: user, error: userError } = await supabase
      .from('auth.users')
      .select('id')
      .eq('email', userEmail)
      .single();
    
    if (userError || !user) {
      return { 
        success: false, 
        error: userError || new Error(`Usuário com email ${userEmail} não encontrado`) 
      };
    }
    
    // Atualizar os metadados do usuário
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      user.id,
      { user_metadata: { is_admin: true } }
    );
    
    if (updateError) {
      return { success: false, error: updateError };
    }
    
    // Atualizar a tabela de perfis
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        user_id: user.id,
        is_admin: true,
        updated_at: new Date().toISOString()
      });
    
    if (profileError) {
      return { success: false, error: profileError };
    }
    
    return { 
      success: true, 
      message: `Usuário ${userEmail} definido como administrador com sucesso` 
    };
  } catch (error) {
    console.error('Erro ao definir usuário como administrador:', error);
    return { success: false, error };
  }
};
