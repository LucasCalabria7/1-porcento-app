import React from 'react';
import { FormField, SelectInput, CheckboxInput, CheckboxGroup, RadioGroup } from '../components';
import { 
  monetizationMethodOptions, 
  globalMonetizationOptions, 
  digitalProductTypeOptions,
  referralSourceOptions
} from '../types';
import { useTranslations } from 'next-intl';

interface MonetizationStepProps {
  formData: {
    monetizationMethod: string;
    globalMonetization: string;
    digitalProductStrategy: boolean;
    digitalProductType: string[];
    referralSource: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleCheckboxChange: (name: string, checked: boolean) => void;
  handleMultiCheckboxChange: (value: string) => void;
}

const MonetizationStep: React.FC<MonetizationStepProps> = ({ 
  formData, 
  handleChange, 
  handleCheckboxChange,
  handleMultiCheckboxChange
}) => {
  const t = useTranslations('userform');
  
  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3 mb-2">
        <div className="bg-gradient-to-r from-primary-500 to-primary-700 p-2 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white">{t('steps.monetization.title')}</h2>
      </div>
      <p className="text-gray-400 mb-6">{t('steps.monetization.description')}</p>
      
      <div className="bg-dark-600 rounded-xl p-6 mb-6 border border-dark-500 shadow-lg">
        <h3 className="text-lg font-medium text-white mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          {t('steps.monetization.sections.methods')}
        </h3>
        
        <FormField label={t('steps.monetization.fields.monetizationMethod.label')} required>
          <div className="bg-dark-700 p-4 rounded-lg">
            <RadioGroup
              options={monetizationMethodOptions}
              selectedValue={formData.monetizationMethod}
              onChange={(e) => handleChange(e)}
              name="monetizationMethod"
            />
          </div>
        </FormField>
        
        <FormField label={t('steps.monetization.fields.globalMonetization.label')} required>
          <div className="bg-dark-700 p-4 rounded-lg">
            <RadioGroup
              options={globalMonetizationOptions}
              selectedValue={formData.globalMonetization}
              onChange={(e) => handleChange(e)}
              name="globalMonetization"
            />
          </div>
        </FormField>
      </div>
      
      <div className="bg-dark-600 rounded-xl p-6 mb-6 border border-dark-500 shadow-lg">
        <h3 className="text-lg font-medium text-white mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          {t('steps.monetization.sections.digitalProducts')}
        </h3>
        
        <FormField label={t('steps.monetization.fields.digitalProductStrategy.label')} required>
          <div className="bg-dark-700 p-4 rounded-lg">
            <CheckboxInput
              id="digitalProductStrategy"
              name="digitalProductStrategy"
              checked={formData.digitalProductStrategy}
              onChange={(e) => handleCheckboxChange('digitalProductStrategy', e.target.checked)}
              label={t('steps.monetization.fields.digitalProductStrategy.checkboxLabel')}
            />
          </div>
        </FormField>
        
        {formData.digitalProductStrategy && (
          <FormField label={t('steps.monetization.fields.digitalProductType.label')} required>
            <div className="bg-dark-700 p-4 rounded-lg">
              <CheckboxGroup
                options={digitalProductTypeOptions}
                selectedValues={formData.digitalProductType}
                onChange={handleMultiCheckboxChange}
                name="digitalProductType"
              />
            </div>
          </FormField>
        )}
      </div>
      
      <div className="bg-dark-600 rounded-xl p-6 border border-dark-500 shadow-lg">
        <h3 className="text-lg font-medium text-white mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          {t('steps.monetization.sections.referral')}
        </h3>
        
        <FormField label={t('steps.monetization.fields.referralSource.label')} required>
          <div className="bg-dark-700 p-4 rounded-lg">
            <SelectInput
              id="referralSource"
              name="referralSource"
              value={formData.referralSource}
              onChange={handleChange}
              options={referralSourceOptions}
              placeholder={t('steps.monetization.fields.referralSource.placeholder')}
              required
            />
          </div>
        </FormField>
      </div>
    </div>
  );
};

export default MonetizationStep;
