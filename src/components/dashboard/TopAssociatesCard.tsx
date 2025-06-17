"use client";

import { Users, TrendingUp, ArrowRight } from 'lucide-react';
import { useAppTranslations } from '@/lib/useAppTranslations';

interface Associate {
  name: string;
  sales: number;
  growth: number;
  avatar: string;
}

interface TopAssociatesCardProps {
  title?: string;
  associates?: Associate[];
  currency?: string;
}

export default function TopAssociatesCard({
  title,
  associates = [
    { 
      name: "Ana Silva", 
      sales: 12580, 
      growth: 15, 
      avatar: "https://i.pravatar.cc/150?img=1" 
    },
    { 
      name: "Carlos Mendes", 
      sales: 9450, 
      growth: 8, 
      avatar: "https://i.pravatar.cc/150?img=3" 
    },
    { 
      name: "Juliana Costa", 
      sales: 7820, 
      growth: 12, 
      avatar: "https://i.pravatar.cc/150?img=5" 
    },
    { 
      name: "Rafael Souza", 
      sales: 6540, 
      growth: -3, 
      avatar: "https://i.pravatar.cc/150?img=7" 
    },
  ],
  currency = "R$"
}: TopAssociatesCardProps) {
  const { t } = useAppTranslations();
  
  // Set default title with translation
  title = title || t('dashboard.ceo.topAssociates');
  
  return (
    <div className="bg-gradient-to-br from-dark-800 to-dark-700 rounded-lg border border-dark-600 p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Users className="w-5 h-5 text-primary-400 mr-2" />
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        <button className="text-xs text-primary-400 hover:text-primary-300 flex items-center">
          {t('dashboard.ceo.viewAll')}
          <ArrowRight className="w-3 h-3 ml-1" />
        </button>
      </div>
      
      <div className="space-y-4">
        {associates.map((associate, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-500">
                  <img 
                    src={associate.avatar} 
                    alt={associate.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-white">{associate.name}</p>
                <p className="text-xs text-gray-400">{currency} {associate.sales.toLocaleString('pt-BR')}</p>
              </div>
            </div>
            <div className={`flex items-center text-xs ${associate.growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              <TrendingUp className={`w-3 h-3 mr-1 ${associate.growth < 0 ? 'transform rotate-180' : ''}`} />
              {associate.growth >= 0 ? '+' : ''}{associate.growth}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
