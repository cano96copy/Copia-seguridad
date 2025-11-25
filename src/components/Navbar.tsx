import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

type SubscriptionStatus = "trialing" | "active" | "cancelled" | "expired";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user } = useUser();
  const [subscriptionStatus, setSubscriptionStatus] =
    useState<SubscriptionStatus | null>(null);
  const [isLoadingSubscription, setIsLoadingSubscription] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  // Cargar la suscripción del usuario desde Supabase
  useEffect(() => {
    const fetchSubscription = async () => {
      if (!user?.id) {
        setSubscriptionStatus(null);
        return;
      }

      try {
        setIsLoadingSubscription(true);

        const { data, error } = await supabase
          .from("subscriptions")
          .select("status")
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) throw error;

        setSubscriptionStatus((data?.status as SubscriptionStatus) ?? null);
      } catch (error) {
        console.error("Error cargando suscripción desde Supabase", error);
        setSubscriptionStatus(null);
      } finally {
        setIsLoadingSubscription(false);
      }
    };

    fetchSubscription();
  }, [user?.id]);

  const hasActiveOrTrial =
    subscriptionStatus === "active" || subscriptionStatus === "trialing";

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-xl font-bold text-foreground">
              Copy<span className="text-primary">Maestro</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1 space-x-8">
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Precios
            </button>
            <button
              onClick={() => scrollToSection("clients")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Clientes
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Sobre mí
            </button>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cuando NO está logueado */}
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost" className="text-sm font-medium">
                  Iniciar Sesión
                </Button>
              </SignInButton>

              <Button
                className="text-sm font-medium"
                onClick={() => navigate("/register")}
              >
                Empieza Gratis
              </Button>
            </SignedOut>

            {/* Cuando SÍ está logueado */}
            <SignedIn>
              <Button
                variant="ghost"
                className="text-sm font-medium"
                // cambia "/app" por la ruta de tu panel si es otra
                onClick={() => navigate("/app")}
              >
                Ir a tu panel
              </Button>

              {/* Si no tiene plan activo o en prueba, enseñamos botón de suscribirse */}
              {!isLoadingSubscription && !hasActiveOrTrial && (
                <Button
                  className="text-sm font-medium"
                  onClick={() => scrollToSection("pricing")}
                >
                  Hazte PRO
                </Button>
              )}

              <UserButton />
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-accent"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <button
              onClick={() => scrollToSection("pricing")}
              className="block w-full text-left px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
            >
              Precios
            </button>
            <button
              onClick={() => scrollToSection("clients")}
              className="block w-full text-left px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
            >
              Clientes
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
            >
              Sobre mí
            </button>

            <div className="pt-3 space-y-2">
              <SignedOut>
                <SignInButton mode="modal">
                  <Button
                    variant="ghost"
                    className="w-full text-sm font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Iniciar Sesión
                  </Button>
                </SignInButton>

                <Button
                  className="w-full text-sm font-medium"
                  onClick={() => {
                    navigate("/register");
                    setIsMenuOpen(false);
                  }}
                >
                  Empieza Gratis
                </Button>
              </SignedOut>

              <SignedIn>
                <Button
                  variant="ghost"
                  className="w-full text-sm font-medium"
                  onClick={() => {
                    navigate("/app"); // cambia si tu panel es otra ruta
                    setIsMenuOpen(false);
                  }}
                >
                  Ir a tu panel
                </Button>

                {!isLoadingSubscription && !hasActiveOrTrial && (
                  <Button
                    className="w-full text-sm font-medium"
                    onClick={() => {
                      scrollToSection("pricing");
                      setIsMenuOpen(false);
                    }}
                  >
                    Hazte PRO
                  </Button>
                )}
              </SignedIn>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
