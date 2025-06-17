"use client";

import { Brain, TrendingUp, Target, Users, Calendar, ArrowRight } from 'lucide-react';
import { useAppTranslations } from '@/lib/useAppTranslations';

interface AssociateStrategyCardProps {
  associateName?: string;
  productName?: string;
  insights?: string[];
  strategies?: {
    title: string;
    description: string;
    icon: 'target' | 'users' | 'calendar' | 'trending';
  }[];
}

export default function AssociateStrategyCard({
  associateName = "Lucas",
  productName = "Digital Marketing",
  insights = [
    "Your audience has higher engagement with content about productivity and automation.",
    "Your sales increase by 43% when you share success stories.",
    "Customers who buy your marketing products are also interested in analytics tools.",
    "We recommend focusing on webinars and live demonstrations to increase conversions."
  ],
  strategies = [
    {
      title: "Audience Segmentation",
      description: "Focus on digital marketing professionals between 28-45 years old who are looking for scalability.",
      icon: "users"
    },
    {
      title: "Content Calendar",
      description: "Create a monthly webinar about success cases with your best-selling products.",
      icon: "calendar"
    },
    {
      title: "Conversion Goal",
      description: "Increase your conversion rate by 15% with complementary educational materials.",
      icon: "target"
    },
    {
      title: "Market Trend",
      description: "Explore the growing demand for marketing automation in small businesses.",
      icon: "trending"
    }
  ]
}: AssociateStrategyCardProps) {
  
  const { t } = useAppTranslations();
  
  // Function to render the correct icon
  const renderIcon = (iconName: string) => {
    switch(iconName) {
      case 'target':
        return <Target className="w-4 h-4 text-primary-400" />;
      case 'users':
        return <Users className="w-4 h-4 text-primary-400" />;
      case 'calendar':
        return <Calendar className="w-4 h-4 text-primary-400" />;
      case 'trending':
        return <TrendingUp className="w-4 h-4 text-primary-400" />;
      default:
        return <Target className="w-4 h-4 text-primary-400" />;
    }
  };
  
  return (
    <div className="bg-gradient-to-r from-primary-900/30 to-dark-700 rounded-lg p-6 shadow-lg border-2 border-primary-500">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Brain className="w-5 h-5 text-primary-400 mr-2" />
          <h3 className="text-lg font-semibold text-white">{t('dashboard.associate.strategicAnalysis')} • <span className="text-primary-400">1% AI</span></h3>
        </div>
        <div className="bg-primary-900/30 text-primary-400 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
          {t('dashboard.associate.personalized')}
        </div>
      </div>
      
      <p className="text-gray-300 text-sm mb-6">
        {t('dashboard.associate.hello')} <span className="text-white font-medium">{associateName}</span>, {t('dashboard.associate.aiAnalysisIntro')} <span className="text-primary-400">{productName}</span>.
      </p>
      
      {/* Insights da IA */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-white mb-3 flex items-center">
          <Brain className="w-4 h-4 text-primary-400 mr-2" />
          {t('dashboard.associate.aiInsights')}
        </h4>
        
        <ul className="space-y-3">
          {insights.map((insight, index) => (
            <li key={index} className="bg-dark-800/60 p-3 rounded-lg border border-dark-600">
              <div className="flex">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-1.5 mr-2.5 flex-shrink-0"></div>
                <p className="text-sm text-gray-300">{insight}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Estratégias recomendadas */}
      <div>
        <h4 className="text-sm font-medium text-white mb-3 flex items-center">
          <Target className="w-4 h-4 text-primary-400 mr-2" />
          {t('dashboard.associate.recommendedStrategies')}
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {strategies.map((strategy, index) => (
            <div key={index} className="bg-dark-800/60 p-4 rounded-lg border border-dark-600 hover:border-primary-500/50 transition-all">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-primary-900/50 flex items-center justify-center mr-3">
                  {renderIcon(strategy.icon)}
                </div>
                <h5 className="text-sm font-medium text-white">{strategy.title}</h5>
              </div>
              <p className="text-sm text-gray-300 ml-11">{strategy.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Métricas de desempenho */}
      <div className="mt-6 bg-dark-800/60 rounded-lg p-4 border border-dark-600">
        <h4 className="text-sm font-medium text-white mb-3">{t('dashboard.associate.performanceMetrics')}</h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-400">{t('dashboard.associate.currentConversionRate')}</p>
            <div className="flex items-end">
              <p className="text-lg font-semibold text-white">3.8%</p>
              <p className="text-xs text-green-400 ml-2 mb-1 flex items-center">
                <TrendingUp className="w-3 h-3 mr-0.5" />
                +0.5%
              </p>
            </div>
          </div>
          
          <div>
            <p className="text-xs text-gray-400">{t('dashboard.associate.recommendedGoal')}</p>
            <div className="flex items-end">
              <p className="text-lg font-semibold text-primary-400">5.0%</p>
              <p className="text-xs text-gray-400 ml-2 mb-1">+1.2%</p>
            </div>
          </div>
        </div>
        
        <div className="w-full bg-dark-600 rounded-full h-2 mt-3">
          <div 
            className="bg-gradient-to-r from-primary-600 to-primary-400 h-2 rounded-full" 
            style={{ width: '76%' }}
          ></div>
        </div>
        <p className="text-xs text-gray-400 mt-1">76% do caminho para atingir sua meta</p>
      </div>
      
      {/* Botão para plano detalhado */}
      <div className="mt-6 flex justify-center">
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition-colors text-sm flex items-center">
          Ver Plano Estratégico Completo
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
}
