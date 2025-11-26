import { useEffect, useRef, useState } from 'react';

// New imports from Midia folder
import imageCivic from '../../Midia/Civic.jpeg';
import videoM3 from '../../Midia/M3Ovelux.mp4';
import imageSW4 from '../../Midia/SW4.jpg';
import videoSW4 from '../../Midia/SW4Ovelux.mp4';
import videoTracker from '../../Midia/TrackerOvelux.mp4';
import imageVolvo from '../../Midia/Volvo.jpg';

interface Media {
  type: 'image' | 'video';
  src: string;
  alt: string;
}

// REMOVE fixed row-span/col-span to let grid auto-flow fill naturally
const media: Media[] = [
  { type: 'video', src: videoTracker, alt: 'Tracker Ovelux' },
  { type: 'image', src: imageCivic, alt: 'Civic' },
  { type: 'video', src: videoM3, alt: 'M3 Ovelux' },
  { type: 'image', src: imageSW4, alt: 'SW4' },
  { type: 'video', src: videoSW4, alt: 'SW4 Ovelux' },
  { type: 'image', src: imageVolvo, alt: 'Volvo' },
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

        {/* GRID REFEITA — AGORA AUTO-FLOW PARA AGRUPAR E EVITAR ESPAÇOS EM BRANCO */}
        <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[200px] md:auto-rows-[280px] gap-4">
          {media.map((item, index) => (
            <div
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className={`relative overflow-hidden group cursor-pointer aspect-square
                transition-all duration-700
                ${visibleItems[index] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
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
          ))}
        </div>
      </div>
    </section>
  );
}
