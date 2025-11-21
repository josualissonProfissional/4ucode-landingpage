import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Shield, Code, MessageCircle, BookOpen, Clock, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { hoverGlow, inViewUp } from "@/lib/motion-presets";

const faqs = [
  {
    icon: Shield,
    question: "A mentoria é realmente gratuita?",
    answer:
      "Sim! A 4uCode é um projeto aberto. Não pedimos cartão e não existe taxa escondida. Só pedimos comprometimento.",
  },
  {
    icon: Code,
    question: "Preciso ter conhecimento prévio?",
    answer:
      "Não. Temos trilhas de fundamentos para quem nunca programou e outras para quem já está no front, back ou carreira.",
  },
  {
    icon: MessageCircle,
    question: "Como funcionam os encontros?",
    answer:
      "Toda semana rolam lives, squads no Discord e check-ins rápidos. Você recebe calendário e gravações para acompanhar.",
  },
  {
    icon: BookOpen,
    question: "O que eu preciso para participar?",
    answer:
      "Notebook simples, VS Code instalado, internet estável e vontade de aparecer. Todo o resto nós construímos juntos.",
  },
  {
    icon: Clock,
    question: "Por quanto tempo tenho acesso?",
    answer:
      "Cada trilha dura em média 4–6 semanas, mas você continua na comunidade, nos desafios e nos canais de suporte.",
  },
  {
    icon: RefreshCw,
    question: "Posso seguir mais de uma trilha?",
    answer:
      "Sim! Recomendamos começar por fundamentos e depois avançar para front, back ou carreira conforme sua realidade.",
  },
];

export const FAQ = () => {
  const leftColumn = faqs.slice(0, 3);
  const rightColumn = faqs.slice(3);

  return (
    <section data-reveal-stagger="110" id="faq" className="bg-gradient-to-b from-background to-bg-elevated px-4 py-20">
      <div className="container mx-auto max-w-6xl">
        <motion.div className="mb-12 space-y-3 text-center" {...inViewUp(0)}>
          <h2 className="text-4xl font-bold text-white md:text-5xl">Dúvidas frequentes</h2>
          <p className="text-lg text-muted-foreground">Tudo o que você precisa saber antes de começar</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {[leftColumn, rightColumn].map((items, columnIndex) => (
            <motion.div key={columnIndex} {...inViewUp(columnIndex * 0.12)}>
              <Accordion type="single" collapsible className="space-y-4">
                {items.map((faq, index) => {
                  const Icon = faq.icon;
                  return (
                    <AccordionItem
                      key={faq.question}
                      value={`item-${columnIndex}-${index}`}
                      className="rounded-lg border border-border px-6 transition-colors hover:border-primary/50"
                    >
                      <AccordionTrigger className="text-left hover:text-primary hover:no-underline">
                        <div className="flex items-center gap-3">
                          <motion.span
                            className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-primary/10"
                            animate={{ rotate: [0, -8, 8, 0] }}
                            transition={{ duration: 6 + index, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <Icon className="h-4 w-4 text-primary" />
                          </motion.span>
                          <span className="text-sm md:text-base">{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="ml-9 text-sm text-muted-foreground">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </motion.div>
          ))}
        </div>

        <motion.div className="mt-12 rounded-2xl border border-border bg-bg-soft p-8 text-center" {...inViewUp(0.3)}>
          <p className="mb-4 text-lg text-white">Ainda tem dúvida?</p>
          <p className="mb-6 text-muted-foreground">
            Fale diretamente com nossa equipe pelo WhatsApp e receba uma resposta em minutos.
          </p>
          <motion.div className="inline-flex" {...hoverGlow}>
            <Button variant="outline" size="lg" asChild>
              <a href="https://wa.me/5511991060282" target="_blank" rel="noopener noreferrer">
                Falar no WhatsApp
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
