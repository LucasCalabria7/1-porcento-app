import React, { useState } from 'react';
import { FormField, TextInput, SelectInput, DateInput } from '../components';
import { countryOptions, languageOptions, countryCodeOptions } from '../types';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('userform');
  
  // Calcular a data máxima para ser maior de idade (18 anos atrás)
  const today = new Date();
  const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()).toISOString().split('T')[0];
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium text-white mb-6">{t('steps.basicInfo.title')}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label={t('steps.basicInfo.fields.fullName.label')} required>
          <TextInput
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder={t('steps.basicInfo.fields.fullName.placeholder')}
            required
          />
        </FormField>
        
        <FormField label={t('steps.basicInfo.fields.email.label')} required>
          <TextInput
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t('steps.basicInfo.fields.email.placeholder')}
            required
            disabled={true} // Email já vem do cadastro
          />
        </FormField>
        
        <FormField label={t('steps.basicInfo.fields.phoneNumber.label')} required>
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
                placeholder={t('steps.basicInfo.fields.phoneNumber.placeholder')}
                required
              />
            </div>
          </div>
        </FormField>
        
        <FormField label={t('steps.basicInfo.fields.country.label')} required>
          <SelectInput
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            options={countryOptions}
            placeholder={t('steps.basicInfo.fields.country.placeholder')}
            required
          />
        </FormField>
        
        <FormField label={t('steps.basicInfo.fields.birthDate.label')} required hint={t('steps.basicInfo.fields.birthDate.hint')}>
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
          label={formData.country === 'BR' ? t('steps.basicInfo.fields.document.labelBR') : t('steps.basicInfo.fields.document.label')} 
          required={formData.country === 'BR'}
          hint={formData.country === 'BR' ? t('steps.basicInfo.fields.document.hintBR') : t('steps.basicInfo.fields.document.hint')}
        >
          <TextInput
            id="document"
            name="document"
            value={formData.document}
            onChange={handleChange}
            placeholder={formData.country === 'BR' ? t('steps.basicInfo.fields.document.placeholderBR') : t('steps.basicInfo.fields.document.placeholder')}
            required={formData.country === 'BR'}
          />
        </FormField>
        
        <FormField label={t('steps.basicInfo.fields.address.label')} required>
          <TextInput
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder={formData.country === 'BR' ? t('steps.basicInfo.fields.address.placeholderBR') : t('steps.basicInfo.fields.address.placeholder')}
            required
          />
        </FormField>
        
        <FormField label={t('steps.basicInfo.fields.language.label')} required>
          <SelectInput
            id="language"
            name="language"
            value={formData.language}
            onChange={handleChange}
            options={languageOptions}
            placeholder={t('steps.basicInfo.fields.language.placeholder')}
            required
          />
        </FormField>
      </div>
    </div>
  );
};

export default BasicInfoStep;
