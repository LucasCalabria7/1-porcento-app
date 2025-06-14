"use client";

import { useTranslations } from 'next-intl';

export default function CTASection() {
  const t = useTranslations('ctaSection');
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background elements - Design moderno com gradientes e formas */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-dark-900 to-dark-950 z-0"></div>
      <div className="absolute inset-0 bg-[url('/assets/pattern.png')] bg-repeat opacity-10 z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.2),transparent_70%)] z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(79,70,229,0.15),transparent_70%)] z-0"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full filter blur-3xl -mr-48 -mt-48 z-0"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-700/10 rounded-full filter blur-3xl -ml-48 -mb-48 z-0"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Título e descrição - Estilo moderno com badge */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-primary-500/20 rounded-full backdrop-blur-sm mb-6">
            <p className="text-sm md:text-base font-medium text-primary-300">
              <span className="inline-block animate-pulse mr-2 w-2 h-2 rounded-full bg-primary-400"></span>
              {t('badge')}
            </p>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-gotham-black text-white mb-8 leading-tight">
            {t.rich('title', {
              span: (chunks) => <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600 relative">{chunks}</span>
            })}
          </h2>
          
          <p className="text-lg md:text-xl text-primary-200/90 max-w-3xl mx-auto mb-10">
            {t('subtitle')}
          </p>
        </div>
        
        {/* Container principal dos botões - Design moderno com gradiente de borda */}
        <div className="max-w-5xl mx-auto">
          <div className="relative group">
            {/* Gradiente de borda animado */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-600 to-indigo-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-300"></div>
            
            {/* Card principal */}
            <div className="relative bg-dark-900/90 backdrop-blur-xl rounded-2xl p-8 sm:p-10 shadow-2xl border border-dark-700/50 overflow-hidden">
              {/* Elementos decorativos */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary-500/10 rounded-full filter blur-3xl -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-600/10 rounded-full filter blur-3xl -ml-20 -mb-20"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-gradient-to-r from-primary-500/5 to-indigo-500/5 rotate-45 blur-3xl"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">{t('chooseParticipation')}</h3>
                
                {/* Grid de botões WhatsApp - Design moderno com efeitos de hover */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <a 
                    href="https://wa.me/group/abc123" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative px-8 py-5 rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 text-white font-medium shadow-lg shadow-primary-700/30 hover:shadow-primary-500/50 transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-10"></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <div className="flex items-center justify-center relative z-10">
                      <div className="bg-white/20 rounded-full p-2 mr-3">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                      </div>
                      <div>
                        <span className="block text-sm text-white/80 mb-0.5">{t('technologyGroup.joinThe')}</span>
                        <span className="font-bold">{t('technologyGroup.groupName')}</span>
                      </div>
                    </div>
                  </a>
                  
                  <a 
                    href="https://wa.me/group/xyz123" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative px-8 py-5 rounded-xl bg-gradient-to-br from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-medium shadow-lg shadow-green-700/30 hover:shadow-green-500/50 transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-10"></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <div className="flex items-center justify-center relative z-10">
                      <div className="bg-white/20 rounded-full p-2 mr-3">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                      </div>
                      <div>
                        <span className="block text-sm text-white/80 mb-0.5">{t('salesGroup.joinThe')}</span>
                        <span className="font-bold">{t('salesGroup.groupName')}</span>
                      </div>
                    </div>
                  </a>
                </div>
                
                {/* Seção de especialistas - Design moderno com efeitos de hover */}
                <div className="relative bg-dark-800/50 backdrop-blur-lg rounded-xl p-8 border border-dark-600/30 overflow-hidden">
                  {/* Elementos decorativos da seção de especialistas */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full filter blur-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-500/10 rounded-full filter blur-2xl"></div>
                
                  <div className="relative z-10">
                    <div className="flex items-center justify-center mb-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-medium mr-2">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                        {t('support.badge')}
                      </span>
                      <h3 className="text-xl font-medium text-white">{t('support.title')}</h3>
                    </div>
                  
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a 
                        href="https://wa.me/5511999999999" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group px-6 py-3 rounded-lg bg-dark-700 hover:bg-dark-600 text-white font-medium border border-indigo-500/20 hover:border-indigo-500/40 shadow-md hover:shadow-indigo-500/10 transition-all duration-300 flex items-center justify-center"
                      >
                        <div className="bg-indigo-500/20 group-hover:bg-indigo-500/30 rounded-full p-1.5 mr-3 transition-colors duration-300">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m0 2a8 8 0 0 0-8 8c0 4.418 3.582 8 8 8s8-3.582 8-8a8 8 0 0 0-8-8m0 3a3 3 0 0 1 3 3c0 1.657-1.343 3-3 3s-3-1.343-3-3c0-1.657 1.343-3 3-3m0 7.5c2.03 0 3.82 1.409 4.5 3.5-1.23.865-2.773 1.5-4.5 1.5-1.727 0-3.27-.635-4.5-1.5.68-2.091 2.47-3.5 4.5-3.5z" />
                          </svg>
                        </div>
                        {t('support.technologySpecialist')}
                      </a>
                      <a 
                        href="https://wa.me/5511888888888" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group px-6 py-3 rounded-lg bg-dark-700 hover:bg-dark-600 text-white font-medium border border-primary-500/20 hover:border-primary-500/40 shadow-md hover:shadow-primary-500/10 transition-all duration-300 flex items-center justify-center"
                      >
                        <div className="bg-primary-500/20 group-hover:bg-primary-500/30 rounded-full p-1.5 mr-3 transition-colors duration-300">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m0 2a8 8 0 0 0-8 8c0 4.418 3.582 8 8 8s8-3.582 8-8a8 8 0 0 0-8-8m0 3a3 3 0 0 1 3 3c0 1.657-1.343 3-3 3s-3-1.343-3-3c0-1.657 1.343-3 3-3m0 7.5c2.03 0 3.82 1.409 4.5 3.5-1.23.865-2.773 1.5-4.5 1.5-1.727 0-3.27-.635-4.5-1.5.68-2.091 2.47-3.5 4.5-3.5z" />
                          </svg>
                        </div>
                        {t('support.salesSpecialist')}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
