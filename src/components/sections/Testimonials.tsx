import { Card, CardContent } from "@/components/ui/card";
import { testimonials } from "@/data/testimonials";
import { Star, Quote } from "lucide-react";

export const Testimonials = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-bg-elevated" id="depoimentos">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">Quem comecou com a gente</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Historias reais de quem transformou carreira com nossa mentoria.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="group transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
            >
              <CardContent className="p-6">
                <Quote className="mb-4 h-8 w-8 text-primary/40" />

                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.school} · {testimonial.city}, {testimonial.state}
                    </p>
                  </div>

                  {testimonial.rating && (
                    <div className="flex gap-0.5 transition-transform group-hover:scale-110">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
