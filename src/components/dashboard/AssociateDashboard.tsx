"use client";

import { useState } from 'react';
import StatCard from './StatCard';
import SalesChart from './SalesChart';
import AssociateGamificationCard from './AssociateGamificationCard';
import TrendingProductsCard from './TrendingProductsCard';
import AIProductRecommendationCard from './AIProductRecommendationCard';
import AssociateStrategyCard from './AssociateStrategyCard';
import { DollarSign, Users, BarChart2, TrendingUp, Share2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useAppTranslations } from '@/lib/useAppTranslations';

interface AssociateDashboardProps {
  totalSalesToday: string;
  availableBalance: string;
  pendingBalance: string;
}

export default function AssociateDashboard({ 
  totalSalesToday = "0", 
  availableBalance = "0", 
  pendingBalance = "0" 
}: AssociateDashboardProps) {
  const { t } = useAppTranslations();
  const [salesData] = useState([
    { date: 'May 19', amount: 1500 },
    { date: 'May 21', amount: 300 },
    { date: 'May 23', amount: 2200 },
    { date: 'May 25', amount: 800 },
    { date: 'May 27', amount: 600 },
    { date: 'May 29', amount: 400 },
    { date: 'May 31', amount: 300 },
    { date: 'Jun 2', amount: 250 },
    { date: 'Jun 4', amount: 700 },
    { date: 'Jun 6', amount: 600 },
    { date: 'Jun 8', amount: 650 },
    { date: 'Jun 10', amount: 700 },
    { date: 'Jun 12', amount: 400 },
    { date: 'Jun 14', amount: 150 },
    { date: 'Jun 16', amount: 80 },
  ]);

  // Calculate total sales for the chart
  const totalSales = salesData.reduce((sum, item) => sum + item.amount, 0).toLocaleString('en-US');

  // Specific metrics for Associates
  const associateMetrics = [
    {
      title: t('dashboard.associate.commissionRate'),
      value: "35%",
      icon: <Share2 className="w-6 h-6 text-primary-400" />,
      trend: { value: "+5%", isPositive: true }
    },
    {
      title: t('dashboard.associate.linkClicks'),
      value: "1,248",
      icon: <TrendingUp className="w-6 h-6 text-primary-400" />,
      trend: { value: "+18%", isPositive: true }
    },
    {
      title: t('dashboard.associate.promotedProducts'),
      value: "12",
      icon: <ShoppingBag className="w-6 h-6 text-primary-400" />,
      trend: { value: "+2", isPositive: true }
    }
  ];

  // Top selling products by this associate
  const topSellingProducts = [
    { name: t('dashboard.associate.digitalMarketingCourse'), sales: 24, commission: "$2,376.00" },
    { name: t('dashboard.associate.investmentsEbook'), sales: 56, commission: "$980.00" },
    { name: t('dashboard.associate.websiteTemplate'), sales: 18, commission: "$1,260.00" },
  ];

  return (
    <div className="space-y-6">
      {/* Common cards for all profiles */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard 
          title={t('dashboard.associate.totalSalesToday')} 
          value={`$${totalSalesToday}`}
          icon={<DollarSign className="w-6 h-6 text-primary-400" />}
          trend={{ value: "+8%", isPositive: true }}
        />
        <StatCard 
          title={t('dashboard.associate.availableBalance')} 
          value={`$${availableBalance}`}
          icon={<BarChart2 className="w-6 h-6 text-primary-400" />}
        />
        <StatCard 
          title={t('dashboard.associate.pendingBalance')} 
          value={`$${pendingBalance}`}
          icon={<Users className="w-6 h-6 text-primary-400" />}
          trend={{ value: "+12%", isPositive: true }}
        />
      </div>

      {/* Sales chart */}
      <SalesChart 
        data={salesData}
        totalSales={totalSales}
      />
      
      {/* Advanced Gamification System */}
      <AssociateGamificationCard />
      
      {/* 2-column grid for product and strategy cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Trending and bestselling products */}
        <TrendingProductsCard />
        
        {/* AI recommended products */}
        <AIProductRecommendationCard />
      </div>
      
      {/* Strategic analysis by 1% AI */}
      <AssociateStrategyCard />

      {/* Specific metrics for Associates */}
      <h2 className="text-xl font-semibold text-white mt-8 mb-4">{t('dashboard.associate.affiliateMetrics')}</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {associateMetrics.map((metric, index) => (
          <StatCard 
            key={index}
            title={metric.title} 
            value={metric.value}
            icon={metric.icon}
            trend={metric.trend}
            bgColor="bg-dark-700/80"
          />
        ))}
      </div>

      {/* Affiliate links section */}
      <div className="mt-8 bg-gradient-to-r from-primary-900/30 to-dark-700 rounded-lg border border-primary-800/50 p-6">
        <h3 className="text-lg font-medium text-white mb-2">{t('dashboard.associate.affiliateLinks')}</h3>
        <p className="text-gray-300 mb-4">
          {t('dashboard.associate.generateCustomLinks')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-dark-700/80 p-4 rounded-lg border border-dark-600">
            <h4 className="text-primary-400 font-medium mb-1">{t('dashboard.associate.customLink')}</h4>
            <div className="flex mt-2">
              <input 
                type="text" 
                value="https://onepercentapp.com/ref/your-username" 
                readOnly
                className="flex-1 bg-dark-800 border border-dark-600 rounded-l-md py-2 px-3 text-sm text-gray-300"
              />
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-r-md text-sm transition-colors">
                {t('dashboard.associate.copy')}
              </button>
            </div>
          </div>
          <div className="bg-dark-700/80 p-4 rounded-lg border border-dark-600">
            <h4 className="text-primary-400 font-medium mb-1">{t('dashboard.associate.promotionalMaterials')}</h4>
            <p className="text-sm text-gray-300 mb-2">{t('dashboard.associate.accessBannersAndMaterials')}</p>
            <Link href="/dashboard/materials" className="inline-flex items-center text-sm text-primary-400 hover:text-primary-300">
              <span>{t('dashboard.associate.accessMaterials')}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
