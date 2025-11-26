import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Check, 
  ArrowLeft,
  Sparkles,
  Crown
} from "lucide-react";
import { getUserSubscription } from "@/lib/subscriptions";

interface Plan {
  id: number;
  name: string;
  description: string;
  price: number;
  interval: string;
  features: string[];
  recommended?: boolean;
}

const availablePlans: Plan[] = [
  {
    id: 2,
    name: "Inicial",
    description: "Para personas que quieren empezar a crear copy profesional",
    price: 19,
    interval: "mes",
    features: [
      "50 generaciones al mes",
      "Acceso a 3 GPTs",
      "Historial de 30 días",
      "Soporte por email"
    ]
  },
  {
    id: 3,
    name: "Profesional",
    description: "Para freelancers y consultores que necesitan más potencia",
    price: 49,
    interval: "mes",
    features: [
      "Generaciones ilimitadas",
      "Acceso a todos los GPTs",
      "Historial ilimitado",
      "Soporte prioritario",
      "Plantillas personalizadas",
      "Exportar en múltiples formatos"
    ],
    recommended: true
  },
  {
    id: 4,
    name: "Business",
    description: "Para equipos y agencias con necesidades avanzadas",
    price: 99,
    interval: "mes",
    features: [
      "Todo lo del plan Profesional",
      "Hasta 5 usuarios",
      "API access",
      "Integraciones avanzadas",
      "Account manager dedicado",
      "Formación personalizada"
    ]
  }
];

const Plans = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [billingInterval, setBillingInterval] = useState<"monthly" | "annual">("monthly");

  useEffect(() => {
    if (!isLoaded) return;
    
    if (!user) {
      navigate("/login");
      return;
    }

    const loadData = async () => {
      try {
        const data = await getUserSubscription(user.id);
        setSubscription(data);
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user, isLoaded, navigate]);

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <Sparkles className="h-12 w-12 text-primary animate-spin" />
          <p className="text-gray-500">Cargando planes...</p>
        </div>
      </div>
    );
  }

  const currentPlan = subscription?.subscription?.plans;
  const currentPlanName = currentPlan?.name || "Free";
  const currentPlanFeatures = currentPlan?.features || {};

  // Convertir features del plan actual a array de strings
  const getCurrentPlanFeatures = () => {
    if (currentPlanName === "Free") {
      return [
        "10 generaciones al mes",
        "Acceso a 1 GPT",
        "Historial de 7 días"
      ];
    }
    return Object.entries(currentPlanFeatures).map(([key, value]) => {
      if (typeof value === "number") return `${value} ${key.replace(/_/g, " ")}`;
      if (value === "unlimited") return `${key.replace(/_/g, " ")} ilimitados`;
      return key.replace(/_/g, " ");
    });
  };

  const getPrice = (price: number) => {
    if (billingInterval === "annual") {
      return Math.round(price * 0.8); // 20% descuento
    }
    return price;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Volver al dashboard</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                Copy<span className="text-primary">Maestro</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Current Plan Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-10 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">{currentPlanName}</h2>
                {currentPlanName !== "Free" && (
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                    Activo
                  </span>
                )}
              </div>
              <p className="text-gray-500 mb-6">
                {currentPlanName === "Free" 
                  ? "Mejora tu plan para desbloquear más funcionalidades" 
                  : "Tu plan actual con todas sus ventajas"
                }
              </p>
              
              {/* Current Plan Features */}
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                {getCurrentPlanFeatures().map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-600">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {currentPlanName !== "Free" && (
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900">
                  {currentPlan?.price || 0}€<span className="text-base font-normal text-gray-500">/mes</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Available Plans Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Planes disponibles</h2>
              <p className="text-gray-500">Elige el plan que mejor se adapte a tus necesidades</p>
            </div>

            {/* Billing Toggle */}
            <div className="flex items-center bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setBillingInterval("monthly")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  billingInterval === "monthly"
                    ? "bg-primary text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Mensual
              </button>
              <button
                onClick={() => setBillingInterval("annual")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  billingInterval === "annual"
                    ? "bg-primary text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Anual (20% descuento)
              </button>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availablePlans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-white rounded-2xl border-2 p-6 relative transition-all hover:shadow-lg ${
                  plan.recommended 
                    ? "border-primary shadow-md" 
                    : "border-gray-200"
                }`}
              >
                {/* Recommended Badge */}
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-primary text-white text-xs font-semibold rounded-full">
                      Recomendado
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{getPrice(plan.price)}€</span>
                  <span className="text-gray-500">/{plan.interval}</span>
                  {billingInterval === "annual" && (
                    <p className="text-xs text-primary mt-1">Facturado anualmente</p>
                  )}
                </div>

                {/* CTA Button */}
                <Button
                  className={`w-full mb-6 ${
                    plan.recommended
                      ? "bg-primary hover:bg-primary/90"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                  size="lg"
                >
                  Elegir plan
                </Button>

                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ or Contact */}
        <div className="text-center py-8 border-t border-gray-200">
          <p className="text-gray-500 mb-2">¿Tienes dudas sobre qué plan elegir?</p>
          <button className="text-primary font-medium hover:underline">
            Contacta con nosotros
          </button>
        </div>
      </main>
    </div>
  );
};

export default Plans;

