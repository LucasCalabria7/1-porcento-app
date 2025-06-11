import React from 'react';
import { SelectOption } from './types';

// Componente de barra de progresso
export const ProgressBar = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
  const progress = Math.round((currentStep / totalSteps) * 100);
  
  return (
    <div className="w-full">
      <div className="flex justify-between mb-1 text-xs text-gray-400">
        <span>{progress}% Completo</span>
        <span>Etapa {currentStep} de {totalSteps}</span>
      </div>
      <div className="w-full bg-dark-600 rounded-full h-2.5">
        <div 
          className="bg-gradient-to-r from-primary-500 to-primary-700 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

// Componente de opção de perfil
export const ProfileOption = ({ 
  title, 
  description, 
  icon, 
  selected, 
  onClick 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  selected: boolean; 
  onClick: () => void;
}) => {
  return (
    <div 
      className={`p-6 rounded-xl border ${selected ? 'border-primary-500 bg-primary-500/10' : 'border-dark-600 bg-dark-700/50'} cursor-pointer transition-all duration-200 hover:border-primary-400 hover:bg-dark-700/80`}
      onClick={onClick}
    >
      <div className="flex items-start">
        <div className={`p-3 rounded-lg ${selected ? 'bg-primary-500' : 'bg-dark-600'} mr-4`}>
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-medium text-white mb-1">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
        <div className="ml-auto">
          <div className={`w-5 h-5 rounded-full border-2 ${selected ? 'border-primary-500 bg-primary-500' : 'border-gray-500'} flex items-center justify-center`}>
            {selected && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente de campo de entrada
export const FormField = ({ 
  label, 
  children, 
  required = false,
  hint
}: { 
  label: string; 
  children: React.ReactNode;
  required?: boolean;
  hint?: string;
}) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-gray-400">{hint}</p>}
    </div>
  );
};

// Componente de entrada de texto
export const TextInput = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
  disabled = false,
  maxLength,
  pattern,
}: {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  pattern?: string;
}) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      maxLength={maxLength}
      pattern={pattern}
      className="w-full px-4 py-3 rounded-lg bg-dark-600 border border-dark-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
    />
  );
};

// Componente de seleção
export const SelectInput = ({
  id,
  name,
  value,
  onChange,
  options,
  placeholder,
  required = false,
  disabled = false,
}: {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}) => {
  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      className="w-full px-4 py-3 rounded-lg bg-dark-600 border border-dark-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

// Componente de checkbox
export const CheckboxInput = ({
  id,
  name,
  checked,
  onChange,
  label,
  disabled = false,
}: {
  id: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  disabled?: boolean;
}) => {
  return (
    <div className="flex items-center">
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-500 rounded"
      />
      <label htmlFor={id} className="ml-2 block text-sm text-gray-300">
        {label}
      </label>
    </div>
  );
};

// Componente de checkbox múltiplo
export const CheckboxGroup = ({
  options,
  selectedValues,
  onChange,
  name,
}: {
  options: SelectOption[];
  selectedValues: string[];
  onChange: (value: string) => void;
  name: string;
}) => {
  return (
    <div className="space-y-2">
      {options.map((option) => (
        <div key={option.value} className="flex items-center">
          <input
            id={`${name}-${option.value}`}
            name={name}
            type="checkbox"
            value={option.value}
            checked={selectedValues.includes(option.value)}
            onChange={() => onChange(option.value)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-500 rounded"
          />
          <label htmlFor={`${name}-${option.value}`} className="ml-2 block text-sm text-gray-300">
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

// Componente de radio button
export const RadioGroup = ({
  options,
  selectedValue,
  onChange,
  name,
}: {
  options: SelectOption[];
  selectedValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}) => {
  return (
    <div className="space-y-2">
      {options.map((option) => (
        <div key={option.value} className="flex items-center">
          <input
            id={`${name}-${option.value}`}
            name={name}
            type="radio"
            value={option.value}
            checked={selectedValue === option.value}
            onChange={onChange}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-500"
          />
          <label htmlFor={`${name}-${option.value}`} className="ml-2 block text-sm text-gray-300">
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

// Componente de data
export const DateInput = ({
  id,
  name,
  value,
  onChange,
  required = false,
  disabled = false,
  max,
  min,
}: {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  max?: string;
  min?: string;
}) => {
  return (
    <input
      id={id}
      name={name}
      type="date"
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      max={max}
      min={min}
      className="w-full px-4 py-3 rounded-lg bg-dark-600 border border-dark-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
    />
  );
};

// Ícones para as opções de perfil
export const CEOIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

export const AssociateIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

export const CreatorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);
