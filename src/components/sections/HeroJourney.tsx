import { motion } from "framer-motion";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { LucideIcon, Users, Trophy, Sparkles, Shield, Zap, Infinity, Cpu } from "lucide-react";
import fatecLogo from "@/assets/partners/fatec.png";
import uspLogo from "@/assets/partners/usp.png";
import ifspLogo from "@/assets/partners/ifsp.png";
import { hoverLift, hoverGlow, floatLoop } from "@/lib/motion-presets";

const partners = [
  {
    name: "Fatec",
    logo: fatecLogo,
    label: "Faculdade de Tecnologia de São Paulo",
    tooltip: "Laboratórios de inovação, banca de mentores e revisão técnica semanal.",
    bullets: ["Labs presenciais", "Mentores convidados", "Projetos enterprise"],
  },
  {
    name: "USP",
    logo: uspLogo,
    label: "Universidade de São Paulo",
    tooltip: "Conteúdo acadêmico conectado com IA aplicada ao mercado brasileiro.",
    bullets: ["Pesquisa aplicada", "Talks trimestrais", "Acesso a hubs"],
  },
  {
    name: "IFSP",
    logo: ifspLogo,
    label: "Instituto Federal de São Paulo",
    tooltip: "Foco em inclusão, bolsas e projetos sociais usando tecnologia.",
    bullets: ["Programas sociais", "Mentoria carreira", "Talentos para gov/edu"],
  },
];

const ecosystemBullets: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: Users, title: "Comunidade ativa", description: "Mentores e alumni disponíveis diariamente" },
  { icon: Trophy, title: "Projetos validados", description: "Cases construídos com as instituições" },
  { icon: Sparkles, title: "IA em tudo", description: "Ferramentas próprias para revisar e acelerar seu código" },
  { icon: Shield, title: "Segurança e ética", description: "Política de IA responsável aplicada em todas as trilhas" },
  { icon: Zap, title: "Hubs de emprego", description: "Parcerias com empresas e squads contratando" },
  { icon: Infinity, title: "Ciclo contínuo", description: "Aprenda, aplique, mentorize e receba badges" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const HeroJourney = () => {
  return (
    <section
      id="parcerias"
      className="relative overflow-hidden bg-gradient-to-b from-background via-[#070017] to-bg-elevated py-20 sm:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(96,61,255,0.15),_transparent_55%)]" />
      <div className="container relative z-10 space-y-12 px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="mx-auto max-w-3xl text-center space-y-4"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70"
          >
            <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
            Nossas parcerias
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Ecossistema validado por quem puxa a tecnologia no Brasil
          </motion.h2>
          <motion.p variants={fadeUp} className="text-base text-white/70 sm:text-lg">
            Conectamos Fatec, USP e IFSP para garantir conteúdo atualizado, desafios reais e acesso a laboratórios,
            bolsas e hubs de empregabilidade focados em IA.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 md:grid-cols-3"
        >
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              variants={fadeUp}
              custom={index}
              className="group relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-white/5 via-transparent to-transparent p-6 shadow-[0_20px_60px_rgba(23,0,55,0.4)] backdrop-blur"
              {...hoverLift}
            >
              <div className="flex items-center gap-4">
                <motion.div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 p-3"
                  {...floatLoop(4, 8)}
                >
                  <img src={partner.logo} alt={`Logo da ${partner.label}`} loading="lazy" className="object-contain" />
                </motion.div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">{partner.name}</p>
                  <p className="text-sm font-semibold text-white">{partner.label}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-left">
                {partner.bullets.map((item) => (
                  <p key={item} className="flex items-center gap-2 text-sm text-white/70">
                    <Cpu className="h-3.5 w-3.5 text-primary/70" />
                    {item}
                  </p>
                ))}
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <motion.button
                    className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:border-primary/50 hover:bg-primary/10"
                    {...hoverGlow}
                  >
                    Por que importa?
                    <ChevronRightMini />
                  </motion.button>
                </PopoverTrigger>
                <PopoverContent className="max-w-sm border-white/10 bg-background/95 text-sm text-muted-foreground">
                  {partner.tooltip}
                </PopoverContent>
              </Popover>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-4 rounded-[32px] border border-white/10 bg-white/[0.02] p-6 text-white/80 backdrop-blur sm:grid-cols-2 lg:grid-cols-3"
        >
          {ecosystemBullets.map((item, index) => (
            <motion.div key={item.title} variants={fadeUp} custom={index} className="flex gap-3" {...hoverLift}>
              <item.icon className="mt-1 h-5 w-5 text-primary/80" />
              <div>
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="text-xs text-white/60">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ChevronRightMini = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M3 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
