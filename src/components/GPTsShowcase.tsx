import { Card } from "@/components/ui/card";
import { 
  Linkedin, 
  Mail, 
  FileText, 
  Video, 
  MessageSquare, 
  Rocket, 
  Calendar,
  Lightbulb,
  Users
} from "lucide-react";

const gpts = [
  {
    icon: Linkedin,
    title: "Posts de LinkedIn",
    description: "Crea contenido profesional que genere engagement y posicione tu marca personal.",
  },
  {
    icon: FileText,
    title: "Cartas de Ventas",
    description: "Escribe copy persuasivo que convierte visitantes en clientes.",
  },
  {
    icon: Mail,
    title: "Emails de Marketing",
    description: "Redacta emails que se abren, se leen y generan clics.",
  },
  {
    icon: Video,
    title: "Guiones de Anuncios",
    description: "Crea scripts para anuncios de video y audio que captan atención.",
  },
  {
    icon: MessageSquare,
    title: "Secuencias de Bienvenida",
    description: "Automatiza la primera impresión con mensajes que enamoran.",
  },
  {
    icon: Rocket,
    title: "Lanzamientos Pre-Webinar",
    description: "Genera expectativa y llena tus webinars con copy estratégico.",
  },
  {
    icon: Calendar,
    title: "Lanzamientos Post-Webinar",
    description: "Convierte asistentes en compradores con seguimientos efectivos.",
  },
  {
    icon: Lightbulb,
    title: "Frases Potentes",
    description: "Crea hooks, headlines y citas que se quedan en la mente.",
  },
  {
    icon: Users,
    title: "Investigación de Audiencia",
    description: "Profundiza en tu cliente ideal para escribir copy que resuena.",
  },
];

const GPTsShowcase = () => {
  return (
    <section className="py-20 md:py-32 px-6 bg-background-alt">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            9 GPTs especializados para escribir <span className="text-primary">todo lo que necesitas</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Cada herramienta es un experto en su categoría. Como tener un equipo completo de copywriters, pero más rápido y siempre disponible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gpts.map((gpt, index) => {
            const Icon = gpt.icon;
            return (
              <Card 
                key={index}
                className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border bg-card group cursor-pointer"
              >
                <div className="bg-primary-light rounded-lg w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                  <Icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {gpt.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {gpt.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GPTsShowcase;
