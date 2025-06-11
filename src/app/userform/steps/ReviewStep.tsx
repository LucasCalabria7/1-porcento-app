import React from 'react';
import { FormData } from '../types';

interface ReviewStepProps {
  formData: FormData;
  getOptionLabel: (options: { value: string; label: string }[], value: string) => string;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ formData, getOptionLabel }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium text-white mb-6">Revise suas informações</h2>
      
      <div className="space-y-6 bg-dark-600/50 p-6 rounded-xl border border-dark-500">
        <h3 className="text-lg font-medium text-white">Informações Básicas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-400">Nome completo</p>
            <p className="text-white">{formData.fullName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Email</p>
            <p className="text-white">{formData.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Número de celular</p>
            <p className="text-white">{formData.phoneNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">País</p>
            <p className="text-white">{getOptionLabel([{ value: formData.country, label: formData.country }], formData.country)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Data de nascimento</p>
            <p className="text-white">{new Date(formData.birthDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">{formData.country === 'BR' ? 'CPF/CNPJ' : 'Documento'}</p>
            <p className="text-white">{formData.document || 'Não informado'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Endereço</p>
            <p className="text-white">{formData.address}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Idioma preferido</p>
            <p className="text-white">{getOptionLabel([{ value: formData.language, label: formData.language }], formData.language)}</p>
          </div>
        </div>

        <div className="border-t border-dark-500 my-4"></div>
        
        <h3 className="text-lg font-medium text-white">Perfil e Experiência</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-400">Tipo de perfil</p>
            <p className="text-white">{formData.profileType}</p>
          </div>
          
          {formData.profileType === 'CEO' && formData.companyRevenue && (
            <div>
              <p className="text-sm text-gray-400">Faturamento mensal</p>
              <p className="text-white">{getOptionLabel([{ value: formData.companyRevenue, label: formData.companyRevenue }], formData.companyRevenue)}</p>
            </div>
          )}
          
          {formData.profileType === 'Associate' && formData.globalSellingExperience && (
            <div>
              <p className="text-sm text-gray-400">Experiência como vendedor global</p>
              <p className="text-white">{getOptionLabel([{ value: formData.globalSellingExperience, label: formData.globalSellingExperience }], formData.globalSellingExperience)}</p>
            </div>
          )}
          
          {formData.profileType === 'UGC Creator' && formData.creatorExperienceLevel && (
            <div>
              <p className="text-sm text-gray-400">Nível de experiência como creator</p>
              <p className="text-white">{getOptionLabel([{ value: formData.creatorExperienceLevel, label: formData.creatorExperienceLevel }], formData.creatorExperienceLevel)}</p>
            </div>
          )}
        </div>

        <div className="border-t border-dark-500 my-4"></div>
        
        <h3 className="text-lg font-medium text-white">Estratégia de Monetização</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-400">Método de monetização</p>
            <p className="text-white">{getOptionLabel([{ value: formData.monetizationMethod, label: formData.monetizationMethod }], formData.monetizationMethod)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Monetização global</p>
            <p className="text-white">{getOptionLabel([{ value: formData.globalMonetization, label: formData.globalMonetization }], formData.globalMonetization)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Estratégia para produtos digitais</p>
            <p className="text-white">{formData.digitalProductStrategy ? 'Sim' : 'Não'}</p>
          </div>
          
          {formData.digitalProductStrategy && formData.digitalProductType.length > 0 && (
            <div>
              <p className="text-sm text-gray-400">Tipos de produtos digitais</p>
              <p className="text-white">{formData.digitalProductType.join(', ')}</p>
            </div>
          )}
          
          <div>
            <p className="text-sm text-gray-400">Como nos conheceu</p>
            <p className="text-white">{getOptionLabel([{ value: formData.referralSource, label: formData.referralSource }], formData.referralSource)}</p>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-gray-400">
        Por favor, verifique se todas as informações estão corretas antes de finalizar. 
        Você poderá editar seu perfil posteriormente no painel de controle.
      </p>
    </div>
  );
};

export default ReviewStep;
