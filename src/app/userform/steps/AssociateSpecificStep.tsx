import React from 'react';
import { FormField, SelectInput } from '../components';
import { globalSellingExperienceOptions } from '../types';
import { useTranslations } from 'next-intl';

interface AssociateSpecificStepProps {
  formData: {
    globalSellingExperience: string | undefined;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const AssociateSpecificStep: React.FC<AssociateSpecificStepProps> = ({ formData, handleChange }) => {
  const t = useTranslations('userform');
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium text-white mb-6">{t('steps.associateSpecific.title')}</h2>
      
      <div className="space-y-6">
        <FormField label={t('steps.associateSpecific.fields.globalSellingExperience.label')} required>
          <SelectInput
            id="globalSellingExperience"
            name="globalSellingExperience"
            value={formData.globalSellingExperience || ''}
            onChange={handleChange}
            options={globalSellingExperienceOptions}
            placeholder={t('steps.associateSpecific.fields.globalSellingExperience.placeholder')}
            required
          />
        </FormField>
      </div>
    </div>
  );
};

export default AssociateSpecificStep;
