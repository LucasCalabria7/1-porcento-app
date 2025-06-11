"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

export default function DatabaseAdminPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [adminKey, setAdminKey] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [customSql, setCustomSql] = useState('');

  // Função para configurar a tabela de perfis
  const setupProfilesTable = async () => {
    if (!adminKey) {
      setResult({ error: 'Chave de administrador é necessária' });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/db-setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminKey}`
        }
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: 'Erro ao executar operação', details: error });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Função para definir um usuário como administrador
  const setUserAsAdmin = async () => {
    if (!adminKey) {
      setResult({ error: 'Chave de administrador é necessária' });
      return;
    }
    
    if (!adminEmail) {
      setResult({ error: 'Email do usuário é necessário' });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/admin/set-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminKey}`
        },
        body: JSON.stringify({ email: adminEmail })
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: 'Erro ao definir usuário como administrador', details: error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-800 text-white">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Administração do Banco de Dados</h1>
        
        <div className="bg-dark-700 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Configuração de Segurança</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Chave de Administrador
            </label>
            <input
              type="password"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              className="w-full px-3 py-2 bg-dark-600 border border-dark-500 rounded-md text-white"
              placeholder="Insira a chave de administrador"
            />
            <p className="mt-1 text-xs text-gray-400">
              A chave deve corresponder ao valor definido na variável de ambiente DB_ADMIN_KEY
            </p>
          </div>
        </div>

        <div className="bg-dark-700 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Operações do Banco de Dados</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Tabela de Perfis</h3>
              <p className="text-sm text-gray-300 mb-3">
                Configura a tabela de perfis com as colunas necessárias e políticas de segurança.
              </p>
              <Button
                onClick={setupProfilesTable}
                disabled={isLoading}
                variant="primary"
                size="md"
              >
                {isLoading ? 'Configurando...' : 'Configurar Tabela de Perfis'}
              </Button>
            </div>
            
            <div className="pt-4 border-t border-dark-600">
              <h3 className="text-lg font-medium mb-2">Definir Administrador</h3>
              <p className="text-sm text-gray-300 mb-3">
                Define um usuário como administrador, permitindo acesso às áreas administrativas.
              </p>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email do Usuário
                </label>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-dark-600 border border-dark-500 rounded-md text-white"
                  placeholder="email@exemplo.com"
                />
              </div>
              <Button
                onClick={setUserAsAdmin}
                disabled={isLoading || !adminEmail}
                variant="primary"
                size="md"
              >
                {isLoading ? 'Processando...' : 'Definir como Administrador'}
              </Button>
            </div>
          </div>
        </div>

        {result && (
          <div className={`bg-dark-700 rounded-lg p-6 mb-6 border ${result.success ? 'border-green-500' : 'border-red-500'}`}>
            <h2 className="text-xl font-semibold mb-2">Resultado da Operação</h2>
            <pre className="bg-dark-600 p-4 rounded-md overflow-auto max-h-60 text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        <div className="text-sm text-gray-400 mt-8">
          <p className="font-semibold mb-2">Importante:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Use estas ferramentas com cuidado, pois elas podem modificar a estrutura do banco de dados.</li>
            <li>Em ambiente de produção, proteja adequadamente o acesso a esta página.</li>
            <li>Certifique-se de que a chave SUPABASE_SERVICE_ROLE_KEY está configurada nas variáveis de ambiente.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
