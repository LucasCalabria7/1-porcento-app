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

export async function POST(request: NextRequest) {
  try {
    // Verificar chave de administrador
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    
    if (!token || token !== process.env.DB_ADMIN_KEY) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }
    
    // Criar cliente Supabase com permissões de serviço
    const supabase = createServiceClient();
    
    // Usar o cliente REST para criar a tabela diretamente
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY || '',
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
      },
      body: JSON.stringify({
        command: `
          -- Criar tabela de perfis
          CREATE TABLE IF NOT EXISTS profiles (
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
          
          -- Habilitar RLS
          ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
          
          -- Criar políticas
          CREATE POLICY "Users can read own profile"
          ON profiles
          FOR SELECT
          USING (auth.uid() = user_id);
          
          CREATE POLICY "Users can update own profile"
          ON profiles
          FOR UPDATE
          USING (auth.uid() = user_id);
          
          CREATE POLICY "Users can insert own profile"
          ON profiles
          FOR INSERT
          USING (auth.uid() = user_id)
          WITH CHECK (auth.uid() = user_id);
        `
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erro ao criar tabela:', errorData);
      return NextResponse.json({ error: 'Erro ao criar tabela', details: errorData }, { status: 500 });
    }
    
    return NextResponse.json({ message: 'Tabela de perfis criada com sucesso' });
  } catch (error) {
    console.error('Erro ao configurar banco de dados:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor', details: error }, 
      { status: 500 }
    );
  }
}
