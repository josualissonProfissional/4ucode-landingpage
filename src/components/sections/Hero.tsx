import { useEffect, useMemo, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, BotMessageSquare, Users, ShieldCheck } from "lucide-react";
import { usePersonalization } from "@/hooks/usePersonalization";
import { floatLoop, glowPulse, hoverGlow, hoverLift, inViewUp } from "@/lib/motion-presets";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import heroBg1 from "@/assets/videos/video1.mp4";
import heroBg2 from "@/assets/videos/video2.mp4";
import heroBg3 from "@/assets/videos/video3.mp4";

type MediaSlide = { type: "video"; src: string; poster: string; caption: string } | { type: "image"; src: string; caption: string };

type StatItem = {
  label: string;
  value: string;
  delay?: number;
};

type HeroSlide = {
  id: string;
  tag: string;
  headline: string;
  description: string;
  typedText: string;
  media: MediaSlide;
  backgroundVideo: string;
  stats: StatItem[];
  mobileSummary: string;
  highlight: string;
};

const heroSlidesData: HeroSlide[] = [
  {
    id: "fabrica",
    tag: "Fábrica de Software",
    headline: "Transforme sua ideia em código com velocidade",
    description: "Trabalhe com nossa fábrica de software ágil; squads + IA entregando valor em dias.",
    typedText: "Acelere o ciclo de entregas com arquitetura sólida e squads híbridas.",
    media: {
      type: "video",
      src: "https://cdn.pixabay.com/video/2024/03/05/201409-902988678_large.mp4",
      poster: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=800&q=80",
      caption: "Engrenagens do delivery",
    },
    backgroundVideo: heroBg1,
    stats: [
      { label: "+35% mais rápido", value: "ciclo de entrega", delay: 0 },
      { label: "Squads híbridos", value: "IA + engenharia", delay: 0.3 },
      { label: "Releases quinzenais", value: "sprints", delay: 0.6 },
    ],
    mobileSummary: "Squads IA + engenharia entregando releases curtos para projetos reais.",
    highlight: "Squads guiados com QA, engenharia e copilotos 24/7.",
  },
  {
    id: "consultoria",
    tag: "Consultoria & Treinamento",
    headline: "Consultoria personalizada para times de IA e .NET",
    description: "Aprenda a combinar IA e engenharia em projetos reais através de treinamentos aplicados.",
    typedText: "Guiando squads com workshops, playbooks e conhecimento aplicado.",
    media: {
      type: "image",
      src: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=900&q=80",
      caption: "Playbooks e gráficos em ação",
    },
    backgroundVideo: heroBg2,
    stats: [
      { label: "50+ empresas", value: "treinadas", delay: 0 },
      { label: "98% NPS", value: "consultorias", delay: 0.3 },
      { label: "Workshops semanais", value: "hands-on", delay: 0.6 },
    ],
    mobileSummary: "Consultoria aplicada com playbooks e gráficos orientando squads.",
    highlight: "Playbooks e gráficos com especialistas orientando seu time.",
  },
  {
    id: "mentoria",
    tag: "Mentoria AI-First",
    headline: "Desbloqueie seu potencial com IA e mentores reais",
    description: "Mentoria apoiada por IA e especialistas para você chegar ao nível de alta performance.",
    typedText: "Copilotos aprendem você, mentores garantem o progresso e projetos reais validam o aprendizado.",
    media: {
      type: "video",
      src: "https://cdn.pixabay.com/video/2023/08/02/173620-848222861_large.mp4",
      poster: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=700&q=80",
      caption: "IA guiando versões",
    },
    backgroundVideo: heroBg3,
    stats: [
      { label: "+800 devs ativos", value: "Mentoria AI-First", delay: 0 },
      { label: "24/7 copiloto IA", value: "assistência", delay: 0.3 },
      { label: "6 mentorias/semana", value: "sprints", delay: 0.6 },
    ],
    mobileSummary: "Mentores + IA copiloto mantendo ritmo e clareza por semana.",
    highlight: "Copiloto IA e mentores respondendo 24/7 para você permanecer no ritmo.",
  },
];

const StatPill = ({ label, value, delay }: { label: string; value: string; delay: number }) => (
  <motion.div
    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left backdrop-blur"
    animate={{ y: [0, -6, 0], scale: [1, 1.02, 1] }}
    transition={{ duration: 6 + delay, repeat: Infinity, ease: "easeInOut" }}
    whileHover={{ scale: 1.05, y: -6 }}
    whileTap={{ scale: 0.97 }}
  >
    <div className="text-lg font-semibold text-white">{value}</div>
    <p className="text-xs uppercase tracking-[0.3em] text-white/60">{label}</p>
  </motion.div>
);

const ScrollIndicator = ({ onClick }: { onClick: () => void }) => (
  <motion.button
    onClick={onClick}
    className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/70 transition md:flex"
    aria-label="Descer para próxima seção"
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    whileHover={{ scale: 1.05 }}
  >
    <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
    Continue rolando
  </motion.button>
);

const renderMedia = (media: MediaSlide) => (
  <div className="relative h-full w-full overflow-hidden rounded-[28px] border border-white/15">
    {media.type === "video" ? (
      <video className="h-full w-full object-cover" src={media.src} poster={media.poster} autoPlay loop muted playsInline />
    ) : (
      <img src={media.src} alt={media.caption} className="h-full w-full object-cover" />
    )}
    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent" />
    <p className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-black/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white">
      {media.caption}
    </p>
  </div>
);

const TypewriterLine = ({ text, active }: { text: string; active: boolean }) => {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (!active) {
      setDisplay("");
      return;
    }
    let index = 0;
    setDisplay("");
    const interval = window.setInterval(() => {
      index += 1;
      setDisplay(text.slice(0, index));
      if (index >= text.length) {
        window.clearInterval(interval);
      }
    }, 35);
    return () => window.clearInterval(interval);
  }, [text, active]);

  return (
    <p className="font-mono text-xs uppercase tracking-[0.35em] text-primary/80">
      {display}
      <span className="ml-1 inline-block animate-pulse">▌</span>
    </p>
  );
};

export const Hero = () => {
  const { headline, subheadline, ctaLabel } = usePersonalization();
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
  const [heroApi, setHeroApi] = useState<CarouselApi>();
  const [activeSlide, setActiveSlide] = useState(0);
  const heroPlugins = useMemo(
    () => [
      Autoplay({
        delay: 8000,
        stopOnInteraction: false,
      }),
    ],
    [],
  );

  useEffect(() => {
    if (!heroApi) return;
    const onSelect = () => setActiveSlide(heroApi.selectedScrollSnap());
    onSelect();
    heroApi.on("select", onSelect);
    return () => {
      heroApi.off("select", onSelect);
    };
  }, [heroApi]);

  const slides = heroSlidesData.map((slide) =>
    slide.id === "mentoria"
      ? { ...slide, headline: headline || slide.headline, description: subheadline || slide.description }
      : slide,
  );
  const activeBackground = slides[activeSlide]?.backgroundVideo ?? heroBg1;
  const activeStats = slides[activeSlide]?.stats ?? [];
  const highlightText = slides[activeSlide]?.highlight ?? "Chat IA disponível 24/7 para tirar dúvidas e guiar seus estudos.";
  const mobileSummary = slides[activeSlide]?.mobileSummary ?? "+800 devs ativos e mentorias semanais";

  const handleScrollToJourney = () => {
    document.getElementById("jornada")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleStart = () => {
    window.location.href = "/contato";
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-[92vh] w-full flex-col overflow-hidden bg-gradient-to-b from-[#060111] via-[#050313] to-background pt-20 text-white sm:pt-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.video
            key={activeBackground}
            className="absolute inset-0 h-full w-full object-cover opacity-70"
            src={activeBackground}
            autoPlay
            loop
            muted
            playsInline
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.65, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-[#050313]/40 to-[#040111]/80" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(146,102,255,0.35),_transparent_55%)]" />
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 mx-auto h-[480px] w-[480px] rounded-full bg-primary/20 blur-[160px]"
        style={{ opacity: glowOpacity }}
      />

      <div className="container relative z-10 flex-1 px-4 pb-12">
        <Carousel setApi={setHeroApi} plugins={heroPlugins} className="w-full">
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={slide.id}>
                <motion.div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center" initial={{ opacity: 0.9 }} animate={{ opacity: 1 }}>
                  <div className="space-y-6">
                    <motion.div
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.4em] text-white/70"
                      {...glowPulse}
                    >
                      <Sparkles className="h-4 w-4 text-primary" />
                      {slide.tag}
                    </motion.div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`text-${slide.id}`}
                        className="space-y-4"
                        initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -24, filter: "blur(8px)" }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <motion.h1
                          className="font-display text-4xl leading-[1.1] sm:text-5xl lg:text-6xl"
                          initial={{ opacity: 0, y: 18 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.05 }}
                        >
                          {slide.headline}
                        </motion.h1>
                        <motion.p
                          className="text-base text-white/75 sm:text-lg"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.45, delay: 0.12 }}
                        >
                          {slide.description}
                        </motion.p>
                        <TypewriterLine text={slide.typedText} active={activeSlide === index} />
                      </motion.div>
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`cta-${slide.id}`}
                        className="flex flex-col gap-4 sm:flex-row sm:items-center"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.45, delay: 0.1 }}
                      >
                        <motion.div {...hoverGlow} className="w-full sm:w-auto">
                          <Button
                            size="lg"
                            onClick={handleStart}
                            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary via-primary-600 to-primary-700 px-8 py-4 text-base font-semibold text-white shadow-[0_18px_45px_rgba(78,34,164,0.55)] transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:w-auto"
                        >
                          {ctaLabel}
                          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </motion.div>
                      <motion.button
                        onClick={handleScrollToJourney}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-4 text-sm font-semibold text-white/80 backdrop-blur transition hover:border-white/40 sm:w-auto"
                        {...hoverLift}
                      >
                          <ShieldCheck className="h-4 w-4 text-primary" />
                          Ver como funciona
                        </motion.button>
                      </motion.div>
                    </AnimatePresence>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {activeStats.map((pill, pillIndex) => (
                        <motion.div
                          key={`${slide.id}-pill-${pill.label}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 * pillIndex }}
                        >
                          <StatPill label={pill.label} value={pill.value} delay={pill.delay ?? pillIndex * 0.18} />
                        </motion.div>
                      ))}
                      <motion.div
                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-gradient-to-r from-primary/10 to-transparent px-4 py-3 text-sm text-white/80"
                        {...hoverLift}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                      >
                        <BotMessageSquare className="h-5 w-5 text-primary" />
                        {highlightText}
                      </motion.div>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`media-${slide.id}`}
                      style={{ y: mediaY }}
                      className="relative rounded-[32px] border border-white/10 bg-white/[0.02] p-4 shadow-[0_25px_70px_rgba(13,3,35,0.65)] backdrop-blur"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      transition={{ duration: 0.45 }}
                      {...floatLoop(12, 10)}
                    >
                      {renderMedia(slide.media)}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

            <div className="mt-8 flex flex-col items-center gap-4">
              <div className="flex items-center gap-2">
                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                  type="button"
                  onClick={() => heroApi?.scrollTo(index)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    activeSlide === index ? "w-12 bg-primary" : "w-6 bg-white/20",
                  )}
                />
              ))}
            </div>
            <div className="flex items-center justify-center gap-2">
              <CarouselPrevious className="relative h-10 w-10 rounded-full border border-white/20 bg-white/10 text-white hover:bg-primary hover:text-background" />
              <CarouselNext className="relative h-10 w-10 rounded-full border border-white/20 bg-white/10 text-white hover:bg-primary hover:text-background" />
            </div>
          </div>
        </Carousel>
      </div>

      <div className="container relative z-10 grid gap-4 px-4 pb-16 md:hidden">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left backdrop-blur">
          <Users className="h-5 w-5 text-primary" />
          <span className="text-sm text-white/80">{mobileSummary}</span>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left backdrop-blur">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="text-sm text-white/80">{highlightText}</span>
        </div>
      </div>

      <ScrollIndicator onClick={handleScrollToJourney} />
    </section>
  );
};
