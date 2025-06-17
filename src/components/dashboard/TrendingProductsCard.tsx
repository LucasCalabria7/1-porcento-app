"use client";

import { TrendingUp, ShoppingBag, BarChart2, ExternalLink } from 'lucide-react';
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

interface TrendingProductsCardProps {
  trendingProducts?: Product[];
  bestSellingProducts?: Product[];
  currency?: string;
}

export default function TrendingProductsCard({
  trendingProducts = [
    {
      id: "prod-1",
      name: "Curso Avançado de Marketing Digital",
      category: "Educação",
      price: 997,
      commission: 349,
      salesGrowth: 32,
      image: "/products/marketing-digital.jpg"
    },
    {
      id: "prod-2",
      name: "E-book Investimentos Inteligentes",
      category: "Finanças",
      price: 97,
      commission: 48.5,
      salesGrowth: 28,
      image: "/products/ebook-investimentos.jpg"
    },
    {
      id: "prod-3",
      name: "Template Premium para Landing Pages",
      category: "Design",
      price: 197,
      commission: 78.8,
      salesGrowth: 24,
      image: "/products/template-landing.jpg"
    }
  ],
  bestSellingProducts = [
    {
      id: "prod-4",
      name: "Curso Completo de Copywriting",
      category: "Educação",
      price: 597,
      commission: 209,
      salesGrowth: 12,
      image: "/products/copywriting.jpg"
    },
    {
      id: "prod-5",
      name: "Plugin de Automação para WordPress",
      category: "Tecnologia",
      price: 297,
      commission: 118.8,
      salesGrowth: 8,
      image: "/products/plugin-wordpress.jpg"
    },
    {
      id: "prod-6",
      name: "Mentoria de Produtividade",
      category: "Desenvolvimento Pessoal",
      price: 1997,
      commission: 699,
      salesGrowth: 15,
      image: "/products/mentoria-produtividade.jpg"
    }
  ],
  currency = "R$"
}: TrendingProductsCardProps) {
  
  // Função para formatar valores monetários
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR');
  };
  
  const { t } = useAppTranslations();
  
  return (
    <div className="bg-dark-800 rounded-lg shadow-lg border-2 border-primary-500">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <TrendingUp className="w-5 h-5 text-primary-400 mr-2" />
            <h3 className="text-lg font-semibold text-white">{t('dashboard.creator.trendingProducts')}</h3>
          </div>
          <Link href="/dashboard/products" className="text-sm text-primary-400 hover:text-primary-300 flex items-center">
            {t('dashboard.creator.viewAll')}
            <ExternalLink className="w-3 h-3 ml-1" />
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
                    <ShoppingBag className="w-6 h-6 text-primary-400" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="text-sm font-medium text-white">{product.name}</h4>
                    <span className="text-xs bg-primary-900/30 text-primary-400 px-2 py-0.5 rounded-full flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +{product.salesGrowth}%
                    </span>
                  </div>
                  
                  <div className="flex justify-between mt-2">
                    <div>
                      <p className="text-xs text-gray-400">{product.category}</p>
                      <p className="text-sm text-white">{currency} {formatCurrency(product.price)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">{t('dashboard.associate.commission')}</p>
                      <p className="text-sm font-medium text-primary-400">{currency} {formatCurrency(product.commission)}</p>
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
                  {t('dashboard.promote')}
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
                <span className="text-sm text-white">{t('dashboard.associate.growth')}</span>
              </div>
              <span className="text-sm font-medium text-green-400">+28%</span>
            </div>
          </div>
          <div className="bg-dark-700 rounded-lg p-4 border border-dark-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BarChart2 className="w-4 h-4 text-primary-400 mr-2" />
                <span className="text-sm text-white">{t('dashboard.associate.commission')}</span>
              </div>
              <span className="text-sm font-medium text-primary-400">{currency} 158,76</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
