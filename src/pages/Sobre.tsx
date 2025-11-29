import { motion } from "framer-motion";
import { ArrowRight, HeartHandshake, Sparkles, Users, Waypoints } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/sections/Header";
import { RevealSection } from "@/components/RevealSection";
import { SEO } from "@/components/SEO";

const values = [
  { title: "IA-first de verdade", desc: "Decisões guiadas por dados e copilotos em todos os processos.", icon: Sparkles },
  { title: "Gente no centro", desc: "Mentores presentes, feedback humano e comunidade ativa.", icon: Users },
  { title: "Entrega ou nada", desc: "Foco em resultados reais, cases e empregabilidade.", icon: HeartHandshake },
];

const team = [
  { name: "Eduardo Pires", role: "Arquiteto .NET e Mentor", focus: "Cloud, APIs e boas práticas" },
  { name: "Balta", role: "Tech Advisor", focus: "Arquitetura e produtividade" },
  { name: "Squad Mentores", role: "Engenharia & IA", focus: "Code review, IA aplicada e carreira" },
];

const Sobre = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#060111] via-[#0b0720] to-background text-white">
      <SEO title="Sobre Nós - 4uCode" description="Saiba mais sobre a história, missão e time da 4uCode." />
      <Header />
      <main className="container space-y-16 px-4 pb-16 pt-20 md:space-y-24 md:pt-28">
        <header className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
              Sobre nós
            </p>
            <h1 className="font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
              Nossa História, Nossa Missão
            </h1>
            <p className="text-lg text-white/75">
              Transformar desenvolvedores em líderes de IA com projetos reais, comunidade vibrante e uma cultura de entrega.
            </p>
            <Button
              size="lg"
              className="rounded-full bg-gradient-to-r from-primary via-primary-600 to-primary-700 text-white shadow-[0_18px_40px_rgba(78,34,164,0.55)]"
              onClick={() => (window.location.href = "/contato")}
            >
              Falar com a gente
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_28px_70px_rgba(13,3,35,0.65)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <Waypoints className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-white/60">Cultura</p>
                <p className="text-lg font-semibold text-white">AI-first, humana e colaborativa</p>
              </div>
            </div>
            <p className="text-white/70">
              Começamos como um grupo de mentoria e evoluímos para uma comunidade que lança produtos, treina squads e conecta talentos ao mercado.
            </p>
          </motion.div>
        </header>

        <RevealSection>
          <section className="grid gap-6 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <Card key={value.title} className="border-white/10 bg-white/5 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-primary" />
                      {value.title}
                    </CardTitle>
                    <CardDescription className="text-white/70">{value.desc}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-white/70">
                    Vivemos o que ensinamos: ferramentas, processos e ritmo de entrega aplicado.
                  </CardContent>
                </Card>
              );
            })}
          </section>
        </RevealSection>

        <RevealSection>
          <section className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white">
            <h3 className="text-2xl font-semibold">Conheça o time</h3>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {team.map((member) => (
                <div key={member.name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-lg font-semibold text-white">{member.name}</p>
                  <p className="text-sm text-white/60">{member.role}</p>
                  <p className="mt-2 text-sm text-white/75">{member.focus}</p>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>
      </main>
    </div>
  );
};

export default Sobre;
