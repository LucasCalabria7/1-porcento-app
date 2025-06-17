"use client";

import { useState } from 'react';
import { ChevronDown, ChevronUp, TrendingUp, Users, DollarSign, ShoppingBag, BarChart2, Video, FileText, Image as ImageIcon } from 'lucide-react';
import StatCard from './StatCard';
import SalesChart from './SalesChart';
import CreatorProfileCard from './CreatorProfileCard';
import { useAppTranslations } from '@/lib/useAppTranslations';
import CreatorTrendingProductsCard from './CreatorTrendingProductsCard';
import AICreatorRecommendationCard from './AICreatorRecommendationCard';
import CreatorStrategyCard from './CreatorStrategyCard';
import Link from 'next/link';

interface CreatorDashboardProps {
  totalSalesToday: string;
  availableBalance: string;
  pendingBalance: string;
}

export default function CreatorDashboard({ 
  totalSalesToday = "0", 
  availableBalance = "0", 
  pendingBalance = "0" 
}: CreatorDashboardProps) {
  const { t } = useAppTranslations(); 

  // Sales data - kept as is because they are just example data
  // In a real implementation, this data would come from an API
  const [salesData] = useState([
    { date: '19 mai', amount: 1200 },
    { date: '21 mai', amount: 250 },
    { date: '23 mai', amount: 1800 },
    { date: '25 mai', amount: 700 },
    { date: '27 mai', amount: 500 },
    { date: '29 mai', amount: 350 },
    { date: '31 mai', amount: 250 },
    { date: '2 jun', amount: 200 },
    { date: '4 jun', amount: 600 },
    { date: '6 jun', amount: 500 },
    { date: '8 jun', amount: 550 },
    { date: '10 jun', amount: 600 },
    { date: '12 jun', amount: 350 },
    { date: '14 jun', amount: 120 },
    { date: '16 jun', amount: 70 },
  ]);

  // Calculate total sales for the chart
  const totalSales = salesData.reduce((sum, item) => sum + item.amount, 0).toLocaleString('pt-BR');

  // Removed specific metrics for Creators and best performing content that are no longer used

  return (
    <div className="space-y-6">
      {/* Common cards for all profiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title={t('dashboard.creator.views')}
          value="48.2K"
          icon={<TrendingUp className="h-5 w-5 text-primary-400" />}
          trend={{ value: "+12.2%", isPositive: true }}
        />
        <StatCard 
          title={t('dashboard.creator.followers')}
          value="8,945"
          icon={<Users className="h-5 w-5 text-primary-400" />}
          trend={{ value: "+8.1%", isPositive: true }}
        />
        <StatCard 
          title={t('dashboard.ceo.revenue')}
          value={`R$ ${totalSalesToday}`}
          icon={<DollarSign className="h-5 w-5 text-primary-400" />}
          trend={{ value: "-2.3%", isPositive: false }}
        />
        <StatCard 
          title={t('dashboard.ceo.products')}
          value="24"
          icon={<ShoppingBag className="h-5 w-5 text-primary-400" />}
          trend={{ value: "+4%", isPositive: true }}
        />
      </div>

      {/* Sales chart */}
      <SalesChart 
        data={salesData}
        totalSales={totalSales}
      />

      {/* 1% UGC Creator Profile */}
      <div className="my-6">
        <CreatorProfileCard 
          name="Ana Silva"
          level={t('dashboard.creator.creatorLevel3')}
          avatar="/assets/creator-avatar.png"
          totalViews={2500000}
          totalEngagement={4.8}
          contentTypes={[
            { type: t('dashboard.creator.videos'), count: 48, engagement: 5.2 },
            { type: t('dashboard.creator.images'), count: 124, engagement: 4.7 },
            { type: t('dashboard.creator.articles'), count: 36, engagement: 3.8 },
          ]}
          socialMedia={[
            { platform: 'instagram', username: 'anasilva', followers: 125000, url: 'https://instagram.com/anasilva' },
            { platform: 'youtube', username: 'anasilva', followers: 89000, url: 'https://youtube.com/anasilva' },
            { platform: 'twitter', username: 'anasilva', followers: 45000, url: 'https://twitter.com/anasilva' },
            { platform: 'twitch', username: 'anasilva', followers: 12000, url: 'https://twitch.tv/anasilva' },
          ]}
          creatorId="creator123"
        />
      </div>
      
      {/* Gamification System for Creators */}
      {/* Strategy section */}
      <CreatorStrategyCard />
      
      {/* Trending products cards and AI recommendations in two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
        <CreatorTrendingProductsCard />
        <AICreatorRecommendationCard />
      </div>
      
      {/* Strategic Analysis Card */}
      <div className="my-6">
        <CreatorStrategyCard />
      </div>
    </div>
  );
}
