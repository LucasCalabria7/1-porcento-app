"use client";

import React, { useState, useEffect } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { useTranslations } from 'next-intl';

// Função para criar um card padronizado
const SlideCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-dark-700/50 p-5 rounded-lg flex justify-between items-center" style={{ height: '60px' }}>
    <div className="text-lg font-medium text-white">{label}</div>
    <div className="text-primary-400 font-medium">{value}</div>
  </div>
);

export default function HowItWorksSection() {
  const t = useTranslations();
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

  // Obter os slides das traduções
  const getCompaniesSlides = () => {
    const slides = t.raw('howItWorks.companies.slides') as Array<{
      title: string;
      items: Array<{ label: string; value: string }>;
    }>;

    return slides.map(slide => ({
      title: slide.title,
      content: (
        <div className="w-full flex flex-col space-y-4" style={{ width: '100%', minWidth: '100%' }}>
          {slide.items.map((item, idx) => (
            <div key={idx} className="bg-dark-700/50 p-5 rounded-lg flex justify-between items-center w-full" style={{ height: '60px' }}>
              <div className="text-lg font-medium text-white">{item.label}</div>
              <div className="text-primary-400 font-medium">{item.value}</div>
            </div>
          ))}
        </div>
      )
    }));
  };

  const getSellersSlides = () => {
    const slides = t.raw('howItWorks.sellers.slides') as Array<{
      title: string;
      items?: Array<{ label: string; value: string }>;
      stats?: Array<{ value: string; label: string }>;
    }>;

    return slides.map((slide, slideIndex) => ({
      title: slide.title,
      content: slideIndex === 2 ? (
        // Terceiro slide com estatísticas
        <div className="bg-gradient-to-br from-dark-800 to-dark-900 p-8 rounded-xl border border-dark-600 shadow-xl">
          <div className="grid grid-cols-3 gap-8 text-center mb-10">
            {slide.stats?.slice(0, 3).map((stat, idx) => (
              <div key={idx}>
                <div className="text-4xl font-gotham-black text-primary-400 mb-2">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-3 gap-8 text-center">
            {slide.stats?.slice(3, 6).map((stat, idx) => (
              <div key={idx}>
                <div className="text-4xl font-gotham-black text-primary-400 mb-2">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Slides normais com itens
        <div className="flex flex-col space-y-4">
          {slide.items?.map((item, idx) => (
            <div key={idx} className="bg-dark-700/50 p-5 rounded-lg flex justify-between items-center">
              <div className="text-lg font-medium text-white">{item.label}</div>
              <div className="text-primary-400 font-medium">{item.value}</div>
            </div>
          ))}
        </div>
      )
    }));
  };

  const empresasSlides = getCompaniesSlides();
  const vendedoresSlides = getSellersSlides();

  const currentSlides = activeTab === 'empresas' ? empresasSlides : vendedoresSlides;

  return (
    <section className="py-24 bg-dark-700">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-gotham-black text-white mb-4">{t('howItWorks.title')}</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            {t('howItWorks.subtitle')}
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
              {t('howItWorks.forCompanies')}
            </button>
            <button
              onClick={() => setActiveTab('vendedores')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                activeTab === 'vendedores'
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {t('howItWorks.forSellers')}
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
