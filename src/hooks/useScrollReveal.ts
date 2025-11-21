import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

interface ScrollRevealOptions {
  selectors?: string[];
  threshold?: number;
  rootMargin?: string;
  stagger?: number;
}

const DEFAULT_SELECTORS = ["[data-scroll-reveal]"];

const prepareElement = (element: HTMLElement) => {
  if (!element.classList.contains("reveal-section")) {
    element.classList.add("reveal-section");
  }

  if (element.dataset.scrollRevealInit !== "true") {
    element.dataset.scrollRevealInit = "true";
  }

  element.style.willChange = "opacity, transform, filter";
};

export const useScrollReveal = (options: ScrollRevealOptions = {}) => {
  const location = useLocation();
  const cleanupRef = useRef<() => void>();

  const {
    selectors = DEFAULT_SELECTORS,
    threshold = 0.15,
    rootMargin = "0px 0px -15%",
    stagger = 150,
  } = options;

  const selectorsKey = selectors.join(",");

  useEffect(() => {
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = undefined;
    }

    const timer = window.setTimeout(() => {
      const elements = Array.from(
        new Set(
          selectors.flatMap((selector) =>
            Array.from(document.querySelectorAll<HTMLElement>(selector))
          )
        )
      ).filter(
        (element) =>
          element.dataset.skipReveal !== "true" &&
          element.getAttribute("aria-hidden") !== "true"
      );

      if (!elements.length) {
        return;
      }

      if (!("IntersectionObserver" in window)) {
        elements.forEach((element, index) => {
          prepareElement(element);
          const customStagger = element.dataset.revealStagger
            ? Number(element.dataset.revealStagger)
            : undefined;
          const delay = Math.max(
            0,
            (typeof customStagger === "number" && !Number.isNaN(customStagger) ? customStagger : stagger) *
              index,
          );
          window.setTimeout(() => {
            element.classList.add("is-visible");
            element.style.willChange = "auto";
          }, delay);
        });
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            const element = entry.target as HTMLElement;
            const customStagger = element.dataset.revealStagger
              ? Number(element.dataset.revealStagger)
              : undefined;
            const customOrder = element.dataset.revealOrder
              ? Number(element.dataset.revealOrder)
              : undefined;

            const effectiveStagger =
              typeof customStagger === "number" && !Number.isNaN(customStagger)
                ? customStagger
                : stagger;

            const order =
              typeof customOrder === "number" && !Number.isNaN(customOrder)
                ? customOrder
                : elements.indexOf(element);

            const delay = Math.max(0, order) * Math.max(0, effectiveStagger);

            window.setTimeout(() => {
              element.classList.add("is-visible");
              element.addEventListener(
                "transitionend",
                () => {
                  element.style.willChange = "auto";
                },
                { once: true }
              );
            }, delay);

            observer.unobserve(element);
          });
        },
        { threshold, rootMargin }
      );

      elements.forEach((element) => {
        if (element.classList.contains("is-visible")) {
          element.style.willChange = "auto";
          return;
        }

        prepareElement(element);

        const rect = element.getBoundingClientRect();
        const isAlreadyVisible =
          rect.top <= window.innerHeight * 0.9 &&
          rect.bottom >= window.innerHeight * -0.2;

        if (isAlreadyVisible) {
          requestAnimationFrame(() => {
            element.classList.add("is-visible");
            element.style.willChange = "auto";
          });
        } else {
          observer.observe(element);
        }
      });

      cleanupRef.current = () => {
        observer.disconnect();
      };
    }, 80);

    return () => {
      window.clearTimeout(timer);
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = undefined;
      }
    };
  }, [location.pathname, selectorsKey, threshold, rootMargin, stagger]);
};
