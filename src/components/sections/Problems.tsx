import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Code, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { hoverGlow, hoverLift, inViewUp } from "@/lib/motion-presets";

type ProblemCard = {
  id: string;
  emoji: string;
  gradient: string;
  pain: string;
  solution: string;
  bullets: string[];
  iaAction: string;
};

const problems: ProblemCard[] = [
  {
    id: "mindset",
    emoji: "🎯",
    gradient: "from-primary/40 via-[#1C1440] to-[#0A0912]",
    pain: "Desisto no primeiro erro",
    solution: "Mentalidade Alpha de crescimento",
    bullets: [
      "Squads 24/7 com mentores e IA respondendo dúvidas em minutos",
      "Revisão gravada mostrando como transformar erros em próximos passos",
      "Checkpoints semanais com meta de energia + foco",
    ],
    iaAction: "O copiloto analisa seu histórico e sugere micro metas diárias com prompts motivacionais.",
  },
  {
    id: "community",
    emoji: "🤝",
    gradient: "from-primary/35 via-[#231532] to-[#0B0C17]",
    pain: "Estudo sozinho, sem apoio",
    solution: "Comunidade comprometida",
    bullets: [
      "Daily check-in de 5 minutos com métrica de avanço",
      "Eventos quinzenais com Fatec, USP e IFSP",
      "Match automático com pods de estudo do mesmo objetivo",
    ],
    iaAction: "Uma função no Supabase identifica afinidade e conecta você a squads ativos no Discord/WhatsApp.",
  },
  {
    id: "mentor",
    emoji: "🧭",
    gradient: "from-primary/30 via-[#2D1738] to-[#0A0A13]",
    pain: "Sem direção clara",
    solution: "Trilhas estruturadas + mentor",
    bullets: [
      "Backlog semanal com histórias priorizadas",
      "Rubricas de avaliação com feedback instantâneo",
      "Painel mostra progresso para você e mentor",
    ],
    iaAction:
      "O copiloto gera roadmap semanal com tasks e snippets; mentor só ajusta o plano e aprova checkpoints.",
  },
  {
    id: "ia-first",
    emoji: "⚡",
    gradient: "from-primary/45 via-[#172042] to-[#050608]",
    pain: "IA parece impossível",
    solution: "IA-first prático desde o dia 1",
    bullets: [
      "Copilot configurado com prompts prontos para .NET",
      "Labs com Azure OpenAI e integrações REST",
      "Blueprint para lançar um chatbot FAQ em 6 semanas",
    ],
    iaAction: "Simulamos sua squad usando RAG para revisar código e sugerir prompts de automação.",
  },
  {
    id: "focus",
    emoji: "🧠",
    gradient: "from-[#1f285e]/80 via-[#18133b]/90 to-[#060510]/95",
    pain: "Pulo de tutorial em tutorial",
    solution: "Trilha com checkpoints e feedback imediato",
    bullets: [
      "Plano semanal com poucas metas e revisões no domingo",
      "Roteiro que mostra quais módulos liberar ou rematrixar",
      "IA aponta gaps no portfólio e sugere mini projetos certeiros",
    ],
    iaAction: "O copiloto roda um diagnóstico automático e monta um plano com foco máximo em 14 dias.",
  },
  {
    id: "portfolio",
    emoji: "📁",
    gradient: "from-[#14353f]/80 via-[#0c1e2a]/90 to-[#03070a]/95",
    pain: "Meu portfólio parece vazio",
    solution: "Projetos guiados com storytelling",
    bullets: [
      "Estrutura de case com briefing, execução e resultados",
      "Mentoria revisa narrativa e conecta com vagas compatíveis",
      "IA gera screenshots, diagramas e documentação rapidamente",
    ],
    iaAction: "Um script no Supabase junta seu histórico + resultados e gera a narrativa do case automaticamente.",
  },
  {
    id: "network",
    emoji: "🛰️",
    gradient: "from-[#402242]/78 via-[#2b1230]/90 to-[#0b030d]/96",
    pain: "Não conheço ninguém na área",
    solution: "Networking com pods e eventos exclusivos",
    bullets: [
      "Match com devs de objetivos semelhantes",
      "Talks fechados com líderes Fatec / USP / IFSP",
      "IA gera scripts para apresentações e elevator pitch",
    ],
    iaAction: "O copiloto sugere micro interações semanais para manter a rede aquecida.",
  },
  {
    id: "softskills",
    emoji: "🧠",
    gradient: "from-[#1b1f3a]/80 via-[#0c101f]/90 to-[#05060a]/95",
    pain: "Fico travado para vender meu trabalho",
    solution: "Storytelling e pitch com IA",
    bullets: [
      "Scripts prontos para elevator pitch e follow-up com empresas",
      "Templates para estudos de caso com dados e storytelling visual",
      "Mentoria de comunicação com simulações gravadas",
    ],
    iaAction: "Assistente gera rotas de conversa e e-mails personalizados com base nos seus objetivos e histórico.",
  },
  {
    id: "shipping",
    emoji: "🚀",
    gradient: "from-[#1a0f2e]/80 via-[#0c0617]/92 to-[#020106]/98",
    pain: "Projetos não saem do papel",
    solution: "Rituais de entrega e squads relâmpago",
    bullets: [
      "Sprints quinzenais com metas públicas e quadro de progresso",
      "Templates de kick-off e retro com métricas claras",
      "Squads com papéis definidos e alinhamento diário em 5 minutos",
    ],
    iaAction: "O copiloto analisa o sprint e sugere próximos passos, bloqueios e quem pode ajudar antes de atrasar.",
  },
];

const ModalSimulation = ({
  problem,
  onClose,
}: {
  problem: ProblemCard | null;
  onClose: () => void;
}) => (
  <Dialog open={Boolean(problem)} onOpenChange={(open) => !open && onClose()}>
    <DialogContent className="border-white/10 bg-background text-white">
      <DialogHeader>
        <DialogTitle>Como a IA resolve “{problem?.pain}”</DialogTitle>
        <DialogDescription className="text-sm text-white/60">
          Visão do copiloto e dos mentores para destravar esse obstáculo.
        </DialogDescription>
      </DialogHeader>
      {problem && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
            <p className="font-semibold text-white">Simulação:</p>
            <p>{problem.iaAction}</p>
          </div>
          <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4 text-sm text-white">
            <p className="mb-2 text-xs uppercase tracking-[0.3em] text-white/60">Checklist IA + Mentor</p>
            <ul className="space-y-2">
              {problem.bullets.map((item) => (
                <li key={item} className="flex gap-2 text-white/80">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/80" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </DialogContent>
  </Dialog>
);

export const Problems = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [flippedCard, setFlippedCard] = useState<string | null>(null);
  const [selectedProblem, setSelectedProblem] = useState<ProblemCard | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);


  useEffect(() => {
    if (!api || isHovered) return;

    const autoplay = window.setInterval(() => {
      api.scrollNext();
    }, 6500);

    return () => window.clearInterval(autoplay);
  }, [api, isHovered]);

  const slides = useMemo(() => problems, []);

  return (
    <section id="beneficios" className="relative overflow-hidden bg-black py-20 sm:py-28">
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
        autoPlay
        loop
        muted
        playsInline
        poster="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80"
        src="https://cdn.coverr.co/videos/coverr-hacking-in-the-night-3842/1080p.mp4"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />

      <div className="container relative z-10 px-4 sm:px-6">
        <motion.article
          className="mx-auto mb-16 flex flex-col gap-10 rounded-3xl border border-white/10 bg-black/40 px-6 py-10 text-white backdrop-blur sm:px-10 lg:flex-row lg:items-center lg:gap-16"
          {...inViewUp(0)}
        >
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-white/70">
              Obstáculos reais
            </span>
            <h2 className="font-display mt-6 text-3xl leading-tight sm:text-4xl md:text-5xl">
              Cada bloqueio dev vira checklist com IA + mentoria
            </h2>
            <p className="mt-4 text-base text-white/70 sm:text-lg">
              Mapeamos as causas clássicas de abandono e criamos rituais de desbloqueio: diagnóstico guiado, squad de
              apoio e copiloto ajustando foco toda semana.
            </p>
            <motion.ul
              className="mt-6 space-y-3 text-left text-sm text-white/80 sm:text-base"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              {[
                "Squads com accountability diário e plano de energia",
                "Mentor + copiloto analisam seu histórico e desenham ações",
                "Playbooks para transformar erro em evolução veloz",
              ].map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <span className="text-balance">{bullet}</span>
                </li>
              ))}
            </motion.ul>
          </div>

          <div className="flex flex-1 flex-col gap-6 lg:max-w-md">
            {[
              { label: "Tempo médio de desbloqueio", value: "-47%", detail: "vs. estudo solo" },
              { label: "Check-ins ativos", value: "2.3k+", detail: "sessões com IA por mês" },
            ].map((metric) => (
              <motion.div
                key={metric.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center sm:text-left"
                {...hoverLift}
              >
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">{metric.label}</p>
                <p className="mt-3 text-3xl font-semibold text-white sm:text-4xl">{metric.value}</p>
                <p className="mt-1 text-sm text-white/65">{metric.detail}</p>
              </motion.div>
            ))}
            <motion.div {...hoverGlow}>
              <Button
                variant="outline"
                className="w-full rounded-2xl border-primary/40 bg-primary/10 text-white hover:bg-primary hover:text-background"
                onClick={() => document.getElementById("cadastro")?.scrollIntoView({ behavior: "smooth" })}
              >
                Entrar na próxima squad
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </motion.article>

        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: true }}
          className="relative"
          onPointerEnter={() => setIsHovered(true)}
          onPointerLeave={() => setIsHovered(false)}
          onFocusCapture={() => setIsHovered(true)}
          onBlurCapture={() => setIsHovered(false)}
        >
          <CarouselContent className="md:-ml-6">
            {slides.map((item, index) => {
              const flipped = flippedCard === item.id;
              return (
                <CarouselItem key={item.id} className="sm:basis-4/5 md:basis-1/2 xl:basis-1/3">
                  <motion.article
                    initial={{ opacity: 0, y: 48 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-90px" }}
                    transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1], delay: index * 0.05 }}
                    className="h-full min-h-[360px] sm:min-h-[420px]"
                    whileHover={{ y: -10, scale: 1.01 }}
                  >
                    <div className="h-full w-full [perspective:1200px]">
                      <div
                        className={cn(
                          "relative h-full rounded-[32px] border border-white/10 bg-gradient-to-br p-[1px] transition-transform duration-700 [transform-style:preserve-3d]",
                          item.gradient,
                          flipped && "[transform:rotateY(180deg)]",
                        )}
                      >
                        <div
                          className="absolute inset-0 rounded-[30px] bg-background/95 px-7 py-8 text-white shadow-[0_25px_65px_rgba(11,5,28,0.45)]"
                          style={{ backfaceVisibility: "hidden" }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/5 text-3xl shadow-[0_12px_35px_rgba(0,0,0,0.3)]">
                              {item.emoji}
                            </span>
                            <button
                              onClick={() => setFlippedCard(item.id)}
                              className="text-xs uppercase tracking-[0.3em] text-white/40 hover:text-white/70"
                            >
                              Virar
                            </button>
                          </div>
                          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-white/40 line-through">
                            “{item.pain}”
                          </p>
                          <h3 className="mt-3 flex items-center gap-2 text-xl font-semibold text-primary-200 sm:text-2xl">
                            <ArrowRight className="h-5 w-5 text-primary-300" aria-hidden="true" />
                            {item.solution}
                          </h3>
                          <p className="mt-4 text-sm text-white/75">
                            Role para ver o checklist completo ou gire a carta para descobrir como destravamos isso.
                          </p>
                          <Button
                            variant="ghost"
                            className="mt-6 w-full rounded-full border border-white/15 text-sm text-white/90 hover:border-primary hover:text-white"
                            onClick={() => setSelectedProblem(item)}
                          >
                            Ver solução com IA
                          </Button>
                        </div>
                        <div
                          className="absolute inset-0 rounded-[30px] bg-gradient-to-br from-primary/10 via-background/90 to-background px-7 py-8 text-white shadow-[0_25px_65px_rgba(11,5,28,0.45)] [transform:rotateY(180deg)]"
                          style={{ backfaceVisibility: "hidden" }}
                        >
                          <div className="flex items-center justify-between">
                            <p className="text-xs uppercase tracking-[0.3em] text-primary/70">Checklist IA</p>
                            <button
                              className="text-xs uppercase tracking-[0.3em] text-white/40 hover:text-white/70"
                              onClick={() => setFlippedCard(null)}
                            >
                              Voltar
                            </button>
                          </div>
                          <ul className="mt-5 space-y-3 text-sm text-white/80">
                            {item.bullets.map((bullet) => (
                              <li key={bullet} className="flex gap-2">
                                <Code className="h-4 w-4 text-primary/80" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                          <p className="mt-6 text-xs uppercase tracking-[0.35em] text-white/40">
                            Alpha + Copiloto
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <CarouselPrevious
            className="hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-primary/60 bg-primary/15 text-primary hover:bg-primary hover:text-background focus-visible:ring-0 md:flex"
            variant="ghost"
          />
          <CarouselNext
            className="hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-primary/60 bg-primary/15 text-primary hover:bg-primary hover:text-background focus-visible:ring-0 md:flex"
            variant="ghost"
          />
        </Carousel>

        <div className="mt-10 flex justify-center gap-2">
          {slides.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-2 w-2 rounded-full bg-white/15 transition-all duration-300",
                current === index && "w-6 bg-primary",
              )}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <ModalSimulation problem={selectedProblem} onClose={() => setSelectedProblem(null)} />
    </section>
  );
};
