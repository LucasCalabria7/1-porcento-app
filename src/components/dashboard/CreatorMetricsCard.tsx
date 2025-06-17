"use client";

import { Eye, Users, ThumbsUp, Clock, Video, TrendingUp, BarChart2 } from 'lucide-react';

interface CreatorMetricsCardProps {
  views?: number;
  followers?: number;
  engagement?: number;
  watchTime?: number;
  contentCount?: number;
  growthRate?: number;
}

export default function CreatorMetricsCard({
  views = 1250000,
  followers = 42800,
  engagement = 4.8,
  watchTime = 87500,
  contentCount = 87,
  growthRate = 12.4
}: CreatorMetricsCardProps) {
  
  // Função para formatar números grandes
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };
  
  // Função para formatar tempo de visualização em horas
  const formatWatchTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    return `${hours.toLocaleString('pt-BR')}h`;
  };
  
  return (
    <div className="bg-dark-800 rounded-lg shadow-lg border border-primary-500/30">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
          <BarChart2 className="w-5 h-5 text-primary-400 mr-2" />
          Métricas de Creator
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {/* Visualizações Totais */}
          <div className="bg-dark-700 p-4 rounded-lg border border-dark-600">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-400">Visualizações</p>
              <Eye className="w-4 h-4 text-primary-400" />
            </div>
            <p className="text-xl font-bold text-white">{formatNumber(views)}</p>
            <div className="flex items-center mt-1">
              <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
              <p className="text-xs text-green-400">+8.2% este mês</p>
            </div>
          </div>
          
          {/* Seguidores */}
          <div className="bg-dark-700 p-4 rounded-lg border border-dark-600">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-400">Seguidores</p>
              <Users className="w-4 h-4 text-primary-400" />
            </div>
            <p className="text-xl font-bold text-white">{formatNumber(followers)}</p>
            <div className="flex items-center mt-1">
              <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
              <p className="text-xs text-green-400">+{growthRate}% este mês</p>
            </div>
          </div>
          
          {/* Taxa de Engajamento */}
          <div className="bg-dark-700 p-4 rounded-lg border border-dark-600">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-400">Engajamento</p>
              <ThumbsUp className="w-4 h-4 text-primary-400" />
            </div>
            <p className="text-xl font-bold text-white">{engagement}%</p>
            <div className="flex items-center mt-1">
              <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
              <p className="text-xs text-green-400">+0.7% este mês</p>
            </div>
          </div>
          
          {/* Tempo de Visualização */}
          <div className="bg-dark-700 p-4 rounded-lg border border-dark-600">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-400">Tempo de Visualização</p>
              <Clock className="w-4 h-4 text-primary-400" />
            </div>
            <p className="text-xl font-bold text-white">{formatWatchTime(watchTime)}</p>
            <div className="flex items-center mt-1">
              <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
              <p className="text-xs text-green-400">+5.3% este mês</p>
            </div>
          </div>
          
          {/* Quantidade de Conteúdo */}
          <div className="bg-dark-700 p-4 rounded-lg border border-dark-600">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-400">Conteúdos</p>
              <Video className="w-4 h-4 text-primary-400" />
            </div>
            <p className="text-xl font-bold text-white">{contentCount}</p>
            <div className="flex items-center mt-1">
              <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
              <p className="text-xs text-green-400">+4 este mês</p>
            </div>
          </div>
          
          {/* Média de Visualizações */}
          <div className="bg-dark-700 p-4 rounded-lg border border-dark-600">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-400">Média por Conteúdo</p>
              <BarChart2 className="w-4 h-4 text-primary-400" />
            </div>
            <p className="text-xl font-bold text-white">{formatNumber(Math.round(views / contentCount))}</p>
            <div className="flex items-center mt-1">
              <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
              <p className="text-xs text-green-400">+3.8% este mês</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
