import { useTranslations } from 'next-intl';

/**
 * Custom hook to use translations throughout the application
 * This provides a consistent way to access translations and can be extended
 * with additional functionality as needed
 */
export function useAppTranslations() {
  const t = useTranslations();
  
  return {
    t,
    // Add any additional translation-related functionality here
  };
}
