"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { useAppTranslations } from '@/lib/useAppTranslations';

// Importação dinâmica do ApexCharts para evitar erros de SSR
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface DonutChartProps {
  title?: string;
  data?: {
    name: string;
    value: number;
    color: string;
  }[];
}

export default function DonutChart({ 
  title,
  data
}: DonutChartProps) {
  const { t } = useAppTranslations();
  
  // Definir valores padrão com traduções
  title = title || t('dashboard.creator.paymentDistribution');
  data = data || [
    { name: t('dashboard.creator.creditCard'), value: 45, color: '#6C5CE7' },
    { name: t('dashboard.creator.pix'), value: 30, color: '#00D2D3' },
    { name: t('dashboard.creator.debitCard'), value: 15, color: '#FF9F43' },
    { name: t('dashboard.creator.expressCheckout'), value: 10, color: '#54A0FF' },
  ];
  // Preparar dados para o ApexCharts
  const series = data.map(item => item.value);
  const labels = data.map(item => item.name);
  const colors = data.map(item => item.color);
  
  // Configurações do gráfico ApexCharts
  const chartOptions: ApexOptions = {
    chart: {
      type: 'donut' as const,
      fontFamily: 'Inter, sans-serif',
      background: 'transparent',
      animations: {
        enabled: true,
        // @ts-ignore - ApexCharts tem suporte para 'easeinout' mas o tipo não está definido
        easing: 'easeinout',
        speed: 800,
      },
      dropShadow: {
        enabled: true,
        top: 0,
        left: 0,
        blur: 3,
        opacity: 0.2,
      }
    },
    colors: colors,
    labels: labels,
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif',
              color: '#718096',
            },
            value: {
              show: true,
              fontSize: '16px',
              fontFamily: 'Inter, sans-serif',
              color: '#ffffff',
              formatter: function(val: string) {
                return `${val}%`;
              },
            },
            total: {
              show: true,
              label: t('dashboard.creator.total'),
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif',
              color: '#718096',
              formatter: () => '100%'
            }
          }
        }
      }
    },
    stroke: {
      width: 0
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '12px',
      fontFamily: 'Inter, sans-serif',
      labels: {
        colors: '#718096'
      },
      markers: {
        size: 10
      },
      itemMargin: {
        horizontal: 8,
        vertical: 5
      }
    },
    tooltip: {
      enabled: true,
      theme: 'dark',
      y: {
        formatter: (value: number) => `${value}%`
      },
      style: {
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif',
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 300
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ]
  };

  return (
    <div className="bg-gradient-to-br from-dark-800 to-dark-700 rounded-lg border border-dark-600 p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
      </div>
      
      <div className="relative h-72">
        {typeof window !== 'undefined' && (
          <ReactApexChart 
            options={chartOptions} 
            series={series} 
            type="donut" 
            height={280} 
            width="100%"
          />
        )}
      </div>
    </div>
  );
}
