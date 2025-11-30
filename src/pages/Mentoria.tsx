import { motion } from "framer-motion";
import { ArrowRight, BotMessageSquare, GraduationCap, LineChart, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/sections/Header";
import { RevealSection } from "@/components/RevealSection";
import { SEO } from "@/components/SEO";

const benefits = [
  "Acelere sua carreira com IA e projetos reais.",
  "Mentores humanos + copilotos para feedback rápido.",
  "Stack Microsoft (C# e .NET) com desafios guiados.",
];

const stats = [
  { label: "Evolução de habilidades em 6 semanas", value: "+210%" },
  { label: "Alunos ativos com IA diária", value: "90%" },
  { label: "Mentorias ao vivo por semana", value: "6" },
];

const testimonials = [
  {
    name: "Mariana Souza",
    role: "Dev .NET",
    quote: "A mentoria me deu ritmo, código revisado e projetos reais para mostrar na entrevista.",
  },
  {
    name: "Rafael Alves",
    role: "Estudante Fatec",
    quote: "Os copilotos de IA + mentores encurtaram o caminho. Subi PR na segunda semana.",
  },
];

const Mentoria = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#060111] via-[#0b0720] to-background text-white">
      <SEO title="Mentoria AI-First - 4uCode" description="Transforme sua carreira com a mentoria AI-First da 4uCode." />
      <Header />
      <main className="container space-y-16 px-4 pb-16 pt-20 md:space-y-24 md:pt-28">
        <header className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
              Mentoria AI-First
            </p>
            <h1 className="font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
              Transforme sua carreira com a nossa Mentoria AI-First
            </h1>
            <p className="text-lg text-white/75">
              Mentoria personalizada com inteligência artificial, construída para devs que buscam evolução acelerada e portfólio sólido.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {stats.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
                  <p className="text-xl font-semibold text-white">{item.value}</p>
                  <p className="text-white/60">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                className="rounded-full bg-gradient-to-r from-primary via-primary-600 to-primary-700 text-white shadow-[0_18px_40px_rgba(78,34,164,0.55)]"
                onClick={() => (window.location.href = "/contato")}
              >
                Começar minha jornada
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-full border-white/25 bg-white/5 text-white hover:bg-white/10">
                Ver cronograma
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
                <BotMessageSquare className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-white/60">IA copiloto</p>
                <p className="text-lg font-semibold text-white">Feedback em tempo real</p>
              </div>
            </div>
            <p className="text-white/70">
              Copilotos treinados na nossa stack analisam seu código, sugerem testes e guiam a próxima entrega. Mentores humanos entram para revisar decisões críticas.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/5 p-4">
                <div className="text-sm text-white/60">Stack foco</div>
                <div className="text-lg font-semibold text-white">C# / .NET</div>
              </div>
              <div className="rounded-2xl bg-white/5 p-4">
                <div className="text-sm text-white/60">Duração média</div>
                <div className="text-lg font-semibold text-white">4-6 semanas</div>
              </div>
              <div className="rounded-2xl bg-white/5 p-4">
                <div className="text-sm text-white/60">Formato</div>
                <div className="text-lg font-semibold text-white">Sprints + reviews</div>
              </div>
            </div>
          </motion.div>
        </header>

        <RevealSection>
          <section className="grid gap-8 lg:grid-cols-3">
            <Card className="border-white/10 bg-white/5 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  Trilhas guiadas
                </CardTitle>
                <CardDescription className="text-white/70">
                  Roteiros semanais, checkpoints e desafios que conectam teoria à prática.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-white/70">Front, back e IA-first com entregas claras e code review.</CardContent>
            </Card>
            <Card className="border-white/10 bg-white/5 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <LineChart className="h-5 w-5 text-primary" />
                  Gráficos de evolução
                </CardTitle>
                <CardDescription className="text-white/70">
                  Visualize como seu nível de habilidade cresce a cada sprint concluída.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-white/70">Pontuação dinâmica em hard e soft skills acompanhada por mentores.</CardContent>
            </Card>
            <Card className="border-white/10 bg-white/5 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  Comunidade ativa
                </CardTitle>
                <CardDescription className="text-white/70">
                  Pods no Discord, squads semanais e desafios relâmpago para manter ritmo.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-white/70">Networking real e cobranças saudáveis para não deixar você parar.</CardContent>
            </Card>
          </section>
        </RevealSection>

        <RevealSection>
          <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Benefícios imediatos</h2>
              <ul className="space-y-3 text-white/80">
                {benefits.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Sparkles className="mt-1 h-4 w-4 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="rounded-2xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-white/80">
                <strong className="text-white">Dica:</strong> role para ver os depoimentos e visualize a evolução animada dos alunos.
              </div>
            </div>
            <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-semibold">Depoimentos</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {testimonials.map((item) => (
                  <div key={item.name} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
                    <p className="text-white">“{item.quote}”</p>
                    <p className="mt-3 text-xs uppercase tracking-[0.24em] text-white/60">
                      {item.name} • {item.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </RevealSection>

        <RevealSection>
          <section className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/60">Próxima turma</p>
                <h3 className="text-2xl font-semibold">Alpha 220 • 12 vagas restantes</h3>
              </div>
              <Button
                className="rounded-full bg-gradient-to-r from-primary via-primary-600 to-primary-700 text-white shadow-[0_18px_40px_rgba(78,34,164,0.55)]"
                onClick={() => (window.location.href = "/contato")}
              >
                Entrar agora
              </Button>
            </div>
          </section>
        </RevealSection>
      </main>
    </div>
  );
};

export default Mentoria;
