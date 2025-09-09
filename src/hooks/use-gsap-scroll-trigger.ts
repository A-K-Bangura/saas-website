"use client"

import { useLayoutEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface UseGsapScrollTriggerOptions {
  y?: number
  duration?: number
  stagger?: number
  start?: string
  end?: string
}

export function useGsapScrollTrigger({
  y = 50,
  duration = 1,
  stagger = 0.1,
  start = "top 80%",
  end = "bottom 20%",
}: UseGsapScrollTriggerOptions = {}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useLayoutEffect(() => {
    if (!ref.current || prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from(ref.current!.children, {
        opacity: 0,
        y,
        duration,
        stagger,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start,
          end,
          toggleActions: "play none none reverse",
        },
      })
    })

    return () => ctx.revert()
  }, [y, duration, stagger, start, end, prefersReducedMotion])

  return ref
}
