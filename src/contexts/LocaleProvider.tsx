"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import Cookies from "js-cookie";

type LocaleContextType = {
  locale: string;
  setLocale: (locale: string) => void;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState("pt-BR");
  const [messages, setMessages] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedLocale = Cookies.get("NEXT_LOCALE") || "pt-BR";
    setLocale(savedLocale);

    // Load the messages for the current locale
    import(`../../locales/${savedLocale}.json`)
      .then((module) => {
        setMessages(module.default || module);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error loading messages:", error);
        // Fallback to pt-BR if there's an error
        import(`../../locales/pt-BR.json`).then((module) => {
          setMessages(module.default || module);
          setLocale("pt-BR");
          setIsLoading(false);
        });
      });
  }, []);

  const handleSetLocale = (newLocale: string) => {
    Cookies.set("NEXT_LOCALE", newLocale, { expires: 365 });
    setLocale(newLocale);
    
    // Load the messages for the new locale
    import(`../../locales/${newLocale}.json`)
      .then((module) => {
        setMessages(module.default || module);
      })
      .catch((error) => {
        console.error("Error loading messages:", error);
      });
  };

  if (isLoading) {
    return null; // Or a loading spinner
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale: handleSetLocale }}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  );
}
