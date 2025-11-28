import { motion } from "framer-motion";
import { ArrowRight, Mail, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SEO } from "@/components/SEO";

const Contato = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#060111] via-[#0b0720] to-background text-white">
      <SEO title="Contato - 4uCode" description="Fale conosco sobre mentoria, consultoria ou parcerias." />
      <main className="container space-y-16 px-4 pb-16 pt-20 md:space-y-24 md:pt-28">
        <header className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
              Contato
            </p>
            <h1 className="font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
              Fale conosco para mentoria, consultoria ou parceria
            </h1>
            <p className="text-lg text-white/75">
              Escolha o melhor canal: WhatsApp, e-mail ou agende uma call. Respondemos rápido para destravar seu próximo passo.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                className="rounded-full bg-gradient-to-r from-primary via-primary-600 to-primary-700 text-white shadow-[0_18px_40px_rgba(78,34,164,0.55)]"
                onClick={() => (window.location.href = "https://wa.me/5511999999999")}
              >
                Falar no WhatsApp
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-full border-white/25 bg-white/5 text-white hover:bg-white/10">
                Agendar call
              </Button>
            </div>
          </div>
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_28px_70px_rgba(13,3,35,0.65)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <form className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome</Label>
                <Input id="nome" placeholder="Seu nome" className="mt-1 border-white/15 bg-white/5 text-white" />
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="seu@email.com" className="mt-1 border-white/15 bg-white/5 text-white" />
              </div>
              <div>
                <Label htmlFor="mensagem">Mensagem</Label>
                <Textarea
                  id="mensagem"
                  placeholder="Conte sobre mentoria, consultoria ou projeto"
                  className="mt-1 min-h-[120px] border-white/15 bg-white/5 text-white"
                />
              </div>
              <Button className="w-full rounded-full bg-gradient-to-r from-primary via-primary-600 to-primary-700 text-white shadow-[0_18px_40px_rgba(78,34,164,0.55)]">
                Enviar mensagem
              </Button>
              <p className="text-xs text-white/60">Respondemos em poucas horas úteis.</p>
            </form>
          </motion.div>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          <Card className="border-white/10 bg-white/5 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 text-primary" />
                WhatsApp
              </CardTitle>
              <CardDescription className="text-white/70">Suporte rápido e humano.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-white/80">+55 (11) 99999-9999</CardContent>
          </Card>
          <Card className="border-white/10 bg-white/5 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                E-mail
              </CardTitle>
              <CardDescription className="text-white/70">Envie detalhes do seu projeto ou dúvida.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-white/80">contato@4ucode.com</CardContent>
          </Card>
          <Card className="border-white/10 bg-white/5 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                Call agendada
              </CardTitle>
              <CardDescription className="text-white/70">Escolha um horário e converse com a gente.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-white/80">Agenda disponível em até 48h.</CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Contato;
