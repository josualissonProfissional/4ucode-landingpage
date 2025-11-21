import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Lottie from "lottie-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Shield, Users, Zap } from "lucide-react";
import heroPulse from "@/assets/lottie/hero-pulse.json";
import { hoverGlow } from "@/lib/motion-presets";

const ctaSchema = z.object({
  email: z
    .string({ required_error: "Digite um e-mail válido" })
    .trim()
    .min(1, "O e-mail é obrigatório")
    .email("Formato de e-mail inválido"),
});

type CTAForm = z.infer<typeof ctaSchema>;

const trustSignals = [
  {
    icon: Shield,
    title: "100% gratuito",
    description: "Sem upsell escondido ou cartão de crédito.",
  },
  {
    icon: Users,
    title: "Mentoria real",
    description: "Mentores e IA trabalhando juntos por você.",
  },
  {
    icon: Zap,
    title: "Primeiro desafio hoje",
    description: "Receba um case guiado em minutos.",
  },
];

export const CTA = () => {
  const [isSending, setIsSending] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CTAForm>({
    mode: "onChange",
    resolver: zodResolver(ctaSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: CTAForm) => {
    setIsSending(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSending(false);
    window.localStorage.setItem("cta_email", data.email);
    window.location.href = "/cadastro";
  };

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-[#0c0125] via-[#160235] to-[#060015] py-20 md:py-28"
      id="cta"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(138,63,252,0.28),_transparent_65%)]" />
      <div className="container relative z-10 px-4 sm:px-6">
        <header className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
              Sprint Alpha
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.8, 0.25, 1], delay: 0.1 }}
            className="mt-6 font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl"
          >
            Pronto para não desistir mais?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.8, 0.25, 1], delay: 0.18 }}
            className="mt-4 text-base text-white/70 sm:text-lg"
          >
            Cadastre-se e receba o primeiro desafio guiado, acesso ao Discord e uma call para destravar sua trilha.
          </motion.p>
        </header>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1], delay: 0.24 }}
          className="mx-auto mt-10 flex max-w-2xl flex-col gap-4 sm:flex-row sm:items-start"
          noValidate
        >
          <div className="relative flex-1">
            <Input
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="seu@email.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "cta-email-error" : undefined}
              className="h-14 rounded-full border-white/15 bg-white/95 px-6 text-base text-black placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-primary sm:text-lg"
              {...register("email")}
            />
            <Lottie
              animationData={heroPulse}
              loop
              autoplay
              className="pointer-events-none absolute -right-4 -top-4 h-14 w-14 sm:h-16 sm:w-16"
              style={{ opacity: 0.75 }}
            />
            {errors.email && (
              <span id="cta-email-error" className="absolute -bottom-6 block text-xs font-medium text-amber-300">
                {errors.email.message}
              </span>
            )}
          </div>

          <motion.div {...hoverGlow}>
            <Button
              type="submit"
              size="lg"
              aria-live="polite"
              disabled={!isValid || isSubmitting || isSending}
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary via-primary-600 to-primary-700 px-8 text-base font-semibold text-white shadow-[0_18px_40px_rgba(78,34,164,0.55)] transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 md:min-w-[14rem]"
            >
              {isSending ? "Carregando..." : "Entrar agora"}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Button>
          </motion.div>
        </motion.form>
        <p className="mt-3 text-center text-xs text-white/50">Zero spam. Cancelamento com um clique sempre disponível.</p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
          }}
          className="mx-auto mt-14 grid max-w-3xl gap-5 sm:grid-cols-3"
        >
          {trustSignals.map((item, index) => (
            <motion.div
              key={item.title}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-white/80 backdrop-blur"
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <motion.span
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-primary"
                animate={{ rotate: [0, -6, 6, 0] }}
                transition={{ duration: 8 + index, repeat: Infinity, ease: "easeInOut" }}
              >
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </motion.span>
              <div className="text-sm">
                <p className="font-semibold text-white">{item.title}</p>
                <p className="text-white/60">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
