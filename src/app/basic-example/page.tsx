"use client";

import React from 'react';
import Link from 'next/link';

export default function BasicExamplePage() {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-md mx-auto bg-gray-800 rounded-xl p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-white mb-4">Exemplo Básico</h1>
        <p className="text-gray-300 mb-6">
          Esta página usa classes básicas do Tailwind para testar se a estilização está funcionando.
        </p>
        
        <div className="space-y-4">
          {/* Botão azul */}
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded">
            Botão Azul
          </button>
          
          {/* Botão com borda */}
          <button className="w-full border border-blue-500 text-blue-400 hover:bg-gray-700 font-medium py-2 px-4 rounded">
            Botão com Borda
          </button>
          
          {/* Input básico */}
          <input 
            type="text" 
            placeholder="Input básico"
            className="w-full bg-gray-700 border border-gray-600 text-white rounded px-4 py-2"
          />
          
          {/* Checkbox básico */}
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="check" 
              className="h-4 w-4 text-blue-500 rounded"
            />
            <label htmlFor="check" className="ml-2 text-gray-300">
              Checkbox básico
            </label>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <Link href="/" className="text-blue-400 hover:text-blue-300">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
