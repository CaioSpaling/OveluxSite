import { Instagram, Facebook, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-light mb-4 tracking-wider">OVELUX</h3>
            <p className="text-gray-400 font-light leading-relaxed">
              Estética automotiva premium com atendimento móvel. Excelência que vai até você.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-light mb-4 tracking-wide">Contato</h4>
            <div className="space-y-3 text-gray-400 font-light">
              <a href="tel:+5511999999999" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone size={18} />
                <span>(19) 99683-4667 </span>
              </a>
              <a href="mailto:contato@premiumauto.com" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail size={18} />
                <span>contato@premiumauto.com</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-light mb-4 tracking-wide">Redes Sociais</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center hover:border-white hover:bg-white hover:text-gray-                  900 transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center hover:border-white hover:bg-white hover:text-gray-                  900 transition-all">
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500 font-light text-sm">
            © 2025 Ovelux. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
