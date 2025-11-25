import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button
            onClick={() => scrollToSection('hero')}
            className={`text-2xl font-light tracking-wider transition-colors ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}
          >
            OVELUX
          </button>

          <div className="hidden md:flex items-center gap-8">
            {['serviços', 'processo', 'galeria', 'contato'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`text-sm uppercase tracking-wider transition-colors hover:text-gray-500 ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contato')}
              className="px-6 py-2 bg-black text-white text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors"
            >
              Agendar
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden transition-colors ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white">
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {['serviços', 'processo', 'galeria', 'contato'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-2xl uppercase tracking-wider text-gray-900 hover:text-gray-500 transition-colors"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contato')}
              className="px-8 py-3 bg-black text-white text-lg uppercase tracking-wider hover:bg-gray-800 transition-colors"
            >
              Agendar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
