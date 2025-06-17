"use client";

import { Brain, ChevronRight, ExternalLink } from 'lucide-react';

interface AIStrategyCardProps {
  title?: string;
  productName?: string;
  insights?: string[];
}

export default function AIStrategyCard({
  title = "Análise Estratégica",
  productName = "AgentAI",
  insights = [
    "O produto tem potencial para aumentar as vendas em 32% com melhorias na página de vendas.",
    "Clientes buscam mais casos de uso práticos e exemplos de implementação.",
    "A concorrência está focando em integrações com plataformas populares.",
    "Recomendamos criar conteúdo educacional sobre IA para atrair mais leads qualificados."
  ]
}: AIStrategyCardProps) {
  return (
    <div className="bg-gradient-to-r from-primary-900/30 to-dark-700 rounded-lg p-6 shadow-lg border-2 border-primary-500">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Brain className="w-5 h-5 text-primary-400 mr-2" />
          <h3 className="text-lg font-semibold text-white">
            {title} • <span className="text-primary-400">{productName}</span>
          </h3>
        </div>
        <div className="bg-primary-900/30 text-primary-400 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
          1% AI
        </div>
      </div>
      
      <div className="mt-4 space-y-3">
        {insights.map((insight, index) => (
          <div key={index} className="flex">
            <ChevronRight className="w-5 h-5 text-primary-400 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-300">{insight}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-6 border-t border-dark-600 pt-4">
        <button className="w-full flex items-center justify-center bg-primary-600/20 hover:bg-primary-600/30 text-primary-400 px-4 py-2 rounded-md transition-all text-sm">
          <ExternalLink className="w-4 h-4 mr-2" />
          Ver análise completa
        </button>
      </div>
    </div>
  );
}
