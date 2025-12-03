import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Send, 
  Sparkles, 
  User, 
  Copy, 
  Check,
  Loader2,
  RefreshCw,
  Building2
} from "lucide-react";
import { generateCopy, ChatMessage } from "@/lib/openai";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface GPTChatProps {
  gptType: "linkedin" | "sales-letter" | "landing" | "ads" | "welcome-sequence" | "pre-webinar" | "post-webinar";
  gptName: string;
  placeholder?: string;
  systemPrompt?: string;
  clientId?: string | null;
  clientName?: string;
}

const gptConfigs: Record<string, { 
  welcomeMessage: string; 
  placeholder: string;
  defaultInput: string;
  suggestions: string[];
}> = {
  "linkedin": {
    welcomeMessage: "¡Hola! 👋 Soy tu asistente para crear posts de LinkedIn que generan engagement. Ya tengo acceso a toda la información de tu cliente ideal, tu tono, tu historia y tu especialización. Pulsa Enter para empezar.",
    placeholder: "Pulsa Enter para empezar...",
    defaultInput: "Quiero mi post",
    suggestions: [
      "Quiero mi post para el lunes",
      "Quiero mi post para el martes", 
      "Quiero mi post para el miércoles",
      "Quiero mi post para el jueves"
    ]
  },
  "sales-letter": {
    welcomeMessage: "¡Hola! 📝 Soy tu asistente para crear cartas de venta persuasivas. Cuéntame sobre tu producto/servicio, tu público objetivo y qué problema resuelves.",
    placeholder: "Ej: Vendo un curso de marketing digital para coaches...",
    defaultInput: "",
    suggestions: [
      "Carta para lanzamiento de curso",
      "Carta para servicio de consultoría",
      "Carta para producto físico",
      "Carta para membresía"
    ]
  },
  "landing": {
    welcomeMessage: "¡Hola! 🚀 Soy tu asistente para crear copy de páginas de registro/landing. Cuéntame qué ofreces y qué acción quieres que tome el visitante.",
    placeholder: "Ej: Landing para captar leads de un webinar gratuito...",
    defaultInput: "",
    suggestions: [
      "Landing para webinar",
      "Landing para lead magnet",
      "Landing de producto",
      "Landing de servicios"
    ]
  },
  "ads": {
    welcomeMessage: "¡Hola! 🎬 Soy tu asistente para crear guiones de anuncios. Cuéntame para qué plataforma es (Facebook, YouTube, TikTok...) y qué vendes.",
    placeholder: "Ej: Anuncio de Facebook para mi curso de cocina...",
    defaultInput: "",
    suggestions: [
      "Anuncio de Facebook/Instagram",
      "Anuncio de YouTube",
      "Anuncio de TikTok",
      "Anuncio de Google"
    ]
  },
  "welcome-sequence": {
    welcomeMessage: "¡Hola! ✉️ Soy tu asistente para crear secuencias de emails de bienvenida. Cuéntame sobre tu negocio y qué quieres lograr con estos emails.",
    placeholder: "Ej: Secuencia de 5 emails para nuevos suscriptores de mi newsletter...",
    defaultInput: "",
    suggestions: [
      "Secuencia de 3 emails",
      "Secuencia de 5 emails",
      "Secuencia de 7 emails",
      "Email de bienvenida único"
    ]
  },
  "pre-webinar": {
    welcomeMessage: "¡Hola! 📅 Soy tu asistente para crear emails pre-webinar que aumentan la asistencia. Cuéntame sobre tu webinar y cuándo es.",
    placeholder: "Ej: Webinar sobre inversiones el próximo martes...",
    defaultInput: "",
    suggestions: [
      "Email de confirmación",
      "Email recordatorio 24h antes",
      "Email recordatorio 1h antes",
      "Secuencia completa pre-webinar"
    ]
  },
  "post-webinar": {
    welcomeMessage: "¡Hola! 🎯 Soy tu asistente para crear emails post-webinar que convierten. Cuéntame sobre tu webinar y qué vendes al final.",
    placeholder: "Ej: Emails de seguimiento para vender mi programa de mentoría...",
    defaultInput: "",
    suggestions: [
      "Email de replay",
      "Email de urgencia",
      "Email de cierre de carrito",
      "Secuencia completa post-webinar"
    ]
  }
};

const GPTChat = ({ gptType, gptName, clientId, clientName }: GPTChatProps) => {
  const config = gptConfigs[gptType] || gptConfigs["linkedin"];
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: config.welcomeMessage,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState(config.defaultInput || "");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [input]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date()
    };

    // Añadir mensaje del usuario al estado
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Construir historial de conversación para enviar a OpenAI
      // Excluimos el mensaje de bienvenida (id: "welcome") del historial
      const conversationHistory: ChatMessage[] = updatedMessages
        .filter(msg => msg.id !== "welcome")
        .map(msg => ({
          role: msg.role,
          content: msg.content
        }));

      console.log("🚀 Enviando a GPT:");
      console.log("  - Tipo:", gptType);
      console.log("  - Historial:", conversationHistory.length, "mensajes");

      const response = await generateCopy({
        prompt: input.trim(),
        gptType: gptType,
        maxTokens: 2000,
        conversationHistory: conversationHistory,
        clientId: clientId || undefined
      });

      console.log("✅ Respuesta recibida, API usada:", response.api);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.text,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error generating copy:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Lo siento, ha ocurrido un error al generar el contenido. Por favor, inténtalo de nuevo.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = async (content: string, id: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSuggestion = (suggestion: string) => {
    setInput(suggestion);
    textareaRef.current?.focus();
  };

  const handleRegenerate = async (messageIndex: number) => {
    // Find the user message before this assistant message
    const userMessageIndex = messageIndex - 1;
    if (userMessageIndex < 0 || messages[userMessageIndex].role !== "user") return;

    const userPrompt = messages[userMessageIndex].content;
    setIsLoading(true);

    try {
      // Construir historial hasta ese punto
      const conversationHistory: ChatMessage[] = messages
        .slice(0, messageIndex)
        .filter(msg => msg.id !== "welcome")
        .map(msg => ({
          role: msg.role,
          content: msg.content
        }));

      const response = await generateCopy({
        prompt: userPrompt,
        gptType: gptType,
        maxTokens: 2000,
        conversationHistory: conversationHistory,
        clientId: clientId || undefined
      });

      // Update the assistant message
      setMessages(prev => prev.map((msg, idx) => 
        idx === messageIndex 
          ? { ...msg, content: response.text, timestamp: new Date() }
          : msg
      ));
    } catch (error) {
      console.error("Error regenerating:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Limpiar conversación
  const handleNewChat = () => {
    setMessages([{
      id: "welcome",
      role: "assistant",
      content: config.welcomeMessage,
      timestamp: new Date()
    }]);
    setInput(config.defaultInput || "");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-220px)] bg-white border border-gray-200 rounded-2xl overflow-hidden">
      {/* Header con botón de nueva conversación */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-medium text-gray-700">{gptName}</h3>
          {clientName && (
            <span className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
              <Building2 className="h-3 w-3" />
              {clientName}
            </span>
          )}
        </div>
        <button
          onClick={handleNewChat}
          className="text-xs text-gray-500 hover:text-primary transition-colors flex items-center gap-1"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Nueva conversación
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`flex gap-4 ${message.role === "user" ? "flex-row-reverse" : ""}`}
          >
            {/* Avatar */}
            <div className={`
              flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
              ${message.role === "assistant" 
                ? "bg-gradient-to-br from-primary to-purple-600" 
                : "bg-gray-200"
              }
            `}>
              {message.role === "assistant" 
                ? <Sparkles className="h-5 w-5 text-white" />
                : <User className="h-5 w-5 text-gray-600" />
              }
            </div>

            {/* Message Content */}
            <div className={`
              flex-1 max-w-[80%]
              ${message.role === "user" ? "text-right" : ""}
            `}>
              <div className={`
                inline-block p-4 rounded-2xl
                ${message.role === "assistant" 
                  ? "bg-gray-50 text-gray-800 rounded-tl-md" 
                  : "bg-primary text-white rounded-tr-md"
                }
              `}>
                <p className="whitespace-pre-wrap text-sm leading-relaxed">
                  {message.content}
                </p>
              </div>

              {/* Actions for assistant messages */}
              {message.role === "assistant" && message.id !== "welcome" && (
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => handleCopy(message.content, message.id)}
                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {copiedId === message.id ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-green-500" />
                        <span className="text-green-500">Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleRegenerate(index)}
                    disabled={isLoading}
                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                    <span>Regenerar</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div className="bg-gray-50 rounded-2xl rounded-tl-md p-4">
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                <span className="text-sm text-gray-500">Generando contenido...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions (only show if no user messages yet) */}
      {messages.length === 1 && (
        <div className="px-6 pb-4">
          <p className="text-xs text-gray-400 mb-2">Sugerencias:</p>
          <div className="flex flex-wrap gap-2">
            {config.suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestion(suggestion)}
                className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-gray-100 p-4 bg-gray-50">
        <div className="flex items-end gap-3">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={config.placeholder}
              rows={1}
              className="w-full px-4 py-3 pr-12 bg-white border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
              disabled={isLoading}
            />
          </div>
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="h-12 w-12 rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">
          Pulsa Enter para enviar, Shift+Enter para nueva línea
        </p>
      </div>
    </div>
  );
};

export default GPTChat;
