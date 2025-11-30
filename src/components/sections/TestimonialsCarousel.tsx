import { motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { testimonials } from "@/data/testimonials";
import { Quote, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { hoverGlow } from "@/lib/motion-presets";

const badgePalette = ["bg-primary/20 text-primary-100", "bg-emerald-500/15 text-emerald-200", "bg-orange-500/15 text-orange-200"];

const getBadges = (rating: number | undefined) => {
  if (!rating) return ["Badge Alpha", "Sprint completo"];
  if (rating >= 5) return ["Badge Alpha", "Case aprovado", "Mentor da comunidade"];
  if (rating >= 4) return ["Sprint completo", "Entrega com feedback"];
  return ["Acompanhamento ativo"];
};

export const TestimonialsCarousel = () => {
  return (
    <section
      id="depoimentos"
      className="bg-gradient-to-b from-[#04010c] via-[#090216] to-background py-20 sm:py-28"
    >
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
          className="mb-12 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
            Resultado real
          </span>
          <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl md:text-5xl">Quem começou com a gente</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/65 sm:text-lg">
            Histórias de devs que migraram ou iniciaram carreira usando projetos IA-first, mentorias ao vivo e nossa
            comunidade.
          </p>
        </motion.div>

        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, index) => {
              const badges = getBadges(testimonial.rating);
              return (
                <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <motion.article
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.55, ease: [0.25, 0.8, 0.25, 1], delay: index * 0.05 }}
                    whileHover={{ y: -12, scale: 1.01 }}
                  >
                    <Card className="group h-full border-white/10 bg-white/[0.04] transition-all duration-300 hover:border-primary/50 hover:shadow-[0_24px_60px_rgba(78,32,164,0.25)]">
                      <CardContent className="flex h-full flex-col gap-6 p-6">
                        <div className="flex items-center justify-between">
                          <Quote className="h-8 w-8 text-primary/40" aria-hidden="true" />
                          <div className="flex gap-1">
                            {testimonial.rating &&
                              Array.from({ length: testimonial.rating }).map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              ))}
                          </div>
                        </div>

                        <p className="flex-grow text-sm leading-relaxed text-white/75">“{testimonial.quote}”</p>

                        <div className="space-y-4">
                          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:gap-5 sm:text-left">
                            <motion.div
                              className="rounded-3xl border-2 border-white/15 shadow-[0_15px_40px_rgba(8,2,20,0.55)]"
                              animate={{ rotate: [0, -3, 3, 0] }}
                              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: index * 0.15 }}
                            >
                              <Avatar className="h-20 w-20 overflow-hidden rounded-3xl">
                                <AvatarImage
                                  src={testimonial.avatarUrl}
                                  alt={testimonial.name}
                                  loading="lazy"
                                  className="h-full w-full object-cover object-center"
                                />
                                <AvatarFallback className="bg-primary/20 text-primary">4u</AvatarFallback>
                              </Avatar>
                            </motion.div>
                            <div className="space-y-1">
                              <p className="font-semibold text-white">{testimonial.name}</p>
                              <p className="text-xs uppercase tracking-wide text-white/60">{testimonial.role}</p>
                              <p className="text-xs text-white/45">
                                {testimonial.school} · {testimonial.city}, {testimonial.state}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {badges.map((badge, badgeIndex) => (
                              <motion.span
                                key={`${testimonial.id}-badge-${badge}`}
                                className={cn(
                                  "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]",
                                  badgePalette[badgeIndex % badgePalette.length],
                                )}
                                animate={{ opacity: [0.6, 1, 0.6] }}
                                transition={{
                                  duration: 3 + badgeIndex,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                  delay: badgeIndex * 0.2,
                                }}
                              >
                                {badge}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.article>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <div className="mt-8 flex items-center justify-center gap-3">
            <CarouselPrevious className="static translate-y-0" aria-label="Ver depoimento anterior" />
            <CarouselNext className="static translate-y-0" aria-label="Ver próximo depoimento" />
          </div>
        </Carousel>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1], delay: 0.2 }}
          className="mt-12 text-center"
        >
          <p className="mb-4 text-sm text-white/60">Pronto para desbloquear seu badge Alpha?</p>
          <motion.div {...hoverGlow} className="inline-flex">
            <Button
              variant="outline"
              size="lg"
              className="border-primary/40 text-white transition-transform duration-300 hover:scale-105 active:scale-95"
              onClick={() => (window.location.href = "/contato")}
            >
              Começar agora
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
