"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // Processa o callback de autenticação
    const handleAuthCallback = async () => {
      try {
        // Supabase irá automaticamente processar o callback na URL
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Erro no callback de autenticação:', error);
          router.push('/auth/login?error=auth-callback-failed');
          return;
        }

        if (session) {
          // Redireciona para o dashboard após autenticação bem-sucedida
          router.push('/dashboard');
        } else {
          // Se não houver sessão, redireciona para o login
          router.push('/auth/login');
        }
      } catch (error) {
        console.error('Erro ao processar callback:', error);
        router.push('/auth/login?error=auth-callback-error');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-800">
      <div className="text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-4 text-lg text-gray-300">Autenticando...</p>
      </div>
    </div>
  );
}
