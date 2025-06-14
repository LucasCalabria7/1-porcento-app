import React from 'react';
import { FormField, SelectInput } from '../components';
import { creatorExperienceLevelOptions } from '../types';
import { useTranslations } from 'next-intl';

interface CreatorSpecificStepProps {
  formData: {
    creatorExperienceLevel: string | undefined;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const CreatorSpecificStep: React.FC<CreatorSpecificStepProps> = ({ formData, handleChange }) => {
  const t = useTranslations('userform');
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium text-white mb-6">{t('steps.creatorSpecific.title')}</h2>
      
      <div className="space-y-6">
        <FormField label={t('steps.creatorSpecific.fields.creatorExperienceLevel.label')} required>
          <SelectInput
            id="creatorExperienceLevel"
            name="creatorExperienceLevel"
            value={formData.creatorExperienceLevel || ''}
            onChange={handleChange}
            options={creatorExperienceLevelOptions}
            placeholder={t('steps.creatorSpecific.fields.creatorExperienceLevel.placeholder')}
            required
          />
        </FormField>
      </div>
    </div>
  );
};

export default CreatorSpecificStep;
