export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full px-4 py-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          <span className="text-blue-500">World</span>
          <span className="font-light">SaaS</span>
        </h1>
        <p className="mt-3 text-lg text-gray-400">
          Sua plataforma completa para produtos digitais
        </p>
        
        <div className="space-y-4 mt-8">
          <a href="/auth/login" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg inline-flex items-center justify-center shadow-lg transition-all duration-200">
            Entrar na plataforma
          </a>
          
          <a href="/auth/register" className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg inline-flex items-center justify-center border border-gray-600 transition-colors duration-200">
            Criar uma conta
          </a>
          
          <a href="/basic-example" className="w-full border border-blue-500 text-blue-400 hover:bg-blue-500/10 font-medium py-3 px-6 rounded-lg inline-flex items-center justify-center transition-colors duration-200">
            Ver exemplo básico
          </a>
        </div>
      </div>
    </div>
  );
}
