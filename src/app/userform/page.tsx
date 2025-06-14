"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';

// Importar tipos e componentes
import { FormData, UserProfileType } from './types';
import { ProgressBar } from './components';

// Importar passos do formulário
import ProfileTypeStep from './steps/ProfileTypeStep';
import BasicInfoStep from './steps/BasicInfoStep';
import CEOSpecificStep from './steps/CEOSpecificStep';
import AssociateSpecificStep from './steps/AssociateSpecificStep';
import CreatorSpecificStep from './steps/CreatorSpecificStep';
import MonetizationStep from './steps/MonetizationStep';
import ReviewStep from './steps/ReviewStep';

// Importar opções para os selects
import {
  countryOptions,
  languageOptions,
  monetizationMethodOptions,
  globalMonetizationOptions,
  digitalProductTypeOptions,
  referralSourceOptions,
  creatorExperienceLevelOptions,
  companyRevenueOptions,
  globalSellingExperienceOptions
} from './types';

interface CEOFormData {
  companyRevenue: string;
}

interface AssociateFormData {
  globalSellingExperience: string;
}

interface CreatorFormData {
  creatorExperienceLevel: string;
}

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

// Função para gerar UUID v4
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export default function UserFormPage() {
  // Estados para controle do formulário
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const t = useTranslations('userform');
  
  // Estado para dados do formulário
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    country: 'BR', // Default para Brasil
    birthDate: '',
    document: '',
    address: '',
    language: 'pt-BR', // Default para Português
    profileType: 'CEO', // Valor inicial, será alterado na primeira etapa
    monetizationMethod: '',
    globalMonetization: '',
    digitalProductStrategy: false,
    digitalProductType: [],
    referralSource: '',
    onboardingCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    // Campos específicos para cada tipo de perfil
    companyRevenue: '',
    globalSellingExperience: '',
    creatorExperienceLevel: ''
  });
  
  // Total de etapas no formulário (adaptativo com base no tipo de perfil)
  const totalSteps = 5; // 1. Tipo de perfil, 2. Informações básicas, 3. Específico do perfil, 4. Monetização, 5. Revisão
  
  // Verificar se o usuário está autenticado
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/auth/login');
        return;
      }
      
      setUser(session.user);
      
      // Preencher o email do usuário no formulário
      setFormData(prev => ({
        ...prev,
        email: session.user.email || ''
      }));
      
      // Verificar se o usuário já tem um perfil
      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .single();
        
        if (error) {
          console.error('Erro ao buscar perfil:', error);
          return;
        }
      
        if (profile && profile.onboarding_completed) {
          router.push('/dashboard');
        } else if (profile) {
          // Preencher os dados existentes do perfil
          setFormData(prev => ({
            ...prev,
            ...mapProfileToFormData(profile)
          }));
        }
      } catch (error) {
        console.error('Erro ao verificar perfil:', error);
      }
    };
    
    checkUser();
  }, [router]);
  
  // Função para mapear os dados do perfil do banco para o formato do formulário
  const mapProfileToFormData = (profile: any): Partial<FormData> => {
    return {
      fullName: profile.full_name || '',
      phoneNumber: profile.phone_number || '',
      country: profile.country || 'BR',
      birthDate: profile.birth_date || '',
      document: profile.document || '',
      address: profile.address || '',
      language: profile.language || 'pt-BR',
      profileType: profile.profile_type || 'CEO',
      monetizationMethod: profile.monetization_method || '',
      globalMonetization: profile.global_monetization || '',
      digitalProductStrategy: profile.digital_product_strategy || false,
      digitalProductType: profile.digital_product_type || [],
      referralSource: profile.referral_source || '',
      companyRevenue: profile.company_revenue || '',
      globalSellingExperience: profile.global_selling_experience || '',
      creatorExperienceLevel: profile.creator_experience_level || ''
    };
  };
  
  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Função para lidar com mudanças em checkboxes
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  // Função para lidar com mudanças em checkboxes múltiplos
  const handleMultiCheckboxChange = (value: string) => {
    setFormData(prev => {
      const currentValues = [...prev.digitalProductType];
      const index = currentValues.indexOf(value);
      
      if (index === -1) {
        currentValues.push(value);
      } else {
        currentValues.splice(index, 1);
      }
      
      return {
        ...prev,
        digitalProductType: currentValues
      };
    });
  };
  
  // Função para definir o tipo de perfil
  const setProfileType = (type: UserProfileType) => {
    setFormData(prev => ({
      ...prev,
      profileType: type
    }));
  };
  
  // Função para obter o label de uma opção a partir do valor
  const getOptionLabel = (options: { value: string; label: string }[], value: string) => {
    const option = options.find(opt => opt.value === value);
    return option ? option.label : value;
  };
  
  // Função para avançar para o próximo passo
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Função para voltar ao passo anterior
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Função para salvar o perfil do usuário
  const saveUserProfile = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      // Validar dados obrigatórios antes de salvar
      const requiredFields = [
        'fullName', 'email', 'phoneNumber', 'country', 'birthDate', 
        'profileType', 'monetizationMethod', 'globalMonetization', 'referralSource'
      ];
      
      const missingFields = requiredFields.filter(field => !formData[field as keyof FormData]);
      
      if (missingFields.length > 0) {
        alert(`Por favor, preencha todos os campos obrigatórios: ${missingFields.join(', ')}`);
        setLoading(false);
        return;
      }
      
      // Validações específicas por tipo de perfil
      if (formData.profileType === 'CEO' && !formData.companyRevenue) {
        alert('Por favor, informe a faixa de faturamento da sua empresa.');
        setLoading(false);
        return;
      }
      
      if (formData.profileType === 'Associate' && !formData.globalSellingExperience) {
        alert('Por favor, informe sua experiência como vendedor global.');
        setLoading(false);
        return;
      }
      
      if (formData.profileType === 'UGC Creator' && !formData.creatorExperienceLevel) {
        alert('Por favor, informe seu nível de experiência como creator.');
        setLoading(false);
        return;
      }
      
      // Validar se selecionou pelo menos um tipo de produto digital quando tem estratégia
      if (formData.digitalProductStrategy && (!formData.digitalProductType || formData.digitalProductType.length === 0)) {
        alert('Por favor, selecione pelo menos um tipo de produto digital que planeja vender.');
        setLoading(false);
        return;
      }
      
      // Mapear os dados do formulário para o formato do banco
      const profileData = {
        user_id: user.id,
        full_name: formData.fullName,
        email: formData.email,
        phone_number: formData.phoneNumber,
        country: formData.country,
        birth_date: formData.birthDate,
        document: formData.document,
        language: formData.language,
        profile_type: formData.profileType,
        monetization_method: formData.monetizationMethod,
        global_monetization: formData.globalMonetization,
        digital_product_strategy: formData.digitalProductStrategy,
        digital_product_type: formData.digitalProductType,
        referral_source: formData.referralSource,
        onboarding_completed: true,
        created_at: formData.createdAt || new Date().toISOString(),
        updated_at: new Date().toISOString(),
        company_revenue: formData.companyRevenue,
        global_selling_experience: formData.globalSellingExperience,
        creator_experience_level: formData.creatorExperienceLevel
      };
      
      console.log('Salvando perfil com os dados:', profileData);
      
      // Atualizar os metadados do usuário
      const { error: userUpdateError } = await supabase.auth.updateUser({
        data: {
          profile_type: formData.profileType,
          onboarding_completed: true
        }
      });
      
      if (userUpdateError) {
        console.error('Erro ao atualizar metadados do usuário:', userUpdateError);
        throw userUpdateError;
      }
      
      // Verificar se o perfil já existe
      const { data: existingProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();
      
      if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 é o código para "não encontrado"
        console.error('Erro ao verificar perfil existente:', fetchError);
        throw fetchError;
      }
      
      let result;
      
      if (existingProfile) {
        // Atualizar perfil existente
        result = await supabase
          .from('profiles')
          .update(profileData)
          .eq('user_id', user.id);
          
        if (result.error) {
          console.error('Erro ao atualizar perfil:', result.error);
          alert(`Erro ao atualizar perfil: ${result.error.message}`);
          throw result.error;
        }
        
        console.log('Perfil atualizado com sucesso!');
      } else {
        // Criar novo perfil com ID gerado
        const newProfileData = {
          ...profileData,
          id: uuidv4() // Gerar UUID para o campo id
        };
        
        result = await supabase
          .from('profiles')
          .insert([newProfileData]);
          
        if (result.error) {
          console.error('Erro ao criar perfil:', result.error);
          alert(`Erro ao criar perfil: ${result.error.message}`);
          throw result.error;
        }
        
        console.log('Perfil criado com sucesso!');
      }
      
      // Redirecionar para o dashboard
      console.log('Perfil salvo com sucesso! Redirecionando para o dashboard...');
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Erro ao salvar perfil:', error);
      alert(`Ocorreu um erro ao salvar seu perfil: ${error?.message || 'Erro desconhecido'}`);
    } finally {
      setLoading(false);
    }
  };
  
  // Renderizar o passo atual do formulário
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ProfileTypeStep 
            selectedProfile={formData.profileType} 
            setSelectedProfile={setProfileType} 
          />
        );
      case 2:
        return (
          <BasicInfoStep 
            formData={formData} 
            handleChange={handleChange} 
          />
        );
      case 3:
        // Renderizar o passo específico para o tipo de perfil selecionado
        switch (formData.profileType) {
          case 'CEO':
            return (
              <CEOSpecificStep 
                formData={{
                  companyRevenue: formData.companyRevenue
                }} 
                handleChange={handleChange} 
              />
            );
          case 'Associate':
            return (
              <AssociateSpecificStep 
                formData={{
                  globalSellingExperience: formData.globalSellingExperience
                }} 
                handleChange={handleChange} 
              />
            );
          case 'UGC Creator':
            return (
              <CreatorSpecificStep 
                formData={{
                  creatorExperienceLevel: formData.creatorExperienceLevel
                }} 
                handleChange={handleChange} 
              />
            );
          default:
            return null;
        }
      case 4:
        return (
          <MonetizationStep 
            formData={formData} 
            handleChange={handleChange} 
            handleCheckboxChange={handleCheckboxChange}
            handleMultiCheckboxChange={handleMultiCheckboxChange}
          />
        );
      case 5:
        return (
          <ReviewStep 
            formData={formData} 
            getOptionLabel={getOptionLabel} 
          />
        );
      default:
        return null;
    }
  };
  
  // Verificar se o formulário está pronto para avançar
  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!formData.profileType;
      case 2:
        return (
          !!formData.fullName &&
          !!formData.email &&
          !!formData.phoneNumber &&
          !!formData.country &&
          !!formData.birthDate &&
          (formData.country !== 'BR' || !!formData.document) &&
          // Removida validação do campo address
          !!formData.language
        );
      case 3:
        switch (formData.profileType) {
          case 'CEO':
            return !!formData.companyRevenue;
          case 'Associate':
            return !!formData.globalSellingExperience;
          case 'UGC Creator':
            return !!formData.creatorExperienceLevel;
          default:
            return false;
        }
      case 4:
        return (
          !!formData.monetizationMethod &&
          !!formData.globalMonetization &&
          (!formData.digitalProductStrategy || formData.digitalProductType.length > 0) &&
          !!formData.referralSource
        );
      case 5:
        return true; // Sempre pode prosseguir na etapa de revisão
      default:
        return false;
    }
  };
  
  // Verificar se o usuário está autenticado antes de renderizar o formulário
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-dark-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white">{t('title')}</h1>
          <p className="mt-2 text-gray-400">{t('description')}</p>
        </div>
        
        <div className="mb-8">
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        </div>
        
        <div className="bg-dark-700 rounded-xl shadow-xl p-8 mb-8">
          {renderStep()}
        </div>
        
        <div className="flex justify-between">
          {currentStep > 1 ? (
            <Button
              onClick={prevStep}
              variant="outline"
              disabled={loading}
            >
              {t('navigation.back')}
            </Button>
          ) : (
            <div></div>
          )}
          
          {currentStep < totalSteps ? (
            <Button
              onClick={nextStep}
              disabled={!canProceed() || loading}
              isLoading={loading}
            >
              {t('navigation.next')}
            </Button>
          ) : (
            <Button
              onClick={saveUserProfile}
              disabled={!canProceed() || loading}
              isLoading={loading}
            >
              {loading ? t('navigation.saving') : t('navigation.finish')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
