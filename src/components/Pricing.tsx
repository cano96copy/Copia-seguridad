import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const features = [
  "Acceso completo a los 9 GPTs especializados",
  "Generación ilimitada de copy",
  "Actualizaciones constantes de los modelos",
  "Soporte prioritario por email",
  "Exportación de contenido en múltiples formatos",
  "Sin límite de proyectos",
  "Cancela cuando quieras",
];

const Pricing = () => {
  return (
    <section className="py-20 md:py-32 px-6 bg-primary relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-foreground opacity-5 rounded-full blur-3xl"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Un precio simple. Todo incluido.
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Accede a todo el equipo de copywriters por menos de lo que cuesta un solo freelancer.
          </p>
        </div>

        <div className="bg-card rounded-2xl p-8 md:p-12 shadow-2xl border border-border">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-6">
            <div>
              <div className="inline-block bg-primary-light text-primary px-4 py-1 rounded-full text-sm font-semibold mb-4">
                Membresía mensual
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl md:text-6xl font-bold text-foreground">49€</span>
                <span className="text-xl text-muted-foreground">/mes</span>
              </div>
              <p className="text-muted-foreground">
                Comparado con 500-2000€ de un copywriter freelance
              </p>
            </div>
            <Button size="lg" className="text-base font-semibold h-14 px-8 shadow-lg hover:shadow-xl transition-all md:flex-shrink-0">
              Empezar ahora
            </Button>
          </div>

          <div className="border-t border-border pt-8">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Todo lo que incluye:
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Check className="h-4 w-4 text-success" />
              <span>Prueba 7 días gratis. Cancela cuando quieras.</span>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-primary-foreground/80 text-sm">
            ¿Tienes un equipo grande?{" "}
            <a href="#" className="underline font-semibold hover:text-primary-foreground transition-colors">
              Hablemos de planes empresariales
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
