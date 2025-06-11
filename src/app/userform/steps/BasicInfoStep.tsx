import React, { useState } from 'react';
import { FormField, TextInput, SelectInput, DateInput } from '../components';
import { countryOptions, languageOptions, countryCodeOptions } from '../types';

interface BasicInfoStepProps {
  formData: {
    fullName: string;
    email: string;
    phoneNumber: string;
    country: string;
    birthDate: string;
    document: string;
    address: string;
    language: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ formData, handleChange }) => {
  // Calcular a data máxima para ser maior de idade (18 anos atrás)
  const today = new Date();
  const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()).toISOString().split('T')[0];
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium text-white mb-6">Informações Básicas</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Nome completo" required>
          <TextInput
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Seu nome completo"
            required
          />
        </FormField>
        
        <FormField label="Email" required>
          <TextInput
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="seu@email.com"
            required
            disabled={true} // Email já vem do cadastro
          />
        </FormField>
        
        <FormField label="Número de celular" required>
          <div className="flex space-x-2">
            <div className="w-1/3">
              <SelectInput
                id="countryCode"
                name="countryCode"
                value={formData.phoneNumber.split(' ')[0] || '+55'}
                onChange={(e) => {
                  const phoneWithoutCode = formData.phoneNumber.split(' ').slice(1).join(' ');
                  const newPhone = `${e.target.value} ${phoneWithoutCode}`;
                  const syntheticEvent = {
                    target: {
                      name: 'phoneNumber',
                      value: newPhone.trim()
                    }
                  } as React.ChangeEvent<HTMLInputElement>;
                  handleChange(syntheticEvent);
                }}
                options={countryCodeOptions}
                required
              />
            </div>
            <div className="w-2/3">
              <TextInput
                id="phoneNumber"
                name="phoneNumberInput"
                type="tel"
                value={formData.phoneNumber.split(' ').slice(1).join(' ')}
                onChange={(e) => {
                  const code = formData.phoneNumber.split(' ')[0] || '+55';
                  const syntheticEvent = {
                    target: {
                      name: 'phoneNumber',
                      value: `${code} ${e.target.value}`
                    }
                  } as React.ChangeEvent<HTMLInputElement>;
                  handleChange(syntheticEvent);
                }}
                placeholder="(11) 99999-9999"
                required
              />
            </div>
          </div>
        </FormField>
        
        <FormField label="País" required>
          <SelectInput
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            options={countryOptions}
            placeholder="Selecione seu país"
            required
          />
        </FormField>
        
        <FormField label="Data de nascimento" required hint="Você precisa ter pelo menos 18 anos">
          <DateInput
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
            max={maxDate}
          />
        </FormField>
        
        <FormField 
          label={formData.country === 'BR' ? "CPF ou CNPJ" : "Documento de identificação"} 
          required={formData.country === 'BR'}
          hint={formData.country === 'BR' ? "Apenas números" : "Opcional para outros países"}
        >
          <TextInput
            id="document"
            name="document"
            value={formData.document}
            onChange={handleChange}
            placeholder={formData.country === 'BR' ? "CPF ou CNPJ (apenas números)" : "Número do documento"}
            required={formData.country === 'BR'}
          />
        </FormField>
        
        <FormField label="Endereço" required>
          <TextInput
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder={formData.country === 'BR' ? "CEP, Rua, Número, Complemento" : "Endereço completo"}
            required
          />
        </FormField>
        
        <FormField label="Idioma preferido" required>
          <SelectInput
            id="language"
            name="language"
            value={formData.language}
            onChange={handleChange}
            options={languageOptions}
            placeholder="Selecione seu idioma preferido"
            required
          />
        </FormField>
      </div>
    </div>
  );
};

export default BasicInfoStep;
