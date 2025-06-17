"use client";

import { useState } from 'react';
import StatCard from './StatCard';
import SalesChart from './SalesChart';
import DonutChart from './DonutChart';
import ConversionCard from './ConversionCard';
import GamificationCard from './GamificationCard';
import TopAssociatesCard from './TopAssociatesCard';
import TopProductsCard from './TopProductsCard';
import AIStrategyCard from './AIStrategyCard';
import { DollarSign, TrendingUp, Users, BarChart2, Award, Target } from 'lucide-react';
import { useAppTranslations } from '@/lib/useAppTranslations';

interface CEODashboardProps {
  totalSalesToday: string;
  availableBalance: string;
  pendingBalance: string;
}

export default function CEODashboard({ 
  totalSalesToday = "0", 
  availableBalance = "0", 
  pendingBalance = "0" 
}: CEODashboardProps) {
  const { t } = useAppTranslations();
  const [salesData] = useState([
    { date: '19 mai', amount: 2000 },
    { date: '21 mai', amount: 400 },
    { date: '23 mai', amount: 2800 },
    { date: '25 mai', amount: 1000 },
    { date: '27 mai', amount: 700 },
    { date: '29 mai', amount: 500 },
    { date: '31 mai', amount: 400 },
    { date: '2 jun', amount: 300 },
    { date: '4 jun', amount: 900 },
    { date: '6 jun', amount: 700 },
    { date: '8 jun', amount: 800 },
    { date: '10 jun', amount: 900 },
    { date: '12 jun', amount: 500 },
    { date: '14 jun', amount: 200 },
    { date: '16 jun', amount: 100 },
  ]);

  // Calcular o total de vendas para o gráfico
  const totalSales = salesData.reduce((sum, item) => sum + item.amount, 0).toLocaleString('pt-BR');

  // Métricas específicas para CEOs
  const ceoMetrics = [
    {
      title: t('dashboard.salesConversion'),
      value: "4.8%",
      icon: <TrendingUp className="w-6 h-6 text-primary-400" />,
      trend: { value: "+0.5%", isPositive: true }
    },
    {
      title: t('dashboard.activeProducts'),
      value: "24",
      icon: <Award className="w-6 h-6 text-primary-400" />,
      trend: { value: "+3", isPositive: true }
    },
    {
      title: t('dashboard.averageROI'),
      value: "287%",
      icon: <Target className="w-6 h-6 text-primary-400" />,
      trend: { value: "+12%", isPositive: true }
    }
  ];

  return (
    <div className="space-y-6">
      {/* Cards comuns para todos os perfis */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard 
          title={t('dashboard.totalSalesToday')} 
          value={`R$ ${totalSalesToday}`}
          icon={<DollarSign className="w-6 h-6 text-primary-400" />}
          trend={{ value: "+8%", isPositive: true }}
        />
        <StatCard 
          title={t('dashboard.availableBalance')} 
          value={`R$ ${availableBalance}`}
          icon={<BarChart2 className="w-6 h-6 text-primary-400" />}
        />
        <StatCard 
          title={t('dashboard.pendingBalance')} 
          value={`R$ ${pendingBalance}`}
          icon={<Users className="w-6 h-6 text-primary-400" />}
          trend={{ value: "+12%", isPositive: true }}
        />
      </div>

      {/* Gráfico de vendas */}
      <SalesChart 
        data={salesData}
        totalSales={totalSales}
      />

      {/* Gamificação e Metas - Movido para cima conforme solicitado */}
      <div className="mb-6">
        <GamificationCard 
          title={t('dashboard.revenueGoals')}
          currentValue={8750}
          targetValue={10000}
          level={t('dashboard.silverEntrepreneur')}
          nextReward={t('dashboard.premiumConsulting')}
        />
      </div>

      {/* Seção de métricas e análises */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
        {/* Gráfico de métodos de pagamento */}
        <DonutChart 
          title={t('dashboard.paymentMethods')} 
          data={[
            { name: t('dashboard.creditCard'), value: 45, color: '#6C5CE7' },
            { name: 'PIX', value: 30, color: '#00D2D3' },
            { name: t('dashboard.debitCard'), value: 15, color: '#FF9F43' },
            { name: 'Express Checkout', value: 10, color: '#54A0FF' },
          ]}
        />
        
        {/* Card de taxa de conversão */}
        <ConversionCard 
          title={t('dashboard.checkoutConversionRate')}
          conversionRate="68.5%"
          previousRate="65.2%"
          trend={{ value: "+3.3%", isPositive: true }}
        />
      </div>
      
      {/* Melhores Associates e Produtos */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
        <TopAssociatesCard />
        <TopProductsCard />
      </div>
      
      {/* Análise estratégica com IA - Com gradiente melhorado */}
      <AIStrategyCard 
        title={t('dashboard.strategicAnalysis')}
        productName="AgentAI"
        insights={[
          t('dashboard.aiInsight1'),
          t('dashboard.aiInsight2'),
          t('dashboard.aiInsight3'),
          t('dashboard.aiInsight4')
        ]}
      />
    </div>
  );
}
