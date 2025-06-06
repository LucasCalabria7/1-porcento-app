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
  // Outras configurações do Next.js
  reactStrictMode: true,
};

module.exports = nextConfig;
