import { useEffect, useMemo, useState } from "react";

interface UseScrollSpyOptions extends IntersectionObserverInit {
  ids: string[];
}

export const useScrollSpy = ({ ids, rootMargin = "-55% 0px -40% 0px", threshold = 0 }: UseScrollSpyOptions) => {
  const [activeId, setActiveId] = useState<string>(ids[0] ?? "");

  const elements = useMemo(() => ids.map((id) => document.getElementById(id)).filter(Boolean), [ids]);

  useEffect(() => {
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin, threshold },
    );

    elements.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, [elements, rootMargin, threshold]);

  return activeId;
};

export default useScrollSpy;
