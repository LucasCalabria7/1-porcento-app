"use client";

import { useState } from 'react';

export default function FAQSection() {
  const faqs = [
    {
      question: "O que é a 1% World?",
      answer: "A 1% World é um ecossistema completo que conecta empresas e vendedores globais, oferecendo tecnologia de ponta e estratégias de vendas para maximizar resultados no mercado de produtos digitais."
    },
    {
      question: "Como funciona para empresas?",
      answer: "Empresas podem cadastrar seus produtos digitais na plataforma, configurar programas de afiliados e ter acesso a uma rede global de vendedores qualificados, além de ferramentas e estratégias para escalar seus negócios."
    },
    {
      question: "Como funciona para vendedores?",
      answer: "Vendedores podem se cadastrar como afiliados, escolher produtos de qualidade para promover, receber treinamentos exclusivos e ganhar comissões atrativas por cada venda realizada."
    },
    {
      question: "Quais são os núcleos da 1% World?",
      answer: "A 1% World possui dois núcleos principais: o Núcleo de Tecnologia, focado em inovação e soluções tecnológicas, e o Núcleo de Vendas, especializado em estratégias e mentoria para maximizar resultados."
    },
    {
      question: "Como faço para participar da comunidade?",
      answer: "Você pode se cadastrar na plataforma como empresa ou vendedor, e também participar dos grupos de WhatsApp específicos para cada núcleo, onde compartilhamos conteúdos exclusivos e oportunidades."
    },
    {
      question: "Quais tipos de produtos posso vender ou cadastrar?",
      answer: "A plataforma é focada em produtos digitais como cursos, e-books, mentorias, softwares, assinaturas e outros conteúdos que podem ser entregues digitalmente."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-dark-800">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-gotham-black text-white mb-4">Perguntas Frequentes</h2>
          <p className="text-gray-300">
            Encontre respostas para as dúvidas mais comuns sobre a 1% World.
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-dark-600 rounded-lg overflow-hidden bg-dark-700"
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-white">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-primary-400 transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
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
