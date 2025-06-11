"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/Button';

// Tipos para as etapas do formulário
type UserProfile = 'CEO' | 'Associate' | 'UGC Creator';

// Componente de barra de progresso
const ProgressBar = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
  const progress = Math.round((currentStep / totalSteps) * 100);
  
  return (
    <div className="w-full">
      <div className="flex justify-between mb-1 text-xs text-gray-400">
        <span>{progress}% Completo</span>
        <span>Etapa {currentStep} de {totalSteps}</span>
      </div>
      <div className="w-full bg-dark-600 rounded-full h-2.5">
        <div 
          className="bg-gradient-to-r from-primary-500 to-primary-700 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

// Componente de opção de perfil
const ProfileOption = ({ 
  title, 
  description, 
  icon, 
  selected, 
  onClick 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  selected: boolean; 
  onClick: () => void;
}) => {
  return (
    <div 
      className={`p-6 rounded-xl border ${selected ? 'border-primary-500 bg-primary-500/10' : 'border-dark-600 bg-dark-700/50'} cursor-pointer transition-all duration-200 hover:border-primary-400 hover:bg-dark-700/80`}
      onClick={onClick}
    >
      <div className="flex items-start">
        <div className={`p-3 rounded-lg ${selected ? 'bg-primary-500' : 'bg-dark-600'} mr-4`}>
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-medium text-white mb-1">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
        <div className="ml-auto">
          <div className={`w-5 h-5 rounded-full border-2 ${selected ? 'border-primary-500 bg-primary-500' : 'border-gray-500'} flex items-center justify-center`}>
            {selected && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function UserFormPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  
  // Total de etapas no formulário
  const totalSteps = 1; // Por enquanto só temos 1 etapa
  
  // Verificar se o usuário está autenticado
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/auth/login');
        return;
      }
      
      setUser(session.user);
    };
    
    checkUser();
  }, [router]);
  
  // Função para salvar o perfil do usuário
  const saveUserProfile = async () => {
    if (!selectedProfile || !user) return;
    
    setLoading(true);
    
    try {
      // Atualizar os metadados do usuário
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          profile_type: selectedProfile,
          profile_completed: true
        }
      });
      
      if (updateError) {
        console.error('Error updating user metadata:', updateError);
        throw updateError;
      }
      
      // Verificar se o perfil já existe
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();
      
      let profileError;
      
      if (existingProfile) {
        // Atualizar perfil existente
        const { error } = await supabase
          .from('profiles')
          .update({
            profile_type: selectedProfile,
            onboarding_completed: true,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', user.id);
        
        profileError = error;
      } else {
        // Inserir novo perfil
        const { error } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            user_id: user.id,
            profile_type: selectedProfile,
            onboarding_completed: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
        
        profileError = error;
      }
      
      if (profileError) {
        console.error('Error updating profile in database:', profileError);
        throw profileError;
      }
      
      console.log('Profile updated successfully');
      
      // Redirecionar para o dashboard
      router.push('/dashboard');
      
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Função para avançar para a próxima etapa
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      saveUserProfile();
    }
  };
  
  // Ícones para as opções de perfil
  const CEOIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
  
  const AssociateIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
  
  const CreatorIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
  
  return (
    <div className="min-h-screen bg-dark-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-primary-700 mb-6 shadow-lg shadow-primary-900/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-gotham-black">
            Complete seu perfil
          </h1>
          <p className="mt-3 text-base text-gray-400 max-w-sm mx-auto">
            Precisamos de algumas informações para personalizar sua experiência
          </p>
        </div>
        
        <div className="bg-dark-700/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-dark-600/50 mb-8">
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          
          <div className="mt-8">
            {currentStep === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-medium text-white mb-6">Qual melhor perfil define você?</h2>
                
                <div className="space-y-4">
                  <ProfileOption 
                    title="CEO" 
                    description="Você é dono ou lidera uma empresa ou produto digital"
                    icon={<CEOIcon />}
                    selected={selectedProfile === 'CEO'}
                    onClick={() => setSelectedProfile('CEO')}
                  />
                  
                  <ProfileOption 
                    title="Associate" 
                    description="Você trabalha em uma empresa ou é parte de um time"
                    icon={<AssociateIcon />}
                    selected={selectedProfile === 'Associate'}
                    onClick={() => setSelectedProfile('Associate')}
                  />
                  
                  <ProfileOption 
                    title="UGC Creator" 
                    description="Você cria conteúdo e é um influenciador digital"
                    icon={<CreatorIcon />}
                    selected={selectedProfile === 'UGC Creator'}
                    onClick={() => setSelectedProfile('UGC Creator')}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button
            onClick={nextStep}
            disabled={!selectedProfile || loading}
            isLoading={loading}
            variant="primary"
            size="lg"
          >
            {currentStep === totalSteps ? "Finalizar" : "Próximo"}
          </Button>
        </div>
      </div>
    </div>
  );
}
