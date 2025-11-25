import { useEffect, useRef, useState } from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Alicia Basualto',
    role: 'Empresária',
    content: 'Serviço impecável! A comodidade de ter o carro tratado na minha casa, com resultado profissional, não tem preço. Recomendo muito.',
  },
  {
    name: 'João Victor Pacheco',
    role: 'Empresário',
    content: 'Fiquei impressionada com o nível de detalhamento. Meu carro ficou melhor que novo. A equipe é extremamente profissional e atenciosa.',
  },
  {
    name: 'Caio Spadotto',
    role: 'Desenvolvedor',
    content: 'Uso o serviço mensalmente. A qualidade é sempre consistente e o atendimento é excepcional. Vale cada centavo investido.',
  },
];

export default function Testimonials() {
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
    <section ref={sectionRef} className="py-32 px-6 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6">
            O Que Dizem Nossos Clientes
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className={`bg-white p-10 transition-all duration-1000 delay-${index * 200} ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
            >
              <Quote size={32} className="text-gray-300 mb-6" strokeWidth={1} />
              <p className="text-gray-700 leading-relaxed font-light mb-8 text-lg">
                "{testimonial.content}"
              </p>
              <div className="border-t border-gray-200 pt-6">
                <p className="text-gray-900 font-medium tracking-wide">
                  {testimonial.name}
                </p>
                <p className="text-gray-500 text-sm mt-1 font-light">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
