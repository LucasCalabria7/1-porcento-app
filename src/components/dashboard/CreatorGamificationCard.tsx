"use client";

import { Trophy, Gift, Award, Star, TrendingUp, Crown, Video, Users } from 'lucide-react';
import { useState } from 'react';

interface ContentAchievement {
  contentType: string;
  currentValue: number;
  targetValue: number;
  level: string;
  nextReward: string;
  progress: number;
}

interface CreatorGamificationCardProps {
  totalEngagement?: number;
  targetEngagement?: number;
  currentLevel?: string;
  nextLevel?: string;
  nextReward?: string;
  contentAchievements?: ContentAchievement[];
}

export default function CreatorGamificationCard({
  totalEngagement = 125000,
  targetEngagement = 150000,
  currentLevel = "Creator Prata",
  nextLevel = "Creator Ouro",
  nextReward = "Equipamento Profissional + Acesso VIP",
  contentAchievements = [
    {
      contentType: "Vídeos Tutoriais",
      currentValue: 48000,
      targetValue: 50000,
      level: "Especialista Bronze",
      nextReward: "Curso de Edição Premium",
      progress: 96
    },
    {
      contentType: "Reviews de Produtos",
      currentValue: 32000,
      targetValue: 50000,
      level: "Especialista Bronze",
      nextReward: "Produtos Exclusivos",
      progress: 64
    },
    {
      contentType: "Lives e Webinars",
      currentValue: 28000,
      targetValue: 50000,
      level: "Iniciante Ouro",
      nextReward: "Software de Streaming Pro",
      progress: 56
    }
  ]
}: CreatorGamificationCardProps) {
  
  // Calcular porcentagem de progresso geral
  const progressPercentage = Math.min(Math.round((totalEngagement / targetEngagement) * 100), 100);
  
  // Formatar valores de engajamento
  const formattedTotalEngagement = totalEngagement.toLocaleString('pt-BR');
  const formattedTargetEngagement = targetEngagement.toLocaleString('pt-BR');
  
  // Estado para controlar qual tipo de conteúdo está expandido
  const [expandedContent, setExpandedContent] = useState<string | null>(null);
  
  // Níveis de gamificação
  const levels = [
    { name: "Bronze", color: "bg-amber-700" },
    { name: "Prata", color: "bg-gray-400" },
    { name: "Ouro", color: "bg-yellow-400" },
    { name: "Platina", color: "bg-blue-400" },
    { name: "Diamante", color: "bg-purple-400" }
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
            <h3 className="text-lg font-semibold text-white">Sistema de Gamificação</h3>
          </div>
          <div className="bg-primary-900/30 text-primary-400 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
            <Crown className="w-3 h-3 mr-1" />
            {currentLevel}
          </div>
        </div>
        
        {/* Progresso geral */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-white font-medium">{formattedTotalEngagement} views</span>
            <span className="text-gray-400">{formattedTargetEngagement} views</span>
          </div>
          <div className="w-full bg-dark-600 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-primary-600 to-primary-400 h-3 rounded-full transition-all duration-500 ease-in-out" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{progressPercentage}% para o próximo nível</span>
            <span>Próximo: {nextLevel}</span>
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
        
        {/* Gamificação por tipo de conteúdo */}
        <div>
          <h4 className="text-sm font-medium text-white mb-3 flex items-center">
            <Award className="w-4 h-4 text-primary-400 mr-1" />
            Conquistas por Tipo de Conteúdo
          </h4>
          
          <div className="space-y-4">
            {contentAchievements.map((content, index) => (
              <div 
                key={index} 
                className="bg-dark-700/50 rounded-lg border border-dark-600 overflow-hidden"
              >
                <div 
                  className="p-3 cursor-pointer hover:bg-dark-600/50 transition-colors"
                  onClick={() => setExpandedContent(expandedContent === content.contentType ? null : content.contentType)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Video className="w-4 h-4 text-primary-400 mr-2" />
                      <span className="text-sm text-white">{content.contentType}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-primary-400 mr-2">{content.level}</span>
                      <TrendingUp className={`w-4 h-4 transform transition-transform ${expandedContent === content.contentType ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                  
                  {/* Barra de progresso */}
                  <div className="mt-2">
                    <div className="w-full bg-dark-600 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary-600 to-primary-400 h-2 rounded-full" 
                        style={{ width: `${content.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>{content.currentValue.toLocaleString('pt-BR')} views</span>
                      <span>{content.progress}%</span>
                      <span>{content.targetValue.toLocaleString('pt-BR')} views</span>
                    </div>
                  </div>
                </div>
                
                {/* Detalhes expandidos */}
                {expandedContent === content.contentType && (
                  <div className="p-3 pt-0 border-t border-dark-600 mt-2">
                    <div className="flex items-start space-x-2 mt-3">
                      <Gift className="w-4 h-4 text-primary-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-400">Próxima recompensa:</p>
                        <p className="text-sm text-white">{content.nextReward}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-5 gap-1">
                      {['Bronze', 'Prata', 'Ouro', 'Platina', 'Diamante'].map((level, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                          <div className={`w-3 h-3 rounded-full mb-1 ${
                            level === 'Bronze' ? 'bg-amber-700' :
                            level === 'Prata' ? 'bg-gray-400' :
                            level === 'Ouro' ? 'bg-yellow-400' :
                            level === 'Platina' ? 'bg-blue-400' :
                            'bg-purple-400'
                          } ${content.level.includes(level) ? 'ring-1 ring-white' : ''}`}></div>
                          <span className={`text-xs ${content.level.includes(level) ? 'text-white' : 'text-gray-500'}`}>
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
        
        {/* Estatísticas de engajamento */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="bg-dark-700/50 p-3 rounded-lg border border-dark-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="w-4 h-4 text-primary-400 mr-2" />
                <span className="text-xs text-gray-400">Seguidores</span>
              </div>
              <span className="text-sm font-medium text-white">12.4K</span>
            </div>
          </div>
          <div className="bg-dark-700/50 p-3 rounded-lg border border-dark-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Video className="w-4 h-4 text-primary-400 mr-2" />
                <span className="text-xs text-gray-400">Conteúdos</span>
              </div>
              <span className="text-sm font-medium text-white">87</span>
            </div>
          </div>
        </div>
        
        {/* Botão para ver ranking completo */}
        <button className="w-full mt-4 bg-primary-600/20 hover:bg-primary-600/30 text-primary-400 px-4 py-2 rounded-md transition-all text-sm flex items-center justify-center">
          <Trophy className="w-4 h-4 mr-2" />
          Ver Ranking de Creators
        </button>
      </div>
    </div>
  );
}
