import { Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-secondary-foreground mb-4">
              Copywriter IA
            </h3>
            <p className="text-secondary-foreground/70 mb-4 leading-relaxed">
              Tu equipo completo de copywriters especializado en escribir textos que venden. Disponible 24/7, sin contrataciones ni esperas.
            </p>
            <div className="flex items-center gap-2 text-secondary-foreground/70">
              <Mail className="h-4 w-4" />
              <a href="mailto:hola@copywriteria.com" className="hover:text-secondary-foreground transition-colors">
                hola@copywriteria.com
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-secondary-foreground font-semibold mb-4">Producto</h4>
            <ul className="space-y-2 text-secondary-foreground/70">
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">Características</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">Precios</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">Casos de uso</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-secondary-foreground font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-secondary-foreground/70">
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">Términos de uso</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">Privacidad</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-secondary-foreground/20 pt-8">
          <p className="text-center text-secondary-foreground/70 text-sm">
            © 2024 Copywriter IA. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
