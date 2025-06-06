import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full px-4 py-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <Image 
            src="/assets/logo-solo-azul-medio.png" 
            alt="Umporcento Logo" 
            width={40} 
            height={40} 
            className="mr-3"
          />
          <h1 className="text-4xl text-white">
            <span className="font-gotham-black">Um</span>
            <span className="font-gotham-thin">porcento</span>
          </h1>
        </div>
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
