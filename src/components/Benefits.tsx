import { Check, Zap, Clock, TrendingUp, Shield } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "100 veces más rápido",
    description: "Lo que un copywriter tarda días, tú lo tienes en minutos. Sin revisiones infinitas ni esperas.",
  },
  {
    icon: Clock,
    title: "Disponible 24/7",
    description: "No importa la hora ni el día. Tu equipo de copywriters siempre está listo cuando lo necesitas.",
  },
  {
    icon: TrendingUp,
    title: "Mejora continua",
    description: "Nuestros GPTs aprenden de las mejores prácticas del copywriting y se actualizan constantemente.",
  },
  {
    icon: Shield,
    title: "Sin dependencias",
    description: "No más esperar a freelancers ocupados o agencias con agenda llena. Tú tienes el control total.",
  },
];

const Benefits = () => {
  return (
    <section className="py-20 md:py-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Como tener un equipo de copywriters, pero mejor
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              No es solo IA. Es tu departamento completo de copywriting funcionando sin descanso, sin revisiones eternas y sin costes desorbitados.
            </p>
            
            <div className="space-y-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-primary-light rounded-lg w-12 h-12 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
              <div className="text-4xl font-bold text-primary mb-2">0€</div>
              <div className="text-muted-foreground">en contrataciones</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
              <div className="text-4xl font-bold text-primary mb-2">∞</div>
              <div className="text-muted-foreground">proyectos simultáneos</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
              <div className="text-4xl font-bold text-primary mb-2">5 min</div>
              <div className="text-muted-foreground">tiempo de respuesta</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
              <div className="text-4xl font-bold text-primary mb-2">9</div>
              <div className="text-muted-foreground">expertos disponibles</div>
            </div>
          </div>
        </div>

        {/* Who is it for section */}
        <div className="mt-20 bg-primary-light rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
            ¿Para quién es Copywriter IA?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <Check className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <div className="font-semibold text-foreground mb-1">Agencias</div>
                <div className="text-sm text-muted-foreground">Multiplica tu capacidad sin aumentar plantilla</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <div className="font-semibold text-foreground mb-1">Freelancers</div>
                <div className="text-sm text-muted-foreground">Haz crecer tu marca personal en LinkedIn</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <div className="font-semibold text-foreground mb-1">Negocios Online</div>
                <div className="text-sm text-muted-foreground">Vende más con copy que convierte</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <div className="font-semibold text-foreground mb-1">Emprendedores</div>
                <div className="text-sm text-muted-foreground">Sin tiempo ni ganas de escribir</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
