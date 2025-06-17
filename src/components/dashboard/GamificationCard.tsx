"use client";

import { Trophy, Gift } from 'lucide-react';
import { useAppTranslations } from '@/lib/useAppTranslations';

interface GamificationCardProps {
  title?: string;
  currentValue?: number;
  targetValue?: number;
  level?: string;
  nextReward?: string;
  currency?: string;
}

export default function GamificationCard({
  title,
  currentValue = 8750,
  targetValue = 10000,
  level,
  nextReward,
  currency = "R$"
}: GamificationCardProps) {
  const { t } = useAppTranslations();
  
  // Set default values with translations
  title = title || t('dashboard.associate.revenueGoals');
  level = level || t('dashboard.associate.silverEntrepreneur');
  nextReward = nextReward || t('dashboard.associate.premiumConsulting');
  
  // Calcular porcentagem de progresso
  const progressPercentage = Math.min(Math.round((currentValue / targetValue) * 100), 100);
  
  // Format currency values
  const formattedCurrentValue = currentValue.toLocaleString('en-US');
  const formattedTargetValue = targetValue.toLocaleString('en-US');
  
  return (
    <div className="relative">
      {/* Borda animada com identidade visual da sidebar */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-primary-400 rounded-lg opacity-75 blur-sm animate-pulse"></div>
      
      {/* Card content */}
      <div className="bg-gradient-to-br from-dark-800 to-dark-700 rounded-lg border border-primary-700/30 p-6 shadow-lg relative z-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <Trophy className="w-6 h-6 text-yellow-400" />
        </div>
        
        <div className="flex items-center mb-2">
          <div className="bg-primary-800/30 text-primary-400 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
            <Trophy className="w-3 h-3 mr-1" />
            {level}
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-white font-medium">{currency} {formattedCurrentValue}</span>
            <span className="text-gray-400">{currency} {formattedTargetValue}</span>
          </div>
          <div className="w-full bg-dark-600 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-primary-600 to-primary-400 h-3 rounded-full transition-all duration-500 ease-in-out" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {progressPercentage}% {t('dashboard.associate.completed')}
          </div>
        </div>
        
        <div className="mt-4 flex items-center">
          <Gift className="w-4 h-4 text-primary-400 mr-2" />
          <div>
            <p className="text-xs text-gray-400">{t('dashboard.associate.nextReward')}:</p>
            <p className="text-sm text-white">{nextReward}</p>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between text-xs">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-primary-400 mb-1"></div>
            <span className="text-gray-400">{t('dashboard.associate.bronze')}</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-gray-400 mb-1"></div>
            <span className="text-gray-400">{t('dashboard.associate.silver')}</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-400 mb-1"></div>
            <span className="text-gray-400">{t('dashboard.associate.gold')}</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-blue-400 mb-1"></div>
            <span className="text-gray-400">{t('dashboard.associate.platinum')}</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-purple-400 mb-1"></div>
            <span className="text-gray-400">{t('dashboard.associate.diamond')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
