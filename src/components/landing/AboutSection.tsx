"use client";

import { useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

export default function AboutSection() {
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

  return (
    <section id="sobre" className="py-24 bg-dark-800">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={sliderRef} className="keen-slider mb-16">
          {/* Slide 1 - Para Empresas */}
          <div className="keen-slider__slide">
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-primary-400 font-medium mb-3 text-lg">Para Empresas</h3>
              <h2 className="text-3xl md:text-4xl font-gotham-black text-white mb-6">
                Transforme seu produto digital em um sucesso de vendas
              </h2>
              <p className="text-gray-300 text-lg">
                A 1% World conecta sua empresa a uma rede global de vendedores qualificados, 
                prontos para escalar suas vendas com estratégias comprovadas e tecnologia de ponta.
              </p>
            </div>
          </div>
          
          {/* Slide 2 - Para Vendedores Globais */}
          <div className="keen-slider__slide">
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-primary-400 font-medium mb-3 text-lg">Para Vendedores Globais</h3>
              <h2 className="text-3xl md:text-4xl font-gotham-black text-white mb-6">
                Monetize seu conhecimento e alcance vendendo os melhores produtos
              </h2>
              <p className="text-gray-300 text-lg">
                Junte-se à comunidade de elite de vendedores da 1% World e tenha acesso aos 
                melhores produtos digitais, treinamentos exclusivos e comissões atrativas.
              </p>
            </div>
          </div>
        </div>
        
        {/* Slider controls */}
        {loaded && instanceRef.current && (
          <div className="flex justify-center mb-16">
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
        
        {/* Ecosystem Card */}
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-primary-900 rounded-2xl blur-lg opacity-75"></div>
          <div className="relative bg-dark-700 border border-dark-600 rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-gotham-black text-white mb-4 text-center">O Ecossistema 1% World</h3>
            <p className="text-gray-300 text-center leading-relaxed">
              A 1% World é mais que uma plataforma, é um ecossistema completo que une tecnologia e estratégias 
              de vendas para criar um ambiente onde empresas e vendedores globais prosperam juntos. 
              Nossa missão é transformar o mercado de produtos digitais, oferecendo soluções inovadoras 
              que geram resultados extraordinários para todos os envolvidos.
            </p>
            <div className="mt-6 flex justify-center">
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-white">Inovação</h4>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-white">Comunidade</h4>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-white">Resultados</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
