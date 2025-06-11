import React from 'react';
import { FormField, SelectInput } from '../components';
import { globalSellingExperienceOptions } from '../types';

interface AssociateSpecificStepProps {
  formData: {
    globalSellingExperience: string | undefined;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const AssociateSpecificStep: React.FC<AssociateSpecificStepProps> = ({ formData, handleChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium text-white mb-6">Informações específicas para Associates</h2>
      
      <div className="space-y-6">
        <FormField label="Experiência como vendedor global" required>
          <SelectInput
            id="globalSellingExperience"
            name="globalSellingExperience"
            value={formData.globalSellingExperience || ''}
            onChange={handleChange}
            options={globalSellingExperienceOptions}
            placeholder="Selecione seu nível de experiência"
            required
          />
        </FormField>
      </div>
    </div>
  );
};

export default AssociateSpecificStep;
