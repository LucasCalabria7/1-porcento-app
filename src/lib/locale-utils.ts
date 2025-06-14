import { NextRequest } from 'next/server';

// Mapping of country codes to locales
const countryToLocaleMap: Record<string, string> = {
  // Portuguese-speaking countries
  BR: 'pt-BR',
  PT: 'pt-BR',
  AO: 'pt-BR',
  MZ: 'pt-BR',
  
  // Spanish-speaking countries
  ES: 'es',
  MX: 'es',
  AR: 'es',
  CO: 'es',
  CL: 'es',
  PE: 'es',
  VE: 'es',
  EC: 'es',
  GT: 'es',
  CU: 'es',
  BO: 'es',
  DO: 'es',
  HN: 'es',
  PY: 'es',
  SV: 'es',
  NI: 'es',
  CR: 'es',
  PA: 'es',
  UY: 'es',
  
  // Default to English for other countries
};

// Default locale if we can't determine the user's locale
export const defaultLocale = 'pt-BR';

// Supported locales
export const supportedLocales = ['pt-BR', 'en', 'es'];

/**
 * Detects the user's locale based on their IP address or cookie
 */
export function detectLocale(request: NextRequest): string {
  // First check if the user has a locale cookie
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && supportedLocales.includes(cookieLocale)) {
    return cookieLocale;
  }
  
  // Try to detect locale from IP
  const country = request.geo?.country || '';
  
  if (country && countryToLocaleMap[country]) {
    return countryToLocaleMap[country];
  }
  
  // If we can't determine the locale, use the default
  return defaultLocale;
}
