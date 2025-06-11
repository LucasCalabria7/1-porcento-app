#!/usr/bin/env node

/**
 * Script para criar tabelas no Supabase via terminal usando a função exec_sql
 * 
 * Uso: node scripts/create-table-with-exec-sql.js [nome-do-arquivo-sql]
 * 
 * Exemplo: node scripts/create-table-with-exec-sql.js ./scripts/create-profiles-table.sql
 * 
 * Se nenhum arquivo for especificado, o script usará o SQL padrão para criar a tabela profiles.
 */

require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

// SQL padrão para criar a tabela de perfis (caso nenhum arquivo seja especificado)
const DEFAULT_PROFILES_SQL = `
-- Criar tabela de perfis
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  profile_type VARCHAR(255),
  company_name VARCHAR(255),
  industry VARCHAR(255),
  goals TEXT[],
  onboarding_completed BOOLEAN DEFAULT false,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Criar políticas
DO $$
BEGIN
  -- Política de leitura
  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can read own profile'
  ) THEN
    CREATE POLICY "Users can read own profile" ON public.profiles
      FOR SELECT USING (auth.uid() = user_id);
  END IF;
  
  -- Política de atualização
  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can update own profile'
  ) THEN
    CREATE POLICY "Users can update own profile" ON public.profiles
      FOR UPDATE USING (auth.uid() = user_id);
  END IF;
  
  -- Política de inserção
  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can insert own profile'
  ) THEN
    CREATE POLICY "Users can insert own profile" ON public.profiles
      FOR INSERT USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
  END IF;
END
$$;

-- Criar função para atualizar o campo updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criar trigger para atualizar o campo updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
`;

// Função para executar SQL no Supabase via função exec_sql
async function executeSQL(supabaseUrl, supabaseKey, sqlQuery) {
  try {
    console.log('🔄 Executando SQL via função exec_sql...');
    
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      },
      body: JSON.stringify({ sql_query: sqlQuery })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro na API: ${errorText}`);
    }
    
    const result = await response.json();
    
    if (result.error) {
      throw new Error(`Erro ao executar SQL: ${result.error}`);
    }
    
    return result;
  } catch (error) {
    throw error;
  }
}

// Função principal
async function main() {
  try {
    console.log('🚀 Iniciando criação de tabela no Supabase via terminal...');
    
    // Verificar variáveis de ambiente
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('❌ Erro: Variáveis de ambiente NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY não encontradas');
      console.log('Por favor, crie um arquivo .env.local com estas variáveis.');
      process.exit(1);
    }
    
    // Verificar se foi fornecido um arquivo SQL como argumento
    let sqlQuery = DEFAULT_PROFILES_SQL;
    const sqlFilePath = process.argv[2];
    
    if (sqlFilePath) {
      try {
        console.log(`📄 Lendo SQL do arquivo: ${sqlFilePath}`);
        sqlQuery = fs.readFileSync(path.resolve(sqlFilePath), 'utf8');
      } catch (error) {
        console.error(`❌ Erro ao ler arquivo SQL: ${error.message}`);
        process.exit(1);
      }
    } else {
      console.log('📝 Usando SQL padrão para criar tabela profiles');
    }
    
    // Executar o SQL no Supabase
    try {
      const result = await executeSQL(supabaseUrl, supabaseKey, sqlQuery);
      console.log('✅ SQL executado com sucesso!');
      console.log('📊 Resultado:', result);
    } catch (error) {
      console.error('❌ Erro ao executar SQL:', error.message);
      process.exit(1);
    }
    
    console.log('✅ Processo concluído com sucesso!');
  } catch (error) {
    console.error('❌ Erro inesperado:', error);
    process.exit(1);
  }
}

// Executar o script
main();
