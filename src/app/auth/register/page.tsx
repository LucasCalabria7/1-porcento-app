"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { Button, Input, Checkbox, EmailIcon, LockIcon, UserIcon, AlertIcon, PlusIcon } from '@/components/ui';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (authError) throw authError;

      router.push('/dashboard');
    } catch (error) {
      setError('Error creating account');
    }
  };

  return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-dark-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-primary-700 mb-6 shadow-lg shadow-primary-900/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h2 className="text-3xl font-extrabold text-white font-gotham-black">
              Crie sua conta
            </h2>
            <p className="mt-3 text-base text-gray-400 max-w-sm mx-auto">
              Comece a vender seus produtos digitais hoje mesmo
            </p>
          </div>
          
          <div className="mt-10">
            <div className="bg-dark-700/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-dark-600/50">
              {error && (
                <div className="mb-6 rounded-lg bg-red-500/10 p-4 border border-red-500/30">
                  <div className="flex">
                    <AlertIcon className="h-5 w-5 text-red-400 mr-3 mt-0.5" />
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-5">
                  <div className="relative w-full">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Nome Completo
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserIcon className="h-5 w-5 text-gray-500" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-dark-600 rounded-lg bg-dark-800/80 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-sm"
                        placeholder="Seu nome completo"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="relative w-full">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <EmailIcon className="h-5 w-5 text-gray-500" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-dark-600 rounded-lg bg-dark-800/80 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-sm"
                        placeholder="seu@email.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="relative w-full">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                      Senha
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LockIcon className="h-5 w-5 text-gray-500" />
                      </div>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-dark-600 rounded-lg bg-dark-800/80 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-sm"
                        placeholder="Sua senha"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="relative w-full">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                      Confirmar Senha
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LockIcon className="h-5 w-5 text-gray-500" />
                      </div>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`block w-full pl-10 pr-3 py-3 border ${error && error.includes('Passwords') ? 'border-red-500' : 'border-dark-600'} rounded-lg bg-dark-800/80 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-sm`}
                        placeholder="Confirme sua senha"
                        required
                      />
                    </div>
                    {error && error.includes('Passwords') && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <AlertIcon className="h-4 w-4 mr-1" />
                        {error}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="h-4 w-4 rounded border-dark-600 bg-dark-800 text-primary-500 focus:ring-primary-500 focus:ring-offset-dark-900"
                      required
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="terms" className="text-sm text-gray-400">
                      Eu concordo com os{' '}
                      <Link href="/terms" className="text-primary-400 hover:text-primary-300 transition-colors">
                        Termos de Serviço
                      </Link>{' '}
                      e{' '}
                      <Link href="/privacy" className="text-primary-400 hover:text-primary-300 transition-colors">
                        Política de Privacidade
                      </Link>
                    </label>
                  </div>
                </div>
                
                <div className="pt-2">
                  <button
                    type="submit"
                    className="relative inline-flex w-full items-center justify-center rounded-lg text-sm font-medium h-12 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-700 text-white hover:from-primary-600 hover:to-primary-800 shadow-lg shadow-primary-700/30 hover:shadow-primary-700/50 focus:ring-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200"
                  >
                    <span className="mr-2">
                      <PlusIcon className="h-5 w-5 text-primary-300" />
                    </span>
                    Criar Conta
                  </button>
                </div>
              </form>
              
              <div className="text-center mt-6">
                <p className="text-sm text-gray-400">
                  Já tem uma conta?{' '}
                  <Link href="/auth/login" className="font-medium text-primary-400 hover:text-primary-300 transition-colors">
                    Faça login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
