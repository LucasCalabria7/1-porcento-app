"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState, useRef } from "react";

const languages = [
  { value: "pt-BR", label: "Português" },
  { value: "es", label: "Español" },
  { value: "en", label: "English" }
];

// Hook para detectar cliques fora de um elemento
function useOnClickOutside(ref: React.RefObject<HTMLElement>, handler: (event: MouseEvent | TouchEvent) => void) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

export default function LanguageSelector() {
  const t = useTranslations("common");
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState("pt-BR");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const savedLocale = Cookies.get("NEXT_LOCALE");
    if (savedLocale) {
      setCurrentLocale(savedLocale);
    }
  }, []);

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  const handleLanguageChange = (newLocale: string) => {
    Cookies.set("NEXT_LOCALE", newLocale, { expires: 365 });
    setCurrentLocale(newLocale);
    setIsOpen(false);
    
    // Reload the page to apply the new locale
    window.location.reload();
  };

  const getCurrentLanguageLabel = () => {
    return languages.find(lang => lang.value === currentLocale)?.label || "Português";
  };

  return (
    <div className="relative flex items-center" ref={dropdownRef}>
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-32 px-4 py-2 text-sm text-white bg-dark-600 border border-dark-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
        aria-label={t("language")}
        aria-expanded={isOpen}
      >
        <span>{getCurrentLanguageLabel()}</span>
        <svg className="h-4 w-4 text-primary-400 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-32 py-1 bg-dark-700 border border-dark-500 rounded-lg shadow-lg z-50">
          {languages.map((language) => (
            <button
              key={language.value}
              onClick={() => handleLanguageChange(language.value)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-dark-600 transition-colors ${currentLocale === language.value ? 'text-primary-400' : 'text-white'}`}
            >
              {language.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
