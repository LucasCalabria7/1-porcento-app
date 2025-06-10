/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Desabilitar a verificação de ESLint durante a compilação
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Desabilitar a verificação de tipos durante a compilação
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'images.unsplash.com'],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
  experimental: {
    // Opções experimentais podem ser adicionadas aqui quando necessário
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
};

module.exports = nextConfig;
