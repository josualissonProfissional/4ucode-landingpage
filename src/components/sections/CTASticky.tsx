import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { usePersonalization } from "@/hooks/usePersonalization";

export const CTASticky = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { ctaLabel } = usePersonalization();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 260);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="animate-fade-in fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <Button
        className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary via-primary-600 to-primary-700 py-4 text-base font-semibold text-white shadow-[0_18px_40px_rgba(78,34,164,0.55)] transition-transform duration-300 hover:scale-105 active:scale-95"
        onClick={() => (window.location.href = "/cadastro")}
        aria-label={ctaLabel}
      >
        {ctaLabel}
        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </Button>
    </div>
  );
};
