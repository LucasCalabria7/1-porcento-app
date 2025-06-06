"use client";

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "A plataforma 1% World transformou completamente meu negócio digital. Consegui aumentar minhas vendas em mais de 300% em apenas 3 meses.",
      name: "Carlos Silva",
      role: "Empresário Digital",
      avatar: "/assets/avatar-1.png"
    },
    {
      quote: "Como afiliado, nunca tive tanto suporte e ferramentas de qualidade. A comunidade é incrível e os treinamentos são de alto nível.",
      name: "Ana Oliveira",
      role: "Afiliada Premium",
      avatar: "/assets/avatar-2.png"
    },
    {
      quote: "Meu produto digital estava estagnado até conhecer a 1% World. A estratégia de afiliados mudou tudo e agora tenho vendas recorrentes.",
      name: "Marcos Santos",
      role: "Criador de Conteúdo",
      avatar: "/assets/avatar-3.png"
    },
    {
      quote: "A mentoria personalizada foi fundamental para o meu crescimento. Aprendi estratégias que nunca imaginei e os resultados são impressionantes.",
      name: "Juliana Costa",
      role: "Empreendedora Digital",
      avatar: "/assets/avatar-4.png"
    }
  ];

  return (
    <section id="depoimentos" className="py-24 bg-dark-700">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-gotham-black text-white mb-4">Histórias de Sucesso</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Conheça algumas das pessoas que transformaram seus negócios e carreiras 
            através do ecossistema 1% World.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-dark-800 border border-dark-600 rounded-xl p-6 shadow-lg">
              <div className="flex items-start mb-4">
                <svg className="w-8 h-8 text-primary-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-gray-300 italic">{testimonial.quote}</p>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-primary-400">{testimonial.name.charAt(0)}</span>
                </div>
                <div>
                  <h4 className="font-medium text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
