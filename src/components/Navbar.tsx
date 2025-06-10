"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/supabaseClient';
import { useTheme } from './ThemeProvider';

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/auth/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="bg-dark-700 shadow-lg border-b border-dark-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                {/* Usando um div com fundo escuro para o logo branco ficar visível em modo claro */}
                <div className="bg-primary-900 p-1 rounded-md mr-2">
                  <Image 
                    src="/assets/logo-branca.png" 
                    alt="Umporcento Logo" 
                    width={32} 
                    height={32} 
                  />
                </div>
                <span className="font-gotham-black text-xl text-white">Um<span className="font-gotham-thin">porcento</span></span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className="border-transparent text-gray-300 hover:border-primary-500 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-exobyte transition-colors"
              >
                Home
              </Link>
              <Link
                href="/features"
                className="border-transparent text-gray-300 hover:border-primary-500 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-exobyte transition-colors"
              >
                Recursos
              </Link>
              <Link
                href="/pricing"
                className="border-transparent text-gray-300 hover:border-primary-500 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-exobyte transition-colors"
              >
                Preços
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-300 hover:bg-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
            <Link
              href="/auth/login"
              className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-exobyte text-white bg-primary-500 hover:bg-primary-600 focus:ring-2 focus:ring-primary-300 dark:focus:ring-primary-800 focus:outline-none transition-colors"
            >
              Entrar
            </Link>
            <Link
              href="/auth/register"
              className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-primary-500 rounded-md shadow-sm text-base font-exobyte text-primary-400 bg-dark-700 hover:bg-dark-600 focus:ring-2 focus:ring-primary-800 focus:outline-none transition-colors"
            >
              Cadastrar
            </Link>
            <button
              onClick={handleLogout}
              className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-exobyte text-white bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-300 dark:focus:ring-red-800 focus:outline-none transition-colors"
            >
              Sair
            </button>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden bg-dark-700 border-t border-dark-600">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-exobyte text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-600 hover:border-primary-500 hover:text-primary-900 dark:hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/features"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-exobyte text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-600 hover:border-primary-500 hover:text-primary-900 dark:hover:text-white transition-colors"
            >
              Recursos
            </Link>
            <Link
              href="/pricing"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-exobyte text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-600 hover:border-primary-500 hover:text-primary-900 dark:hover:text-white transition-colors"
            >
              Preços
            </Link>
            <div className="flex items-center pl-3 pr-4 py-2">
              <span className="text-base font-exobyte text-gray-300 mr-2">Tema:</span>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-300 hover:bg-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-label="Alternar tema"
              >
                {theme === 'dark' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </button>
            </div>
            <Link
              href="/auth/login"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-exobyte text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-600 hover:border-primary-500 hover:text-primary-900 dark:hover:text-white transition-colors"
            >
              Entrar
            </Link>
            <Link
              href="/auth/register"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-exobyte text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-600 hover:border-primary-500 hover:text-primary-900 dark:hover:text-white transition-colors"
            >
              Cadastrar
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-exobyte text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-600 hover:border-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
