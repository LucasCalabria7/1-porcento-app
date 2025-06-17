"use client";

import { Brain, Zap, ShoppingBag, ArrowRight, BarChart2 } from 'lucide-react';
import Link from 'next/link';
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
  description?: string;
}

interface AIProductRecommendationCardProps {
  associateName?: string;
  recommendedProducts?: RecommendedProduct[];
  currency?: string;
}

export default function AIProductRecommendationCard({
  associateName = "Lucas",
  recommendedProducts = [
    { 
      id: "1",
      name: "Digital Marketing Course", 
      description: "Learn advanced digital marketing strategies to increase your sales.",
      category: "Marketing",
      price: 297,
      commission: 89.10,
      matchScore: 95,
      reason: "Matches your sales history in marketing products",
      image: "/images/product-marketing.jpg"
    },
    { 
      id: "2",
      name: "Email Marketing Tool", 
      description: "Complete platform for email marketing automation with optimized templates.",
      category: "Marketing",
      price: 49,
      commission: 14.70,
      matchScore: 92,
      reason: "Complements your digital marketing products",
      image: "/images/product-email.jpg"
    },
    { 
      id: "3",
      name: "Copywriting Course", 
      description: "Master the art of writing persuasive texts that convert into sales.",
      category: "Negócios",
      price: 197,
      commission: 59.10,
      matchScore: 88,
      reason: "Aligned with your buyers' profile",
      image: "/images/product-copy.jpg"
    }
  ],
  currency = "$"
}: AIProductRecommendationCardProps) {
  
  const { t } = useAppTranslations();
  
  // Function to format currency values
  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US');
  };
  
  return (
    <div className="bg-gradient-to-r from-primary-900/30 to-dark-700 rounded-lg p-6 shadow-lg border-2 border-primary-500">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Brain className="w-5 h-5 text-primary-400 mr-2" />
          <h3 className="text-lg font-semibold text-white">
            {t('dashboard.associate.recommendedForYou')} • <span className="text-primary-400">1% AI</span>
          </h3>
        </div>
        <div className="bg-primary-900/30 text-primary-400 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
            {t('dashboard.associate.personalized')}
          </div>
      </div>
      
      <p className="text-gray-300 text-sm mb-6">
        {t('dashboard.associate.aiRecommendationDescription')}
      </p>
      
      <div className="space-y-4">
        {recommendedProducts.map((product) => (
          <div key={product.id} className="bg-dark-800/60 rounded-lg p-4 border border-dark-600 hover:border-primary-500/50 transition-all">
            <div className="flex items-center">
              <div className="relative w-12 h-12 rounded-md overflow-hidden bg-dark-600 mr-4 flex-shrink-0">
                <div className="absolute inset-0 flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-primary-400" />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="text-sm font-medium text-white">{product.name}</h4>
                  <div className="flex items-center bg-primary-900/40 text-primary-300 px-2 py-0.5 rounded-full text-xs">
                    <Zap className="w-3 h-3 mr-1" />
                    {product.matchScore}% {t('dashboard.associate.match')}
                  </div>
                </div>
                
                <div className="mt-1">
                  <p className="text-xs text-gray-400">{product.category}</p>
                </div>
                
                <div className="flex justify-between mt-2">
                  <div>
                    <p className="text-xs text-gray-400">{t('dashboard.associate.price')}</p>
                    <p className="text-sm text-white">{currency} {formatCurrency(product.price)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">{t('dashboard.associate.yourCommission')}</p>
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
                Ver Detalhes
              </Link>
              <Link 
                href={`/dashboard/promote/${product.id}`}
                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white text-xs px-3 py-1.5 rounded-r-md transition-colors text-center"
              >
                Promover Agora
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 bg-dark-800/60 rounded-lg p-4 border border-dark-600">
        <h4 className="text-sm font-medium text-white mb-2 flex items-center">
          <BarChart2 className="w-4 h-4 text-primary-400 mr-2" />
          Insights da 1% AI
        </h4>
        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex items-start">
            <div className="w-1 h-1 rounded-full bg-primary-400 mt-1.5 mr-2"></div>
            <span>Produtos de negócios e marketing têm maior taxa de conversão no seu perfil</span>
          </li>
          <li className="flex items-start">
            <div className="w-1 h-1 rounded-full bg-primary-400 mt-1.5 mr-2"></div>
            <span>Seu público responde melhor a produtos na faixa de R$ 500-1500</span>
          </li>
          <li className="flex items-start">
            <div className="w-1 h-1 rounded-full bg-primary-400 mt-1.5 mr-2"></div>
            <span>Produtos com foco em automação e produtividade têm alto potencial</span>
          </li>
        </ul>
        
        <Link 
          href="/dashboard/ai-insights"
          className="mt-4 inline-flex items-center text-sm text-primary-400 hover:text-primary-300"
        >
          Ver análise completa
          <ArrowRight className="w-3 h-3 ml-1" />
        </Link>
      </div>
    </div>
  );
}
