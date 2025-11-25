import { useEffect, useRef, useState } from 'react';

export default function About() {
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
    <section ref={sectionRef} className="py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div
          className={`grid md:grid-cols-2 gap-16 items-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-gray-900">
              Excelência que vai até você
            </h2>
            <div className="space-y-6 text-gray-600 text-lg font-light leading-relaxed">
              <p>
                Nossa filosofia é simples: seu carro merece o melhor cuidado, sem que você precise se deslocar.
              </p>
              <p>
                Levamos todo o equipamento profissional até a porta da sua casa, empresa ou onde você estiver.
              </p>
              <p>
                Com técnicas avançadas e produtos premium, transformamos seu veículo em uma obra de arte sobre rodas.
              </p>
            </div>
            <div className="pt-6">
              <div className="inline-block border-t-2 border-black pt-4">
                <p className="text-sm uppercase tracking-widest text-gray-900 font-medium">
                  Atendimento 100% Móvel
                </p>
              </div>
            </div>
          </div>

          <div className="relative h-[500px] md:h-[600px]">
            <div className="absolute inset-0 bg-gray-200">
              <img
                src="https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Interior de carro premium"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
