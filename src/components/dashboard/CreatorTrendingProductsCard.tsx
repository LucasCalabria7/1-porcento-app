"use client";

import { TrendingUp, ShoppingBag, BarChart2, ExternalLink, Video, Camera } from 'lucide-react';
import Link from 'next/link';
import { useAppTranslations } from '@/lib/useAppTranslations';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  commission: number;
  salesGrowth: number;
  image: string;
}

interface CreatorTrendingProductsCardProps {
  trendingProducts?: Product[];
  bestSellingProducts?: Product[];
  currency?: string;
}

export default function CreatorTrendingProductsCard({
  trendingProducts = [
    {
      id: "prod-1",
      name: "Curso Avançado de Edição de Vídeo",
      category: "Educação",
      price: 997,
      commission: 349,
      salesGrowth: 32,
      image: "/products/edicao-video.jpg"
    },
    {
      id: "prod-2",
      name: "E-book Monetização de Conteúdo",
      category: "Digital",
      price: 97,
      commission: 48.5,
      salesGrowth: 28,
      image: "/products/ebook-monetizacao.jpg"
    },
    {
      id: "prod-3",
      name: "Template Premium para YouTube",
      category: "Design",
      price: 197,
      commission: 78.8,
      salesGrowth: 24,
      image: "/products/template-youtube.jpg"
    }
  ],
  bestSellingProducts = [
    {
      id: "prod-4",
      name: "Curso Completo de Storytelling",
      category: "Educação",
      price: 597,
      commission: 209,
      salesGrowth: 12,
      image: "/products/storytelling.jpg"
    },
    {
      id: "prod-5",
      name: "Plugin de Efeitos para Vídeo",
      category: "Tecnologia",
      price: 297,
      commission: 118.8,
      salesGrowth: 8,
      image: "/products/plugin-video.jpg"
    },
    {
      id: "prod-6",
      name: "Mentoria de Crescimento de Canal",
      category: "Desenvolvimento",
      price: 1997,
      commission: 699,
      salesGrowth: 15,
      image: "/products/mentoria-canal.jpg"
    }
  ],
  currency = "R$"
}: CreatorTrendingProductsCardProps) {
  
  // Função para formatar valores monetários
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR');
  };
  
  const { t } = useAppTranslations();
  
  return (
    <div className="bg-dark-800 rounded-lg shadow-lg border border-dark-600 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <TrendingUp className="w-5 h-5 text-primary-400 mr-2" />
            {t('dashboard.creator.trendingProducts')}
          </h3>
          <Link href="/dashboard/products" className="text-primary-400 text-sm flex items-center hover:text-primary-300 transition-colors">
            {t('dashboard.creator.viewAll')}
            <ExternalLink className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-dark-600 mb-4">
          <button className="px-4 py-2 text-sm font-medium text-white border-b-2 border-primary-500">
            {t('dashboard.creator.trendingProducts')}
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white">
            {t('dashboard.creator.bestSellers')}
          </button>
        </div>
        
        {/* Produtos em tendência */}
        <div className="space-y-4">
          {trendingProducts.map((product) => (
            <div key={product.id} className="bg-dark-700 rounded-lg p-4 hover:bg-dark-600 transition-colors">
              <div className="flex items-center">
                <div className="relative w-12 h-12 rounded-md overflow-hidden bg-dark-600 mr-4 flex-shrink-0">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Video className="w-6 h-6 text-primary-400" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="text-sm font-medium text-white">{product.name}</h4>
                    <div className="flex items-center text-xs text-gray-400 mt-1">
                      <span className="mr-2">{t('dashboard.associate.growth')}:</span>
                      <span className="text-primary-400 font-medium flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {product.salesGrowth}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-2">
                    <div>
                      <p className="text-xs text-gray-400">{product.category}</p>
                      <p className="text-sm text-white">{currency} {formatCurrency(product.price)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-400">{t('dashboard.creator.sortBy')}:</span>
                      <select className="text-xs bg-dark-700 border border-dark-600 text-white rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary-500">
                        <option>{t('dashboard.creator.mostSold')}</option>
                        <option>{t('dashboard.creator.highestCommission')}</option>
                        <option>{t('dashboard.creator.newest')}</option>
                      </select>
                    </div>
                  </div>
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
                  {t('dashboard.creator.createContent')}
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* Estatísticas */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-dark-700 rounded-lg p-4 border border-dark-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 text-green-400 mr-2" />
                <span className="text-sm text-white">{t('dashboard.associate.commission')}</span>
              </div>
              <span className="text-sm font-medium text-green-400">+28%</span>
            </div>
          </div>
          <div className="bg-dark-700 rounded-lg p-4 border border-dark-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-xs text-gray-400 mt-1">
                <span className="mr-2">{t('dashboard.associate.conversion')}:</span>
                <span className="text-primary-400 font-medium">
                  4.2%
                </span>
                <Camera className="w-4 h-4 text-primary-400 mr-2" />
                <span className="text-sm text-white">{t('dashboard.associate.conversion')}</span>
              </div>
              <span className="text-sm font-medium text-primary-400">4.2%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
