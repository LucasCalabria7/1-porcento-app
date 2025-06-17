"use client";

import { Trophy, Gift, Award, Star, TrendingUp, Crown } from 'lucide-react';
import { useState } from 'react';
import { useAppTranslations } from '@/lib/useAppTranslations';

interface ProductAchievement {
  productName: string;
  currentValue: number;
  targetValue: number;
  level: string;
  nextReward: string;
  progress: number;
}

interface AssociateGamificationCardProps {
  totalSales?: number;
  targetSales?: number;
  currentLevel?: string;
  nextLevel?: string;
  nextReward?: string;
  currency?: string;
  productAchievements?: ProductAchievement[];
}

export default function AssociateGamificationCard({
  totalSales = 12500,
  targetSales = 15000,
  currentLevel,
  nextLevel,
  nextReward,
  currency = "$",
  productAchievements = [
    {
      productName: "Digital Marketing Course",
      currentValue: 4800,
      targetValue: 5000,
      level: "Bronze Specialist",
      nextReward: "Exclusive Certificate",
      progress: 96
    },
    {
      productName: "Email Marketing Tool",
      currentValue: 3200,
      targetValue: 5000,
      level: "Bronze Specialist",
      nextReward: "Individual Mentoring",
      progress: 64
    },
    {
      productName: "Copywriting Course",
      currentValue: 2800,
      targetValue: 5000,
      level: "Gold Beginner",
      nextReward: "Early Access v2.0",
      progress: 56
    }
  ]
}: AssociateGamificationCardProps) {
  
  const { t } = useAppTranslations();

  // Set default values with translations
  currentLevel = currentLevel || t('dashboard.associate.silverEntrepreneur');
  nextLevel = nextLevel || t('dashboard.associate.goldEntrepreneur');
  nextReward = nextReward || t('dashboard.associate.premiumConsulting');

  // Calculate overall progress percentage
  const progressPercentage = Math.min(Math.round((totalSales / targetSales) * 100), 100);
  
  // Format currency values
  const formattedTotalSales = totalSales.toLocaleString('en-US');
  const formattedTargetSales = targetSales.toLocaleString('en-US');
  
  // State to control which product is expanded
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  
  // Gamification levels
  const levels = [
    { name: t('dashboard.associate.bronze'), color: "bg-amber-700" },
    { name: t('dashboard.associate.silver'), color: "bg-gray-400" },
    { name: t('dashboard.associate.gold'), color: "bg-yellow-400" },
    { name: t('dashboard.associate.platinum'), color: "bg-blue-400" },
    { name: t('dashboard.associate.diamond'), color: "bg-purple-400" }
  ];
  
  return (
    <div className="relative">
      {/* Borda animada com identidade visual da sidebar */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-primary-400 rounded-lg opacity-75 blur-sm animate-pulse"></div>
      
      {/* Card content */}
      <div className="bg-gradient-to-br from-dark-800 to-dark-700 rounded-lg border border-primary-700/30 p-6 shadow-lg relative z-10">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Trophy className="w-6 h-6 text-yellow-400 mr-2" />
            <h3 className="text-lg font-semibold text-white">{t('dashboard.associate.gamificationSystem')}</h3>
          </div>
          <div className="bg-primary-900/30 text-primary-400 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
            <Crown className="w-3 h-3 mr-1" />
            {currentLevel}
          </div>
        </div>
        
        {/* Progresso geral */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-white font-medium">{currency} {formattedTotalSales}</span>
            <span className="text-gray-400">{currency} {formattedTargetSales}</span>
          </div>
          <div className="w-full bg-dark-600 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-primary-600 to-primary-400 h-3 rounded-full transition-all duration-500 ease-in-out" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{progressPercentage}% {t('dashboard.associate.toNextLevel')}</span>
            <span>{t('dashboard.associate.next')}: {nextLevel}</span>
          </div>
        </div>
        
        {/* Próxima recompensa */}
        <div className="bg-dark-700/50 rounded-lg p-3 mb-6 border border-dark-600">
          <div className="flex items-center">
            <Gift className="w-5 h-5 text-primary-400 mr-2" />
            <div>
              <p className="text-xs text-gray-400">Próxima recompensa:</p>
              <p className="text-sm text-white font-medium">{nextReward}</p>
            </div>
          </div>
        </div>
        
        {/* Níveis de gamificação */}
        <div className="flex justify-between mb-6">
          {levels.map((level, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`w-4 h-4 rounded-full ${level.color} mb-1 ${currentLevel.includes(level.name) ? 'ring-2 ring-white' : ''}`}></div>
              <span className={`text-xs ${currentLevel.includes(level.name) ? 'text-white' : 'text-gray-400'}`}>{level.name}</span>
            </div>
          ))}
        </div>
        
        {/* Divisor */}
        <div className="border-t border-dark-600 my-4"></div>
        
        {/* Gamificação por produto */}
        <div>
          <h4 className="text-sm font-medium text-white mb-3 flex items-center">
            <Award className="w-4 h-4 text-primary-400 mr-1" />
            {t('dashboard.associate.achievementsByProduct')}
          </h4>
          
          <div className="space-y-4">
            {productAchievements.map((product, index) => (
              <div 
                key={index} 
                className="bg-dark-700/50 rounded-lg border border-dark-600 overflow-hidden"
              >
                <div 
                  className="p-3 cursor-pointer hover:bg-dark-600/50 transition-colors"
                  onClick={() => setExpandedProduct(expandedProduct === product.productName ? null : product.productName)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-2" />
                      <span className="text-sm text-white">{product.productName}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-primary-400 mr-2">{product.level}</span>
                      <TrendingUp className={`w-4 h-4 transform transition-transform ${expandedProduct === product.productName ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                  
                  {/* Barra de progresso */}
                  <div className="mt-2">
                    <div className="w-full bg-dark-600 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary-600 to-primary-400 h-2 rounded-full" 
                        style={{ width: `${product.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>{currency} {product.currentValue.toLocaleString('pt-BR')}</span>
                      <span>{product.progress}%</span>
                      <span>{currency} {product.targetValue.toLocaleString('pt-BR')}</span>
                    </div>
                  </div>
                </div>
                
                {/* Detalhes expandidos */}
                {expandedProduct === product.productName && (
                  <div className="p-3 pt-0 border-t border-dark-600 mt-2">
                    <div className="flex items-start space-x-2 mt-3">
                      <Gift className="w-4 h-4 text-primary-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-400">{t('dashboard.associate.nextReward')}:</p>
                        <p className="text-sm text-white">{product.nextReward}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-5 gap-1">
                      {[t('dashboard.associate.bronze'), t('dashboard.associate.silver'), t('dashboard.associate.gold'), t('dashboard.associate.platinum'), t('dashboard.associate.diamond')].map((level, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                          <div className={`w-3 h-3 rounded-full mb-1 ${
                            level === t('dashboard.associate.bronze') ? 'bg-amber-700' :
                            level === t('dashboard.associate.silver') ? 'bg-gray-400' :
                            level === t('dashboard.associate.gold') ? 'bg-yellow-400' :
                            level === t('dashboard.associate.platinum') ? 'bg-blue-400' : 'bg-purple-400'
                          } ${product.level.includes(level) ? 'ring-1 ring-white' : ''}`}></div>
                          <span className={`text-xs ${product.level.includes(level) ? 'text-white' : 'text-gray-500'}`}>
                            {level.charAt(0)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Botão para ver ranking completo */}
        <button className="w-full mt-4 bg-primary-600/20 hover:bg-primary-600/30 text-primary-400 px-4 py-2 rounded-md transition-all text-sm flex items-center justify-center">
          <Trophy className="w-4 h-4 mr-2" />
          Ver Ranking Completo
        </button>
      </div>
    </div>
  );
}
