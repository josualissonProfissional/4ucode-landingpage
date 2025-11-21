import { ReactNode, useEffect } from "react";
import { MotionConfig, LazyMotion, domAnimation } from "framer-motion";
import Lenis from "@studio-freight/lenis";

interface MotionProviderProps {
  children: ReactNode;
}

export const MotionProvider = ({ children }: MotionProviderProps) => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });

    let frame: number;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return (
    <MotionConfig transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} reducedMotion="user">
      <LazyMotion features={domAnimation}>{children}</LazyMotion>
    </MotionConfig>
  );
};

export default MotionProvider;
