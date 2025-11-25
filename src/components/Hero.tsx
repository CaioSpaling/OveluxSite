import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import heroImage from '../assets/image-1.jpeg';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToServices = () => {
    const element = document.getElementById('serviços');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div
        className={`relative z-10 h-full flex flex-col items-center justify-center px-6 text-center transition-all duration-1500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-6 tracking-tight leading-tight max-w-5xl">
          Estética Automotiva Premium na Porta da Sua Casa
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-12 font-light tracking-wide">
          Transforme o seu carro sem precisar sair de casa. Excelência, cuidado e detalhes que fazem a diferença.
        </p>
        <button
          onClick={scrollToServices}
          className="px-10 py-4 bg-white text-black text-sm uppercase tracking-widest hover:bg-gray-100 transition-all duration-300 font-medium"
        >
          Agendar Atendimento
        </button>
      </div>

      <button
        onClick={scrollToServices}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white animate-bounce"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
}
