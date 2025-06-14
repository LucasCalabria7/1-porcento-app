"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase, signInWithGoogle } from '@/lib/supabaseClient';
import { Button, Input, Checkbox, EmailIcon, LockIcon, UserIcon, AlertIcon, PlusIcon, GoogleButton } from '@/components/ui';
import { useTranslations } from 'next-intl';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();
  const t = useTranslations('auth.register');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError(t('errors.passwordsNotMatch'));
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
      setError(t('errors.accountCreation'));
    }
  };
  
  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setIsGoogleLoading(true);
      await signInWithGoogle();
      // O redirecionamento será tratado pelo OAuth e pela página de callback
    } catch (error) {
      console.error('Google sign in error:', error);
      setError(t('errors.googleError'));
      setIsGoogleLoading(false);
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
              {t('pageTitle')}
            </h2>
            <p className="mt-3 text-base text-gray-400 max-w-sm mx-auto">
              {t('pageDescription')}
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
              
              <div className="mb-6">                
                <GoogleButton 
                  onClick={handleGoogleSignIn} 
                  isLoading={isGoogleLoading} 
                  text={t('googleButton')} 
                />
              </div>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-dark-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-dark-700/50 text-gray-400">{t('orContinueWithEmail')}</span>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-5">
                  <div className="relative w-full">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      {t('nameLabel')}
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
                        placeholder={t('namePlaceholder')}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="relative w-full">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      {t('emailLabel')}
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
                        placeholder={t('emailPlaceholder')}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="relative w-full">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                      {t('passwordLabel')}
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
                        placeholder={t('passwordPlaceholder')}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="relative w-full">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                      {t('confirmPasswordLabel')}
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
                        placeholder={t('confirmPasswordPlaceholder')}
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
                      {t('termsText')}{' '}
                      <Link href="/terms" className="text-primary-400 hover:text-primary-300 transition-colors">
                        {t('termsLink')}
                      </Link>{' '}
                      {t('andText')}{' '}
                      <Link href="/privacy" className="text-primary-400 hover:text-primary-300 transition-colors">
                        {t('privacyLink')}
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
                    {t('createAccountButton')}
                  </button>
                </div>
              </form>
              
              <div className="text-center mt-6">
                <p className="text-sm text-gray-400">
                  {t('haveAccount')}{' '}
                  <Link href="/auth/login" className="font-medium text-primary-400 hover:text-primary-300 transition-colors">
                    {t('loginLink')}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
