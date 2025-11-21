import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Zap, Target, Lightbulb, Users, Award, Rocket, Flame, Heart, Star, Brain } from "lucide-react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { hoverLift, inViewUp } from "@/lib/motion-presets";

const cardStyles = [
  {
    gradient: "from-[#301d5d]/80 via-[#1c123a]/90 to-[#090615]/95",
    accent: "bg-white/10 text-white",
    glow: "shadow-[0_18px_45px_rgba(72,35,150,0.2)]",
  },
  {
    gradient: "from-[#1f285e]/78 via-[#111837]/90 to-[#05060f]/95",
    accent: "bg-white/10 text-white",
    glow: "shadow-[0_18px_45px_rgba(64,83,200,0.18)]",
  },
  {
    gradient: "from-[#17343a]/78 via-[#0c1f24]/90 to-[#030708]/96",
    accent: "bg-white/10 text-white",
    glow: "shadow-[0_18px_45px_rgba(32,120,98,0.16)]",
  },
  {
    gradient: "from-[#412242]/80 via-[#28142a]/90 to-[#0c050d]/95",
    accent: "bg-white/10 text-white",
    glow: "shadow-[0_18px_45px_rgba(120,45,100,0.18)]",
  },
];

const values = [
  {
    icon: Target,
    title: "Autorresponsabilidade Radical",
    quote: "Mesmo quando o erro é do outro, o resultado é meu.",
    description:
      "Cada membro assume o impacto do que faz — e do que escolhe não fazer. Aqui, não há culpados. Há construtores.",
  },
  {
    icon: Rocket,
    title: "Crescimento é Escolha",
    quote: "Ainda não. — Carol Dweck",
    description:
      "O crescimento é uma decisão diária. A 4U Code é um laboratório vivo do mindset de crescimento: aprendemos, erramos rápido, corrigimos mais rápido e ensinamos o que aprendemos.",
  },
  {
    icon: Lightbulb,
    title: "Simplicidade Inteligente",
    description:
      "Traduzimos o complexo em simples, sem perder profundidade. A clareza é nossa forma de arte — e nosso diferencial estratégico.",
  },
  {
    icon: Zap,
    title: "Energia 220 ⚡",
    quote: "Se for pra fazer, faz aceso. — Raphael Costa",
    description:
      "A energia é o campo magnético da 4U Code. É intensidade com propósito, execução com alma, movimento com presença. Aqui, a energia não é força bruta — é consciência elétrica.",
  },
  {
    icon: Award,
    title: "Excelência com Propósito",
    description:
      "Excelência não é luxo: é respeito pelo tempo, pela confiança e pelo legado que deixamos. Fazemos bonito porque acreditamos que beleza também é valor.",
  },
  {
    icon: Users,
    title: "Comunidade que Ensina",
    quote: "Aprender, aplicar e ensinar",
    description:
      "A 4U Code é uma corrente viva de mestres em formação. Cada pessoa que aprende se torna um multiplicador. Nosso poder está na soma — o código é coletivo.",
  },
  {
    icon: Flame,
    title: "Pensar Fora da Caixa — e Queimar a Caixa",
    description:
      "Não basta questionar. É preciso reinventar. A inovação nasce quando deixamos de reproduzir fórmulas e passamos a criar nossos próprios sistemas.",
  },
  {
    icon: Heart,
    title: "Propósito Antes do Lucro",
    quote: "Se não muda vidas, não vale o nosso tempo.",
    description:
      "O lucro é métrica, o propósito é bússola. A 4U Code mede sucesso pelo impacto real que gera em vidas, carreiras e consciências.",
  },
  {
    icon: Star,
    title: "Legado Vivo",
    quote:
      "O verdadeiro poder de uma marca está na energia que ela desperta nas pessoas. — William Celso",
    description:
      "Ele conduz a 4U Code para além da tecnologia — para o campo do comportamento, consciência e cultura. O propósito é claro: transformar pessoas em legados vivos.",
  },
  {
    icon: Brain,
    title: "IA Como Norte Pessoal",
    quote: "Dados viram direção quando têm alma.",
    description:
      "Personalizamos jornadas com IA: diagnóstico contínuo, conteúdo certo na hora certa e feedback acionável para cada dev. Zero barulho, só evolução guiada.",
  },
];

export const Culture = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [snapCount, setSnapCount] = useState(values.length);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);

  useEffect(() => {
    if (!api) return;

    const update = () => {
      setCurrent(api.selectedScrollSnap());
      setSnapCount(api.scrollSnapList().length);
    };

    update();
    api.on("select", update);
    api.on("reInit", update);

    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  useEffect(() => {
    if (!api || isCarouselHovered) return;

    const autoplay = window.setInterval(() => {
      api.scrollNext();
    }, 6000);

    return () => window.clearInterval(autoplay);
  }, [api, isCarouselHovered]);

  return (
    <section
      id="cultura"
      className="relative overflow-hidden bg-gradient-to-b from-[#05020f] via-[#080216] to-background py-20 px-4"
    >
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
        autoPlay
        loop
        muted
        playsInline
        poster="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80"
        src="https://cdn.coverr.co/videos/coverr-young-developer-in-concentration-7702/1080p.mp4"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/85" />

      <div className="container relative z-10 mx-auto max-w-6xl">
        <motion.div className="mb-16 text-center space-y-4" {...inViewUp(0)}>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-6 py-2 text-sm font-medium text-primary">
            ⚡ Declaração de Cultura
          </div>
          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-white">O Legado da Nova Era</h2>
          <p className="mt-6 text-xl leading-relaxed text-muted-foreground max-w-3xl mx-auto">
            A 4U Code não é um curso. É um movimento que acende mentes e cria futuros. Aqui,
            ensinamos a pensar, sentir e agir com propósito.
          </p>
          <p className="mt-4 text-lg font-medium text-primary">
            Somos a geração que escreve o código do amanhã com energia, consciência e
            responsabilidade.
          </p>
        </motion.div>

        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: true }}
          className="relative overflow-x-hidden"
          onPointerEnter={() => setIsCarouselHovered(true)}
          onPointerLeave={() => setIsCarouselHovered(false)}
          onFocusCapture={() => setIsCarouselHovered(true)}
          onBlurCapture={() => setIsCarouselHovered(false)}
        >
          <CarouselContent className="ml-1 flex gap-6 sm:ml-0 sm:gap-8 lg:-ml-6 lg:gap-10 xl:gap-15">
            {values.map((value, index) => {
              const Icon = value.icon;
              const style = cardStyles[index % cardStyles.length];
              return (
                <CarouselItem
                  key={value.title}
                  className="basis-[95%] px-2 min-[420px]:basis-[calc(65%-26px)] sm:px-3 sm:basis-[calc(48%-24px)] md:px-5 md:basis-[calc(35%-26px)] lg:px-6 lg:basis-[calc(30%-28px)] xl:px-7 xl:basis-[calc(28%-30px)]"
                >
                  <motion.div
                    className={cn(
                      "relative mx-auto flex h-full w-80 max-w-[320px] flex-col overflow-hidden rounded-[40px] border border-white/12 bg-background/90 px-8 py-9 sm:px-9 sm:py-10 backdrop-blur",
                      "transition-transform duration-500 hover:-translate-y-1",
                      style.glow,
                    )}
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 8 + index * 0.15, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.03, rotateX: -0.6, rotateY: 0.4 }}
                  >
                    <div className={cn("absolute inset-0 bg-gradient-to-br opacity-55", style.gradient)} />
                    <div className="relative z-10">
                      <div className="flex items-start justify-between">
                        <span className={cn("flex h-11 w-11 items-center justify-center rounded-2xl", style.accent)}>
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="text-base font-semibold text-white/55">0{index + 1}</span>
                      </div>
                      <h3 className="mt-8 text-lg font-semibold text-white break-words text-balance">
                        {value.title}
                      </h3>
                      {value.quote && (
                        <p className="mt-4 text-sm font-medium italic text-white/85 break-words text-balance">
                          "{value.quote}"
                        </p>
                      )}
                      <p className="mt-4 text-sm leading-relaxed text-white/85 break-words text-pretty">
                        {value.description}
                      </p>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 w-full bg-gradient-to-r from-transparent via-primary/25 to-transparent opacity-40" />
                  </motion.div>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <CarouselPrevious
            className="hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-primary/50 bg-primary/15 text-primary hover:bg-primary hover:text-background focus-visible:ring-0 md:flex"
            variant="ghost"
          />
          <CarouselNext
            className="hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-primary/50 bg-primary/15 text-primary hover:bg-primary hover:text-background focus-visible:ring-0 md:flex"
            variant="ghost"
          />
        </Carousel>

        <div className="mt-10 flex justify-center gap-2">
          {Array.from({ length: snapCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-2 w-2 rounded-full bg-white/15 transition-all duration-300",
                current === index && "w-6 bg-primary",
              )}
              aria-label={`Ir para valor ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};





