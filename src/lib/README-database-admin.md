# Administração de Banco de Dados

Este módulo permite gerenciar o banco de dados Supabase diretamente do código, sem precisar acessar o console do Supabase.

## Configuração de Variáveis de Ambiente

Para usar este módulo, você precisa configurar as seguintes variáveis de ambiente no arquivo `.env.local`:

```
# Chave já existente para o cliente anônimo do Supabase
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_do_supabase

# Novas chaves para administração do banco de dados
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role_do_supabase
DB_ADMIN_KEY=uma_chave_secreta_para_proteger_a_api_de_administracao
```

## Como obter a Service Role Key

1. Acesse o dashboard do Supabase
2. Vá para Project Settings > API
3. Na seção "Project API keys", copie a "service_role key"

**IMPORTANTE**: A service_role key tem permissões elevadas e não deve ser exposta publicamente ou no frontend.

## Uso da Interface Administrativa

1. Configure as variáveis de ambiente conforme descrito acima
2. Acesse a interface administrativa em `/admin/database`
3. Insira a chave de administrador (valor definido em `DB_ADMIN_KEY`)
4. Use os botões para executar as operações desejadas

## Uso Programático

Para usar programaticamente, importe as funções do módulo `databaseAdmin.ts`:

```typescript
import { setupProfilesTable } from '@/lib/databaseAdmin';

// Configurar tabela de perfis
const result = await setupProfilesTable();
```

## Segurança

- Em ambiente de produção, proteja adequadamente o acesso à página `/admin/database`
- Considere implementar autenticação adicional para esta rota
- Nunca exponha a `SUPABASE_SERVICE_ROLE_KEY` no frontend
- A API `/api/db-setup` é protegida por uma chave de API básica, mas você pode implementar medidas de segurança adicionais

## Funções Disponíveis

- `setupProfilesTable()`: Configura a tabela de perfis com as colunas e políticas de segurança necessárias
- `executeSql(sql)`: Executa um comando SQL personalizado
- `createTableIfNotExists(tableName, columns)`: Cria uma tabela se ela não existir
- `createPolicy(policyName, tableName, operation, using, withCheck)`: Cria uma política RLS
- `enableRls(tableName)`: Habilita RLS para uma tabela
