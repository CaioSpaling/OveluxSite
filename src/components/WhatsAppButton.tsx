import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const handleClick = () => {
    window.open('https://wa.me/5519996834667?text=Olá! Gostaria de agendar um serviço de estética automotiva.', '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle size={28} className="group-hover:scale-110 transition-transform" />
    </button>
  );
}
