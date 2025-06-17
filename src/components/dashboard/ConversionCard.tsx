"use client";

import { ArrowUpRight, ArrowDownRight, Brain, Lightbulb, Target } from 'lucide-react';
import { useAppTranslations } from '@/lib/useAppTranslations';

interface ConversionCardProps {
  title?: string;
  conversionRate?: string;
  previousRate?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export default function ConversionCard({
  title,
  conversionRate = "68.5%",
  previousRate = "65.2%",
  trend = { value: "+3.3%", isPositive: true }
}: ConversionCardProps) {
  const { t } = useAppTranslations();
  title = title || t('dashboard.ceo.checkoutConversionRate');
  return (
    <div className="bg-gradient-to-br from-dark-800 to-dark-700 rounded-lg p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      
      <div className="flex items-end mt-4">
        <div className="text-3xl font-bold text-white">{conversionRate}</div>
        <div className={`ml-2 flex items-center text-sm ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {trend.isPositive ? (
            <ArrowUpRight className="w-4 h-4 mr-1" />
          ) : (
            <ArrowDownRight className="w-4 h-4 mr-1" />
          )}
          {trend.value}
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>{t('dashboard.ceo.previous')}: {previousRate}</span>
          <span>{t('dashboard.ceo.goal')}: 70%</span>
        </div>
        <div className="w-full bg-dark-600 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full" 
            style={{ width: conversionRate }}
          ></div>
        </div>
      </div>
      
      <div className="mt-4 text-xs text-gray-400">
        <p>{t('dashboard.ceo.basedOnLast30Days')}</p>
      </div>
      
      <div className="mt-6 border-t border-dark-600 pt-4">
        <div className="flex items-start space-x-2">
          <div className="bg-primary-900/30 rounded-full p-1 mt-0.5">
            <Brain className="w-3 h-3 text-primary-400" />
          </div>
          <div>
            <div className="flex items-center">
              <h4 className="text-xs font-medium text-primary-400">{t('dashboard.ceo.aiAnalysis')}</h4>
            </div>
            <p className="text-xs text-gray-300 mt-1">
              {t('dashboard.ceo.checkoutOptimizationTip')}
            </p>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center text-xs text-primary-400">
            <Lightbulb className="w-3 h-3 mr-1" />
            <span>{t('dashboard.ceo.suggestion')}: {t('dashboard.ceo.expressCheckout')}</span>
          </div>
          <div className="flex items-center text-xs text-primary-400">
            <Target className="w-3 h-3 mr-1" />
            <span>{t('dashboard.ceo.goal')}: 75%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
