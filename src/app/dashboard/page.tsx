"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/layouts/DashboardLayout';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { ProfileCompletionModal } from '@/components/ui';
import DashboardContent from '@/components/dashboard/DashboardContent';

export default function DashboardPage() {
  const router = useRouter();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Verificar se o usuário está autenticado e se o perfil está completo
  useEffect(() => {
    const checkProfileCompletion = async () => {
      try {
        // Obter a sessão atual
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          console.log('Sem sessão. Redirecionando para login...');
          router.push('/auth/login');
          return;
        }
        
        console.log('Verificando perfil para o usuário:', session.user.email);
        
        // Primeiro verificar se a tabela profiles existe e está acessível
        const { error: tableCheckError } = await supabase
          .from('profiles')
          .select('count')
          .limit(1);
          
        if (tableCheckError) {
          console.error('Tabela profiles pode não existir ou não está acessível:', tableCheckError);
          setShowProfileModal(true);
          setIsLoading(false);
          return;
        }
        
        // Verificar se o perfil existe na tabela de perfis
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('onboarding_completed, profile_type')
          .eq('user_id', session.user.id)
          .maybeSingle(); // Usa maybeSingle para não lançar erro se não encontrar
        
        console.log('Dados do perfil na tabela:', profile, 'Erro:', profileError);
        
        // Se o perfil existir na tabela e estiver completo, não mostrar modal
        if (profile && profile.onboarding_completed) {
          console.log('Perfil completo na tabela. Ocultando modal.');
          setShowProfileModal(false);
          setIsLoading(false);
          return;
        }
        
        // Verificar metadados do usuário como backup
        const profileCompleted = session.user.user_metadata?.profile_completed || false;
        const profileType = session.user.user_metadata?.profile_type;
        
        console.log('Metadados do usuário:', { profileCompleted, profileType });
        
        // Se o perfil estiver completo nos metadados mas não na tabela,
        // tentar criar o perfil automaticamente
        if (profileCompleted && profileType && (!profile || !profile.onboarding_completed)) {
          console.log('Perfil completo nos metadados, mas não na tabela. Tentando criar perfil...');
          
          const { error: insertError } = await supabase
            .from('profiles')
            .upsert({
              user_id: session.user.id,
              profile_type: profileType,
              onboarding_completed: true,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            });
            
          if (!insertError) {
            console.log('Perfil criado com sucesso. Ocultando modal.');
            setShowProfileModal(false);
          } else {
            console.error('Erro ao criar perfil:', insertError);
            setShowProfileModal(true);
          }
        } else {
          // Se chegou aqui, o perfil não está completo ou não existe
          console.log('Perfil incompleto. Mostrando modal.');
          setShowProfileModal(true);
        }
      } catch (error) {
        console.error('Erro ao verificar perfil:', error);
        // Em caso de erro, mostrar o modal por precaução
        setShowProfileModal(true);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkProfileCompletion();
  }, []);
  
  return (
    <DashboardLayout>
      {/* Modal de perfil incompleto */}
      <ProfileCompletionModal isOpen={showProfileModal} />
      
      {/* Nova dashboard personalizada */}
      <DashboardContent />
    </DashboardLayout>
  );
}
