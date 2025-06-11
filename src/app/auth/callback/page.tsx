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
          console.log('Verificando perfil para o usuário:', session.user.email);
          
          // Verifica nos metadados do usuário primeiro
          const profileCompleted = session.user.user_metadata?.profile_completed || false;
          const profileType = session.user.user_metadata?.profile_type;
          
          console.log('Metadados do usuário:', { profileCompleted, profileType });
          
          // Se o perfil estiver completo nos metadados, verificar também na tabela de perfis
          if (profileCompleted && profileType) {
            try {
              // Verifica se o perfil existe na tabela
              const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('onboarding_completed, profile_type')
                .eq('user_id', session.user.id)
                .single();
              
              console.log('Dados do perfil na tabela:', profile, 'Erro:', profileError);
              
              // Se o perfil existir na tabela e estiver completo, redireciona para o dashboard
              if (profile && profile.onboarding_completed && profile.profile_type) {
                console.log('Perfil completo na tabela. Redirecionando para o dashboard.');
                router.push('/dashboard');
                return;
              }
            } catch (err) {
              console.error('Erro ao verificar perfil na tabela:', err);
            }
          }
          
          // Se chegou aqui, o perfil não está completo ou não existe na tabela
          console.log('Perfil incompleto. Redirecionando para o formulário de usuário.');
          router.push('/userform');
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
