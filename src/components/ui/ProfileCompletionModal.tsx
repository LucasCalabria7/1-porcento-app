import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './Button';
import { supabase } from '@/lib/supabaseClient';

interface ProfileCompletionModalProps {
  isOpen: boolean;
}

export const ProfileCompletionModal: React.FC<ProfileCompletionModalProps> = ({ isOpen }) => {
  const router = useRouter();
  const [userName, setUserName] = useState<string>('');
  const [profileProgress, setProfileProgress] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      fetchUserInfo();
    }
  }, [isOpen]);

  const fetchUserInfo = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Obter nome do usuário dos metadados
        const name = session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'Usuário';
        setUserName(name);
        
        // Calcular progresso do perfil
        let progress = 10; // Base progress for having an account
        
        // Check if email is verified
        if (session.user.email_confirmed_at) {
          progress += 10;
        }
        
        // Check if profile type exists
        if (session.user.user_metadata?.profile_type) {
          progress += 30;
        }
        
        // Check if profile exists in database
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .single();
        
        if (profile) {
          progress += 20;
          
          // Additional fields add more progress
          if (profile.company_name) progress += 10;
          if (profile.industry) progress += 10;
          if (profile.goals && profile.goals.length > 0) progress += 10;
        }
        
        setProfileProgress(Math.min(progress, 99)); // Cap at 99% until fully onboarded
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-dark-900 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div 
          className="inline-block align-bottom bg-dark-700 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div className="bg-dark-700 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg className="h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-white">
                  Olá, {userName}! Complete seu perfil
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-300">
                    Para acessar o dashboard completo, precisamos de algumas informações adicionais sobre você. 
                    Complete seu perfil para desbloquear todas as funcionalidades da plataforma.
                  </p>
                  <div className="mt-3 p-3 bg-dark-600 rounded-lg">
                    <p className="text-xs text-gray-400 mb-1">Benefícios de completar seu perfil:</p>
                    <ul className="text-xs text-gray-300 list-disc pl-4 space-y-1">
                      <li>Acesso a todas as funcionalidades da plataforma</li>
                      <li>Experiência personalizada baseada no seu perfil</li>
                      <li>Recomendações e insights relevantes para seus objetivos</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-dark-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <Button
              onClick={() => {
                setLoading(true);
                console.log('Redirecionando para o formulário de perfil');
                router.push('/userform');
              }}
              variant="primary"
              size="md"
              className="w-full sm:w-auto sm:ml-3"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent mr-2"></span>
                  Redirecionando...
                </>
              ) : (
                'Completar perfil'
              )}
            </Button>
          </div>
          
          <div className="px-4 py-3 bg-dark-800 border-t border-dark-600">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-2 w-2 rounded-full bg-primary-500 pulse-animation"></div>
                </div>
                <p className="ml-3 text-xs text-gray-400">
                  Seu perfil está {profileProgress}% completo
                </p>
              </div>
              <div className="w-full bg-dark-600 rounded-full h-1.5">
                <div 
                  className="bg-gradient-to-r from-primary-500 to-primary-700 h-1.5 rounded-full transition-all duration-500 ease-in-out" 
                  style={{ width: `${profileProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletionModal;
