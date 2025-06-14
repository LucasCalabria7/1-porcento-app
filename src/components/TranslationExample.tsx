"use client";

import { useTranslations } from 'next-intl';

export default function TranslationExample() {
  const t = useTranslations();
  
  return (
    <div className="p-6 bg-dark-700/30 rounded-lg border border-dark-600 shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-white">{t('landing.title')}</h2>
      <p className="text-gray-300">{t('landing.subtitle')}</p>
    </div>
  );
}
