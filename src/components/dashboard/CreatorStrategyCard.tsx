"use client";

import { Brain, TrendingUp, Target, Users, Calendar, ArrowRight, Video, Camera, Eye } from 'lucide-react';
import { useAppTranslations } from '@/lib/useAppTranslations';

interface CreatorStrategyCardProps {
  creatorName?: string;
  contentType?: string;
  insights?: string[];
  strategies?: {
    title: string;
    description: string;
    icon: 'target' | 'users' | 'calendar' | 'trending' | 'video' | 'eye';
  }[];
}

export default function CreatorStrategyCard({
  creatorName = "Lucas",
  contentType = "Tutoriais de Tecnologia",
  insights = [
    "Seu público tem maior engajamento em vídeos de 8-12 minutos com demonstrações práticas.",
    "Conteúdos publicados às terças e quintas têm 37% mais visualizações.",
    "Vídeos com títulos que incluem 'Como fazer' ou 'Guia completo' têm 45% mais cliques.",
    "Recomendamos focar em séries de conteúdo para aumentar o tempo de visualização."
  ],
  strategies = [
    {
      title: "Segmentação de Audiência",
      description: "Foque em profissionais de tecnologia entre 25-40 anos que buscam soluções práticas.",
      icon: "users"
    },
    {
      title: "Calendário de Conteúdo",
      description: "Publique tutoriais avançados às terças e conteúdo básico às quintas para maximizar alcance.",
      icon: "calendar"
    },
    {
      title: "Meta de Engajamento",
      description: "Aumente o tempo médio de visualização em 20% com storytelling e exemplos práticos.",
      icon: "target"
    },
    {
      title: "Tendência de Conteúdo",
      description: "Explore a crescente demanda por tutoriais sobre IA e automação em seu nicho.",
      icon: "trending"
    },
    {
      title: "Formato Ideal",
      description: "Divida tutoriais complexos em séries de 3-4 vídeos para maior retenção da audiência.",
      icon: "video"
    },
    {
      title: "Otimização Visual",
      description: "Use miniaturas com texto claro e contraste alto para aumentar CTR em 25%.",
      icon: "eye"
    }
  ]
}: CreatorStrategyCardProps) {
  const { t } = useAppTranslations();
  
  // Função para renderizar o ícone correto
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
      case 'video':
        return <Video className="w-4 h-4 text-primary-400" />;
      case 'eye':
        return <Eye className="w-4 h-4 text-primary-400" />;
      default:
        return <Target className="w-4 h-4 text-primary-400" />;
    }
  };
  
  return (
    <div className="bg-gradient-to-r from-primary-900/30 to-dark-700 rounded-lg p-6 shadow-lg border-2 border-primary-500">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Brain className="w-5 h-5 text-primary-400 mr-2" />
          <h3 className="text-lg font-semibold text-white">
            {t('dashboard.creator.contentStrategy')} • <span className="text-primary-400">1% AI</span>
          </h3>
        </div>
        <div className="bg-primary-900/30 text-primary-400 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
          {t('dashboard.creator.personalized')}
        </div>
      </div>
      
      <p className="text-gray-300 text-sm mb-6">
        {t('dashboard.creator.strategyGreeting')} <span className="text-white font-medium">{creatorName}</span>, {t('dashboard.creator.strategyIntro')} 
        <span className="text-primary-400">{contentType}</span>.
      </p>
      
      {/* Insights da IA */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-white mb-3 flex items-center">
          <Brain className="w-4 h-4 text-primary-400 mr-2" />
          {t('dashboard.creator.contentBasedInsights')}
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
          {t('dashboard.creator.recommendedStrategies')}
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
        <h4 className="text-sm font-medium text-white mb-3">{t('dashboard.creator.performanceMetrics')}</h4>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-gray-400">{t('dashboard.creator.engagementRate')}</p>
            <div className="flex items-end">
              <p className="text-lg font-semibold text-white">4.8%</p>
              <p className="text-xs text-green-400 ml-2 mb-1 flex items-center">
                <TrendingUp className="w-3 h-3 mr-0.5" />
                +0.7%
              </p>
            </div>
          </div>
          
          <div>
            <p className="text-xs text-gray-400">{t('dashboard.creator.averageTime')}</p>
            <div className="flex items-end">
              <p className="text-lg font-semibold text-white">7:24</p>
              <p className="text-xs text-green-400 ml-2 mb-1 flex items-center">
                <TrendingUp className="w-3 h-3 mr-0.5" />
                +0:42
              </p>
            </div>
          </div>
          
          <div>
            <p className="text-xs text-gray-400">{t('dashboard.creator.recommendedGoal')}</p>
            <div className="flex items-end">
              <p className="text-lg font-semibold text-primary-400">6.0%</p>
              <p className="text-xs text-gray-400 ml-2 mb-1">+1.2%</p>
            </div>
          </div>
        </div>
        
        <div className="w-full bg-dark-600 rounded-full h-2 mt-3">
          <div 
            className="bg-gradient-to-r from-primary-600 to-primary-400 h-2 rounded-full" 
            style={{ width: '80%' }}
          ></div>
        </div>
        <p className="text-xs text-gray-400 mt-1">{t('dashboard.creator.goalProgress')}</p>
      </div>
      
      {/* Botão para plano detalhado */}
      <div className="mt-6 flex justify-center">
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition-colors text-sm flex items-center">
          {t('dashboard.creator.viewFullContentPlan')}
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
}
