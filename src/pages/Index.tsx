import type { Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Factory, BookOpenCheck, Cpu } from "lucide-react";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { RevealSection } from "@/components/RevealSection";
import { SEO } from "@/components/SEO";

const focusAreas: Array<{
  id: string;
  title: string;
  objective: string;
  copy: string;
  visual: string;
  icon: Icon;
  href: string;
}> = [
  {
    id: "fabrica",
    title: "Fábrica de Software",
    objective:
      "Explicar como a 4UCode cria e desenvolve soluções de software utilizando metodologias ágeis para empresas que buscam alta qualidade.",
    copy: "Transforme sua ideia em código de maneira rápida e com qualidade. Trabalhe com nossa fábrica de software ágil, focada em resultados reais.",
    visual: "Ícones de código ou engrenagens girando que representam a produção contínua.",
    icon: Factory,
    href: "/fabrica",
  },
  {
    id: "consultoria",
    title: "Consultoria e Treinamento",
    objective:
      "Detalhar as ofertas de consultoria e treinamento da 4UCode em IA, .NET e C#, ideal para equipes que querem evoluir juntas.",
    copy: "Consultoria personalizada para equipes de tecnologia. Aprenda como implementar IA em seus projetos com nossa orientação especializada.",
    visual: "Ícone de gráfico ou livro com animação suave de conteúdo abrindo ao passar o mouse.",
    icon: BookOpenCheck,
    href: "/consultoria",
  },
  {
    id: "mentoria",
    title: "Mentoria AI-First",
    objective:
      "Mostrar como a mentoria IA-first é estruturada, com casos de sucesso e destaque para o papel da inteligência artificial na carreira.",
    copy: "Desbloqueie seu potencial com a nossa mentoria, apoiada por IA e especialistas, para você se tornar um dev de alta performance.",
    visual: "Representação de IA ou cérebro com circuitos, animando ao passar o mouse.",
    icon: Cpu,
    href: "/mentoria",
  },
];

const Index = () => (
  <div className="min-h-screen">
    <SEO />
    <a href="#main" className="skip-to-content">
      Pular para conteúdo
    </a>
    <Header />
    <main id="main">
      <Hero />
      <section className="bg-background/70 py-16">
        <div className="container mx-auto space-y-12 px-4 md:px-6">
          {focusAreas.map((area) => (
            <RevealSection key={area.id} stagger={220}>
              <article
                id={area.id}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_25px_60px_rgba(5,5,20,0.55)] transition hover:border-primary/70 hover:bg-white/10"
              >
                <div className="flex items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <area.icon className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-display font-semibold">{area.title}</h2>
                  </div>
                  <Button
                    size="sm"
                    className="rounded-full border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/20"
                    onClick={() => (window.location.href = area.href)}
                  >
                    Ir para a página
                  </Button>
                </div>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.25em] text-white/60">Objetivo</p>
                <p className="mt-1 text-white/80">{area.objective}</p>
                <p className="mt-4 text-lg text-white">{area.copy}</p>
                <p className="mt-3 text-sm text-white/60">Elemento visual: {area.visual}</p>
              </article>
            </RevealSection>
          ))}
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Index;
