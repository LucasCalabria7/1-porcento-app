"use client"

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Fallback para sessão local
const getLocalSession = () => {
  try {
    const session = localStorage.getItem('supabase.auth.token')
    if (session) return JSON.parse(session)
    return null
  } catch (error) {
    console.error('Error getting local session:', error)
    return null
  }
}

// Salvar sessão local
export const saveLocalSession = (session: any) => {
  try {
    localStorage.setItem('supabase.auth.token', JSON.stringify(session))
  } catch (error) {
    console.error('Error saving local session:', error)
  }
}

// Remover sessão local
const clearLocalSession = () => {
  try {
    localStorage.removeItem('supabase.auth.token')
  } catch (error) {
    console.error('Error clearing local session:', error)
  }
}

// Criar cliente com configuração simplificada
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    flowType: 'pkce'
  },
})

// Adicionando listener para mudanças de sessão
supabase.auth.onAuthStateChange((_event, session) => {
  if (session) {
    saveLocalSession(session)
  } else {
    clearLocalSession()
  }
})

// Função de login com fallback
export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    if (data.session) {
      saveLocalSession(data.session)
      return data.session
    }

    throw new Error('No session returned')
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
}

// Função de logout com fallback
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    clearLocalSession()
  } catch (error) {
    console.error('Logout error:', error)
    throw error
  }
}

// Função de autenticação com Google
export const signInWithGoogle = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      }
    })
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Google login error:', error)
    throw error
  }
}

// Verificar sessão com fallback
export const getSession = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) return session
    
    // Se não há sessão no Supabase, tenta usar a sessão local
    const localSession = getLocalSession()
    if (localSession) return localSession

    return null
  } catch (error) {
    console.error('Get session error:', error)
    return null
  }
}
