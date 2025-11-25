import { useEffect, useRef, useState } from 'react';
import image2 from '../assets/image-2.jpeg';
import image3 from '../assets/image-3.jpeg';
import image4 from '../assets/image-4.jpeg';
import image5 from '../assets/image-5.jpeg';
import image6 from '../assets/image-6.jpeg';
import image7 from '../assets/image-7.jpeg';

const images = [
  {
    url: image2,
    alt: 'Detalhamento exterior',
    size: 'large',
  },
  {
    url: image3,
    alt: 'Lavagem premium',
    size: 'medium',
  },
  {
    url: image4,
    alt: 'Polimento técnico',
    size: 'medium',
  },
  {
    url: image5,
    alt: 'Interior premium',
    size: 'large',
  },
  {
    url: image6,
    alt: 'Detalhes externos',
    size: 'medium',
  },
  {
    url: image7,
    alt: 'Acabamento perfeito',
    size: 'medium',
  },
];

export default function Gallery() {
  const [visibleImages, setVisibleImages] = useState<boolean[]>(new Array(images.length).fill(false));
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = imagesRef.current.map((img, index) => {
      if (!img) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleImages((prev) => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, index * 150);
          }
        },
        { threshold: 0.2 }
      );

      observer.observe(img);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <section id="galeria" className="py-32 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6">
            Nosso Trabalho
          </h2>
          <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
            Cada detalhe é tratado com máxima atenção e cuidado
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              ref={(el) => (imagesRef.current[index] = el)}
              className={`relative overflow-hidden group cursor-pointer ${
                image.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''
              } ${
                visibleImages[index]
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-95'
              } transition-all duration-700`}
            >
              <div className="relative h-64 md:h-80">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
