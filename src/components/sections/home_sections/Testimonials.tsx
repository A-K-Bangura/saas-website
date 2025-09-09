"use client";

import { useState, useEffect, useRef } from "react";
// import { Container } from "@/components/ui/container"
// import { Section } from "@/components/ui/section"
// import { useGSAPFadeIn } from "@/hooks/use-gsap-fade-in"
// import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import gsap from "gsap";
import { Section } from "../../ui/Section";
import { Container } from "../../ui/Container";
import { useGSAPFadeIn } from "@/src/hooks/use-gsap-fade-in";
import { usePrefersReducedMotion } from "@/src/hooks/use-prefers-reduced-motion";
import { TypographyH2 } from "../../ui/Typography";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  position: string;
  company: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "SAAS transformed our vision into reality with their sustainable approach. The eco-friendly materials and innovative design exceeded our expectations. Our new office building is not only beautiful but also energy-efficient.",
    name: "Aminata Kamara",
    position: "CEO",
    company: "Green Tech Solutions",
    avatar: "/professional-african-woman-ceo.jpg",
  },
  {
    id: 2,
    quote:
      "Working with SAAS was an incredible experience. They delivered our community center project on time and within budget, using locally sourced materials that support our economy while being environmentally responsible.",
    name: "Mohamed Sesay",
    position: "Director",
    company: "Community Development Fund",
    avatar: "/professional-african-man-director.jpg",
  },
  {
    id: 3,
    quote:
      "The team at SAAS understood our need for affordable housing without compromising on quality. Their innovative construction methods and sustainable practices made our housing project a huge success.",
    name: "Fatima Bangura",
    position: "Project Manager",
    company: "Housing Development Authority",
    avatar: "/professional-african-woman-project-manager.jpg",
  },
  {
    id: 4,
    quote:
      "SAAS brought expertise and creativity to our school construction project. The design is both functional and inspiring, creating an environment that enhances learning while being cost-effective to maintain.",
    name: "Ibrahim Koroma",
    position: "Principal",
    company: "Sierra Leone Education Board",
    avatar: "/professional-african-man-principal.jpg",
  },
  {
    id: 5,
    quote:
      "From concept to completion, SAAS demonstrated professionalism and innovation. Our healthcare facility is now a model for sustainable construction in the region, serving our community with pride.",
    name: "Adama Turay",
    position: "Administrator",
    company: "Regional Health Authority",
    avatar: "/professional-african-woman-administrator.jpg",
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAPFadeIn({ ref: testimonialRef });

  // Auto-rotation logic
  useEffect(() => {
    if (!isAutoPlaying || prefersReducedMotion) return;

    timeoutRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [activeIndex, isAutoPlaying, prefersReducedMotion]);

  // Handle manual avatar click
  const handleAvatarClick = (index: number) => {
    if (index === activeIndex) return;

    setActiveIndex(index);
    setIsAutoPlaying(false);

    // Reset auto-play after 10 seconds
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000);
  };

  // Animate testimonial change
  useEffect(() => {
    if (prefersReducedMotion) return;

    const testimonialCard =
      testimonialRef.current?.querySelector(".testimonial-card");
    if (testimonialCard) {
      gsap.fromTo(
        testimonialCard,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [activeIndex, prefersReducedMotion]);

  const currentTestimonial = testimonials[activeIndex];

  return (
    <Section className="bg-muted/30">
      <Container>
        <div ref={testimonialRef} className="text-center">
          <TypographyH2 className="text-foreground mb-8 text-balance">
            Words From Our Clients
          </TypographyH2>

          <div className="w-[95%] md:max-w-[90%] lg:max-w-[80%] mx-auto mb-2">
            <div className="testimonial-card bg-card rounded-2xl px-4 md:px-8 py-4 shadow-lg border border-border">
              {/* Quote icon */}
              <div className="mb-2">
                <svg
                  className="w-8 h-8 md:w-12 md:h-12 text-muted-foreground mx-auto"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                </svg>
              </div>

              {/* Testimonial text */}
              <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-8 text-pretty">
                {currentTestimonial.quote}
              </blockquote>

              {/* Client info */}
              <div className="flex items-center justify-center gap-2 md:gap-4">
                <img
                  src={currentTestimonial.avatar || "/placeholder.svg"}
                  alt={currentTestimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-border"
                />
                <div className="text-left">
                  <div className="font-semibold text-foreground text-lg">
                    {currentTestimonial.name}
                  </div>
                  <div className="text-muted-foreground">
                    {currentTestimonial.position}, {currentTestimonial.company}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:flex justify-center items-center pt-[16px] gap-4 overflow-x-auto pb-4">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                onClick={() => handleAvatarClick(index)}
                className={`flex-shrink-0 transition-all duration-300 rounded-full ${
                  index === activeIndex
                    ? "ring-4 ring-accent ring-offset-2 ring-offset-background scale-110"
                    : "hover:scale-105 opacity-70 hover:opacity-100"
                }`}
                aria-label={`View testimonial from ${testimonial.name}`}
              >
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-border"
                />
              </button>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-4 md:hidden">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleAvatarClick(index)}
                className={`w-1 h-1 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-accent w-"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
