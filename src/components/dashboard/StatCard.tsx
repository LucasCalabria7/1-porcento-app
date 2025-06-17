"use client";

import { ReactNode } from 'react';
import { useAppTranslations } from '@/lib/useAppTranslations';

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  bgColor?: string;
  textColor?: string;
}

export default function StatCard({ title, value, icon, trend, bgColor = 'bg-dark-700', textColor = 'text-white' }: StatCardProps) {
  const { t } = useAppTranslations();
  return (
    <div className={`${bgColor} overflow-hidden rounded-lg shadow-sm border border-dark-600 transition-all hover:shadow-md hover:border-dark-500`}>
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0 rounded-md bg-primary-900/30 p-3">
            {icon}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dt className="text-sm font-medium text-gray-400 truncate">{title}</dt>
            <dd className="flex items-baseline">
              <div className={`text-2xl font-semibold ${textColor}`}>{value}</div>
              {trend && (
                <div className={`ml-2 flex items-baseline text-sm font-semibold ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                  {trend.isPositive ? (
                    <svg className="self-center flex-shrink-0 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="self-center flex-shrink-0 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span className="sr-only">{trend.isPositive ? t('statusIncreased') : t('statusDecreased')} {t('statusBy')}</span>
                  {trend.value}
                </div>
              )}
            </dd>
          </div>
        </div>
      </div>
    </div>
  );
}
