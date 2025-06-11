import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {
  // Criar cliente do Supabase para o middleware
  const res = NextResponse.next();
  
  // Criar cliente Supabase usando o novo método do @supabase/ssr
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => request.cookies.get(name)?.value,
        set: (name, value, options) => {
          res.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove: (name, options) => {
          res.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );
  
  // Verificar se a rota é administrativa
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  
  if (isAdminRoute) {
    // Verificar se o usuário está autenticado
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      // Usuário não autenticado, redirecionar para login
      const redirectUrl = new URL('/auth/login', request.url);
      redirectUrl.searchParams.set('redirect', request.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }
    
    // Verificar se o usuário tem permissão de administrador
    // Verificar nos metadados do usuário
    const isAdmin = session.user.user_metadata?.is_admin === true;
    
    if (!isAdmin) {
      // Se não encontrou nos metadados, verificar na tabela de perfis
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('user_id', session.user.id)
        .single();
      
      // Se não for administrador em nenhum dos lugares, redirecionar
      if (!profile || !profile.is_admin) {
        // Usuário não é administrador, redirecionar para o dashboard
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }
  }
  
  return res;
}

// Configurar quais rotas o middleware deve processar
export const config = {
  matcher: [
    // Aplicar a todas as rotas administrativas
    '/admin/:path*',
  ],
};
