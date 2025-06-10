"use client";

import React, { useState, useEffect } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

// Função para criar um card padronizado
const SlideCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-dark-700/50 p-5 rounded-lg flex justify-between items-center">
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

  const empresasSlides = [
    {
      title: "Insira detalhes sobre seu produto em nossa plataforma",
      content: (
        <div className="w-full flex flex-col space-y-4">
          <SlideCard label="Título do produto" value="AgentAI - Seu SDR com IA" />
          <SlideCard label="Preço" value="U$ 19.90/mês" />
          <SlideCard label="Comissão" value="50%" />
        </div>
      )
    },
    {
      title: "Apresente seu produto para nossos vendedores globais",
      content: (
        <div className="w-full flex flex-col space-y-4">
          <SlideCard label="Pitch de apresentação" value="Vídeo que te torna único" />
          <SlideCard label="Arquivos de compartilhamento" value="Criativos validados" />
          <SlideCard label="Dados de compartilhamento" value="Métricas já analisadas" />
        </div>
      )
    },
    {
      title: "Integração com seu financeiro",
      content: (
        <div className="w-full flex flex-col space-y-4">
          <SlideCard label="Integração com Gateway" value="Utilize a sua ou a nossa plataforma" />
          <SlideCard label="Projeção de monetização" value="Aumente faturamento e MRR" />
          <SlideCard label="Gamifique seus ganhos" value="Conexão única com top vendedores" />
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
        <div className="max-w-4xl mx-auto">
          <div ref={sliderRef} className="keen-slider">
            {currentSlides.map((slide, index) => (
              <div key={index} className="keen-slider__slide">
                <div className="bg-dark-800 border border-dark-600 rounded-xl p-8 shadow-xl h-[450px]">
                  <h3 className="text-3xl md:text-4xl font-gotham-black text-white mb-8 text-center">{slide.title}</h3>
                  <div className="h-[300px] flex items-center justify-center">
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
