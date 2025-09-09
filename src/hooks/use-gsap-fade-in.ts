"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

interface UseGsapFadeInOptions {
  y?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
}

export function useGsapFadeIn({
  y = 24,
  duration = 0.8,
  delay = 0,
  stagger = 0,
}: UseGsapFadeInOptions = {}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (!ref.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (stagger > 0) {
        gsap.from(ref.current!.children, {
          opacity: 0,
          y,
          duration,
          delay,
          stagger,
          ease: "power2.out",
        });
      } else {
        gsap.from(ref.current, {
          opacity: 0,
          y,
          duration,
          delay,
          ease: "power2.out",
        });
      }
    });

    return () => ctx.revert();
  }, [y, duration, delay, stagger, prefersReducedMotion]);

  return ref;
}

export { useGsapFadeIn as useGSAPFadeIn };
