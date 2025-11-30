import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map, Sword, Shield, Star, Trophy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type JourneyStep = {
  id: number;
  title: string;
  mood: string;
  description: string;
  bullets: string[];
  icon: React.ComponentType<{ className?: string }>;
  cta: string;
};

const steps: JourneyStep[] = [
  {
    id: 1,
    title: "Descoberta",
    mood: "Curiosidade e foco",
    description: "Você sai do modo tutorial infinito e enxerga um caminho guiado para entregar projeto real.",
    bullets: ["Mapeie suas metas e agenda", "Escolha trilha com IA assistindo você", "Receba plano semanal de impacto"],
    icon: Map,
    cta: "Quero escolher minha trilha",
  },
  {
    id: 2,
    title: "Desafio guiado",
    mood: "Urgência saudável",
    description: "Sprint semanal com desafios curtos que desbloqueiam badges e feedback de mentores.",
    bullets: [
      "Code reviews com IA mais mentor humano",
      "Check-ins rápidos e métricas claras",
      "Gamificação para manter ritmo",
    ],
    icon: Sword,
    cta: "Ver desafios da semana",
  },
  {
    id: 3,
    title: "Mentoria e comunidade",
    mood: "Confiança e suporte",
    description: "Mentores, IA e alumni criam uma rede para responder dúvidas em minutos, não em dias.",
    bullets: [
      "Sessões ao vivo e gravações on-demand",
      "Respostas priorizadas no Discord + IA",
      "Networking direcionado para vagas",
    ],
    icon: Shield,
    cta: "Conhecer os mentores",
  },
  {
    id: 4,
    title: "Entrega com portfólio",
    mood: "Momentum e clareza",
    description: "Você fecha com case completo usando C# + IA aplicada, pronto para entrevistas técnicas.",
    bullets: [
      "Projeto revisado, documentação pronta",
      "Pitch treinado com AI Coach",
      "Checklist de deploy e apresentação",
    ],
    icon: Star,
    cta: "Estruturar meu case final",
  },
  {
    id: 5,
    title: "Legado e vagas",
    mood: "Propósito e ação",
    description: "Compartilhe o case com a comunidade, conquiste badges e receba indicações de oportunidades.",
    bullets: [
      "Badge oficial e certificado compartilhável",
      "Banco de talentos 4uCode + parceiros",
      "Continue mentorando e ganhe benefícios",
    ],
    icon: Trophy,
    cta: "Iniciar minha jornada agora",
  },
];

const variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.8, 0.25, 1] } },
  exit: { opacity: 0, y: -24, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } },
};

export const JourneySteps = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const progress = (activeStep / (steps.length - 1)) * 100;
  const currentStep = steps[activeStep];
  const Icon = currentStep.icon;

  return (
    <section
      id="jornada"
      className="bg-gradient-to-b from-[#080114] via-[#0f0222] to-bg-elevated py-20 sm:py-28"
    >
      <div className="container px-4">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={variants}
            className="font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl"
          >
            Sua jornada em 5 passos centrados em IA
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={variants}
            transition={{ delay: 0.1 }}
            className="mt-4 text-base text-white/70 sm:text-lg"
          >
            Cada passo destrava artefatos, badges e acompanhamento humano + IA para você sair com um case pronto.
          </motion.p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl">
          <div className="relative flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur sm:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15">
                  <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </span>
                <div className="text-left">
                  <p className="text-sm uppercase tracking-[0.3em] text-white/60">Passo {currentStep.id}</p>
                  <h3 className="text-2xl font-semibold text-white sm:text-3xl">{currentStep.title}</h3>
                </div>
              </div>
              <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
                {currentStep.mood}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.id}
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid gap-6 md:grid-cols-[1.4fr_1fr]"
              >
                <p className="text-base leading-relaxed text-white/75">{currentStep.description}</p>
                <ul className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white/70">
                  {currentStep.bullets.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-primary/80" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="w-full md:w-2/3">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/40">
                  {steps.map((step, index) => (
                    <span key={step.id} className={index === activeStep ? "text-primary" : undefined}>
                      0{step.id}
                    </span>
                  ))}
                </div>
                <div className="relative mt-2 h-2 rounded-full bg-white/10">
                  <motion.div
                    className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-primary to-primary-600"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  />
                </div>
              </div>
              <Button
                size="lg"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary via-primary-600 to-primary-700 px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:scale-105 active:scale-95"
                onClick={() => (window.location.href = "/contato")}
              >
                {currentStep.cta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-5">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === activeStep;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveStep(index)}
                  className={`group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-left transition-all duration-300 hover:border-primary/60 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    isActive ? "border-primary/50 bg-primary/10" : ""
                  }`}
                  aria-pressed={isActive}
                  aria-label={`Ir para passo ${step.id}: ${step.title}`}
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-sm font-bold text-white">
                    {step.id}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{step.title}</p>
                    <p className="text-xs text-white/50">{step.mood}</p>
                  </div>
                  <StepIcon className="h-5 w-5 text-primary/80 transition-transform group-hover:scale-110" aria-hidden="true" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
