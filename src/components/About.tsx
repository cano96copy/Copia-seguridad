import { Target, Zap, Users, Award } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Misión",
      description: "Democratizar el acceso a copywriting de calidad para que cualquier negocio pueda crecer sin barreras."
    },
    {
      icon: Zap,
      title: "Velocidad",
      description: "Creemos que el tiempo es oro. Por eso ofrecemos soluciones instantáneas sin sacrificar calidad."
    },
    {
      icon: Users,
      title: "Comunidad",
      description: "Más que una herramienta, somos una comunidad de profesionales que buscan la excelencia."
    },
    {
      icon: Award,
      title: "Calidad",
      description: "Cada GPT está optimizado con las mejores prácticas de copywriting y marketing persuasivo."
    }
  ];

  return (
    <section id="about" className="py-20 md:py-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Sobre <span className="text-primary">mí</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Combinando años de experiencia en copywriting con la potencia de la inteligencia artificial
          </p>
        </div>

        {/* Story */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="w-20 h-1 bg-primary mb-6"></div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              La historia detrás de CopyMaestro
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Después de años trabajando como copywriter freelance, me di cuenta de que muchos emprendedores 
              y pequeños negocios necesitaban copy de calidad pero no podían permitirse contratar a un profesional a tiempo completo.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Con la llegada de los GPTs personalizados, vi la oportunidad perfecta: combinar mi experiencia 
              en copywriting con el poder de la IA para crear herramientas accesibles que cualquiera pudiera usar.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Hoy, CopyMaestro ayuda a miles de profesionales a crear contenido persuasivo y efectivo, 
              democratizando el acceso a copy de calidad profesional.
            </p>
          </div>
          
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-border flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-6xl mb-4">✍️</div>
                <div className="text-2xl font-bold text-foreground mb-2">10+ años</div>
                <div className="text-muted-foreground">de experiencia en copywriting</div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-3">{value.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;

