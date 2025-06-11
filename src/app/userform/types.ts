// Tipos para o formulário de onboarding

// Tipo de perfil do usuário
export type UserProfileType = 'CEO' | 'Associate' | 'UGC Creator';

// Interface para dados do formulário
export interface FormData {
  // Dados básicos
  fullName: string;
  email: string;
  phoneNumber: string;
  country: string;
  birthDate: string;
  document: string; // CPF, CNPJ ou documento internacional
  address: string;
  language: string;
  
  // Dados específicos por tipo de perfil
  profileType: UserProfileType;
  
  // CEO
  companyRevenue?: string;
  
  // Associate
  globalSellingExperience?: string;
  
  // UGC Creator
  creatorExperienceLevel?: string;
  
  // Dados comuns para todos os perfis
  monetizationMethod: string;
  globalMonetization: string;
  digitalProductStrategy: boolean;
  digitalProductType: string[];
  referralSource: string;
  
  // Metadados
  onboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

// Interface para opções de seleção
export interface SelectOption {
  value: string;
  label: string;
}

// Opções para códigos de país (telefone)
export const countryCodeOptions: SelectOption[] = [
  { value: '+55', label: '🇧🇷 +55 (Brasil)' },
  { value: '+1', label: '🇺🇸 +1 (EUA/Canadá)' },
  { value: '+351', label: '🇵🇹 +351 (Portugal)' },
  { value: '+44', label: '🇬🇧 +44 (Reino Unido)' },
  { value: '+34', label: '🇪🇸 +34 (Espanha)' },
  { value: '+49', label: '🇩🇪 +49 (Alemanha)' },
  { value: '+33', label: '🇫🇷 +33 (França)' },
  { value: '+39', label: '🇮🇹 +39 (Itália)' },
  { value: '+81', label: '🇯🇵 +81 (Japão)' },
  { value: '+86', label: '🇨🇳 +86 (China)' },
  { value: '+91', label: '🇮🇳 +91 (Índia)' },
  { value: '+7', label: '🇷🇺 +7 (Rússia)' },
  { value: '+61', label: '🇦🇺 +61 (Austrália)' },
  { value: '+52', label: '🇲🇽 +52 (México)' },
  { value: '+54', label: '🇦🇷 +54 (Argentina)' },
  { value: '+56', label: '🇨🇱 +56 (Chile)' },
  { value: '+57', label: '🇨🇴 +57 (Colômbia)' },
  { value: '+58', label: '🇻🇪 +58 (Venezuela)' },
  // Removida entrada duplicada de Portugal
];

// Opções para países
export const countryOptions: SelectOption[] = [
  { value: 'BR', label: 'Brasil' },
  { value: 'US', label: 'Estados Unidos' },
  { value: 'CA', label: 'Canadá' },
  { value: 'UK', label: 'Reino Unido' },
  { value: 'AU', label: 'Austrália' },
  { value: 'DE', label: 'Alemanha' },
  { value: 'FR', label: 'França' },
  { value: 'ES', label: 'Espanha' },
  { value: 'IT', label: 'Itália' },
  { value: 'JP', label: 'Japão' },
  { value: 'CN', label: 'China' },
  { value: 'IN', label: 'Índia' },
  { value: 'MX', label: 'México' },
  { value: 'AR', label: 'Argentina' },
  { value: 'CL', label: 'Chile' },
  { value: 'CO', label: 'Colômbia' },
  { value: 'PE', label: 'Peru' },
  { value: 'PT', label: 'Portugal' },
];

// Opções para idiomas
export const languageOptions: SelectOption[] = [
  { value: 'pt-BR', label: 'Português (Brasil)' },
  { value: 'en-US', label: 'Inglês (EUA)' },
  { value: 'es-ES', label: 'Espanhol' },
  { value: 'fr-FR', label: 'Francês' },
  { value: 'de-DE', label: 'Alemão' },
  { value: 'it-IT', label: 'Italiano' },
  { value: 'ja-JP', label: 'Japonês' },
  { value: 'zh-CN', label: 'Chinês (Simplificado)' },
];

// Opções para métodos de monetização
export const monetizationMethodOptions: SelectOption[] = [
  { value: 'affiliate', label: 'Vendendo outros produtos (associação/afiliação)' },
  { value: 'freelance', label: 'Fechando contratos autônomos (Freelas)' },
  { value: 'own_products', label: 'Com meus próprios produtos/empresa' },
];

// Opções para monetização global
export const globalMonetizationOptions: SelectOption[] = [
  { value: 'country_only', label: 'Somente meu país' },
  { value: 'any_country', label: 'Posso monetizar em qualquer país' },
  { value: 'limited_countries', label: 'Estou limitado a alguns países' },
];

// Opções para tipos de produtos digitais
export const digitalProductTypeOptions: SelectOption[] = [
  { value: 'saas', label: 'SaaS' },
  { value: 'micro_saas', label: 'Micro-SaaS' },
  { value: 'ai_agents', label: 'Agentes de IA' },
  { value: 'online_courses', label: 'Cursos Online' },
  { value: 'ebook', label: 'E-book' },
  { value: 'mentoring', label: 'Mentoria' },
  { value: 'online_services', label: 'Serviços Online (influenciadores, freelas)' },
  { value: 'other', label: 'Outro' },
];

// Opções para fontes de referência
export const referralSourceOptions: SelectOption[] = [
  { value: 'search', label: 'Pesquisa' },
  { value: 'recommendation', label: 'Recomendação' },
  { value: 'ads', label: 'Anúncios' },
  { value: 'influencers', label: 'Influenciadores' },
  { value: 'other', label: 'Outro' },
];

// Opções para níveis de experiência de criadores
export const creatorExperienceLevelOptions: SelectOption[] = [
  { value: 'beginner', label: 'Iniciante (menos de 1 ano)' },
  { value: 'intermediate', label: 'Intermediário (1-3 anos)' },
  { value: 'advanced', label: 'Avançado (3-5 anos)' },
  { value: 'expert', label: 'Especialista (mais de 5 anos)' },
];

// Opções para faixas de faturamento (CEOs)
export const companyRevenueOptions: SelectOption[] = [
  { value: 'pre_revenue', label: 'Pré-faturamento' },
  { value: 'under_10k', label: 'Menos de R$ 10 mil/mês' },
  { value: '10k_50k', label: 'R$ 10 mil a R$ 50 mil/mês' },
  { value: '50k_100k', label: 'R$ 50 mil a R$ 100 mil/mês' },
  { value: '100k_500k', label: 'R$ 100 mil a R$ 500 mil/mês' },
  { value: 'over_500k', label: 'Mais de R$ 500 mil/mês' },
];

// Opções para experiência em vendas globais (Associates)
export const globalSellingExperienceOptions: SelectOption[] = [
  { value: 'none', label: 'Sem experiência' },
  { value: 'beginner', label: 'Iniciante (menos de 1 ano)' },
  { value: 'intermediate', label: 'Intermediário (1-3 anos)' },
  { value: 'advanced', label: 'Avançado (3-5 anos)' },
  { value: 'expert', label: 'Especialista (mais de 5 anos)' },
];
