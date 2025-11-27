import { useEffect, useRef, useState } from 'react';

// New imports from assets folder
import imageCivic from '../assets/Civic.jpeg';
import videoM3 from '../assets/M3Ovelux.mp4';
import imageRam from '../assets/Ram.jpeg';
import videoPorsche from '../assets/PorscheOvelux.mp4';
import videoCamaro from '../assets/CamaroOvelux.mp4';
import imageVolvo from '../assets/Volvo.jpg';

interface Media {
  type: 'image' | 'video';
  src: string;
  alt: string;
}

const media: Media[] = [
  {
    type: 'video',
    src: videoPorsche,
    alt: 'Porsche Ovelux',
  },
  {
    type: 'image',
    src: imageCivic,
    alt: 'Civic',
  },
  {
    type: 'video',
    src: videoM3,
    alt: 'M3 Ovelux',
  },
  {
    type: 'image',
    src: imageRam,
    alt: 'Ram',
  },
  {
    type: 'video',
    src: videoCamaro,
    alt: 'Camaro Ovelux',
  },
  {
    type: 'image',
    src: imageVolvo,
    alt: 'Volvo',
  },
];

const VideoPlayer = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    />
  );
};

export default function Gallery() {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(media.length).fill(false));
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = itemsRef.current.map((item, index) => {
      if (!item) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleItems((prev) => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, index * 120);
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(item);
      return observer;
    });

    return () => observers.forEach((obs) => obs?.disconnect());
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

        {/* CORREÇÃO: Removido aspect-square e ajustado o grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {media.map((item, index) => {
            let orderClass = '';
            switch (item.alt) {
              case 'Porsche Ovelux':
                orderClass = 'order-1';
                break;
              case 'Civic':
                orderClass = 'order-2';
                break;
              case 'M3 Ovelux':
                orderClass = 'order-5 md:order-3';
                break;
              case 'Ram':
                orderClass = 'order-3 md:order-4';
                break;
              case 'Camaro Ovelux':
                orderClass = 'order-4 md:order-5';
                break;
              case 'Volvo':
                orderClass = 'order-6';
                break;
            }

            return (
              <div
                key={index}
                ref={(el) => (itemsRef.current[index] = el)}
                className={`relative overflow-hidden group cursor-pointer h-48 md:h-64 lg:h-80
                transition-all duration-700
                ${
                  visibleItems[index]
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-95'
                } ${orderClass}`}
              >
                {item.type === 'image' ? (
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <VideoPlayer src={item.src} />
                )}

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
