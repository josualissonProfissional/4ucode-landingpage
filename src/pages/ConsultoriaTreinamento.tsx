import { motion } from "framer-motion";
import { ArrowRight, BookOpenCheck, Building2, Lightbulb, MessageSquare, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RevealSection } from "@/components/RevealSection";
import { SEO } from "@/components/SEO";

const offerings = [
  { title: "Arquitetura .NET + IA", desc: "Planejamento de pipelines, RAG e copilotos seguros para o seu produto.", icon: Lightbulb },
  { title: "Treinamentos sob medida", desc: "Workshops práticos para squads em C#, Azure, OpenAI e boas práticas de engenharia.", icon: BookOpenCheck },
  { title: "Segurança e conformidade", desc: "Avaliação de riscos, governança de prompts e privacidade de dados.", icon: Shield },
];

const ConsultoriaTreinamento = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#060111] via-[#0b0720] to-background text-white">
      <SEO title="Consultoria e Treinamento - 4uCode" description="Treinamento personalizado e consultoria em IA e .NET." />
      <main className="container space-y-16 px-4 pb-16 pt-20 md:space-y-24 md:pt-28">
        <header className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
              Consultoria e Treinamento
            </p>
            <h1 className="font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
              Treinamento personalizado e consultoria de IA
            </h1>
            <p className="text-lg text-white/75">
              Prepare sua equipe para o futuro com orientação especializada em IA e .NET, aplicada em projetos reais do seu negócio.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                className="rounded-full bg-gradient-to-r from-primary via-primary-600 to-primary-700 text-white shadow-[0_18px_40px_rgba(78,34,164,0.55)]"
                onClick={() => (window.location.href = "/contato")}
              >
                Agendar consultoria
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-full border-white/25 bg-white/5 text-white hover:bg-white/10">
                Baixar programas
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
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-white/60">Empresas</p>
                <p className="text-lg font-semibold text-white">Planos sob medida</p>
              </div>
            </div>
            <p className="text-white/70">
              Escolha entre sessões rápidas de diagnóstico, imersões de 2 dias ou programas de 6 semanas com projetos aplicados à sua realidade.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm uppercase tracking-[0.26em] text-white/60">Resultados</p>
                <p className="text-white">Time preparado para lançar features com IA em 30 dias.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm uppercase tracking-[0.26em] text-white/60">Entrega</p>
                <p className="text-white">Materiais, playbooks e code samples exclusivos.</p>
              </div>
            </div>
          </motion.div>
        </header>

        <RevealSection>
          <section className="grid gap-6 md:grid-cols-3">
            {offerings.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="border-white/10 bg-white/5 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-primary" />
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-white/70">{item.desc}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-white/70">
                    Roadmap co-criado, medição de impacto e sessões hands-on com sua stack.
                  </CardContent>
                </Card>
              );
            })}
          </section>
        </RevealSection>

        <RevealSection>
          <section className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/60">Contato rápido</p>
                <h3 className="text-2xl font-semibold">Pronto para treinar seu time?</h3>
                <p className="text-white/70">Conte o desafio, montamos a agenda e o plano ideal em 48h.</p>
              </div>
              <Button
                className="rounded-full bg-gradient-to-r from-primary via-primary-600 to-primary-700 text-white shadow-[0_18px_40px_rgba(78,34,164,0.55)]"
                onClick={() => (window.location.href = "/contato")}
              >
                Falar com especialista
              </Button>
            </div>
          </section>
        </RevealSection>
      </main>
    </div>
  );
};

export default ConsultoriaTreinamento;
