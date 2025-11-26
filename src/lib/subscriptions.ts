// src/lib/subscriptions.ts
import { supabase } from "./supabase";

/**
 * Obtiene la suscripción del usuario actual.
 * La creación de suscripciones se maneja automáticamente via webhook de Clerk.
 */
export async function getUserSubscription(clerkUserId: string) {
  if (!clerkUserId) return null;

  try {
    // Primero buscar el usuario por clerk_user_id
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("clerk_user_id", clerkUserId)
      .maybeSingle();

    if (userError) {
      console.error("Error buscando usuario:", userError);
      return null;
    }

    if (!user) {
      console.log("Usuario no encontrado, esperando webhook de Clerk...");
      return null;
    }

    // Buscar la suscripción del usuario con los datos del plan
    const { data: subscription, error: subError } = await supabase
      .from("subscriptions")
      .select(`
        *,
        plans (
          id,
          name,
          description,
          price,
          interval,
          features
        )
      `)
      .eq("user_id", user.id)
      .maybeSingle();

    if (subError) {
      console.error("Error buscando suscripción:", subError);
      return null;
    }

    console.log("=== getUserSubscription ===");
    console.log("User encontrado:", user);
    console.log("Subscription encontrada:", subscription);
    console.log("Status de subscription:", subscription?.status);

    return {
      user,
      subscription,
    };

  } catch (error) {
    console.error("Error en getUserSubscription:", error);
    return null;
  }
}
