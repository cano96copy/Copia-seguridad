// src/lib/subscriptions.ts
import { supabase } from "./supabase";

type SubscriptionStatus = "trialing" | "active" | "cancelled" | "expired";

export async function upsertSubscription(params: {
  userId: string;          // ID del usuario (el de Clerk)
  planId: number;          // id del plan (columna plans.id)
  status?: SubscriptionStatus;
  trialEndsAt?: string | null;
  currentPeriodEnd?: string | null;
}) {
  const { userId, planId, status, trialEndsAt, currentPeriodEnd } = params;

  const { data, error } = await supabase
    .from("subscriptions")
    .upsert(
      {
        user_id: userId,
        plan_id: planId,
        status: status ?? "trialing",
        trial_ends_at: trialEndsAt ?? null,
        current_period_end: currentPeriodEnd ?? null,
      },
      {
        onConflict: "user_id", // si ya hay una fila con ese usuario, la actualiza
      }
    )
    .select()
    .single();

  if (error) {
    console.error("Error guardando suscripción en Supabase", error);
    throw error;
  }

  return data;
}
