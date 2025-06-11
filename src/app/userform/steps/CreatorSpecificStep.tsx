import React from 'react';
import { FormField, SelectInput } from '../components';
import { creatorExperienceLevelOptions } from '../types';

interface CreatorSpecificStepProps {
  formData: {
    creatorExperienceLevel: string | undefined;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const CreatorSpecificStep: React.FC<CreatorSpecificStepProps> = ({ formData, handleChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium text-white mb-6">Informações específicas para UGC Creators</h2>
      
      <div className="space-y-6">
        <FormField label="Nível de experiência como creator" required>
          <SelectInput
            id="creatorExperienceLevel"
            name="creatorExperienceLevel"
            value={formData.creatorExperienceLevel || ''}
            onChange={handleChange}
            options={creatorExperienceLevelOptions}
            placeholder="Selecione seu nível de experiência"
            required
          />
        </FormField>
      </div>
    </div>
  );
};

export default CreatorSpecificStep;
