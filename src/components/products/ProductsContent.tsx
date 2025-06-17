"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAppTranslations } from '@/lib/useAppTranslations';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import ProductCard from '@/components/products/ProductCard';
import { PlusCircle, Search, Filter, SlidersHorizontal, Check } from 'lucide-react';

// Tipos para os produtos
interface Product {
  id: string;
  name: string;
  description: string;
  logo_url: string;
  type: string;
  status: string;
  promotion_type: string[];
  price: number;
  owner_id: string;
  created_at: string;
  updated_at: string;
  is_owner: boolean;
  is_coproducer: boolean;
  is_associate: boolean;
}

export default function ProductsContent() {
  const { t } = useAppTranslations();
  const [profileType, setProfileType] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [activeSort, setActiveSort] = useState<string>('newest');
  
  // Dados de exemplo para produtos (em um ambiente real, isso viria do banco de dados)
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Curso de Marketing Digital',
      description: 'Aprenda as melhores estratégias de marketing digital',
      logo_url: 'https://placehold.co/150x150/2563eb/ffffff.png?text=Marketing+Digital',
      type: 'curso',
      status: 'ativo',
      promotion_type: ['associates', 'creators'],
      price: 997.00,
      owner_id: '123',
      created_at: '2023-01-15T00:00:00Z',
      updated_at: '2023-06-10T00:00:00Z',
      is_owner: true,
      is_coproducer: false,
      is_associate: false
    },
    {
      id: '2',
      name: 'Mentoria de Vendas B2B',
      description: 'Mentoria exclusiva para profissionais de vendas B2B',
      logo_url: 'https://placehold.co/150x150/16a34a/ffffff.png?text=Mentoria+B2B',
      type: 'mentoria',
      status: 'ativo',
      promotion_type: ['associates'],
      price: 1997.00,
      owner_id: '456',
      created_at: '2023-02-20T00:00:00Z',
      updated_at: '2023-07-05T00:00:00Z',
      is_owner: false,
      is_coproducer: true,
      is_associate: false
    },
    {
      id: '3',
      name: 'E-book Finanças Pessoais',
      description: 'Guia completo para organizar suas finanças pessoais',
      logo_url: 'https://placehold.co/150x150/ca8a04/ffffff.png?text=E-book',
      type: 'e-book',
      status: 'ativo',
      promotion_type: ['associates', 'creators'],
      price: 47.00,
      owner_id: '789',
      created_at: '2023-03-10T00:00:00Z',
      updated_at: '2023-05-15T00:00:00Z',
      is_owner: false,
      is_coproducer: false,
      is_associate: true
    },
    {
      id: '4',
      name: 'Assinatura Premium',
      description: 'Acesso a todos os conteúdos exclusivos da plataforma',
      logo_url: 'https://placehold.co/150x150/9333ea/ffffff.png?text=Premium',
      type: 'assinatura',
      status: 'ativo',
      promotion_type: ['associates'],
      price: 39.90,
      owner_id: '123',
      created_at: '2023-04-05T00:00:00Z',
      updated_at: '2023-08-01T00:00:00Z',
      is_owner: true,
      is_coproducer: false,
      is_associate: false
    },
    {
      id: '5',
      name: 'Workshop de Produtividade',
      description: 'Técnicas avançadas para aumentar sua produtividade',
      logo_url: 'https://placehold.co/150x150/dc2626/ffffff.png?text=Workshop',
      type: 'workshop',
      status: 'rascunho',
      promotion_type: ['creators'],
      price: 297.00,
      owner_id: '123',
      created_at: '2023-05-20T00:00:00Z',
      updated_at: '2023-07-25T00:00:00Z',
      is_owner: true,
      is_coproducer: false,
      is_associate: false
    }
  ];

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          try {
            // Obter tipo de perfil do banco de dados
            const { data: profile, error } = await supabase
              .from('profiles')
              .select('profile_type')
              .eq('user_id', session.user.id)
              .single();
            
            if (error) {
              console.warn('Aviso: Erro ao buscar perfil do usuário:', error.message);
              // Fallback para metadados em caso de erro
              setProfileType(session.user.user_metadata?.profile_type?.toLowerCase() || 'ceo');
            } else if (profile && profile.profile_type) {
              setProfileType(profile.profile_type.toLowerCase());
            } else {
              // Fallback para metadados
              setProfileType(session.user.user_metadata?.profile_type?.toLowerCase() || 'ceo');
            }
          } catch (profileError) {
            console.warn('Aviso: Erro ao processar perfil:', profileError);
            // Fallback para metadados em caso de erro
            setProfileType(session.user.user_metadata?.profile_type?.toLowerCase() || 'ceo');
          }
          
          // Em um ambiente real, aqui buscaríamos os produtos do usuário
          // Por enquanto, estamos usando dados simulados
          setProducts(mockProducts);
        }
      } catch (error) {
        console.error('Erro ao buscar sessão do usuário:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserProfile();
  }, []);

  // Filtrar produtos com base na busca e tipo selecionado
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = activeFilter === 'all' || product.type.toLowerCase() === activeFilter.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });
  
  // Ordenar produtos
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(activeSort) {
      case 'newest':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case 'oldest':
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      case 'price_asc':
        return a.price - b.price;
      case 'price_desc':
        return b.price - a.price;
      case 'name_asc':
        return a.name.localeCompare(b.name);
      case 'name_desc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  // Filtrar produtos com base na tab ativa
  const getFilteredProductsByTab = () => {
    let result;
    switch(activeTab) {
      case 'all':
        result = sortedProducts;
        break;
      case 'owner':
        result = sortedProducts.filter(product => product.is_owner);
        break;
      case 'coproducer':
        result = sortedProducts.filter(product => product.is_coproducer);
        break;
      case 'associate':
        result = sortedProducts.filter(product => product.is_associate);
        break;
      default:
        result = sortedProducts;
    }
    return result;
  };

  // Renderizar um esqueleto de carregamento enquanto os dados estão sendo carregados
  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-12 bg-dark-700 rounded-lg"></div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 bg-dark-700 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho da página */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="title-black text-2xl font-semibold text-white">
            {t('products.title')}
          </h1>
          <p className="text-gray-400 mt-1">
            {t('products.description')}
          </p>
        </div>
        
        <Button className="bg-primary-600 hover:bg-primary-700 text-white flex items-center gap-2 self-start">
          <PlusCircle size={18} />
          {t('products.createNew')}
        </Button>
      </div>
      
      {/* Barra de pesquisa e filtros */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder={t('products.searchPlaceholder')}
            className="pl-10 bg-dark-700 border-dark-600 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 self-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-dark-600 bg-dark-700 text-gray-300 hover:bg-dark-600 hover:text-white flex items-center gap-2">
                <Filter size={16} />
                {t('products.filter')}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-dark-800 border-dark-600 text-white">
              <DropdownMenuItem 
                className={`flex items-center justify-between ${activeFilter === 'all' ? 'bg-primary-900/30 text-primary-400' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                <span>Todos os tipos</span>
                {activeFilter === 'all' && <Check size={16} className="text-primary-400" />}
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={`flex items-center justify-between ${activeFilter === 'course' ? 'bg-primary-900/30 text-primary-400' : ''}`}
                onClick={() => setActiveFilter('course')}
              >
                <span>{t('products.types.course')}</span>
                {activeFilter === 'course' && <Check size={16} className="text-primary-400" />}
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={`flex items-center justify-between ${activeFilter === 'mentorship' ? 'bg-primary-900/30 text-primary-400' : ''}`}
                onClick={() => setActiveFilter('mentorship')}
              >
                <span>{t('products.types.mentorship')}</span>
                {activeFilter === 'mentorship' && <Check size={16} className="text-primary-400" />}
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={`flex items-center justify-between ${activeFilter === 'ebook' ? 'bg-primary-900/30 text-primary-400' : ''}`}
                onClick={() => setActiveFilter('ebook')}
              >
                <span>{t('products.types.ebook')}</span>
                {activeFilter === 'ebook' && <Check size={16} className="text-primary-400" />}
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={`flex items-center justify-between ${activeFilter === 'subscription' ? 'bg-primary-900/30 text-primary-400' : ''}`}
                onClick={() => setActiveFilter('subscription')}
              >
                <span>{t('products.types.subscription')}</span>
                {activeFilter === 'subscription' && <Check size={16} className="text-primary-400" />}
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={`flex items-center justify-between ${activeFilter === 'workshop' ? 'bg-primary-900/30 text-primary-400' : ''}`}
                onClick={() => setActiveFilter('workshop')}
              >
                <span>{t('products.types.workshop')}</span>
                {activeFilter === 'workshop' && <Check size={16} className="text-primary-400" />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-dark-600 bg-dark-700 text-gray-300 hover:bg-dark-600 hover:text-white flex items-center gap-2">
                <SlidersHorizontal size={16} />
                {t('products.sort')}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-dark-800 border-dark-600 text-white">
              <DropdownMenuItem 
                className={`flex items-center justify-between ${activeSort === 'newest' ? 'bg-primary-900/30 text-primary-400' : ''}`}
                onClick={() => setActiveSort('newest')}
              >
                <span>Mais recentes</span>
                {activeSort === 'newest' && <Check size={16} className="text-primary-400" />}
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={`flex items-center justify-between ${activeSort === 'oldest' ? 'bg-primary-900/30 text-primary-400' : ''}`}
                onClick={() => setActiveSort('oldest')}
              >
                <span>Mais antigos</span>
                {activeSort === 'oldest' && <Check size={16} className="text-primary-400" />}
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={`flex items-center justify-between ${activeSort === 'price_asc' ? 'bg-primary-900/30 text-primary-400' : ''}`}
                onClick={() => setActiveSort('price_asc')}
              >
                <span>Menor preço</span>
                {activeSort === 'price_asc' && <Check size={16} className="text-primary-400" />}
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={`flex items-center justify-between ${activeSort === 'price_desc' ? 'bg-primary-900/30 text-primary-400' : ''}`}
                onClick={() => setActiveSort('price_desc')}
              >
                <span>Maior preço</span>
                {activeSort === 'price_desc' && <Check size={16} className="text-primary-400" />}
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={`flex items-center justify-between ${activeSort === 'name_asc' ? 'bg-primary-900/30 text-primary-400' : ''}`}
                onClick={() => setActiveSort('name_asc')}
              >
                <span>Nome (A-Z)</span>
                {activeSort === 'name_asc' && <Check size={16} className="text-primary-400" />}
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={`flex items-center justify-between ${activeSort === 'name_desc' ? 'bg-primary-900/30 text-primary-400' : ''}`}
                onClick={() => setActiveSort('name_desc')}
              >
                <span>Nome (Z-A)</span>
                {activeSort === 'name_desc' && <Check size={16} className="text-primary-400" />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Tabs para categorias de produtos */}
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all" className="data-[state=active]:bg-primary-900/30 data-[state=active]:text-primary-400">
            {t('products.tabs.all')}
          </TabsTrigger>
          <TabsTrigger value="owner" className="data-[state=active]:bg-primary-900/30 data-[state=active]:text-primary-400">
            {t('products.tabs.owner')}
          </TabsTrigger>
          <TabsTrigger value="coproducer" className="data-[state=active]:bg-primary-900/30 data-[state=active]:text-primary-400">
            {t('products.tabs.coproducer')}
          </TabsTrigger>
          <TabsTrigger value="associate" className="data-[state=active]:bg-primary-900/30 data-[state=active]:text-primary-400">
            {t('products.tabs.associate')}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredProductsByTab().map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {getFilteredProductsByTab().length === 0 && (
            <div className="text-center py-12 bg-dark-700/50 rounded-lg border border-dark-600">
              <p className="text-gray-400">{t('products.noProductsFound')}</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="owner" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredProductsByTab().map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {getFilteredProductsByTab().length === 0 && (
            <div className="text-center py-12 bg-dark-700/50 rounded-lg border border-dark-600">
              <p className="text-gray-400">{t('products.noProductsFound')}</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="coproducer" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredProductsByTab().map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {getFilteredProductsByTab().length === 0 && (
            <div className="text-center py-12 bg-dark-700/50 rounded-lg border border-dark-600">
              <p className="text-gray-400">{t('products.noProductsFound')}</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="associate" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredProductsByTab().map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {getFilteredProductsByTab().length === 0 && (
            <div className="text-center py-12 bg-dark-700/50 rounded-lg border border-dark-600">
              <p className="text-gray-400">{t('products.noProductsFound')}</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
