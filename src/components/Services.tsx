import { useEffect, useRef, useState } from 'react';
import { Sparkles, Droplet, Wind } from 'lucide-react';

const services = [
  {
    icon: Droplet,
    title: 'Lavagem Premium',
    description: 'Limpeza profunda com produtos de alta qualidade, removendo todas as impurezas sem agredir a pintura.',
  },
  {
    icon: Sparkles,
    title: 'Detalhamento Externo',
    description: 'Cuidado minucioso de cada detalhe externo, realçando o brilho e proteção da carroceria.',
  },
  {
    icon: Wind,
    title: 'Higienização Interna',
    description: 'Limpeza profunda do interior, eliminando odores e restaurando o aspecto original do veículo.',
  }
];

export default function Services() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(services.length).fill(false));
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = cardsRef.current.map((card, index) => {
      if (!card) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleCards((prev) => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, index * 100);
          }
        },
        { threshold: 0.2 }
      );

      observer.observe(card);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <section id="serviços" className="py-32 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6">
            Nossos Serviços
          </h2>
          <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
            Cada serviço é executado com precisão técnica e produtos premium
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`bg-white p-10 group hover:shadow-2xl transition-all duration-700 ${
                  visibleCards[index]
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500">
                  <Icon size={40} className="text-gray-900" strokeWidth={1} />
                </div>
                <h3 className="text-2xl font-light text-gray-900 mb-4 tracking-wide">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed font-light">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
