"use client";

import { 
  User, 
  Star, 
  TrendingUp, 
  Award, 
  Video, 
  Image as ImageIcon, 
  FileText, 
  ExternalLink, 
  Instagram, 
  Youtube, 
  Twitch, 
  Twitter
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppTranslations } from '@/lib/useAppTranslations';

interface SocialMedia {
  platform: 'instagram' | 'youtube' | 'twitch' | 'twitter';
  username: string;
  followers: number;
  url: string;
}

interface ContentType {
  type: string;
  count: number;
  engagement: number;
}

interface CreatorProfileCardProps {
  creatorId?: string;
  name?: string;
  avatar?: string;
  bio?: string;
  level?: string;
  rating?: number;
  totalViews?: number;
  totalEngagement?: number;
  contentTypes?: ContentType[];
  socialMedia?: SocialMedia[];
  portfolioItems?: number;
  creatorSince?: string;
}

export default function CreatorProfileCard({
  creatorId = "creator-123",
  name = "Lucas Calabria",
  avatar = "/avatars/default-creator.jpg",
  bio = "Criador de conteúdo especializado em tecnologia e produtividade. Compartilho dicas, tutoriais e reviews de produtos para ajudar profissionais a otimizarem seu trabalho.",
  level = "Silver Creator",
  rating = 4.8,
  totalViews = 1250000,
  totalEngagement = 4.8,
  contentTypes = [
    { type: "videos", count: 48, engagement: 5.2 },
    { type: "images", count: 124, engagement: 4.7 },
    { type: "articles", count: 36, engagement: 3.9 }
  ],
  socialMedia = [
    { platform: "instagram", username: "@lucascalabria", followers: 24500, url: "https://instagram.com/lucascalabria" },
    { platform: "youtube", username: "Lucas Calabria", followers: 42800, url: "https://youtube.com/lucascalabria" },
    { platform: "twitch", username: "lucascalabria", followers: 8700, url: "https://twitch.tv/lucascalabria" },
    { platform: "twitter", username: "@lucascalabria", followers: 15300, url: "https://twitter.com/lucascalabria" }
  ],
  portfolioItems = 24,
  creatorSince = "Junho 2023"
}: CreatorProfileCardProps) {
  
  // Função para formatar números grandes
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };
  
  // Função para renderizar o ícone da rede social
  const renderSocialIcon = (platform: string) => {
    switch(platform) {
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'youtube':
        return <Youtube className="w-4 h-4" />;
      case 'twitch':
        return <Twitch className="w-4 h-4" />;
      case 'twitter':
        return <Twitter className="w-4 h-4" />;
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };
  
  const { t } = useAppTranslations();
  
  return (
    <div className="bg-dark-800 rounded-lg shadow-lg border-2 border-primary-500">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
            <User className="w-5 h-5 text-primary-400 mr-2" />
            {t('dashboard.creator.profile')}
          </h3>
          <div className="bg-primary-900/30 text-primary-400 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
            {level}
          </div>
        </div>
        
        {/* Informações do perfil */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Coluna da esquerda - Avatar e informações básicas */}
          <div className="md:w-1/3">
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary-500 mb-4">
                <div className="absolute inset-0 bg-dark-600 flex items-center justify-center">
                  <User className="w-16 h-16 text-primary-400" />
                </div>
              </div>
              
              <h4 className="text-white font-medium text-lg mb-1">{name}</h4>
              <div className="flex items-center mb-3">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span className="text-white font-medium">{rating}</span>
                <span className="text-gray-400 text-sm ml-1">{t('dashboard.creator.outOf5')}</span>
              </div>
              
              <p className="text-gray-300 text-sm text-center mb-4">{bio}</p>
              
              <div className="w-full bg-dark-700 rounded-lg p-3 border border-dark-600">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-xs">{t('dashboard.creator.creatorSince')}</span>
                  <span className="text-white text-sm">{creatorSince}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-xs">{t('dashboard.creator.creatorId')}</span>
                  <span className="text-primary-400 text-sm">{creatorId}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Coluna da direita - Estatísticas e redes sociais */}
          <div className="md:w-2/3">
            {/* Estatísticas gerais */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-dark-700 p-4 rounded-lg border border-dark-600">
                <div className="flex items-center mb-2">
                  <p className="text-sm text-gray-400">{t('dashboard.creator.views')}</p>
                  <TrendingUp className="w-4 h-4 text-primary-400" />
                </div>
                <p className="text-xl font-bold text-white">{formatNumber(totalViews)}</p>
              </div>
              
              <div className="bg-dark-700 p-4 rounded-lg border border-dark-600">
                <div className="flex items-center mb-2">
                  <p className="text-sm text-gray-400">{t('dashboard.creator.engagement')}</p>
                  <Award className="w-4 h-4 text-primary-400" />
                </div>
                <p className="text-xl font-bold text-white">{totalEngagement}%</p>
              </div>
            </div>
            
            {/* Tipos de conteúdo */}
            <div className="mb-6">
              <h5 className="text-white text-sm font-medium mb-3">{t('dashboard.creator.content')}</h5>
              <div className="space-y-3">
                {contentTypes.map((content, index) => (
                  <div key={index} className="bg-dark-700 p-3 rounded-lg border border-dark-600">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {content.type === "videos" ? (
                          <Video className="w-4 h-4 text-primary-400 mr-2" />
                        ) : content.type === "images" ? (
                          <ImageIcon className="w-4 h-4 text-primary-400 mr-2" />
                        ) : (
                          <FileText className="w-4 h-4 text-primary-400 mr-2" />
                        )}
                        <span className="text-white text-sm">{t(`dashboard.creator.${content.type}`)}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-xs text-gray-400">{t('dashboard.creator.quantity')}</p>
                          <p className="text-sm font-medium text-white">{content.count}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-400">{t('dashboard.creator.engagement')}</p>
                          <p className="text-sm font-medium text-primary-400">{content.engagement}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Redes sociais */}
            <div>
              <h5 className="text-white text-sm font-medium mb-3">{t('dashboard.creator.followers')}</h5>
              <div className="grid grid-cols-2 gap-3">
                {socialMedia.map((social, index) => (
                  <a 
                    key={index} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-dark-700 p-3 rounded-lg border border-dark-600 hover:border-primary-500 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                          social.platform === 'instagram' ? 'bg-pink-600' :
                          social.platform === 'youtube' ? 'bg-red-600' :
                          social.platform === 'twitch' ? 'bg-purple-600' :
                          'bg-blue-600'
                        }`}>
                          {renderSocialIcon(social.platform)}
                        </div>
                        <span className="text-white text-sm">{social.username}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">{t('dashboard.creator.followers')}</p>
                        <p className="text-sm font-medium text-white">{formatNumber(social.followers)}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Portfólio e botão para perfil completo */}
        <div className="mt-6 pt-6 border-t border-dark-600 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <FileText className="w-5 h-5 text-primary-400 mr-2" />
            <div>
              <p className="text-sm text-gray-400">{t('dashboard.creator.portfolio')}</p>
              <p className="text-white font-medium">{portfolioItems} {t('dashboard.creator.portfolioItems')}</p>
            </div>
          </div>
          
          <Link 
            href={`/ugcprofile/${creatorId}`}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-md transition-colors text-sm flex items-center"
          >
            {t('dashboard.creator.viewFullProfile')}
            <ExternalLink className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
