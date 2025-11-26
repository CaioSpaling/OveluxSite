import { useEffect, useRef, useState } from 'react';
import image2 from '../assets/image-2.jpeg';
import image3 from '../assets/image-3.jpeg';
import image4 from '../assets/image-4.jpeg';
import image5 from '../assets/image-5.jpeg';
import image6 from '../assets/image-6.jpeg';
import image7 from '../assets/image-7.jpeg';
import video1 from '../assets/CamaroOvelux.mp4';
import video2 from '../assets/M3Ovelux.mp4';
import video3 from '../assets/VolvoOvelux.mp4';

interface Media {
  type: 'image' | 'video';
  src: string;
  alt: string;
  size: 'large' | 'medium';
}

const media: Media[] = [
  {
    type: 'image',
    src: image2,
    alt: 'Detalhamento exterior',
    size: 'large',
  },
  {
    type: 'video',
    src: video2,
    alt: 'M3 Ovelux',
    size: 'medium',
  },
  {
    type: 'image',
    src: image4,
    alt: 'Polimento técnico',
    size: 'medium',
  },
  {
    type: 'video',
    src: video1,
    alt: 'Camaro Ovelux',
    size: 'large',
  },
  {
    type: 'image',
    src: image6,
    alt: 'Detalhes externos',
    size: 'medium',
  },
  {
    type: 'video',
    src: video3,
    alt: 'Volvo Ovelux',
    size: 'medium',
  },
];

const VideoPlayer = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      loop
      playsInline
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
            }, index * 150);
          }
        },
        { threshold: 0.2 }
      );

      observer.observe(item);
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
          {media.map((item, index) => (
            <div
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className={`relative overflow-hidden group cursor-pointer ${
                item.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''
              } ${
                visibleItems[index]
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-95'
              } transition-all duration-700 ${
                item.size === 'large' ? 'aspect-square' : 'aspect-[4/3]'
              }`}
            >
              <div className="relative w-full h-full">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
