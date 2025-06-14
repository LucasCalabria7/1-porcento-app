"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import LanguageSelector from '@/components/LanguageSelector';

export default function Header() {
  const t = useTranslations();
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-dark-800/90 backdrop-blur-lg shadow-lg shadow-dark-900/20 py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center group">
          <div className="bg-gradient-to-br from-primary-500 to-primary-900 p-2 rounded-lg mr-3 shadow-lg shadow-primary-900/20 group-hover:shadow-primary-900/30 transition-all duration-300">
            <Image 
              src="/assets/logo-branca.png" 
              alt="Umporcento Logo" 
              width={24} 
              height={24} 
              className="group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <span className="font-gotham-black text-xl text-white tracking-tight">Um<span className="font-gotham-thin bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-primary-500">porcento</span></span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#inicio" className="text-sm font-medium text-white hover:text-primary-300 transition-colors">{t('nav.home')}</a>
          <a href="#sobre" className="text-sm font-medium text-white hover:text-primary-300 transition-colors">{t('nav.about')}</a>
          <a href="#nucleos" className="text-sm font-medium text-white hover:text-primary-300 transition-colors">{t('nav.cores')}</a>
          <a href="#depoimentos" className="text-sm font-medium text-white hover:text-primary-300 transition-colors">{t('nav.testimonials')}</a>
          <a href="#faq" className="text-sm font-medium text-white hover:text-primary-300 transition-colors">{t('nav.faq')}</a>
          
          <div className="ml-6 flex items-center space-x-3">
            <LanguageSelector />
            
            <Link 
              href="/auth/login" 
              className="px-4 py-2 rounded-md text-sm font-medium bg-dark-700/50 hover:bg-dark-600 text-white transition-colors border border-dark-600"
            >
              {t('common.login')}
            </Link>
            <Link 
              href="/auth/register" 
              className="px-4 py-2 rounded-md text-sm font-medium bg-gradient-to-r from-primary-500 to-primary-700 hover:from-primary-600 hover:to-primary-800 text-white shadow-lg shadow-primary-700/30 hover:shadow-primary-700/50 transition-all duration-300"
            >
              {t('common.register')}
            </Link>
          </div>
        </nav>
        
        {/* Mobile menu button */}
        <button className="md:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-dark-700/50">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}
