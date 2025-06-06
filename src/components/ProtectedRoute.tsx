"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from '@/lib/supabaseClient';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentSession = await getSession();
        if (currentSession) {
          setSession(currentSession);
          setLoading(false);
        } else {
          setSession(null);
          setLoading(false);
          router.push('/login');
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        setSession(null);
        setLoading(false);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  return <>{children}</>;
}
