"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function FAQSection() {
  const t = useTranslations();
  
  // Recuperar as perguntas do objeto de traduções com tipagem correta
  const faqs = t.raw('faq.questions') as Array<{question: string, answer: string}>;

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-dark-800">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-gotham-black text-white mb-4">{t('faq.title')}</h2>
          <p className="text-gray-300">
            {t('faq.subtitle')}
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-dark-600 rounded-lg overflow-hidden bg-dark-700 transition-all duration-300 hover:border-primary-500/30"
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none transition-all duration-300 hover:bg-dark-600/30 group"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-white group-hover:text-primary-400 transition-colors duration-300">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-primary-400 transform transition-all duration-300 ${openIndex === index ? 'rotate-180' : ''} group-hover:text-primary-300 group-hover:scale-110`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div 
                className={`px-6 pb-4 transition-all duration-300 ${openIndex === index ? 'block opacity-100' : 'hidden opacity-0'}`}
              >
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
