"use client"

import { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import Link from 'next/link';

export default function DashboardPage() {
  // Dados simulados para o dashboard
  const stats = [
    { name: 'Produtos Ativos', value: '24', change: '+12%', changeType: 'increase' },
    { name: 'Vendas Hoje', value: 'R$ 1.240,00', change: '+8%', changeType: 'increase' },
    { name: 'Novos Clientes', value: '18', change: '+4%', changeType: 'increase' },
    { name: 'Taxa de Conversão', value: '3.6%', change: '-0.7%', changeType: 'decrease' },
  ];

  const recentSales = [
    { id: 1, customer: 'João Silva', product: 'Curso de Marketing Digital', amount: 'R$ 297,00', date: '5 min atrás', status: 'Completo' },
    { id: 2, customer: 'Maria Oliveira', product: 'E-book de Investimentos', amount: 'R$ 49,90', date: '12 min atrás', status: 'Completo' },
    { id: 3, customer: 'Pedro Santos', product: 'Template de Website', amount: 'R$ 157,00', date: '45 min atrás', status: 'Processando' },
    { id: 4, customer: 'Ana Souza', product: 'Mentoria Empresarial', amount: 'R$ 497,00', date: '1 hora atrás', status: 'Completo' },
    { id: 5, customer: 'Carlos Mendes', product: 'Plugin Premium', amount: 'R$ 87,00', date: '2 horas atrás', status: 'Completo' },
  ];

  const popularProducts = [
    { id: 1, name: 'Curso de Marketing Digital', sales: 156, revenue: 'R$ 46.332,00', rating: 4.8 },
    { id: 2, name: 'E-book de Investimentos', sales: 284, revenue: 'R$ 14.171,60', rating: 4.5 },
    { id: 3, name: 'Template de Website', sales: 98, revenue: 'R$ 15.386,00', rating: 4.7 },
    { id: 4, name: 'Mentoria Empresarial', sales: 64, revenue: 'R$ 31.808,00', rating: 4.9 },
  ];

  return (
    <DashboardLayout>
      <div className="py-6">
        {/* Cabeçalho */}
        <div className="mb-8">
          <h1 className="title-black text-2xl font-semibold text-white">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-400">Visão geral do seu negócio de produtos digitais.</p>
        </div>

        {/* Cards de estatísticas */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-dark-700 overflow-hidden rounded-lg shadow-sm border border-dark-600 transition-all hover:shadow-md">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 rounded-md bg-primary-900/30 p-3">
                    {index === 0 && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    )}
                    {index === 1 && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {index === 2 && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    )}
                    {index === 3 && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    )}
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dt className="text-sm font-medium text-gray-400 truncate">{stat.name}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-white">{stat.value}</div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${stat.changeType === 'increase' ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                        {stat.changeType === 'increase' ? (
                          <svg className="self-center flex-shrink-0 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="self-center flex-shrink-0 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                        <span className="sr-only">{stat.changeType === 'increase' ? 'Aumentou' : 'Diminuiu'} por</span>
                        {stat.change}
                      </div>
                    </dd>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Vendas Recentes */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-dark-700 shadow-sm rounded-lg border border-gray-200 dark:border-dark-600 overflow-hidden">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200 dark:border-dark-600">
                <h3 className="text-lg leading-6 font-medium text-white">Vendas Recentes</h3>
                <Link href="/dashboard/sales" className="text-sm text-primary-400 hover:text-primary-300 transition-colors">
                  Ver todas
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-600">
                  <thead className="bg-dark-800">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Cliente</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Produto</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Valor</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Data</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-dark-700 divide-y divide-dark-600">
                    {recentSales.map((sale) => (
                      <tr key={sale.id} className="hover:bg-dark-600 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{sale.customer}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{sale.product}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{sale.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{sale.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${sale.status === 'Completo' ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-400'}`}>
                            {sale.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Produtos Populares */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-dark-700 shadow-sm rounded-lg border border-gray-200 dark:border-dark-600 overflow-hidden">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200 dark:border-dark-600">
                <h3 className="text-lg leading-6 font-medium text-white">Produtos Populares</h3>
                <Link href="/dashboard/products" className="text-sm text-primary-400 hover:text-primary-300 transition-colors">
                  Ver todos
                </Link>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <ul className="divide-y divide-dark-600">
                  {popularProducts.map((product) => (
                    <li key={product.id} className="py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">{product.name}</p>
                          <div className="flex items-center mt-1">
                            {[0, 1, 2, 3, 4].map((rating) => (
                              <svg
                                key={rating}
                                className={`h-4 w-4 ${rating < Math.floor(product.rating) ? 'text-yellow-400' : rating < product.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                            <span className="ml-1 text-xs text-gray-400">{product.rating}/5</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{product.sales} vendas</p>
                          <p className="text-sm text-gray-400">{product.revenue}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Card de Ação Rápida */}
            <div className="mt-6 bg-primary-900 shadow-sm rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:p-6 text-center">
                <h3 className="text-lg font-medium text-white mb-2">Adicionar Novo Produto</h3>
                <p className="text-sm text-primary-100 mb-4">Comece a vender um novo produto digital agora mesmo.</p>
                <Link href="/dashboard/products/new" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-white hover:bg-primary-50 transition-colors">
                  Criar Produto
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
