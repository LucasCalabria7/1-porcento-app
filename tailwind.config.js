/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    // Cores e gradientes
    'bg-gradient-to-r', 'from-blue-500', 'to-blue-700', 'from-blue-600', 'to-blue-800',
    'from-primary-500', 'to-primary-700', 'from-primary-600', 'to-primary-800',
    'from-red-500', 'to-red-700', 'hover:from-red-600', 'hover:to-red-800',
    
    // Sombras
    'shadow-lg', 'shadow-blue-700/30', 'hover:shadow-blue-700/50',
    'shadow-primary-700/30', 'hover:shadow-primary-700/50',
    'shadow-red-700/30', 'hover:shadow-red-700/50',
    
    // Bordas e foco
    'focus:ring-2', 'focus:ring-offset-2', 'focus:outline-none',
    'focus:ring-blue-500', 'focus:ring-primary-500', 'focus:ring-red-500',
    'focus:ring-dark-500', 'focus:ring-offset-gray-900', 'focus:ring-offset-dark-900',
    'border-blue-500', 'border-primary-500', 'border-dark-600', 'border-gray-600',
    'hover:border-dark-500',
    
    // Texto e fundo
    'text-blue-400', 'text-primary-400', 'text-primary-300',
    'hover:text-blue-300', 'hover:text-primary-300',
    'bg-dark-700', 'bg-gray-700', 'bg-gray-800', 'bg-dark-800/80',
    'hover:bg-dark-600', 'hover:bg-gray-700', 'hover:bg-primary-500/10',
    
    // Layout e espaçamento
    'w-full', 'h-12', 'px-6', 'py-3', 'rounded-lg', 'rounded-md',
    'inline-flex', 'items-center', 'justify-center',
    
    // Estados
    'disabled:opacity-70', 'disabled:cursor-not-allowed',
    'transition-all', 'duration-200', 'transition-colors',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#e6e9fb',
          200: '#c4ccf5',
          300: '#8f9eec',
          400: '#6c80e7',
          500: '#576ced', // Primary color
          600: '#3a53e8',
          700: '#2642e5',
          800: '#1531e2',
          900: '#0321d6', // Secondary color
        },
        secondary: {
          900: '#051473', // Tertiary color
        },
        dark: {
          100: '#d1d2d8',
          200: '#a3a5b1',
          300: '#76798a',
          400: '#484c63',
          500: '#1a1f3c',
          600: '#151930',
          700: '#101424',
          800: '#0a0e18',
          900: '#05070c',
        },
      },
      fontFamily: {
        'exobyte': ['var(--font-exo2)', 'Exo 2', 'sans-serif'],
        'gotham-thin': ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
        'gotham-black': ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
        'sans': ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
