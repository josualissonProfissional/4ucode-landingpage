import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShieldCheck, Sparkles, X, Home, BotMessageSquare, Factory, Presentation, Briefcase, UsersRound, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { floatLoop, hoverGlow, hoverLift } from "@/lib/motion-presets";
import { useLocation, useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Home", path: "/", icon: Home },
  { label: "Mentoria AI-First", path: "/mentoria", icon: BotMessageSquare },
  { label: "Fábrica de Software", path: "/fabrica", icon: Factory },
  { label: "Consultoria & Treinamento", path: "/consultoria", icon: Presentation },
  { label: "Projetos Reais", path: "/projetos", icon: Briefcase },
  { label: "Sobre Nós", path: "/sobre", icon: UsersRound },
  { label: "Contato", path: "/contato", icon: MessageSquare },
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navContent = useMemo(() => {
    const activePath = location.pathname;
    return NAV_ITEMS.map((item, index) => {
      const isActive = activePath === item.path;
      const Icon = item.icon;
      return (
        <motion.button
          key={item.path}
          {...hoverLift}
          className={cn(
            "relative px-2.5 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.26em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            isActive ? "text-white" : "text-white/70 hover:text-white",
          )}
          onClick={() => {
            setOpen(false);
            navigate(item.path);
          }}
          onMouseEnter={() => setHoveredId(item.path)}
          onMouseLeave={() => setHoveredId(null)}
          onFocus={() => setHoveredId(item.path)}
          onBlur={() => setHoveredId(null)}
        >
          {isActive && (
            <motion.span
              layoutId="nav-active"
              className="absolute inset-0 rounded-full bg-white/10"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <motion.span
            className="pointer-events-none absolute left-3 right-3 -bottom-0.5 h-[1px] rounded-full bg-white/15"
            animate={{ opacity: [0.2, 0.5, 0.2], scaleX: [0.8, 1, 0.8] }}
            transition={{ duration: 3.2, repeat: Infinity, delay: index * 0.18 }}
            style={{ transformOrigin: "center" }}
          />
          <AnimatePresence>
            {(hoveredId === item.path || isActive) && (
              <motion.span
                key={`${item.path}-underline`}
                layoutId="nav-underline"
                className="pointer-events-none absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-primary via-fuchsia-400 to-primary"
                initial={{ scaleX: 0.2, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                exit={{ scaleX: 0.2, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "center" }}
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {hoveredId === item.path && (
              <motion.span
                key={`${item.path}-spark`}
                className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.span
                  className="absolute inset-y-1 left-[-40%] w-1/2 skew-x-[30deg] bg-gradient-to-r from-transparent via-white/60 to-transparent"
                  initial={{ x: -25 }}
                  animate={{ x: 80 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.span>
            )}
          </AnimatePresence>
          <span className="relative inline-flex items-center gap-2">
            <Icon className="h-4 w-4" aria-hidden="true" />
            {item.label}
          </span>
        </motion.button>
      );
    });
  }, [hoveredId, location.pathname, navigate]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background/90 shadow-[0_12px_35px_rgba(6,3,18,0.55)] backdrop-blur-2xl"
          : "bg-transparent backdrop-blur-none",
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <a href="/" className="group flex items-center gap-3">
          <motion.div
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 via-primary to-primary-700 text-xl font-bold text-white shadow-[0_8px_30px_rgba(88,36,168,0.45)] transition-transform group-hover:scale-105"
            {...floatLoop(6, 7)}
          >
            4u
          </motion.div>
          <div className="leading-tight">
            <p className="font-display text-lg font-semibold text-white">4uCode</p>
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">ai-first</p>
          </div>
        </a>

        <motion.nav
          className="hidden items-center gap-1 rounded-full border border-white/10 bg-black/30 px-3 py-1 shadow-[0_12px_25px_rgba(5,2,12,0.45)] md:flex"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {navContent}
        </motion.nav>

        <div className="hidden items-center gap-3 md:flex">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            Turma Alpha 220
          </div>
          <motion.div {...hoverGlow}>
            <Button
              size="sm"
              className="rounded-full border border-white/20 bg-white/90 px-6 text-sm font-semibold text-background transition hover:bg-white"
              onClick={() => (window.location.href = "/cadastro")}
            >
              Quero entrar na mentoria
            </Button>
          </motion.div>
        </div>

        <button
          className="md:hidden rounded-full border border-white/15 p-2 text-white transition hover:border-white/40"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Abrir navegação"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{ duration: 0.25 }}
              >
                <X className="h-6 w-6" />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{ duration: 0.25 }}
              >
                <Menu className="h-6 w-6" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="md:hidden"
          >
            <div className="mx-4 rounded-3xl border border-white/10 bg-background/90 p-4 shadow-2xl backdrop-blur-xl">
              <div className="flex flex-col gap-1">{navContent}</div>
              <div className="mt-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Mais de 800 devs ativos e mentorias semanais
              </div>
              <motion.div {...hoverGlow}>
                <Button
                  className="mt-4 w-full rounded-full border border-white/15 bg-gradient-to-r from-primary via-primary-600 to-primary-700 text-sm font-semibold text-white shadow-[0_12px_45px_rgba(88,36,168,0.45)]"
                  onClick={() => (window.location.href = "/cadastro")}
                >
                  Quero entrar na mentoria
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
