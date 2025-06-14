"use client";

import { useTranslations } from "next-intl";
import { Select } from "@/components/ui/Select";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const languages = [
  { value: "pt-BR", label: "Português" },
  { value: "es", label: "Español" },
  { value: "en", label: "English" }
];

export default function LanguageSelector() {
  const t = useTranslations("common");
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState("pt-BR");
  
  useEffect(() => {
    const savedLocale = Cookies.get("NEXT_LOCALE");
    if (savedLocale) {
      setCurrentLocale(savedLocale);
    }
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    Cookies.set("NEXT_LOCALE", newLocale, { expires: 365 });
    setCurrentLocale(newLocale);
    
    // Reload the page to apply the new locale
    window.location.reload();
  };

  return (
    <div className="relative flex items-center">
      <Select
        options={languages}
        value={currentLocale}
        onChange={handleLanguageChange}
        className="w-28 h-8 text-xs bg-dark-700/50 border-dark-600 focus:ring-primary-500"
        aria-label={t("language")}
      />
    </div>
  );
}
