import {
  ElementType,
  ReactNode,
  ComponentPropsWithoutRef,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { cn } from "@/lib/utils";
import { motion, useAnimationControls } from "framer-motion";

type RevealSectionProps<T extends ElementType> = {
  as?: T;
  stagger?: number;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export const RevealSection = <T extends ElementType = "section">({
  as,
  stagger = 220,
  children,
  className,
  ...rest
}: RevealSectionProps<T>) => {
  const Component = (as ?? "section") as ElementType;
  const controls = useAnimationControls();
  const motionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = motionRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      controls.start("visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            controls.start("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "-120px 0px", threshold: 0.15 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [controls]);

  const variants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: 70,
        scale: 0.94,
        filter: "blur(12px)",
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
          duration: 1.15,
          ease: [0.22, 1, 0.36, 1],
          delay: (stagger ?? 220) / 1000,
        },
      },
    }),
    [stagger],
  );

  return (
    <Component className={cn("relative", className)} {...rest}>
      <motion.div ref={motionRef} variants={variants} initial="hidden" animate={controls}>
        {children}
      </motion.div>
    </Component>
  );
};
