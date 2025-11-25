import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CircularChart from "./CircularChart";

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative bg-background py-20 md:py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Tu equipo completo de{" "}
              <span className="text-primary">copywriters</span>
              <br />
              disponible 24/7
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
              Accede a GPTs especializados que escriben posts de LinkedIn, cartas de ventas, emails y todo el copy que tu negocio necesita. Sin contratar. Sin esperar. Sin complicaciones.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="text-base font-semibold h-14 px-8 shadow-lg hover:shadow-xl transition-all"
                onClick={() => navigate("/register")}
              >
                Empezar ahora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-base font-semibold h-14 px-8 border-2"
                onClick={() => {
                  const element = document.getElementById("pricing");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Ver cómo funciona
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Acceso inmediato</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Sin permanencia</span>
              </div>
            </div>
          </div>

          {/* Right Chart */}
          <div className="relative">
            <div className="relative rounded-2xl p-8 bg-gradient-to-br from-background to-muted/20">
              <CircularChart />
            </div>
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-6 shadow-xl border border-border hidden md:block">
              <div className="text-3xl font-bold text-primary mb-1">100x</div>
              <div className="text-sm text-muted-foreground">Más rápido que contratar</div>
            </div>
            <div className="absolute -top-6 -right-6 bg-card rounded-xl p-6 shadow-xl border border-border hidden md:block">
              <div className="text-3xl font-bold text-primary mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">Disponible siempre</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
