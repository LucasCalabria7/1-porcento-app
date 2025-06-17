"use client";

import { Brain, Zap, ShoppingBag, ArrowRight, BarChart2, Camera, Video, Users } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useAppTranslations } from '@/lib/useAppTranslations';

interface RecommendedProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  commission: number;
  matchScore: number;
  reason: string;
  image: string;
  type: 'commission' | 'campaign' | 'both';
}

interface AICreatorRecommendationCardProps {
  creatorName?: string;
  recommendedProducts?: RecommendedProduct[];
  currency?: string;
}

export default function AICreatorRecommendationCard({
  creatorName = "Lucas",
  recommendedProducts = [
    {
      id: "prod-7",
      name: "Curso de Edição Profissional",
      category: "Educação",
      price: 1297,
      commission: 454,
      matchScore: 98,
      reason: "Combina com seu conteúdo sobre produção de vídeo",
      image: "/products/edicao-pro.jpg",
      type: 'commission'
    },
    {
      id: "prod-8",
      name: "Software de Animação 3D",
      category: "Tecnologia",
      price: 497,
      commission: 199,
      matchScore: 95,
      reason: "Complementa seus tutoriais de design",
      image: "/products/animacao-3d.jpg",
      type: 'commission'
    },
    {
      id: "prod-9",
      name: "Campanha de Marca de Câmeras",
      category: "Patrocínio",
      price: 2997,
      commission: 899,
      matchScore: 92,
      reason: "Alinhado com seu nicho de fotografia",
      image: "/products/campanha-cameras.jpg",
      type: 'campaign'
    },
    {
      id: "prod-10",
      name: "Parceria com Plataforma de Streaming",
      category: "Patrocínio",
      price: 1500,
      commission: 750,
      matchScore: 94,
      reason: "Ideal para seu formato de conteúdo",
      image: "/products/streaming-parceria.jpg",
      type: 'campaign'
    },
    {
      id: "prod-11",
      name: "Curso + Campanha de Marketing",
      category: "Híbrido",
      price: 2200,
      commission: 880,
      matchScore: 97,
      reason: "Perfeito para seu perfil de criador educacional",
      image: "/products/curso-campanha.jpg",
      type: 'both'
    },
    {
      id: "prod-12",
      name: "Software + Programa de Embaixador",
      category: "Híbrido",
      price: 1800,
      commission: 720,
      matchScore: 96,
      reason: "Combina comissão e exposição para sua audiência",
      image: "/products/software-embaixador.jpg",
      type: 'both'
    }
  ],
  currency = "R$"
}: AICreatorRecommendationCardProps) {
  const { t } = useAppTranslations();
  
  // Estado para controlar a aba ativa
  const [activeTab, setActiveTab] = useState<'commission' | 'campaign' | 'both'>('commission');
  
  // Função para formatar valores monetários
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR');
  };
  
  // Filtrar produtos com base na aba selecionada
  const filteredProducts = recommendedProducts.filter(product => product.type === activeTab);
  
  return (
    <div className="bg-gradient-to-r from-primary-900/30 to-dark-700 rounded-lg p-6 shadow-lg border-2 border-primary-500">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Brain className="w-5 h-5 text-primary-400 mr-2" />
          <h3 className="text-lg font-semibold text-white">
            {t('dashboard.creator.recommendedForYou')} • <span className="text-primary-400">1% AI</span>
          </h3>
        </div>
        <div className="bg-primary-900/30 text-primary-400 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
          {t('dashboard.creator.personalized')}
        </div>
      </div>
      
      <p className="text-gray-300 text-sm mb-6">
        {t('dashboard.creator.aiCreatorRecommendationDescription')}
      </p>
      
      {/* Tabs para diferentes tipos de produtos */}
      <div className="flex border-b border-dark-600 mb-6">
        <button 
          className={`px-4 py-2 text-sm font-medium ${activeTab === 'commission' ? 'text-white border-b-2 border-primary-500' : 'text-gray-400 hover:text-white'}`}
          onClick={() => setActiveTab('commission')}
        >
          {t('dashboard.creator.commission')}
        </button>
        <button 
          className={`px-4 py-2 text-sm font-medium ${activeTab === 'campaign' ? 'text-white border-b-2 border-primary-500' : 'text-gray-400 hover:text-white'}`}
          onClick={() => setActiveTab('campaign')}
        >
          {t('dashboard.creator.campaigns')}
        </button>
        <button 
          className={`px-4 py-2 text-sm font-medium ${activeTab === 'both' ? 'text-white border-b-2 border-primary-500' : 'text-gray-400 hover:text-white'}`}
          onClick={() => setActiveTab('both')}
        >
          {t('dashboard.creator.hybrid')}
        </button>
      </div>
      
      <div className="space-y-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-dark-800/60 rounded-lg p-4 border border-dark-600 hover:border-primary-500/50 transition-all">
            <div className="flex items-center">
              <div className="relative w-12 h-12 rounded-md overflow-hidden bg-dark-600 mr-4 flex-shrink-0">
                <div className="absolute inset-0 flex items-center justify-center">
                  {product.type === 'commission' && <ShoppingBag className="w-6 h-6 text-primary-400" />}
                  {product.type === 'campaign' && <Camera className="w-6 h-6 text-primary-400" />}
                  {product.type === 'both' && <Video className="w-6 h-6 text-primary-400" />}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="text-sm font-medium text-white">{product.name}</h4>
                  <div className="flex items-center bg-primary-900/40 text-primary-300 px-2 py-0.5 rounded-full text-xs">
                    <Zap className="w-3 h-3 mr-1" />
                    {product.matchScore}% {t('dashboard.creator.match')}
                  </div>
                </div>
                
                <div className="mt-1">
                  <p className="text-xs text-gray-400">{product.category}</p>
                </div>
                
                <div className="flex justify-between mt-2">
                  <div>
                    <p className="text-xs text-gray-400">
                      {product.type === 'commission' ? t('dashboard.creator.price') : 
                       product.type === 'campaign' ? t('dashboard.creator.value') : t('dashboard.creator.totalValue')}
                    </p>
                    <p className="text-sm text-white">{currency} {formatCurrency(product.price)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">
                      {product.type === 'commission' ? t('dashboard.creator.yourCommission') : 
                       product.type === 'campaign' ? t('dashboard.creator.yourFee') : t('dashboard.creator.yourEarnings')}
                    </p>
                    <p className="text-sm font-medium text-primary-400">{currency} {formatCurrency(product.commission)}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-3 border-t border-dark-600 pt-3">
              <div className="flex items-start">
                <Brain className="w-4 h-4 text-primary-400 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-xs text-gray-300">{product.reason}</p>
              </div>
            </div>
            
            <div className="mt-3 flex">
              <Link 
                href={`/dashboard/products/${product.id}`}
                className="flex-1 bg-dark-600 hover:bg-dark-500 text-white text-xs px-3 py-1.5 rounded-l-md transition-colors text-center"
              >
                {t('dashboard.creator.viewDetails')}
              </Link>
              <Link 
                href={`/dashboard/promote/${product.id}`}
                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white text-xs px-3 py-1.5 rounded-r-md transition-colors text-center"
              >
                {product.type === 'commission' ? t('dashboard.creator.promoteNow') : 
                 product.type === 'campaign' ? t('dashboard.creator.apply') : t('dashboard.creator.participate')}
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 bg-dark-800/60 rounded-lg p-4 border border-dark-600">
        <h4 className="text-sm font-medium text-white mb-2 flex items-center">
          <BarChart2 className="w-4 h-4 text-primary-400 mr-2" />
          {t('dashboard.creator.aiInsights')}
        </h4>
        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex items-start">
            <div className="w-1 h-1 rounded-full bg-primary-400 mt-1.5 mr-2"></div>
            <span>{t('dashboard.creator.contentInsight', { type: activeTab === 'commission' ? t('dashboard.creator.tutorials') : activeTab === 'campaign' ? t('dashboard.creator.reviews') : t('dashboard.creator.education') })}</span>
          </li>
          <li className="flex items-start">
            <div className="w-1 h-1 rounded-full bg-primary-400 mt-1.5 mr-2"></div>
            <span>{t('dashboard.creator.audienceInsight', { type: activeTab === 'commission' ? t('dashboard.creator.educationalProducts') : activeTab === 'campaign' ? t('dashboard.creator.premiumBrands') : t('dashboard.creator.combinedOffers') })}</span>
          </li>
          <li className="flex items-start">
            <div className="w-1 h-1 rounded-full bg-primary-400 mt-1.5 mr-2"></div>
            <span>{activeTab === 'commission' ? t('dashboard.creator.practicalDemoProducts') : activeTab === 'campaign' ? t('dashboard.creator.storytellingCampaigns') : t('dashboard.creator.longTermPartnerships')} {t('dashboard.creator.highPotential')}</span>
          </li>
        </ul>
        
        <Link 
          href="/dashboard/ai-insights"
          className="mt-4 inline-flex items-center text-sm text-primary-400 hover:text-primary-300"
        >
          {t('dashboard.creator.viewFullAnalysis')}
          <ArrowRight className="w-3 h-3 ml-1" />
        </Link>
      </div>
    </div>
  );
}
