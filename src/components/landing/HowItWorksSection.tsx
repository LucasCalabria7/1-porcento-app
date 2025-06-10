"use client";

import React, { useState, useEffect } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

// Função para criar um card padronizado
const SlideCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-dark-700/50 p-5 rounded-lg flex justify-between items-center" style={{ height: '60px' }}>
    <div className="text-lg font-medium text-white">{label}</div>
    <div className="text-primary-400 font-medium">{value}</div>
  </div>
);

export default function HowItWorksSection() {
  const [activeTab, setActiveTab] = useState<'empresas' | 'vendedores'>('empresas');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    loop: true,
    mode: "snap",
    slides: {
      perView: 1,
      spacing: 16,
    },
  });
  
  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (instanceRef.current) {
        instanceRef.current.next();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [instanceRef]);

  // Função para criar um slide padronizado
  const createStandardSlide = (title: string, items: {label: string, value: string}[]) => ({
    title,
    content: (
      <div className="w-full flex flex-col space-y-4">
        {items.map((item, index) => (
          <SlideCard key={index} label={item.label} value={item.value} />
        ))}
      </div>
    )
  });

  // Definição manual dos slides para garantir consistência total
  const empresasSlides = [
    {
      title: "Insira detalhes sobre seu produto em nossa plataforma",
      content: (
        <div className="w-full flex flex-col space-y-4" style={{ width: '100%', minWidth: '100%' }}>
          <div className="bg-dark-700/50 p-5 rounded-lg flex justify-between items-center w-full" style={{ height: '60px' }}>
            <div className="text-lg font-medium text-white">Título do produto</div>
            <div className="text-primary-400 font-medium">AgentAI - Seu SDR com IA</div>
          </div>
          <div className="bg-dark-700/50 p-5 rounded-lg flex justify-between items-center w-full" style={{ height: '60px' }}>
            <div className="text-lg font-medium text-white">Preço</div>
            <div className="text-primary-400 font-medium">U$ 19.90/mês</div>
          </div>
          <div className="bg-dark-700/50 p-5 rounded-lg flex justify-between items-center w-full" style={{ height: '60px' }}>
            <div className="text-lg font-medium text-white">Comissão</div>
            <div className="text-primary-400 font-medium">50%</div>
          </div>
        </div>
      )
    },
    {
      title: "Apresente seu produto para nossos vendedores globais",
      content: (
        <div className="w-full flex flex-col space-y-4" style={{ width: '100%', minWidth: '100%' }}>
          <div className="bg-dark-700/50 p-5 rounded-lg flex justify-between items-center w-full" style={{ height: '60px' }}>
            <div className="text-lg font-medium text-white">Pitch de apresentação</div>
            <div className="text-primary-400 font-medium">Vídeo que te torna único</div>
          </div>
          <div className="bg-dark-700/50 p-5 rounded-lg flex justify-between items-center w-full" style={{ height: '60px' }}>
            <div className="text-lg font-medium text-white">Arquivos de compartilhamento</div>
            <div className="text-primary-400 font-medium">Criativos validados</div>
          </div>
          <div className="bg-dark-700/50 p-5 rounded-lg flex justify-between items-center w-full" style={{ height: '60px' }}>
            <div className="text-lg font-medium text-white">Dados de compartilhamento</div>
            <div className="text-primary-400 font-medium">Métricas já analisadas</div>
          </div>
        </div>
      )
    },
    {
      title: "Integração com seu financeiro",
      content: (
        <div className="w-full flex flex-col space-y-4" style={{ width: '100%', minWidth: '100%' }}>
          <div className="bg-dark-700/50 p-5 rounded-lg flex justify-between items-center w-full" style={{ height: '60px' }}>
            <div className="text-lg font-medium text-white">Integração com Gateway</div>
            <div className="text-primary-400 font-medium">Utilize a sua ou a nossa plataforma</div>
          </div>
          <div className="bg-dark-700/50 p-5 rounded-lg flex justify-between items-center w-full" style={{ height: '60px' }}>
            <div className="text-lg font-medium text-white">Projeção de monetização</div>
            <div className="text-primary-400 font-medium">Aumente faturamento e MRR</div>
          </div>
          <div className="bg-dark-700/50 p-5 rounded-lg flex justify-between items-center w-full" style={{ height: '60px' }}>
            <div className="text-lg font-medium text-white">Gamifique seus ganhos</div>
            <div className="text-primary-400 font-medium">Conexão única com top vendedores</div>
          </div>
        </div>
      )
    }
  ];

  const vendedoresSlides = [
    {
      title: "Descubra produtos de tecnologia e recorrência",
      content: (
        <div className="flex flex-col space-y-4">
          <div className="bg-dark-700/50 p-5 rounded-lg flex justify-between items-center">
            <div className="text-lg font-medium text-white">Recorrência</div>
            <div className="text-primary-400 font-medium">Construa renda sólida e previsível</div>
          </div>
          <div className="bg-dark-700/50 p-5 rounded-lg flex justify-between items-center">
            <div className="text-lg font-medium text-white">Globalização</div>
            <div className="text-primary-400 font-medium">Venda para qualquer lugar do mundo</div>
          </div>
          <div className="bg-dark-700/50 p-5 rounded-lg flex justify-between items-center">
            <div className="text-lg font-medium text-white">Estrutura</div>
            <div className="text-primary-400 font-medium">Monte sua própria estrutura digital</div>
          </div>
        </div>
      )
    },
    {
      title: "Crie seu próprio império e seja criador de produtos",
      content: (
        <div className="flex flex-col space-y-4">
          <div className="bg-dark-700/50 p-5 rounded-lg flex justify-between items-center">
            <div className="text-lg font-medium text-white">Transformação</div>
            <div className="text-primary-400 font-medium">Tenha seu próprio projeto além de vender outros já validados</div>
          </div>
          <div className="bg-dark-700/50 p-5 rounded-lg flex justify-between items-center">
            <div className="text-lg font-medium text-white">Mentoria</div>
            <div className="text-primary-400 font-medium">Suporte completo desde estratégias até monetização</div>
          </div>
          <div className="bg-dark-700/50 p-5 rounded-lg flex justify-between items-center">
            <div className="text-lg font-medium text-white">Produtos diversos</div>
            <div className="text-primary-400 font-medium">Micro-SaaS, SaaS, Agentes de IA, escolhe o que mais se identifica</div>
          </div>
        </div>
      )
    },
    {
      title: "Comunidade única e exclusiva focada em resultados e crescimento conjunto",
      content: (
        <div className="bg-gradient-to-br from-dark-800 to-dark-900 p-8 rounded-xl border border-dark-600 shadow-xl">
          <div className="grid grid-cols-3 gap-8 text-center mb-10">
            <div>
              <div className="text-4xl font-gotham-black text-primary-400 mb-2">1000+</div>
              <div className="text-gray-300">Membros Ativos</div>
            </div>
            <div>
              <div className="text-4xl font-gotham-black text-primary-400 mb-2">24/7</div>
              <div className="text-gray-300">Suporte Dedicado</div>
            </div>
            <div>
              <div className="text-4xl font-gotham-black text-primary-400 mb-2">50+</div>
              <div className="text-gray-300">Países</div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-gotham-black text-primary-400 mb-2">100+</div>
              <div className="text-gray-300">Mentorias Realizadas</div>
            </div>
            <div>
              <div className="text-4xl font-gotham-black text-primary-400 mb-2">R$1M+</div>
              <div className="text-gray-300">GMV Mensal</div>
            </div>
            <div>
              <div className="text-4xl font-gotham-black text-primary-400 mb-2">10+</div>
              <div className="text-gray-300">Eventos Anuais</div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const currentSlides = activeTab === 'empresas' ? empresasSlides : vendedoresSlides;

  return (
    <section className="py-24 bg-dark-700">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-gotham-black text-white mb-4">Como Funciona</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Nossa plataforma foi desenvolvida para conectar empresas e vendedores globais 
            de forma eficiente e lucrativa para ambos os lados.
          </p>
        </div>
        
        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 bg-dark-800 rounded-lg">
            <button
              onClick={() => setActiveTab('empresas')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                activeTab === 'empresas'
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Para empresas
            </button>
            <button
              onClick={() => setActiveTab('vendedores')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                activeTab === 'vendedores'
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Para vendedores globais
            </button>
          </div>
        </div>
        
        {/* Slider */}
        <div className="max-w-4xl mx-auto w-full">
          <div ref={sliderRef} className="keen-slider w-full">
            {currentSlides.map((slide, index) => (
              <div key={index} className="keen-slider__slide w-full">
                <div className="bg-dark-800 border border-dark-600 rounded-xl p-8 shadow-xl h-[450px] w-full">
                  <h3 className="text-3xl md:text-4xl font-gotham-black text-white mb-8 text-center w-full">{slide.title}</h3>
                  <div className="h-[300px] flex items-center justify-center w-full">
                    {slide.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Slider controls */}
          {loaded && instanceRef.current && (
            <div className="flex justify-center mt-8">
              {[...Array(instanceRef.current.track.details.slides.length).keys()].map((idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    instanceRef.current?.moveToIdx(idx);
                  }}
                  className={`w-3 h-3 rounded-full mx-1 focus:outline-none ${
                    currentSlide === idx ? "bg-primary-500" : "bg-gray-600"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
