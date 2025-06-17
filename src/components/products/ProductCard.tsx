"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useAppTranslations } from '@/lib/useAppTranslations';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/Button';
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye, 
  BarChart3, 
  Share2, 
  Users, 
  Video, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Lock
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { t } = useAppTranslations();
  const [isHovered, setIsHovered] = useState(false);

  // Formatar o preço do produto
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  // Determinar a cor do badge de status
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'ativo':
      case 'active':
        return 'bg-green-900/30 text-green-400 border-green-700';
      case 'rascunho':
      case 'draft':
        return 'bg-yellow-900/30 text-yellow-400 border-yellow-700';
      case 'inativo':
      case 'inactive':
        return 'bg-red-900/30 text-red-400 border-red-700';
      default:
        return 'bg-gray-900/30 text-gray-400 border-gray-700';
    }
  };

  // Determinar o ícone do tipo de produto
  const getProductTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'curso':
      case 'course':
        return <Video size={14} className="mr-1" />;
      case 'mentoria':
      case 'mentorship':
        return <Users size={14} className="mr-1" />;
      default:
        return null;
    }
  };

  // Determinar o texto de status do produto
  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'ativo':
      case 'active':
        return t('products.status.active');
      case 'rascunho':
      case 'draft':
        return t('products.status.draft');
      case 'inativo':
      case 'inactive':
        return t('products.status.inactive');
      default:
        return status;
    }
  };

  // Determinar o texto do tipo de produto
  const getProductTypeText = (type: string) => {
    switch (type.toLowerCase()) {
      case 'curso':
        return t('products.types.course');
      case 'mentoria':
        return t('products.types.mentorship');
      case 'e-book':
        return t('products.types.ebook');
      case 'assinatura':
        return t('products.types.subscription');
      case 'workshop':
        return t('products.types.workshop');
      default:
        return type;
    }
  };

  // Determinar o texto do tipo de promoção
  const getPromotionTypeText = (types: string[]) => {
    const promotionTypes = [];
    
    if (types.includes('associates')) {
      promotionTypes.push(t('products.promotionTypes.associates'));
    }
    
    if (types.includes('creators')) {
      promotionTypes.push(t('products.promotionTypes.creators'));
    }
    
    return promotionTypes.join(' & ');
  };

  // Renderizar ícones de quem pode promover o produto
  const renderPromotionIcons = (types: string[]) => {
    return (
      <div className="flex space-x-1">
        {types.includes('associates') && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-6 h-6 rounded-full bg-primary-900/30 flex items-center justify-center border border-primary-700">
                  <Users size={12} className="text-primary-400" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t('products.promotionTypes.associates')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        
        {types.includes('creators') && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-6 h-6 rounded-full bg-purple-900/30 flex items-center justify-center border border-purple-700">
                  <Video size={12} className="text-purple-400" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t('products.promotionTypes.creators')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    );
  };

  // Renderizar o indicador de relação com o produto
  const renderRelationshipIndicator = () => {
    if (product.is_owner) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-primary-900/70 flex items-center justify-center border border-primary-600">
                <CheckCircle2 size={14} className="text-primary-400" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('products.relationshipTypes.owner')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    } else if (product.is_coproducer) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-purple-900/70 flex items-center justify-center border border-purple-600">
                <Users size={14} className="text-purple-400" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('products.relationshipTypes.coproducer')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    } else if (product.is_associate) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-blue-900/70 flex items-center justify-center border border-blue-600">
                <Share2 size={14} className="text-blue-400" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('products.relationshipTypes.associate')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }
    
    return null;
  };

  return (
    <div 
      className="relative bg-dark-700 rounded-xl border border-dark-600 overflow-hidden transition-all duration-300 hover:border-primary-600/50 hover:shadow-lg hover:shadow-primary-900/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Indicador de relação com o produto */}
      {renderRelationshipIndicator()}
      
      {/* Menu de ações */}
      <div className="absolute top-3 right-3 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 bg-dark-800/80 hover:bg-dark-800 text-gray-400 hover:text-white rounded-full">
              <MoreHorizontal size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-dark-800 border-dark-600 text-gray-300">
            <DropdownMenuLabel>{t('products.actions.title')}</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-dark-600" />
            <DropdownMenuItem className="hover:bg-dark-700 hover:text-white cursor-pointer">
              <Eye size={16} className="mr-2" />
              {t('products.actions.view')}
            </DropdownMenuItem>
            {product.is_owner && (
              <>
                <DropdownMenuItem className="hover:bg-dark-700 hover:text-white cursor-pointer">
                  <Edit size={16} className="mr-2" />
                  {t('products.actions.edit')}
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-dark-700 hover:text-red-400 cursor-pointer">
                  <Trash2 size={16} className="mr-2" />
                  {t('products.actions.delete')}
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuItem className="hover:bg-dark-700 hover:text-white cursor-pointer">
              <BarChart3 size={16} className="mr-2" />
              {t('products.actions.analytics')}
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-dark-700 hover:text-white cursor-pointer">
              <Share2 size={16} className="mr-2" />
              {t('products.actions.share')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Imagem do produto com overlay de hover */}
      <div className="relative h-40 w-full overflow-hidden">
        <Image
          src={product.logo_url}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-500"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
          width={400}
          height={200}
          priority={true}
          unoptimized={true}
          onError={(e) => {
            console.warn('Erro ao carregar imagem:', product.logo_url);
            // Fallback para um gradiente se a imagem não carregar
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.classList.add('bg-gradient-to-r', 'from-primary-900', 'to-dark-700');
              
              // Adicionar um elemento com as iniciais do produto
              const fallback = document.createElement('div');
              fallback.className = "h-full w-full flex items-center justify-center";
              fallback.innerHTML = `<span class="text-4xl font-bold text-primary-400">${product.name.charAt(0)}</span>`;
              parent.appendChild(fallback);
            }
          }}
        />
        
        {/* Overlay com efeito de gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 to-transparent"></div>
        
        {/* Status do produto */}
        <div className="absolute top-3 right-14">
          <Badge className={`${getStatusColor(product.status)} border`}>
            {product.status === 'rascunho' || product.status === 'draft' ? (
              <Clock size={12} className="mr-1" />
            ) : product.status === 'ativo' || product.status === 'active' ? (
              <CheckCircle2 size={12} className="mr-1" />
            ) : (
              <AlertCircle size={12} className="mr-1" />
            )}
            {getStatusText(product.status)}
          </Badge>
        </div>
        
        {/* Tipo de produto */}
        <div className="absolute bottom-3 left-3">
          <Badge variant="outline" className="bg-dark-800/80 border-dark-600 text-gray-300">
            {getProductTypeIcon(product.type)}
            {getProductTypeText(product.type)}
          </Badge>
        </div>
        
        {/* Preço do produto */}
        <div className="absolute bottom-3 right-3">
          <Badge className="bg-primary-900/50 text-primary-300 border-primary-700">
            {formatPrice(product.price)}
          </Badge>
        </div>
      </div>
      
      {/* Conteúdo do card */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-white text-lg line-clamp-1">{product.name}</h3>
        </div>
        
        <p className="text-gray-400 text-sm mt-1 line-clamp-2">{product.description}</p>
        
        {/* Rodapé do card */}
        <div className="mt-4 flex items-center justify-between">
          {/* Ícones de quem pode promover */}
          {renderPromotionIcons(product.promotion_type)}
          
          {/* Botão de ação principal */}
          {product.is_owner ? (
            <Button size="sm" variant="outline" className="border-primary-700 bg-primary-900/20 text-primary-400 hover:bg-primary-900/40">
              <Edit size={14} className="mr-1" />
              {t('products.actions.manage')}
            </Button>
          ) : product.is_coproducer ? (
            <Button size="sm" variant="outline" className="border-purple-700 bg-purple-900/20 text-purple-400 hover:bg-purple-900/40">
              <Users size={14} className="mr-1" />
              {t('products.actions.collaborate')}
            </Button>
          ) : product.is_associate ? (
            <Button size="sm" variant="outline" className="border-blue-700 bg-blue-900/20 text-blue-400 hover:bg-blue-900/40">
              <Share2 size={14} className="mr-1" />
              {t('products.actions.promote')}
            </Button>
          ) : (
            <Button size="sm" variant="outline" className="border-dark-600 bg-dark-800 text-gray-400 hover:bg-dark-700">
              <Lock size={14} className="mr-1" />
              {t('products.actions.locked')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
