import { useEffect, useState } from "react";
import { Sparkles, Code2, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Sparkles,
    title: "Prompts Poderosos",
    description: "Aprenda a usar IA como copiloto, não como substituto. Prompt engineering aplicado ao .NET desde o dia 1.",
    examples: ["Gerar testes", "Documentação", "Refactoring"],
  },
  {
    icon: Code2,
    title: "Copilots Integrados",
    description: "GitHub Copilot, IntelliCode e Azure AI direto no VS Code. Produtividade real, não mágica.",
    examples: ["Autocomplete", "Code review", "Debugging"],
  },
  {
    icon: Zap,
    title: "Automações Práticas",
    description: "Scripts e agentes que geram boilerplate, criam PRs e validam código. Foco no que importa.",
    examples: ["CI/CD", "Templates", "Validações"],
  },
];

export const IAFirst = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [snapCount, setSnapCount] = useState(features.length);

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

  return (
    <section className="relative overflow-hidden py-20 md:py-32" id="ia-first">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center animate-fade-up">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 font-semibold text-primary">
            <Sparkles className="h-4 w-4 animate-glow" />
            <span>Diferencial IA-First</span>
          </div>
          <h2 className="font-display mb-4">IA responsável desde o início</h2>
          <p className="text-xl text-muted-foreground">
            Não temos medo da IA. Ensinamos você a usá-la como aliada, com método e validação humana.
          </p>
        </div>

        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: true }}
          className="relative mx-auto max-w-6xl"
        >
          <CarouselContent className="ml-1 flex gap-4 sm:ml-0 sm:gap-6">
            {features.map((feature, index) => (
              <CarouselItem
                key={feature.title}
                className="basis-[85%] sm:basis-[calc(50%-16px)] lg:basis-[calc(33.333%-18px)]"
              >
                <Card
                  className={cn(
                    "relative flex h-full flex-col items-center overflow-hidden rounded-[32px] border border-white/10 bg-[rgba(10,8,22,0.85)] px-8 py-10 text-center",
                    "shadow-[0_25px_70px_rgba(80,30,190,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(80,30,190,0.26)]",
                  )}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-primary-500 via-primary to-primary-700 shadow-[0_18px_35px_rgba(108,43,217,0.35)]">
                    <feature.icon className="h-9 w-9 text-white" strokeWidth={2} />
                  </div>

                  <h3 className="mt-6 text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/85">{feature.description}</p>

                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {feature.examples.map((example) => (
                      <span
                        key={example}
                        className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious
            className="hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary hover:bg-primary hover:text-background md:flex"
            variant="ghost"
          />
          <CarouselNext
            className="hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary hover:bg-primary hover:text-background md:flex"
            variant="ghost"
          />
        </Carousel>

        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: snapCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-2 w-2 rounded-full bg-white/15 transition-all duration-300",
                current === index && "w-6 bg-primary",
              )}
              aria-label={`Ir para destaque ${index + 1}`}
            />
          ))}
        </div>

{/*         <div className="mt-16 grid max-w-3xl grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary md:text-4xl">3x</div>
            <div className="text-sm text-muted-foreground">Mais produtivo</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary md:text-4xl">90%</div>
            <div className="text-sm text-muted-foreground">Usa IA diário</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary md:text-4xl">100%</div>
            <div className="text-sm text-muted-foreground">Validação humana</div>
          </div>
        </div> */}
      </div>
    </section>
  );
};
