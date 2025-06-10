"use client";

export default function NucleusSection() {
  return (
    <section id="nucleos" className="py-24 bg-dark-800">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-gotham-black text-white text-center mb-12">
          <span className="text-primary-400">Núcleos</span> 1% World
        </h2>
        <div className="grid md:grid-cols-2 gap-8 h-full">
          {/* 1% World Vendas Card */}
          <div id="sales-nucleus" className="relative overflow-hidden bg-gradient-to-br from-dark-700 to-dark-800 border border-dark-600 rounded-2xl p-0 shadow-2xl group hover:border-primary-500/50 transition-all duration-300 flex flex-col h-full">
            {/* Card Header with Accent */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-400 h-2 w-full"></div>
            
            {/* Card Content */}
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex items-center mb-6">
                <div className="bg-primary-500/20 p-3 rounded-xl mr-4">
                  <svg className="w-8 h-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-gotham-black text-white group-hover:text-primary-400 transition-colors duration-300">1% World Vendas</h3>
              </div>
              
              <p className="text-gray-300 mb-8 leading-relaxed h-[60px]">
                Nosso núcleo de vendas reúne os melhores profissionais do mercado para 
                ajudar empresas a escalar seus resultados e vendedores a maximizar seus ganhos.
              </p>
              
              {/* Feature blocks - redesigned */}
              <div className="flex flex-col space-y-4 mb-8">
                <div className="bg-dark-600/30 backdrop-blur-sm p-5 rounded-xl border border-dark-500/50 hover:border-primary-500/30 transition-all duration-300">
                  <div className="flex items-center mb-3">
                    <div className="bg-primary-500/20 p-2 rounded-lg mr-3">
                      <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                      </svg>
                    </div>
                    <h4 className="font-medium text-white">Estratégias</h4>
                  </div>
                  <p className="text-sm text-gray-300 pl-10">
                    Metodologias comprovadas para aumentar conversões e maximizar resultados em vendas.
                  </p>
                </div>
                
                <div className="bg-dark-600/30 backdrop-blur-sm p-5 rounded-xl border border-dark-500/50 hover:border-primary-500/30 transition-all duration-300">
                  <div className="flex items-center mb-3">
                    <div className="bg-primary-500/20 p-2 rounded-lg mr-3">
                      <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                      </svg>
                    </div>
                    <h4 className="font-medium text-white">Mentoria</h4>
                  </div>
                  <p className="text-sm text-gray-300 pl-10">
                    Acompanhamento personalizado para desenvolver suas habilidades de vendas.
                  </p>
                </div>
              </div>
              
              {/* Buttons - redesigned and removed Instagram */}
              <div className="flex flex-col space-y-3">
                <a 
                  href="https://wa.me/group/xyz123" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-xl inline-flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-green-600/30"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Grupo WhatsApp
                </a>
                <a 
                  href="#" 
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-400 hover:from-primary-500 hover:to-primary-300 text-white font-medium py-3 px-6 rounded-xl inline-flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-primary-600/30"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                  </svg>
                  Acessar Núcleo
                </a>
              </div>
            </div>
          </div>
          
          {/* 1% World Tecnologia Card */}
          <div id="tech-nucleus" className="relative overflow-hidden bg-gradient-to-br from-dark-700 to-dark-800 border border-dark-600 rounded-2xl p-0 shadow-2xl group hover:border-primary-500/50 transition-all duration-300 flex flex-col h-full">
            {/* Card Header with Accent */}
            <div className="bg-gradient-to-r from-primary-400 to-primary-600 h-2 w-full"></div>
            
            {/* Card Content */}
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex items-center mb-6">
                <div className="bg-primary-500/20 p-3 rounded-xl mr-4">
                  <svg className="w-8 h-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-gotham-black text-white group-hover:text-primary-400 transition-colors duration-300">1% World Tecnologia</h3>
              </div>
              
              <p className="text-gray-300 mb-8 leading-relaxed h-[60px]">
                Nosso núcleo de tecnologia desenvolve soluções inovadoras para 
                impulsionar o crescimento de empresas e vendedores no mundo digital
                Para donos de empresas digitais.
              </p>
              
              {/* Feature blocks - redesigned */}
              <div className="flex flex-col space-y-4 mb-8">
                <div className="bg-dark-600/30 backdrop-blur-sm p-5 rounded-xl border border-dark-500/50 hover:border-primary-500/30 transition-all duration-300">
                  <div className="flex items-center mb-3">
                    <div className="bg-primary-500/20 p-2 rounded-lg mr-3">
                      <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                      </svg>
                    </div>
                    <h4 className="font-medium text-white">Inovação</h4>
                  </div>
                  <p className="text-sm text-gray-300 pl-10">
                    Tecnologias de ponta para otimizar processos e maximizar resultados,
                    Crie soluções únicas no digital.
                  </p>
                </div>
                
                <div className="bg-dark-600/30 backdrop-blur-sm p-5 rounded-xl border border-dark-500/50 hover:border-primary-500/30 transition-all duration-300">
                  <div className="flex items-center mb-3">
                    <div className="bg-primary-500/20 p-2 rounded-lg mr-3">
                      <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      </svg>
                    </div>
                    <h4 className="font-medium text-white">Comunidade</h4>
                  </div>
                  <p className="text-sm text-gray-300 pl-10">
                    Rede de profissionais e recursos para acelerar seu crescimento,
                    faça conexão com os 1% que dominam o mercado digital.
                  </p>
                </div>
              </div>
              
              {/* Buttons - redesigned and removed Instagram */}
              <div className="flex flex-col space-y-3">
                <a 
                  href="https://wa.me/group/abc123" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-xl inline-flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-green-600/30"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Grupo WhatsApp
                </a>
                <a 
                  href="#" 
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-400 hover:from-primary-500 hover:to-primary-300 text-white font-medium py-3 px-6 rounded-xl inline-flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-primary-600/30"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                  </svg>
                  Acessar Núcleo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
