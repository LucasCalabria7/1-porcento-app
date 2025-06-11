import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Cria um cliente Supabase com permissões de serviço (service_role)
const createServiceClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase URL ou Service Role Key não encontrados nas variáveis de ambiente');
  }
  
  return createClient(supabaseUrl, supabaseServiceKey);
};

// Função para configurar a tabela de perfis
async function setupProfilesTable() {
  try {
    const supabase = createServiceClient();
    
    // Criar tabela de perfis usando SQL direto
    const { error: createTableError } = await supabase.rpc('exec_sql', {
      sql_query: `
        CREATE TABLE IF NOT EXISTS public.profiles (
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
        );
      `
    }).catch(err => ({ error: err }));

    if (createTableError) {
      console.error('Erro ao criar tabela:', createTableError);
      
      // Tentar abordagem alternativa usando PostgreSQL direto
      console.log('Tentando abordagem alternativa...');
      const { error } = await supabase.from('profiles').select('count').limit(1);
      
      if (error && error.code === '42P01') { // Tabela não existe
        console.log('Tabela não existe, criando usando SQL direto via API REST...');
        
        // Usar a API REST do Supabase para criar a tabela
        const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY || '',
            'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
          },
          body: JSON.stringify({
            sql_query: `
              CREATE TABLE IF NOT EXISTS public.profiles (
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
              );
            `
          })
        });
        
        if (!res.ok) {
          const errorData = await res.json();
          console.error('Erro na API REST:', errorData);
          return { success: false, error: errorData };
        }
      }
    }
    
    return { success: true };
  } catch (error) {
    console.error('Erro ao configurar tabela de perfis:', error);
    return { success: false, error };
  }
}

/**
 * API route para configurar o banco de dados
 * Esta rota deve ser protegida em ambiente de produção
 */
export async function POST(request: NextRequest) {
  try {
    // Verificar chave de administrador
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    
    if (!token || token !== process.env.DB_ADMIN_KEY) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }
    
    // Configurar tabela de perfis
    const result = await setupProfilesTable();
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Erro ao configurar banco de dados', details: result.error }, 
        { status: 500 }
      );
    }
    
    return NextResponse.json({ message: 'Banco de dados configurado com sucesso' });
  } catch (error) {
    console.error('Erro ao configurar banco de dados:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor', details: error }, 
      { status: 500 }
    );
  }
}

/**
 * API route para verificar o status da configuração do banco de dados
 */
export async function GET() {
  return NextResponse.json(
    { 
      message: 'Use o método POST para configurar o banco de dados',
      info: 'Esta rota permite configurar o banco de dados programaticamente'
    },
    { status: 200 }
  );
}
