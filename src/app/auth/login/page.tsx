"use client";
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { supabase, signInWithGoogle } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { EmailIcon, LockIcon, AlertIcon } from '@/components/ui/Icons';
import { GoogleButton } from '@/components/ui';
import { useTranslations } from 'next-intl';

// Componente interno que usa useSearchParams
function LoginContent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true); // Ativado por padrão
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations('auth.login');
  
  // Verificar se há erros na URL
  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      if (errorParam === 'auth-callback-failed') {
        setError(t('errors.authFailed'));
      } else if (errorParam === 'auth-callback-error') {
        setError(t('errors.authError'));
      }
    }
  }, [searchParams, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Configurar opções de persistência baseadas na escolha do usuário
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      // Após o login bem-sucedido, definir a duração da sessão
      if (!authError && data.session) {
        // Armazenar a preferência do usuário
        if (typeof window !== 'undefined') {
          localStorage.setItem('rememberMe', rememberMe ? 'true' : 'false');
        }
      }
      
      if (authError) throw authError;
      if (data.session) {
        console.log('Login bem-sucedido, redirecionando para dashboard');
        console.log(`Sessão configurada para ${rememberMe ? 'persistir por 30 dias' : 'expirar em 1 hora'}`);
        
        // Salvar preferência do usuário no localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('rememberMe', rememberMe ? 'true' : 'false');
        }
        
        // Garantir que o redirecionamento aconteça
        setTimeout(() => {
          router.push('/dashboard');
        }, 100);
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error instanceof Error ? error.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setIsGoogleLoading(true);
      
      // Verificar se estamos em um ambiente de navegador
      if (typeof window === 'undefined') {
        throw new Error('Google login não está disponível neste ambiente');
      }
      
      // Salvar preferência do usuário no localStorage antes do redirecionamento OAuth
      localStorage.setItem('rememberMe', rememberMe ? 'true' : 'false');
      
      // Passar a opção de persistência para o login com Google
      await signInWithGoogle(rememberMe);
      // O redirecionamento será tratado pelo OAuth e pela página de callback
    } catch (error) {
      console.error('Google login error:', error);
      setError(error instanceof Error ? error.message : t('errors.googleError'));
      setIsGoogleLoading(false);
    }
  };

  return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-dark-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-primary-700 mb-6 shadow-lg shadow-primary-900/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
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
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-5">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('emailPlaceholder')}
                    disabled={loading}
                    label={t('emailLabel')}
                    leftIcon={<EmailIcon />}
                  />
                  
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('passwordPlaceholder')}
                    disabled={loading}
                    label={t('passwordLabel')}
                    leftIcon={<LockIcon />}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Checkbox
                    id="remember-me"
                    name="remember-me"
                    label={t('rememberMe')}
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />

                  <div className="text-sm">
                    <a href="#" className="font-medium text-primary-400 hover:text-primary-300 transition-colors">
                      {t('forgotPassword')}
                    </a>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    fullWidth
                    size="lg"
                    variant="primary"
                    disabled={loading}
                    isLoading={loading}
                    leftIcon={!loading ? <LockIcon className="text-primary-300" /> : undefined}
                  >
                    {loading ? t('loggingIn') : t('loginButton')}
                  </Button>
                </div>
              </form>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-400">
                {t('noAccount')}{' '}
                <Link
                  href="/auth/register"
                  className="font-medium text-primary-400 hover:text-primary-300 transition-colors"
                >
                  {t('registerNow')}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}

// Componente principal que usa Suspense
export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
    </div>}>
      <LoginContent />
    </Suspense>
  );
}
