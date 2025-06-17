"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/layouts/DashboardLayout';
import { supabase } from '@/lib/supabaseClient';
import ProductsContent from '@/components/products/ProductsContent';

export default function ProductsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          console.log('Sem sessão. Redirecionando para login...');
          router.push('/auth/login');
          return;
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  return (
    <DashboardLayout>
      <ProductsContent />
    </DashboardLayout>
  );
}
