"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function ExamplePage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simular um carregamento
    setTimeout(() => {
      setIsLoading(false);
      alert(`Email enviado: ${email}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-gray-800 p-8 rounded-xl shadow-xl">
        <div>
          <h1 className="text-3xl font-bold text-white text-center">Exemplo de Componentes</h1>
          <p className="mt-2 text-center text-gray-400">Testando estilização com Tailwind CSS</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Input Estilizado */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
                placeholder="seu@email.com"
                required
              />
            </div>
          </div>

          {/* Botão Primário */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full inline-flex items-center justify-center rounded-lg text-sm font-medium h-12 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 shadow-lg shadow-blue-700/30 hover:shadow-blue-700/50 focus:ring-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              Enviar
            </button>
          </div>

          {/* Botão Secundário */}
          <div>
            <button
              type="button"
              className="relative w-full inline-flex items-center justify-center rounded-lg text-sm font-medium h-12 px-6 py-3 border border-blue-500 text-blue-400 bg-transparent hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md"
            >
              Botão Secundário
            </button>
          </div>

          {/* Checkbox */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
              />
            </div>
            <div className="ml-3">
              <label htmlFor="terms" className="text-sm text-gray-400">
                Eu concordo com os{' '}
                <Link href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Termos de Serviço
                </Link>
              </label>
            </div>
          </div>
        </form>

        <div className="mt-6 text-center">
          <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
