"use client";

import { useState, useEffect } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { useTranslations } from 'next-intl';

export default function HeroSection() {
  const t = useTranslations();
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative min-h-screen pt-20 flex items-center bg-dark-800">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-700 opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/10 to-primary-800/10 bg-cover bg-center opacity-10"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
        <div ref={sliderRef} className="keen-slider">
          {/* Slide A - Para Empresas */}
          <div className="keen-slider__slide">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h3 className="text-primary-400 font-medium mb-3 text-lg">{t('hero.forCompanies')}</h3>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-gotham-black text-white leading-tight mb-6">
                  {t('hero.scaleYourSales')}
                </h1>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 bg-primary-500/20 p-1 rounded-full">
                      <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-300">{t('hero.globalSellersNetwork')}</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 bg-primary-500/20 p-1 rounded-full">
                      <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-300">{t('hero.completePlatform')}</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 bg-primary-500/20 p-1 rounded-full">
                      <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-300">{t('hero.noAdsNeeded')}</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 bg-primary-500/20 p-1 rounded-full">
                      <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-300">{t('hero.trainedSellers')}</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2 md:pl-10">
                <div className="relative w-[95%] overflow-visible">
                  <div 
                    className="absolute rounded-lg blur-md opacity-75 animate-pulse bg-gradient-to-r from-primary-500 to-primary-900" 
                    style={{
                      top: '-5px',
                      left: '-5px',
                      right: '-5px',
                      bottom: '-5px',
                    }}
                  ></div>
                  <div className="relative bg-dark-700 border border-dark-600 rounded-lg overflow-hidden shadow-xl">
                    <img 
                      src="/assets/startup-pic.jpg" 
                      alt="Empresas" 
                      className="w-full h-auto object-cover object-center" 
                      style={{ aspectRatio: '1500/1001' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Slide B - Para Vendedores Globais */}
          <div className="keen-slider__slide">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h3 className="text-primary-400 font-medium mb-3 text-lg">{t('hero.forGlobalSellers')}</h3>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-gotham-black text-white leading-tight mb-6">
                  {t('hero.sellBestProducts')}
                </h1>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 bg-primary-500/20 p-1 rounded-full">
                      <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-300">{t('hero.accessToBestProducts')}</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 bg-primary-500/20 p-1 rounded-full">
                      <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-300">{t('hero.attractiveCommissions')}</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 bg-primary-500/20 p-1 rounded-full">
                      <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-300">{t('hero.trainingAndSupport')}</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 bg-primary-500/20 p-1 rounded-full">
                      <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-300">{t('hero.globalRecurrence')}</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2 md:pl-10">
                <div className="relative w-[95%] overflow-visible">
                  <div 
                    className="absolute rounded-lg blur-md opacity-75 animate-pulse bg-gradient-to-r from-primary-500 to-primary-900" 
                    style={{
                      top: '-5px',
                      left: '-5px',
                      right: '-5px',
                      bottom: '-5px',
                    }}
                  ></div>
                  <div className="relative bg-dark-700 border border-dark-600 rounded-lg overflow-hidden shadow-xl">
                    <img 
                      src="/assets/marketing-pic.jpg" 
                      alt="Vendedores Globais" 
                      className="w-full h-auto object-cover object-center" 
                      style={{ aspectRatio: '16/9' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
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
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center mt-12 gap-4">
          <button 
            onClick={() => scrollToSection('tech-nucleus')}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary-500 to-primary-700 hover:from-primary-600 hover:to-primary-800 text-white font-medium shadow-lg shadow-primary-700/30 hover:shadow-primary-700/50 transition-all duration-300"
          >
            {t('hero.knowTechCore')}
          </button>
          <button 
            onClick={() => scrollToSection('sales-nucleus')}
            className="px-6 py-3 rounded-lg bg-dark-700 hover:bg-dark-600 text-white font-medium border border-primary-500/30 hover:border-primary-500/50 transition-colors duration-300"
          >
            {t('hero.knowSalesCore')}
          </button>
        </div>
      </div>
    </section>
  );
}
