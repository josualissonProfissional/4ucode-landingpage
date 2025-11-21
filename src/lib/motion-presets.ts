import type { MotionProps } from "framer-motion";

/**
 * Motion utility helpers to keep animations consistent across the landing page.
 * They rely only on framer-motion (already part of the project).
 */

const baseEase = [0.22, 1, 0.36, 1] as const;

export const inViewUp = (delay = 0, distance = 48): MotionProps => ({
  initial: { opacity: 0, y: distance, filter: "blur(12px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.85, delay, ease: baseEase },
});

export const inViewScale = (delay = 0): MotionProps => ({
  initial: { opacity: 0, scale: 0.94 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.9, delay, ease: baseEase },
});

export const floatLoop = (offset = 12, duration = 6): MotionProps => ({
  animate: { y: [0, -offset, 0], rotate: [0, 0.4, -0.2, 0] },
  transition: {
    duration,
    repeat: Infinity,
    repeatType: "mirror",
    ease: "easeInOut",
  },
});

export const glowPulse: MotionProps = {
  animate: {
    boxShadow: [
      "0 0 40px rgba(124, 92, 255, 0.25)",
      "0 0 60px rgba(124, 92, 255, 0.35)",
      "0 0 40px rgba(124, 92, 255, 0.25)",
    ],
  },
  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
};

export const hoverLift: MotionProps = {
  whileHover: {
    y: -8,
    scale: 1.02,
    rotateX: -0.6,
    rotateY: 0.4,
  },
  whileTap: { scale: 0.98 },
};

export const hoverGlow: MotionProps = {
  whileHover: {
    scale: 1.03,
    boxShadow: "0 25px 60px rgba(93, 64, 224, 0.35)",
  },
  whileTap: { scale: 0.97 },
  transition: { type: "spring", stiffness: 210, damping: 20 },
};
