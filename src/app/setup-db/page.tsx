"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

export default function SetupDbPage() {
  const [adminKey, setAdminKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success?: boolean; message?: string; error?: string } | null>(null);

  const setupDatabase = async () => {
    if (!adminKey) return;
    
    setLoading(true);
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
      
      if (response.ok) {
        setResult({
          success: true,
          message: data.message || 'Banco de dados configurado com sucesso!'
        });
      } else {
        setResult({
          success: false,
          error: data.error || 'Erro ao configurar banco de dados'
        });
      }
    } catch (error) {
      setResult({
        success: false,
        error: 'Erro ao fazer requisição para a API'
      });
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-primary-700 mb-6 shadow-lg shadow-primary-900/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-gotham-black">
            Configuração do Banco de Dados
          </h1>
          <p className="mt-3 text-base text-gray-400">
            Configure a tabela de perfis para o funcionamento do quiz
          </p>
        </div>
        
        <div className="bg-dark-700/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-dark-600/50 mb-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="adminKey" className="block text-sm font-medium text-gray-300 mb-2">
                Chave de Administrador
              </label>
              <input
                id="adminKey"
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                className="w-full px-4 py-3 bg-dark-600/50 border border-dark-500 rounded-lg text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Digite a chave de administrador (DB_ADMIN_KEY)"
              />
            </div>
            
            <Button
              onClick={setupDatabase}
              disabled={!adminKey || loading}
              isLoading={loading}
              variant="primary"
              size="lg"
              className="w-full"
            >
              Configurar Tabela de Perfis
            </Button>
            
            {result && (
              <div className={`mt-4 p-4 rounded-lg ${result.success ? 'bg-green-900/30 border border-green-700' : 'bg-red-900/30 border border-red-700'}`}>
                {result.success ? (
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-green-300">{result.message}</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="text-red-300">{result.error}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="text-center text-sm text-gray-500">
          <p>Após configurar o banco de dados, você poderá usar o quiz de perfil normalmente.</p>
          <p className="mt-2">Esta página deve ser acessada apenas pelo administrador do sistema.</p>
        </div>
      </div>
    </div>
  );
}
