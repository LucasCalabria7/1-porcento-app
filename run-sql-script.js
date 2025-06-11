// Script para executar o arquivo SQL usando a CLI do Supabase
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Carregar variáveis de ambiente do arquivo .env.local se existir
try {
  require('dotenv').config({ path: '.env.local' });
} catch (error) {
  console.log('dotenv não encontrado, continuando sem carregar variáveis de ambiente do arquivo');
}

// Verificar se as variáveis de ambiente necessárias estão definidas
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Erro: Variáveis de ambiente do Supabase não encontradas.');
  console.error('Por favor, forneça as variáveis de ambiente:');
  console.error('NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY');
  console.error('Estas variáveis são necessárias para executar comandos SQL no Supabase.');
  console.error('\nAlternativamente, você pode executar o script SQL manualmente no painel do Supabase:');
  console.error('1. Acesse https://supabase.com/dashboard');
  console.error('2. Selecione seu projeto');
  console.error('3. Clique em "SQL Editor" no menu lateral');
  console.error('4. Clique em "New query"');
  console.error('5. Cole o conteúdo do arquivo add_profile_columns.sql');
  console.error('6. Clique em "Run" para executar o script');
  process.exit(1);
}

// Caminho para o arquivo SQL
const sqlFilePath = path.join(__dirname, 'add_profile_columns.sql');

// Verificar se o arquivo SQL existe
if (!fs.existsSync(sqlFilePath)) {
  console.error(`Erro: Arquivo SQL não encontrado em ${sqlFilePath}`);
  process.exit(1);
}

// Ler o conteúdo do arquivo SQL
const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');

console.log('Executando script SQL para adicionar colunas à tabela profiles...');

try {
  // Criar um arquivo temporário com as credenciais do Supabase
  const configPath = path.join(__dirname, '.supabase-temp-config');
  
  // Escrever as credenciais no arquivo temporário
  fs.writeFileSync(configPath, JSON.stringify({
    url: supabaseUrl,
    key: supabaseKey
  }), 'utf8');
  
  // Criar um arquivo temporário com o script SQL
  const tempSqlPath = path.join(__dirname, '.temp-sql-script.sql');
  fs.writeFileSync(tempSqlPath, sqlContent, 'utf8');
  
  // Executar o comando para inicializar o Supabase CLI
  console.log('Inicializando Supabase CLI...');
  execSync('npx supabase init', { stdio: 'inherit' });
  
  // Executar o comando para executar o script SQL
  console.log('Executando script SQL...');
  execSync(`npx supabase db execute --config-file=${configPath} ${tempSqlPath}`, { stdio: 'inherit' });
  
  // Limpar arquivos temporários
  fs.unlinkSync(configPath);
  fs.unlinkSync(tempSqlPath);
  
  console.log('Script SQL executado com sucesso!');
  console.log('As colunas foram adicionadas à tabela profiles.');
  
} catch (error) {
  console.error('Erro ao executar o script SQL:', error.message);
  console.error('\nVocê pode executar o script SQL manualmente no painel do Supabase:');
  console.error('1. Acesse https://supabase.com/dashboard');
  console.error('2. Selecione seu projeto');
  console.error('3. Clique em "SQL Editor" no menu lateral');
  console.error('4. Clique em "New query"');
  console.error('5. Cole o conteúdo do arquivo add_profile_columns.sql');
  console.error('6. Clique em "Run" para executar o script');
}
