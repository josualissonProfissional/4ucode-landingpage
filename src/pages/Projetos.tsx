import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Briefcase, Image, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/sections/Header";
import { RevealSection } from "@/components/RevealSection";
import { SEO } from "@/components/SEO";

const projects = [
  {
    name: "Assistente de Suporte",
    impact: "Redução de 42% no tempo médio de resposta com chatbot IA + integração CRM.",
    metric: "NPS +9 pts",
  },
  {
    name: "Plataforma de Cursos",
    impact: "Recomendações personalizadas com RAG; aumento de 28% em conclusão de trilhas.",
    metric: "Retenção +18%",
  },
  {
    name: "Dashboard Financeiro",
    impact: "Automação de conciliação e insights em tempo real para diretoria.",
    metric: "12h/semana economizadas",
  },
];

const Projetos = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#060111] via-[#0b0720] to-background text-white">
      <SEO title="Projetos Reais - 4uCode" description="Projetos reais com resultados reais em IA e .NET." />
      <Header />
      <main className="container space-y-16 px-4 pb-16 pt-20 md:space-y-24 md:pt-28">
        <header className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
              Projetos Reais
            </p>
            <h1 className="font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
              Projetos reais com resultados reais
            </h1>
            <p className="text-lg text-white/75">
              Veja como nossa abordagem AI-first tem ajudado empresas a transformar suas operações com entregas rápidas e mensuráveis.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                className="rounded-full bg-gradient-to-r from-primary via-primary-600 to-primary-700 text-white shadow-[0_18px_40px_rgba(78,34,164,0.55)]"
                onClick={() => (window.location.href = "/contato")}
              >
                Quero um diagnóstico
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-full border-white/25 bg-white/5 text-white hover:bg-white/10">
                Ver mais cases
              </Button>
            </div>
          </div>
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_28px_70px_rgba(13,3,35,0.65)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <Briefcase className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-white/60">Mercado</p>
                <p className="text-lg font-semibold text-white">Impacto mensurável</p>
              </div>
            </div>
            <p className="text-white/70">
              Métricas importam: trabalhamos com metas claras e painéis que mostram o impacto do produto na operação.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm uppercase tracking-[0.26em] text-white/60">Métricas</p>
                <p className="text-white">Conversão, retenção, NPS e eficiência operacional.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm uppercase tracking-[0.26em] text-white/60">Formatos</p>
                <p className="text-white">Carrossel de projetos, vídeos curtos e dashboards interativos.</p>
              </div>
            </div>
          </motion.div>
        </header>

        <RevealSection>
          <section className="grid gap-6 md:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.name} className="border-white/10 bg-white/5 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Image className="h-5 w-5 text-primary" />
                    {project.name}
                  </CardTitle>
                  <CardDescription className="text-white/70">{project.impact}</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-2 text-sm text-white/80">
                  <BarChart3 className="h-4 w-4 text-primary" />
                  {project.metric}
                </CardContent>
              </Card>
            ))}
          </section>
        </RevealSection>

        <RevealSection>
          <section className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/60">Explorar casos</p>
                <h3 className="text-2xl font-semibold">Quer ver o projeto em detalhe?</h3>
                <p className="text-white/70">Solicite um walkthrough com vídeos e métricas completas.</p>
              </div>
              <Button
                className="rounded-full bg-gradient-to-r from-primary via-primary-600 to-primary-700 text-white shadow-[0_18px_40px_rgba(78,34,164,0.55)]"
                onClick={() => (window.location.href = "/contato")}
              >
                Pedir walkthrough
                <Play className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </section>
        </RevealSection>
      </main>
    </div>
  );
};

export default Projetos;
