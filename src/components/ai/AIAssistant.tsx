import { useEffect, useMemo, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Send } from "lucide-react";
import Lottie from "lottie-react";

import heroPulse from "@/assets/lottie/hero-pulse.json";
import { cn } from "@/lib/utils";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const ASSISTANT_GREETING =
  "Ola! Eu sou o copiloto da 4uCode. Pergunte sobre trilhas, cronograma ou como usar IA nos projetos que estamos construindo.";

const buildFunctionUrl = () => {
  const explicit = import.meta.env.VITE_AI_FUNCTION_URL as string | undefined;
  if (explicit) return explicit;

  const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID as string | undefined;
  if (projectId) {
    return `https://${projectId}.functions.supabase.co/ai-chat`;
  }

  return undefined;
};

export const AIAssistant = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: "assistant", content: ASSISTANT_GREETING }]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const rawFunctionUrl = useMemo(() => buildFunctionUrl(), []);
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

  const functionUrl = useMemo(() => {
    if (!rawFunctionUrl) return undefined;
    if (!supabaseAnonKey) return rawFunctionUrl;

    try {
      const url = new URL(rawFunctionUrl);
      if (!url.searchParams.has("apikey")) {
        url.searchParams.set("apikey", supabaseAnonKey);
      }
      return url.toString();
    } catch {
      return rawFunctionUrl;
    }
  }, [rawFunctionUrl, supabaseAnonKey]);

  useEffect(() => {
    if (!open) return;
    const container = scrollRef.current;
    if (!container) return;
    container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading, open]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!message.trim()) return;

    const userMessage: ChatMessage = { role: "user", content: message.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setError(null);

    if (!functionUrl) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Ainda nao configurei a funcao de IA. Defina VITE_AI_FUNCTION_URL ou VITE_SUPABASE_PROJECT_ID para ativar o chat.",
        },
      ]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(functionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(supabaseAnonKey
            ? {
                apikey: supabaseAnonKey,
                Authorization: `Bearer ${supabaseAnonKey}`,
              }
            : {}),
        },
        body: JSON.stringify({ message: userMessage.content, history: messages }),
      });

      const data: { answer?: string; error?: string } = await response.json();

      if (!response.ok || !data.answer) {
        throw new Error(data.error || "Nao foi possivel gerar uma resposta agora.");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.answer }]);
    } catch (err) {
      const feedback =
        err instanceof Error ? err.message : "Algo deu errado por aqui. Pode tentar novamente em alguns segundos?";
      setError(feedback);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Nao consegui responder agora. Pode tentar novamente daqui a pouco?" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        aria-label="Abrir assistente virtual"
        className="group fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary via-primary-600 to-primary-700 text-white shadow-[0_18px_40px_rgba(78,34,164,0.55)] transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-95 md:bottom-10"
      >
        <MessageCircle className="h-6 w-6 transition-transform group-hover:scale-110" aria-hidden="true" />
        <span className="sr-only">Abrir chat com assistente de IA</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl border border-white/10 bg-gradient-to-br from-background via-bg-soft to-background text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-xl font-semibold text-white">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15">
                <Lottie animationData={heroPulse} loop autoplay style={{ height: 48, width: 48 }} />
              </span>
              Copiloto 4uCode
            </DialogTitle>
            <DialogDescription className="text-sm text-white/60">
              Conectado ao Gemini via Supabase Edge Functions. Pergunte sobre trilhas, mentorias ou IA aplicada.
            </DialogDescription>
          </DialogHeader>

          <div
            ref={scrollRef}
            className="max-h-72 space-y-3 overflow-y-auto rounded-2xl border border-white/5 bg-white/5 p-4 text-sm text-white/85"
          >
            {messages.map((chatMessage, index) => (
              <div
                key={`${chatMessage.role}-${index}`}
                className={cn(
                  "max-w-[85%] rounded-2xl px-3 py-2 leading-relaxed shadow",
                  chatMessage.role === "assistant"
                    ? "bg-white/10 text-white"
                    : "ml-auto bg-primary/80 text-white",
                )}
              >
                {chatMessage.content}
              </div>
            ))}
            {isLoading && (
              <div className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-3 py-2 text-xs text-white/70">
                <span className="h-2 w-2 animate-pulse rounded-full bg-white/70" aria-hidden="true" />
                Copiloto pensando...
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <label htmlFor="assistant-question" className="text-sm font-semibold text-white">
              Sua pergunta
            </label>
            <Textarea
              id="assistant-question"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Ex.: Como funciona o desafio de IA da semana 3?"
              className="min-h-[96px] resize-none border-white/10 bg-white/5 text-base text-white placeholder:text-white/40"
              autoComplete="off"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/40">
                Respostas geradas via Gemini. Evite compartilhar dados sensiveis.
              </span>
              <Button
                type="submit"
                disabled={!message.trim() || isLoading}
                className="inline-flex items-center gap-2 rounded-full bg-white text-sm font-semibold text-background transition-transform duration-300 hover:scale-105 active:scale-95"
              >
                {isLoading ? "Enviando..." : "Enviar"}
                <Send className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
            {error && <p className="text-xs text-amber-300">{error}</p>}
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
