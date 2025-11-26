import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { getUserSubscription } from "@/lib/subscriptions";

/**
 * Componente que carga la suscripción del usuario.
 * La creación de usuarios y suscripciones se maneja automáticamente
 * via webhook de Clerk → Supabase Edge Function.
 */
export const SubscriptionInitializer = () => {
  const { user, isLoaded } = useUser();
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const loadSubscription = async () => {
      // Solo intentar si Clerk ya cargó y hay un usuario autenticado
      if (!isLoaded || !user) return;

      try {
        const result = await getUserSubscription(user.id);
        
        if (result?.subscription) {
          console.log("Suscripción cargada:", result);
        } else if (retryCount < 5) {
          // Si no hay suscripción, puede que el webhook aún no haya procesado
          // Reintentar después de un breve delay
          console.log("Esperando a que el webhook procese el usuario...");
          setTimeout(() => setRetryCount(prev => prev + 1), 2000);
        }
      } catch (error) {
        console.error("Error al cargar suscripción:", error);
      }
    };

    loadSubscription();
  }, [user, isLoaded, retryCount]);

  // Este componente no renderiza nada visible
  return null;
};

