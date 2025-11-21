import { memo, useMemo } from "react";
import Lottie from "lottie-react";
import heroPulse from "@/assets/lottie/hero-pulse.json";

interface HeroVisualProps {
  accentColor?: string;
  className?: string;
}

const HeroVisualComponent = ({ accentColor = "#8a3ffc", className }: HeroVisualProps) => {
  const animationData = useMemo(() => heroPulse, []);

  return (
    <div
      className={`relative flex items-center justify-center rounded-[32px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_25px_70px_rgba(38,0,85,0.4)] backdrop-blur-lg ${className ?? ""}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_top,_rgba(138,63,252,0.35),_transparent_65%)]" />
      <div className="relative mx-auto h-40 w-40 sm:h-56 sm:w-56">
        <Lottie
          animationData={animationData}
          loop
          autoplay
          style={{ width: "100%", height: "100%" }}
          rendererSettings={{
            preserveAspectRatio: "xMidYMid slice",
          }}
        />
        <div
          className="pointer-events-none absolute inset-6 rounded-full border-2 border-dashed opacity-40"
          style={{ borderColor: accentColor }}
        />
      </div>
    </div>
  );
};

export const HeroVisual = memo(HeroVisualComponent);

export default HeroVisual;
