import { Star } from "lucide-react";

const Clients = () => {
  const testimonials = [
    {
      name: "María González",
      role: "CEO, TechStartup",
      content: "CopyMaestro ha revolucionado la forma en que creamos contenido. Lo que antes nos tomaba días, ahora lo hacemos en minutos.",
      rating: 5,
      avatar: "MG"
    },
    {
      name: "Carlos Rodríguez",
      role: "Director de Marketing",
      content: "La calidad del copy es excepcional. Nuestras tasas de conversión han aumentado un 45% desde que empezamos a usar CopyMaestro.",
      rating: 5,
      avatar: "CR"
    },
    {
      name: "Ana Martínez",
      role: "Emprendedora Digital",
      content: "Como emprendedora solo, CopyMaestro es como tener un equipo completo de copywriters. Simplemente increíble.",
      rating: 5,
      avatar: "AM"
    }
  ];

  return (
    <section id="clients" className="py-20 md:py-32 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Lo que dicen nuestros <span className="text-primary">clientes</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Miles de profesionales y empresas ya confían en CopyMaestro para crear su contenido
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-8 shadow-lg border border-border hover:shadow-xl transition-shadow"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-semibold text-primary">{testimonial.avatar}</span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-border">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">5,000+</div>
            <div className="text-sm text-muted-foreground">Clientes activos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50K+</div>
            <div className="text-sm text-muted-foreground">Textos generados</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">4.9/5</div>
            <div className="text-sm text-muted-foreground">Valoración media</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">98%</div>
            <div className="text-sm text-muted-foreground">Satisfacción</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;

