import { motion } from "framer-motion";
import { ArrowRight, Clock, Factory, LayoutDashboard, Rocket, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/sections/Header";
import { RevealSection } from "@/components/RevealSection";
import { SEO } from "@/components/SEO";

const steps = [
  { title: "Discovery ágil", desc: "Alinhamento rápido, escopo enxuto e backlog priorizado em dias.", icon: Clock },
  { title: "Squad híbrida", desc: "Time 4uCode + IA copiloto entregando rápido sem perder qualidade.", icon: Users },
  { title: "Sprints curtas", desc: "Release quinzenal com demo, QA automatizado e telemetria de uso.", icon: Rocket },
  { title: "Operação viva", desc: "Observabilidade, métricas de negócio e plano de evolução contínua.", icon: LayoutDashboard },
];

const cases = [
  {
    title: "Plataforma de onboarding",
    result: "Redução de 35% no tempo de ativação com micro frontends em .NET + React.",
  },
  {
    title: "Backoffice financeiro",
    result: "Automação de conciliação com IA: menos 18h semanais de trabalho manual.",
  },
  {
    title: "Produto data-driven",
    result: "Feature flags e experimentos com rollout seguro; NPS +12 pontos.",
  },
];

const Fabrica = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#060111] via-[#0b0720] to-background text-white">
      <SEO title="Fábrica de Software - 4uCode" description="Sua ideia, nossa execução ágil e AI-first." />
      <Header />
      <main className="container space-y-16 px-4 pb-16 pt-20 md:space-y-24 md:pt-28">
        <header className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
              Fábrica de Software
            </p>
            <h1 className="font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
              Sua ideia. Nossa execução. Software de alta qualidade.
            </h1>
            <p className="text-lg text-white/75">
              Trabalhe com uma fábrica de software ágil para resultados rápidos e inovadores, combinando squads enxutas e IA para acelerar o ciclo de entrega.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                className="rounded-full bg-gradient-to-r from-primary via-primary-600 to-primary-700 text-white shadow-[0_18px_40px_rgba(78,34,164,0.55)]"
                onClick={() => (window.location.href = "/contato")}
              >
                Falar com o time
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-full border-white/25 bg-white/5 text-white hover:bg-white/10">
                Ver casos de uso
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
                <Factory className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-white/60">Squad ágil</p>
                <p className="text-lg font-semibold text-white">Pipeline contínuo</p>
              </div>
            </div>
            <p className="text-white/70">
              Metodologia enxuta com rituais semanais, discovery paralelo e copilotagem para manter velocidade sem sacrificar robustez.
            </p>
            <div className="mt-6 space-y-3">
              {cases.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm uppercase tracking-[0.26em] text-white/60">{item.title}</p>
                  <p className="text-white">{item.result}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </header>

        <RevealSection>
          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <Card key={step.title} className="border-white/10 bg-white/5 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-primary" />
                      {step.title}
                    </CardTitle>
                    <CardDescription className="text-white/70">{step.desc}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-white/70">
                    Roadmaps claros, estimativas curtas e entregas com feature flags para segurança.
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
                <p className="text-sm uppercase tracking-[0.3em] text-white/60">Próximos passos</p>
                <h3 className="text-2xl font-semibold">Quer transformar sua ideia em código?</h3>
                <p className="text-white/70">Compartilhe o contexto, montamos um squad dedicado e começamos em até 7 dias.</p>
              </div>
              <Button
                className="rounded-full bg-gradient-to-r from-primary via-primary-600 to-primary-700 text-white shadow-[0_18px_40px_rgba(78,34,164,0.55)]"
                onClick={() => (window.location.href = "/contato")}
              >
                Agendar diagnóstico
              </Button>
            </div>
          </section>
        </RevealSection>
      </main>
    </div>
  );
};

export default Fabrica;
