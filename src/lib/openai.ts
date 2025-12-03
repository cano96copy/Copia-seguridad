// src/lib/openai.ts
// Llamadas seguras a OpenAI a través de Edge Function de Supabase
// Usa la Responses API con file_search (configuración en tabla gpts)

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export type GptType = 
  | "linkedin" 
  | "sales-letter" 
  | "landing" 
  | "ads" 
  | "welcome-sequence" 
  | "pre-webinar" 
  | "post-webinar";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface GenerateCopyParams {
  prompt: string;
  gptType: GptType;
  maxTokens?: number;
  conversationHistory?: ChatMessage[];
  clientId?: string; // ID del cliente para usar sus archivos
}

interface GenerateCopyResponse {
  success: boolean;
  text: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  api?: string; // "responses" o "chat-completions-fallback"
}

/**
 * Genera copy usando la Edge Function de Supabase (seguro)
 * La API key de OpenAI está protegida en el servidor
 * Usa la Responses API con file_search (archivos configurados en Supabase)
 */
export async function generateCopy(params: GenerateCopyParams): Promise<GenerateCopyResponse> {
  const { prompt, gptType, maxTokens = 2000, conversationHistory = [], clientId } = params;

  try {
    const response = await fetch(
      `${SUPABASE_URL}/functions/v1/generate-copy`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          prompt,
          gptType,
          maxTokens,
          conversationHistory,
          clientId, // Enviar ID del cliente para usar sus archivos
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error en generate-copy:", errorData);
      throw new Error(errorData.error || "Error generating copy");
    }

    const data: GenerateCopyResponse = await response.json();
    return data;

  } catch (error) {
    console.error("Error llamando a generate-copy:", error);
    throw error;
  }
}
