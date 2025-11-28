import { useMemo } from "react";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { HeroJourney } from "@/components/sections/HeroJourney";
import { Problems } from "@/components/sections/Problems";
import { JourneySteps } from "@/components/sections/JourneySteps";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { IAFirst } from "@/components/sections/IAFirst";
import { Culture } from "@/components/sections/Culture";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";
import { CTASticky } from "@/components/sections/CTASticky";
import { SEO } from "@/components/SEO";
import { RevealSection } from "@/components/RevealSection";
import { usePersonalization } from "@/hooks/usePersonalization";

const Index = () => {
  const { primarySectionOrder } = usePersonalization();

  const orderedSections = useMemo(() => {
    const registry: Record<string, JSX.Element> = {
      parcerias: (
        <RevealSection key="parcerias" stagger={200}>
          <HeroJourney />
        </RevealSection>
      ),
      beneficios: (
        <RevealSection key="beneficios" stagger={220}>
          <Problems />
        </RevealSection>
      ),
      jornada: (
        <RevealSection key="jornada" stagger={220}>
          <JourneySteps />
        </RevealSection>
      ),
      "ia-first": (
        <RevealSection id="ia-first" key="ia-first" stagger={240}>
          <IAFirst />
        </RevealSection>
      ),
      cultura: (
        <RevealSection key="cultura" stagger={240}>
          <Culture />
        </RevealSection>
      ),
      cta: (
        <RevealSection key="cta" stagger={260}>
          <CTA />
        </RevealSection>
      ),
    };

    const DEFAULT_SEQUENCE = ["parcerias", "beneficios", "jornada", "ia-first", "cultura", "cta"];
    const uniqueKeys = Array.from(new Set([...primarySectionOrder, ...DEFAULT_SEQUENCE]));
    return uniqueKeys.map((key) => registry[key]).filter(Boolean);
  }, [primarySectionOrder]);

  return (
    <div className="min-h-screen">
      <SEO />
      <a href="#main" className="skip-to-content">
        Pular para conteúdo
      </a>
      <Header />
      <main id="main">
        <Hero />
        {orderedSections}
        <RevealSection stagger={240}>
          <TestimonialsCarousel />
        </RevealSection>
        <FAQ />
      </main>
      <Footer />
      <CTASticky />
    </div>
  );
};

export default Index;
