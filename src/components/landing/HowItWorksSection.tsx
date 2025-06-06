"use client";

import { useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

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

  const empresasSlides = [
    {
      title: "Cadastre seu produto",
      content: (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-dark-700/50 p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">Passo 1</div>
            <div className="text-white">Crie sua conta e cadastre seu produto digital</div>
          </div>
          <div className="bg-dark-700/50 p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">Benefício</div>
            <div className="text-white">Interface intuitiva e suporte técnico</div>
          </div>
          <div className="bg-dark-700/50 p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">Recursos</div>
            <div className="text-white">Hospedagem, proteção e entrega automática</div>
          </div>
          <div className="bg-dark-700/50 p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">Tempo</div>
            <div className="text-white">Menos de 30 minutos para configurar</div>
          </div>
        </div>
      )
    },
    {
      title: "Configure seu programa de afiliados",
      content: (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-dark-700/50 p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">Passo 2</div>
            <div className="text-white">Defina comissões e regras para afiliados</div>
          </div>
          <div className="bg-dark-700/50 p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">Benefício</div>
            <div className="text-white">Atraia os melhores vendedores do mercado</div>
          </div>
          <div className="bg-dark-700/50 p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">Recursos</div>
            <div className="text-white">Dashboard de desempenho e análises</div>
          </div>
          <div className="bg-dark-700/50 p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">Flexibilidade</div>
            <div className="text-white">Personalize comissões por produto</div>
          </div>
        </div>
      )
    },
    {
      title: "Acompanhe e escale seus resultados",
      content: (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-dark-700/50 p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">Passo 3</div>
            <div className="text-white">Monitore vendas e otimize estratégias</div>
          </div>
          <div className="bg-dark-700/50 p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">Benefício</div>
            <div className="text-white">Crescimento exponencial de receita</div>
          </div>
          <div className="bg-dark-700/50 p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">Recursos</div>
            <div className="text-white">Relatórios detalhados e insights</div>
          </div>
          <div className="bg-dark-700/50 p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">Suporte</div>
            <div className="text-white">Mentoria estratégica personalizada</div>
          </div>
        </div>
      )
    }
  ];

  const vendedoresSlides = [
    {
      title: "Crie sua conta de afiliado",
      content: (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-dark-700/50 p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">Passo 1</div>
            <div className="text-white">Registre-se como afiliado na plataforma</div>
          </div>
          <div className="bg-dark-700/50 p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">Benefício</div>
            <div className="text-white">Acesso imediato a produtos premium</div>
          </div>
          <div className="bg-dark-700/50 p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">Recursos</div>
            <div className="text-white">Dashboard personalizado e materiais</div>
          </div>
          <div className="bg-dark-700/50 p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">Tempo</div>
            <div className="text-white">Menos de 10 minutos para começar</div>
          </div>
        </div>
      )
    },
    {
      title: "Escolha produtos e receba treinamento",
      content: (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-dark-700/50 p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">Passo 2</div>
            <div className="text-white">Selecione produtos e acesse treinamentos</div>
          </div>
          <div className="bg-dark-700/50 p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">Benefício</div>
            <div className="text-white">Conhecimento especializado de vendas</div>
          </div>
          <div className="bg-dark-700/50 p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">Recursos</div>
            <div className="text-white">Materiais prontos e estratégias testadas</div>
          </div>
          <div className="bg-dark-700/50 p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">Comunidade</div>
            <div className="text-white">Acesso a grupo exclusivo de afiliados</div>
          </div>
        </div>
      )
    },
    {
      title: "Promova e receba comissões",
      content: (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-dark-700/50 p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">Passo 3</div>
            <div className="text-white">Divulgue produtos e acompanhe resultados</div>
          </div>
          <div className="bg-dark-700/50 p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">Benefício</div>
            <div className="text-white">Comissões atrativas e recorrentes</div>
          </div>
          <div className="bg-dark-700/50 p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">Recursos</div>
            <div className="text-white">Links de afiliado e pixels de rastreamento</div>
          </div>
          <div className="bg-dark-700/50 p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">Pagamentos</div>
            <div className="text-white">Rápidos e em múltiplas moedas</div>
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
                <div className="bg-dark-800 border border-dark-600 rounded-xl p-8 shadow-xl">
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">{slide.title}</h3>
                  {slide.content}
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
