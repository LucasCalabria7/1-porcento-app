"use client";

import { Package, TrendingUp, ArrowRight, PlusCircle } from 'lucide-react';
import { useAppTranslations } from '@/lib/useAppTranslations';

interface Product {
  name: string;
  sales: number;
  growth: number;
  image: string;
}

interface TopProductsCardProps {
  title?: string;
  products?: Product[] | null;
  currency?: string;
}

export default function TopProductsCard({
  title,
  products = [
    { 
      name: "Digital Marketing Course", 
      sales: 24580, 
      growth: 18, 
      image: "/images/product-1.jpg" 
    },
    { 
      name: "Online Sales E-book", 
      sales: 18450, 
      growth: 12, 
      image: "/images/product-2.jpg" 
    },
    { 
      name: "Entrepreneur Mentoring", 
      sales: 15820, 
      growth: 5, 
      image: "/images/product-3.jpg" 
    },
  ],
  currency = "$"
}: TopProductsCardProps) {
  const { t } = useAppTranslations();
  
  // Set default title with translation
  title = title || t('dashboard.ceo.topProducts');
  
  // If there are no products, show the add product screen
  if (!products || products.length === 0) {
    return (
      <div className="bg-gradient-to-br from-dark-800 to-dark-700 rounded-lg border border-dark-600 p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Package className="w-5 h-5 text-primary-400 mr-2" />
            <h3 className="text-lg font-semibold text-white">{title}</h3>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center py-8">
          <div className="bg-dark-600/50 rounded-full p-4 mb-4">
            <Package className="w-10 h-10 text-primary-400" />
          </div>
          <p className="text-gray-400 text-center mb-4">
            {t('dashboard.creator.noProductsYet')}
            <br />
            {t('dashboard.creator.addFirstProduct')}
          </p>
          <button className="flex items-center bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition-all">
            <PlusCircle className="w-4 h-4 mr-2" />
            {t('dashboard.creator.addProduct')}
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gradient-to-br from-dark-800 to-dark-700 rounded-lg border border-dark-600 p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Package className="w-5 h-5 text-primary-400 mr-2" />
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        <button className="text-xs text-primary-400 hover:text-primary-300 flex items-center">
          {t('dashboard.ceo.viewAll')}
          <ArrowRight className="w-3 h-3 ml-1" />
        </button>
      </div>
      
      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-md overflow-hidden mr-3 border border-dark-600 bg-dark-600">
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-5 h-5 text-gray-400" />
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{product.name}</p>
                <p className="text-xs text-gray-400">{currency} {product.sales.toLocaleString('pt-BR')}</p>
              </div>
            </div>
            <div className={`flex items-center text-xs ${product.growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              <TrendingUp className={`w-3 h-3 mr-1 ${product.growth < 0 ? 'transform rotate-180' : ''}`} />
              {product.growth >= 0 ? '+' : ''}{product.growth}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
