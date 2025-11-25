import { useEffect, useRef, useState } from 'react';
import { Calendar, MapPin, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Calendar,
    number: '01',
    title: 'Você agenda',
    description: 'Escolha o melhor dia e horário. Atendemos onde você estiver.',
  },
  {
    icon: MapPin,
    number: '02',
    title: 'Vamos até você',
    description: 'Chegamos com todos os equipamentos e produtos profissionais necessários.',
  },
  {
    icon: CheckCircle,
    number: '03',
    title: 'Você recebe seu carro impecável',
    description: 'Qualidade premium no conforto da sua casa ou empresa.',
  },
];

export default function HowItWorks() {
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

  return (
    <section id="processo" ref={sectionRef} className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6">
            Como Funciona
          </h2>
          <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
            Três passos simples para ter seu carro impecável
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className={`text-center transition-all duration-1000 delay-${index * 200} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
              >
                <div className="relative mb-8">
                  <div className="w-24 h-24 mx-auto rounded-full border border-gray-300 flex items-center justify-center group hover:border-gray-900 transition-colors duration-300">
                    <Icon size={36} className="text-gray-900" strokeWidth={1} />
                  </div>
                  <div className="absolute -top-4 -right-4 text-6xl font-light text-gray-200">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-2xl font-light text-gray-900 mb-4 tracking-wide">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed font-light">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
