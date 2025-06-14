import React from 'react';
import { FormField, SelectInput } from '../components';
import { companyRevenueOptions } from '../types';
import { useTranslations } from 'next-intl';

interface CEOSpecificStepProps {
  formData: {
    companyRevenue: string | undefined;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const CEOSpecificStep: React.FC<CEOSpecificStepProps> = ({ formData, handleChange }) => {
  const t = useTranslations('userform');
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium text-white mb-6">{t('steps.ceoSpecific.title')}</h2>
      
      <div className="space-y-6">
        <FormField label={t('steps.ceoSpecific.fields.companyRevenue.label')} required>
          <SelectInput
            id="companyRevenue"
            name="companyRevenue"
            value={formData.companyRevenue || ''}
            onChange={handleChange}
            options={companyRevenueOptions}
            placeholder={t('steps.ceoSpecific.fields.companyRevenue.placeholder')}
            required
          />
        </FormField>
      </div>
    </div>
  );
};

export default CEOSpecificStep;
