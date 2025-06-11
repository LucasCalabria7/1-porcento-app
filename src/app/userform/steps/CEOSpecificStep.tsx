import React from 'react';
import { FormField, SelectInput } from '../components';
import { companyRevenueOptions } from '../types';

interface CEOSpecificStepProps {
  formData: {
    companyRevenue: string | undefined;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const CEOSpecificStep: React.FC<CEOSpecificStepProps> = ({ formData, handleChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium text-white mb-6">Informações específicas para CEOs</h2>
      
      <div className="space-y-6">
        <FormField label="Faixa de faturamento mensal da sua empresa" required>
          <SelectInput
            id="companyRevenue"
            name="companyRevenue"
            value={formData.companyRevenue || ''}
            onChange={handleChange}
            options={companyRevenueOptions}
            placeholder="Selecione a faixa de faturamento"
            required
          />
        </FormField>
      </div>
    </div>
  );
};

export default CEOSpecificStep;
