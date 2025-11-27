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
  layout: string; // For desktop grid classes
}

const media: Media[] = [
  {
    type: 'video',
    src: videoCamaro,
    alt: 'Camaro Ovelux',
    layout: 'md:col-span-1 md:row-span-2',
  },
  {
    type: 'image',
    src: imageCivic,
    alt: 'Civic',
    layout: 'md:col-span-2 md:row-span-1',
  },
  {
    type: 'video',
    src: videoM3,
    alt: 'M3 Ovelux',
    layout: 'md:col-span-1 md:row-span-2',
  },
  {
    type: 'image',
    src: imageRam,
    alt: 'Ram',
    layout: 'md:col-span-1 md:row-span-1',
  },
  {
    type: 'video',
    src: videoPorsche,
    alt: 'Porsche Ovelux',
    layout: 'md:col-span-1 md:row-span-1',
  },
  {
    type: 'image',
    src: imageVolvo,
    alt: 'Volvo',
    layout: 'md:col-span-2 md:row-span-1',
  },
];

const VideoPlayer = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // Autoplay was prevented.
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleMouseEnter = () => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay was prevented.
      });
    }
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    const video = videoRef.current;
    if (video && !video.paused) {
      video.pause();
    }
    setIsHovering(false);
  };

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
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
        { threshold: 0.1 }
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

        <div className="grid grid-cols-2 md:grid-cols-3 md:grid-rows-3 gap-4">
          {media.map((item, index) => (
            <div
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className={`relative overflow-hidden group cursor-pointer aspect-square ${
                item.layout
              } ${
                visibleItems[index]
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-95'
              } transition-all duration-700`}
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