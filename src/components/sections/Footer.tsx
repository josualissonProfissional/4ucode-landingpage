import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  Flame,
  Globe,
  HelpCircle,
  Home,
  Instagram,
  Mail,
  Phone,
  Sparkles,
  Ticket,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { hoverGlow, inViewUp } from "@/lib/motion-presets";

export const Footer = () => {
  return (
    <footer data-reveal-stagger="150" className="border-t border-white/10 bg-gradient-to-b from-[#140433] via-[#0b021d] to-[#050111] text-white">
      <div className="container px-4 py-20 md:px-6">
        <div className="mx-auto grid max-w-6xl gap-10 md:gap-14 md:grid-cols-3">
          <motion.div
            className="space-y-6 rounded-3xl border border-white/10 bg-white/5 px-7 py-10 backdrop-blur-sm shadow-[0_18px_45px_rgba(14,4,40,0.35)]"
            {...inViewUp(0)}
          >
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-white">
              <Globe className="h-4 w-4 text-primary" />
              Menu rápido
            </h3>
            <ul className="space-y-2 text-sm text-white/70 md:space-y-3">
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-primary">
                  <Home className="h-4 w-4" />
                </span>
                <a href="#hero" className="font-medium transition-colors hover:text-white">
                  Início
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-primary">
                  <Users className="h-4 w-4" />
                </span>
                <a href="#jornada" className="font-medium transition-colors hover:text-white">
                  Jornada
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-primary">
                  <Sparkles className="h-4 w-4" />
                </span>
                <a href="#beneficios" className="font-medium transition-colors hover:text-white">
                  Conquistas
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-primary">
                  <CalendarDays className="h-4 w-4" />
                </span>
                <a href="#depoimentos" className="font-medium transition-colors hover:text-white">
                  Depoimentos
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-primary">
                  <HelpCircle className="h-4 w-4" />
                </span>
                <a href="#faq" className="font-medium transition-colors hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="space-y-6 rounded-3xl border border-white/10 bg-white/5 px-7 py-10 backdrop-blur-sm shadow-[0_18px_45px_rgba(14,4,40,0.35)]"
            {...inViewUp(0.12)}
          >
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-white">
              <Ticket className="h-4 w-4 text-primary" />
              Inscrições
            </h3>
            <p className="text-sm text-white/70">
              Vagas limitadas para a próxima turma Alpha 220 da 4uCode.
              <br />
            </p>
            <motion.div {...hoverGlow} className="inline-flex md:w-auto">
              <Button
                asChild
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary via-primary-600 to-primary-700 px-8 py-5 text-sm font-semibold text-white shadow-[0_18px_38px_rgba(84,33,168,0.55)] transition md:w-max md:justify-start"
              >
                <a href="/contato">
                  <Flame className="h-4 w-4 transition group-hover:scale-110" />
                  Quero participar
                </a>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="space-y-6 rounded-3xl border border-white/10 bg-white/5 px-7 py-10 text-left backdrop-blur-sm shadow-[0_18px_45px_rgba(14,4,40,0.35)]"
            {...inViewUp(0.2)}
          >
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-white">
              <Mail className="h-4 w-4 text-primary" />
              Contatos
            </h3>
            <div className="space-y-3 text-sm text-white/70">
              <a
                href="https://www.instagram.com/4ucoders?igsh=MWtwdGQ4Z3dxczMwcQ=="
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 font-medium text-primary transition hover:text-white"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-primary">
                  <Instagram className="h-4 w-4" />
                </span>
                @4ucode
              </a>
              <a
                href="mailto:contato@4ucode.com.br"
                className="inline-flex items-center gap-3 font-medium transition hover:text-white"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-primary">
                  <Mail className="h-4 w-4" />
                </span>
                contato@4ucode.com.br
              </a>
              <a
                href="https://wa.me/5511991060282"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 font-medium transition hover:text-white"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-primary">
                  <Phone className="h-4 w-4" />
                </span>
                +55 11 99106-0282
              </a>
            </div>
            <p className="text-xs text-white/50">
              © 2025 4uCode. Todos os direitos reservados.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};
