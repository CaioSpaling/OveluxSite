import { useEffect, useRef, useState } from 'react';
import finalCTAImage from '../assets/image-8.jpeg';

export default function FinalCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleContact = () => {
    window.open('https://wa.me/5519996834667?text=Olá! Gostaria de agendar um serviço de estética automotiva.', '_blank');
  };

  return (
    <section
      id="contato"
      ref={sectionRef}
      className="relative py-40 px-6 overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-[center_60%] md:bg-[center_70%]"
        style={{
          backgroundImage: `url(${finalCTAImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div
        className={`relative z-10 max-w-4xl mx-auto text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
          Seu Carro Merece Excelência
        </h2>
        <p className="text-xl text-white/90 mb-12 font-light max-w-2xl mx-auto">
          Agende agora e experimente o cuidado que transforma
        </p>
        <button
          onClick={handleContact}
          className="px-12 py-5 bg-white text-black text-sm uppercase tracking-widest hover:bg-gray-100 transition-all duration-300 font-medium"
        >
          Agendar Atendimento
        </button>
      </div>
    </section>
  );
}
