"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { EmailIcon, LockIcon, AlertIcon } from '@/components/ui/Icons';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (authError) throw authError;
      if (data.session) {
        router.push('/dashboard');
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
              Entre na sua conta
            </h2>
            <p className="mt-3 text-base text-gray-400 max-w-sm mx-auto">
              Acesse sua conta para gerenciar seus produtos digitais
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
                    placeholder="seu@email.com"
                    disabled={loading}
                    label="Email"
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
                    placeholder="••••••••"
                    disabled={loading}
                    label="Senha"
                    leftIcon={<LockIcon />}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Checkbox
                    id="remember-me"
                    name="remember-me"
                    label="Lembrar-me"
                  />

                  <div className="text-sm">
                    <a href="#" className="font-medium text-primary-400 hover:text-primary-300 transition-colors">
                      Esqueceu a senha?
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
                    {loading ? "Entrando..." : "Entrar"}
                  </Button>
                </div>
              </form>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-400">
                Não tem uma conta?{' '}
                <Link
                  href="/auth/register"
                  className="font-medium text-primary-400 hover:text-primary-300 transition-colors"
                >
                  Registre-se agora
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}
