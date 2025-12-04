import { useEffect, useMemo, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { usePersonalization } from "@/hooks/usePersonalization";
import { floatLoop, glowPulse, hoverGlow } from "@/lib/motion-presets";
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

type HeroSlide = {
  id: string;
  tag: string;
  headline: string;
  description: string;
  typedText: string;
  media: MediaSlide;
  backgroundVideo: string;
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
  },
];

const ScrollIndicator = ({ onClick, className }: { onClick: () => void; className?: string }) => (
  <motion.button
    onClick={onClick}
    className={cn(
      "group flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/70 transition",
      className,
    )}
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
  const PROGRESS_DURATION = 8;
  const heroPlugins = useMemo(
    () => [
      Autoplay({
        delay: PROGRESS_DURATION * 1000,
        stopOnInteraction: false,
      }),
    ],
    [],
  );

  const [progressKey, setProgressKey] = useState(0);
  const slideFloatMotion = floatLoop(1, 5);
  const headingFloatMotion = floatLoop(1, 5);
  const buttonFloatMotion = floatLoop(1, 5);

  useEffect(() => {
    if (!heroApi) return;
    const onSelect = () => setActiveSlide(heroApi.selectedScrollSnap());
    onSelect();
    heroApi.on("select", onSelect);
    return () => {
      heroApi.off("select", onSelect);
    };
  }, [heroApi]);

  useEffect(() => {
    setProgressKey((prev) => prev + 1);
  }, [activeSlide]);

  const slides = heroSlidesData.map((slide) =>
    slide.id === "mentoria"
      ? { ...slide, headline: headline || slide.headline, description: subheadline || slide.description }
      : slide,
  );
  const activeBackground = slides[activeSlide]?.backgroundVideo ?? heroBg1;

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
      className="relative flex h-screen w-full flex-col overflow-hidden bg-gradient-to-b from-[#060111] via-[#050313] to-background pt-16 text-white sm:pt-20"
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

      <div className="container relative z-10 flex h-full flex-1 flex-col items-start justify-start px-4">
        <Carousel setApi={setHeroApi} plugins={heroPlugins} className="w-full">
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={slide.id}>
                <motion.div {...slideFloatMotion} className="relative">
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
                        <motion.div {...headingFloatMotion}>
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
                        <motion.div {...buttonFloatMotion} className="w-full sm:w-auto">
                          <motion.div {...hoverGlow} className="w-full">
                            <Button
                              size="lg"
                              onClick={handleStart}
                              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary via-primary-600 to-primary-700 px-8 py-4 text-base font-semibold text-white shadow-[0_18px_45px_rgba(78,34,164,0.55)] transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:w-auto"
                            >
                              {ctaLabel}
                              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    </AnimatePresence>
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
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="absolute left-1/2 top-[60%] z-20 flex w-full max-w-[320px] -translate-x-1/2 flex-col items-center gap-4 px-4 sm:px-6 md:left-1/2 md:top-[40%] lg:top-[94%] md:px-0 sm:top-[50%]">
            <div className="flex w-full flex-col items-center gap-2">
              <div className="w-full max-w-[220px] rounded-full bg-white/15 px-0.5 py-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
                <div className="overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    key={progressKey}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: PROGRESS_DURATION, ease: "linear", repeat: 0 }}
                    className="h-1.5 rounded-full bg-gradient-to-r from-fuchsia-400 via-primary to-purple-500"
                  />
                </div>
              </div>
            </div>
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
            <ScrollIndicator onClick={handleScrollToJourney} className="mt-3" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};
