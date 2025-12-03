import { openai } from "./openai";

export async function generateEmail(brief: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-5.1-chat-latest",
    messages: [
      {
        role: "system",
        content:
          "Eres un copywriter especializado en email marketing. " +
          "Escribes en español de España, tono cercano, informal y un poco macarra. " +
          "Frases claras, párrafos cortos y nada de tecnicismos raros.",
      },
      {
        role: "user",
        content: brief,
      },
    ],
  });

  return response.choices[0]?.message?.content ?? "";
}
