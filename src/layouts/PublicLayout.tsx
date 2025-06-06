"use client";

import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  const pathname = usePathname();
  
  return (
    <div className="flex flex-col min-h-screen bg-dark-800">
      <header className="bg-dark-700/80 backdrop-blur-lg border-b border-dark-600/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <div className="bg-gradient-to-br from-primary-500 to-primary-900 p-2 rounded-lg mr-3 shadow-lg shadow-primary-900/20 group-hover:shadow-primary-900/30 transition-all duration-300">
              <Image 
                src="/assets/logo-branca.png" 
                alt="World SaaS Logo" 
                width={24} 
                height={24} 
                className="group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="font-gotham-black text-xl text-white tracking-tight">World<span className="font-gotham-thin bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-primary-500">SaaS</span></span>
          </Link>
          
          <nav className="hidden md:flex space-x-1">
            <Link 
              href="/auth/login" 
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${pathname === '/auth/login' ? 'bg-primary-900/20 text-primary-300' : 'text-gray-300 hover:text-white hover:bg-dark-600/50'}`}
            >
              Login
            </Link>
            <Link 
              href="/auth/register" 
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${pathname === '/auth/register' ? 'bg-primary-900/20 text-primary-300' : 'text-gray-300 hover:text-white hover:bg-dark-600/50'}`}
            >
              Registrar
            </Link>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow">
        {children}
      </main>
      
      <footer className="bg-dark-700/80 backdrop-blur-lg border-t border-dark-600/50 py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-gradient-to-br from-primary-500 to-primary-900 p-1.5 rounded-md mr-2 shadow-lg shadow-primary-900/10">
                <Image 
                  src="/assets/logo-branca.png" 
                  alt="World SaaS Logo" 
                  width={18} 
                  height={18} 
                />
              </div>
              <span className="font-gotham-black text-sm text-white">World<span className="font-gotham-thin text-primary-400">SaaS</span></span>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-xs text-gray-400 hover:text-primary-400 transition-colors">Termos</a>
              <a href="#" className="text-xs text-gray-400 hover:text-primary-400 transition-colors">Privacidade</a>
              <a href="#" className="text-xs text-gray-400 hover:text-primary-400 transition-colors">Suporte</a>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-dark-600/50 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} WorldSaaS. Todos os direitos reservados.</p>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-primary-400 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
              </a>
              <a href="#" aria-label="GitHub" className="text-gray-400 hover:text-primary-400 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path></svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-primary-400 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
