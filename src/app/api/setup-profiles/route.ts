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
    
    // Verificar se a tabela já existe
    const { error: checkError } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);
    
    if (!checkError) {
      return NextResponse.json({ message: 'A tabela de perfis já existe' });
    }
    
    // SQL para criar a tabela de perfis
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS public.profiles (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
    `;
    
    // SQL para habilitar RLS e criar políticas
    const securitySQL = `
      -- Habilitar RLS
      ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
      
      -- Criar políticas
      CREATE POLICY "Users can read own profile"
      ON public.profiles
      FOR SELECT
      USING (auth.uid() = user_id);
      
      CREATE POLICY "Users can update own profile"
      ON public.profiles
      FOR UPDATE
      USING (auth.uid() = user_id);
      
      CREATE POLICY "Users can insert own profile"
      ON public.profiles
      FOR INSERT
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
      
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
    
    // Executar SQL para criar a tabela
    // Usamos o método .from('profiles').insert() para criar a tabela automaticamente
    console.log('Criando tabela de perfis...');
    
    // Criar um usuário temporário para teste
    const { data: userData, error: userError } = await supabase.auth.admin.createUser({
      email: 'temp-setup@example.com',
      password: 'temp-password-' + Math.random().toString(36).substring(2, 10),
      email_confirm: true
    });
    
    if (userError) {
      return NextResponse.json(
        { error: 'Erro ao criar usuário temporário', details: userError },
        { status: 500 }
      );
    }
    
    // Inserir um registro para criar a tabela
    const { error: insertError } = await supabase
      .from('profiles')
      .insert({
        id: userData.user.id,
        user_id: userData.user.id,
        profile_type: 'setup',
        onboarding_completed: true
      });
    
    // Remover o usuário temporário
    await supabase.auth.admin.deleteUser(userData.user.id);
    
    if (insertError && insertError.code === '42P01') {
      // Se a tabela não existir, vamos tentar criá-la usando SQL direto
      // Infelizmente, o Supabase não permite executar SQL direto via API REST
      // Então vamos retornar o SQL para o cliente executar manualmente
      
      return NextResponse.json({
        error: 'Tabela não existe e não pode ser criada automaticamente',
        sql: createTableSQL + securitySQL,
        message: 'Execute este SQL no SQL Editor do Supabase para criar a tabela de perfis'
      }, { status: 500 });
    } else if (insertError) {
      return NextResponse.json(
        { error: 'Erro ao criar tabela de perfis', details: insertError },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ message: 'Tabela de perfis criada com sucesso' });
  } catch (error) {
    console.error('Erro ao configurar tabela de perfis:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor', details: error },
      { status: 500 }
    );
  }
}
