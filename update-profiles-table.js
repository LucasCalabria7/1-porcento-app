// Script para adicionar colunas à tabela profiles no Supabase usando comandos SQL diretos
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Carregar variáveis de ambiente do arquivo .env.local se existir
try {
  require('dotenv').config({ path: '.env.local' });
} catch (error) {
  console.log('dotenv não encontrado, continuando sem carregar variáveis de ambiente do arquivo');
}

// Obter credenciais do Supabase das variáveis de ambiente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Erro: Variáveis de ambiente do Supabase não encontradas.');
  console.error('Por favor, forneça as variáveis de ambiente:');
  console.error('NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

// Criar cliente Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

// Lista de colunas a serem adicionadas à tabela profiles
const columnsToAdd = [
  { name: 'full_name', type: 'TEXT' },
  { name: 'email', type: 'TEXT' },
  { name: 'phone_number', type: 'TEXT' },
  { name: 'country', type: 'TEXT' },
  { name: 'birth_date', type: 'TEXT' },
  { name: 'document', type: 'TEXT' },
  { name: 'language', type: 'TEXT' },
  { name: 'profile_type', type: 'TEXT' },
  { name: 'monetization_method', type: 'TEXT' },
  { name: 'global_monetization', type: 'TEXT' },
  { name: 'digital_product_strategy', type: 'BOOLEAN' },
  { name: 'digital_product_type', type: 'TEXT[]' },
  { name: 'referral_source', type: 'TEXT' },
  { name: 'company_revenue', type: 'TEXT' },
  { name: 'global_selling_experience', type: 'TEXT' },
  { name: 'creator_experience_level', type: 'TEXT' },
  { name: 'onboarding_completed', type: 'BOOLEAN', default: 'FALSE' },
  { name: 'created_at', type: 'TIMESTAMPTZ', default: 'NOW()' },
  { name: 'updated_at', type: 'TIMESTAMPTZ', default: 'NOW()' }
];

// Função para adicionar uma coluna à tabela profiles
async function addColumn(column) {
  try {
    console.log(`Adicionando coluna ${column.name}...`);
    
    // Verificar se a coluna já existe
    const { data, error: checkError } = await supabase
      .from('profiles')
      .select(column.name)
      .limit(1);
    
    if (!checkError) {
      console.log(`Coluna ${column.name} já existe. Pulando...`);
      return true;
    }
    
    // Construir comando SQL para adicionar coluna
    let sql = `ALTER TABLE profiles ADD COLUMN ${column.name} ${column.type}`;
    if (column.default) {
      sql += ` DEFAULT ${column.default}`;
    }
    
    // Executar o comando SQL usando a função exec_sql do Supabase
    const { error } = await supabase.rpc('exec_sql', { sql_query: sql });
    
    if (error) {
      console.error(`Erro ao adicionar coluna ${column.name}:`, error);
      return false;
    }
    
    console.log(`Coluna ${column.name} adicionada com sucesso!`);
    return true;
  } catch (error) {
    console.error(`Erro ao adicionar coluna ${column.name}:`, error);
    return false;
  }
}

// Nota: Estamos usando a função exec_sql que já existe no Supabase

// Função principal para adicionar todas as colunas
async function addColumnsToProfilesTable() {
  console.log('Iniciando adição de colunas à tabela profiles...');
  
  // Verificar se a tabela profiles existe
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);
    
    if (error && error.code === 'PGRST116') {
      console.error('A tabela profiles não existe. Crie-a primeiro.');
      return;
    }
  } catch (error) {
    console.error('Erro ao verificar se a tabela profiles existe:', error);
    return;
  }
  
  // Adicionar cada coluna
  let successCount = 0;
  for (const column of columnsToAdd) {
    const success = await addColumn(column);
    if (success) {
      successCount++;
    }
  }
  
  console.log(`Processo concluído! ${successCount} de ${columnsToAdd.length} colunas foram adicionadas/verificadas.`);
}

// Executar a função principal
addColumnsToProfilesTable();

