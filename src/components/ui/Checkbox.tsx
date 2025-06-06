"use client";

import React, { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string | React.ReactNode;
  description?: string;
  error?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, error, ...props }, ref) => {
    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            ref={ref}
            className={cn(
              "h-4 w-4 rounded",
              "text-primary-600 focus:ring-primary-500 border-dark-600",
              "transition-colors duration-200",
              error ? "border-red-500" : "",
              className
            )}
            {...props}
          />
        </div>
        
        {(label || description) && (
          <div className="ml-2">
            {label && (
              <label 
                htmlFor={props.id} 
                className={cn(
                  "block text-sm font-medium", 
                  error ? "text-red-400" : "text-gray-400"
                )}
              >
                {label}
              </label>
            )}
            
            {description && (
              <p className="text-xs text-gray-500 mt-0.5">{description}</p>
            )}
            
            {error && (
              <p className="mt-1 text-xs text-red-400">{error}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
