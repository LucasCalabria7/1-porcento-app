"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useAppTranslations } from '@/lib/useAppTranslations';

// Dynamic import of ApexCharts to avoid SSR errors
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

// Import ApexOptions type for proper typing
import { ApexOptions } from 'apexcharts';

interface SalesData {
  date: string;
  amount: number;
}

interface SalesChartProps {
  data?: SalesData[];
  title?: string;
  totalSales?: string;
  currency?: string;
}

export default function SalesChart({ 
  data = [], 
  totalSales = "0",
  currency = "R$",
  title
}: SalesChartProps) {
  const { t } = useAppTranslations();
  
  // Set default title after initializing the translation hook
  const chartTitle = title || t('dashboard.associate.sales');
  const [timeRange, setTimeRange] = useState<7 | 15 | 30>(30);
  
  // Simulated data for the chart
  const mockData = [
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
  ];
  
  const chartData = data.length > 0 ? data : mockData;
  
  // Filter data based on the selected time period
  const filteredData = chartData.slice(-timeRange);
  
  // Prepare data for ApexCharts
  const series = [
    {
      name: t('dashboard.associate.sales'),
      data: filteredData.map(item => item.amount)
    }
  ];
  
  const categories = filteredData.map(item => item.date);

  // ApexCharts configuration
  const chartOptions: ApexOptions = {
    chart: {
      type: 'area' as const,
      height: 350,
      toolbar: {
        show: false,
      },
      fontFamily: 'Inter, sans-serif',
      background: 'transparent',
      animations: {
        enabled: true,
        // @ts-ignore - ApexCharts tem suporte para 'easeinout' mas o tipo não está definido
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      },
      dropShadow: {
        enabled: true,
        top: 0,
        left: 0,
        blur: 3,
        opacity: 0.2,
        color: '#6C5CE7'
      }
    },
    colors: ['#6C5CE7'],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 0.3,
        gradientToColors: ['rgba(108, 92, 231, 0.2)'],
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0.2,
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    grid: {
      borderColor: '#1A202C',
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 10
      },
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: '#718096',
          fontSize: '12px',
        },
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      tooltip: {
        enabled: false
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#718096',
          fontSize: '12px',
        },
        formatter: function(value: number) {
          return `${currency} ${value}`;
        }
      },
    },
    tooltip: {
      enabled: true,
      theme: 'dark',
      x: {
        show: true,
      },
      y: {
        title: {
          formatter: () => `${t('dashboard.associate.sales')}:`
        },
        formatter: (value: number) => `${currency} ${value.toFixed(2)}`
      },
      marker: {
        show: true,
      },
      style: {
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif',
      },
    },
    markers: {
      size: 5,
      colors: ['#6C5CE7'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 7,
      }
    },
  };

  return (
    <div className="bg-gradient-to-br from-dark-800 to-dark-700 rounded-lg border border-dark-600 p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">{chartTitle}</h3>
          <p className="text-2xl font-bold text-white">{currency}{totalSales}</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setTimeRange(7)} 
            className={`px-3 py-1 text-xs rounded-full transition-all ${timeRange === 7 ? 'bg-primary text-white' : 'bg-dark-600 text-gray-400 hover:bg-dark-500'}`}
          >
            7 {t('dashboard.associate.days')}
          </button>
          <button 
            onClick={() => setTimeRange(15)} 
            className={`px-3 py-1 text-xs rounded-full transition-all ${timeRange === 15 ? 'bg-primary text-white' : 'bg-dark-600 text-gray-400 hover:bg-dark-500'}`}
          >
            15 {t('dashboard.associate.days')}
          </button>
          <button 
            onClick={() => setTimeRange(30)} 
            className={`px-3 py-1 text-xs rounded-full transition-all ${timeRange === 30 ? 'bg-primary text-white' : 'bg-dark-600 text-gray-400 hover:bg-dark-500'}`}
          >
            30 {t('dashboard.associate.days')}
          </button>
        </div>
      </div>
      
      <div className="relative h-80 mb-6">
        {typeof window !== 'undefined' && (
          <ReactApexChart 
            options={chartOptions} 
            series={series} 
            type="area" 
            height={300} 
            width="100%"
          />
        )}
      </div>
    </div>
  );
}
