"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AuthCallbackPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Verifica se estamos em um ambiente de navegador
    if (typeof window === 'undefined') return;
    
    // Processa o callback de autenticação
    const handleAuthCallback = async () => {
      try {
        console.log('Processando callback de autenticação...');
        
        // Supabase irá automaticamente processar o callback na URL
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Erro no callback de autenticação:', error);
          setErrorMessage('Falha na autenticação. Por favor, tente novamente.');
          setTimeout(() => router.push('/auth/login?error=auth-callback-failed'), 2000);
          return;
        }

        if (session) {
          // Autenticação bem-sucedida, simplesmente redirecionar para o dashboard
          // A verificação de perfil será feita na própria dashboard
          console.log('Autenticação bem-sucedida para:', session.user.email);
          
          // Verificar se o usuário optou por "Mantenha-me conectado"
          // Recuperar a preferência do localStorage ou dos parâmetros da URL
          const url = new URL(window.location.href);
          const rememberMeParam = url.searchParams.get('remember_me');
          const rememberMe = rememberMeParam ? rememberMeParam === 'true' : 
                            localStorage.getItem('rememberMe') === 'true';
          
          console.log(`Sessão configurada para ${rememberMe ? 'persistir por 30 dias' : 'expirar em 1 hora'}`);
          
          // Atualizar o localStorage com a preferência atual
          localStorage.setItem('rememberMe', rememberMe ? 'true' : 'false');
          
          setSuccess(true);
          
          // Pequeno atraso para mostrar a mensagem de sucesso
          setTimeout(() => {
            router.push('/dashboard');
          }, 1500);
        } else {
          // Se não houver sessão, redireciona para o login
          console.error('Sessão não encontrada após autenticação');
          setErrorMessage('Não foi possível recuperar sua sessão. Por favor, tente novamente.');
          setTimeout(() => router.push('/auth/login'), 2000);
        }
      } catch (error) {
        console.error('Erro ao processar callback:', error);
        setErrorMessage('Ocorreu um erro inesperado. Por favor, tente novamente.');
        setTimeout(() => router.push('/auth/login?error=auth-callback-error'), 2000);
      } finally {
        setIsLoading(false);
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-800">
      <div className="text-center">
        {isLoading ? (
          <>
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-lg text-gray-300">Autenticando...</p>
          </>
        ) : errorMessage ? (
          <>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-lg text-red-400">{errorMessage}</p>
            <p className="mt-2 text-sm text-gray-400">Redirecionando para a página de login...</p>
          </>
        ) : (
          <>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-lg text-green-400">Autenticação bem-sucedida!</p>
            <p className="mt-2 text-sm text-gray-400">Redirecionando...</p>
          </>
        )}
      </div>
    </div>
  );
}
