"use client";

import { useGsapFadeIn } from "@/src/hooks/use-gsap-fade-in";
import type React from "react";

import { useState, useCallback } from "react";
// import { Button } from "@/components/ui/button";
import {
  FiArrowRight,
  FiPlay,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { Button } from "../../ui/Button";
// import { useGsapFadeIn } from "@/hooks/use-gsap-fade-in";

const slides = [
  {
    id: 1,
    title: "Sustainable & Affordable Architectural Solutions",
    subtitle: "No more worries",
    description:
      "Building a better future for Sierra Leone through innovative, eco-friendly, and cost-effective construction solutions that don't compromise on quality.",
    ctaText: "Get a Quote",
    ctaAction: "quote",
    backgroundImage: "/modern-sustainable-architecture-building-in-sierra.jpg",
  },
  {
    id: 2,
    title: "Sustainable & Affordable Architectural Solutions",
    subtitle: "Biodiversity",
    description:
      "Our eco-friendly designs integrate seamlessly with Sierra Leone's natural environment, preserving local ecosystems while creating beautiful spaces.",
    ctaText: "Learn More",
    ctaAction: "learn",
    backgroundImage: "/green-building-with-biodiversity-integration-sierr.jpg",
  },
  {
    id: 3,
    title: "Sustainable & Affordable Architectural Solutions",
    subtitle: "Design Solutions",
    description:
      "We work closely with local communities to create architectural solutions that reflect cultural values and meet specific regional needs.",
    ctaText: "View Projects",
    ctaAction: "projects",
    backgroundImage: "/community-building-architecture-sierra-leone-local.jpg",
  },
  {
    id: 4,
    title: "Sustainable & Affordable Architectural Solutions",
    subtitle: "For Everyone",
    description:
      "Making quality housing accessible to all Sierra Leoneans through innovative construction methods and sustainable materials.",
    ctaText: "Get Started",
    ctaAction: "start",
    backgroundImage: "/affordable-housing-development-sierra-leone-sustai.jpg",
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cursorPosition, setCursorPosition] = useState<"left" | "right">(
    "right"
  );
  const [isHovered, setIsHovered] = useState(false);

  const heroRef = useGsapFadeIn({ y: 30, duration: 1, delay: 0.2 });
  const titleRef = useGsapFadeIn({ y: 20, duration: 0.8, delay: 0.4 });
  const descriptionRef = useGsapFadeIn({ y: 20, duration: 0.8, delay: 0.6 });
  const buttonsRef = useGsapFadeIn({ y: 20, duration: 0.8, delay: 0.8 });
  const statsRef = useGsapFadeIn({
    y: 20,
    duration: 0.8,
    delay: 1,
    stagger: 0.2,
  });

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const centerX = rect.width / 2;

      // Determine cursor position based on slide and mouse location
      if (currentSlide === 0) {
        setCursorPosition("right"); // First slide: always right arrow
      } else if (currentSlide === slides.length - 1) {
        setCursorPosition("left"); // Last slide: always left arrow
      } else {
        setCursorPosition(x > centerX ? "right" : "left"); // Middle slides: based on position
      }
    },
    [currentSlide]
  );

  const handleHeroClick = useCallback(() => {
    if (cursorPosition === "right" && currentSlide < slides.length - 1) {
      nextSlide();
    } else if (cursorPosition === "left" && currentSlide > 0) {
      prevSlide();
    }
  }, [cursorPosition, currentSlide, nextSlide, prevSlide]);

  const currentSlideData = slides[currentSlide];

  return (
    <section
      className={`relative min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted overflow-hidden transition-all duration-500 ${
        isHovered
          ? cursorPosition === "right"
            ? "cursor-e-resize"
            : "cursor-w-resize"
          : "cursor-pointer"
      }`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleHeroClick}
    >
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.backgroundImage || "/placeholder.svg"}
              alt={`${slide.title} ${slide.subtitle}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent" />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div ref={heroRef} className="max-w-4xl">
          <div
            key={currentSlide}
            className="transition-all duration-500 transform"
            style={{ textAlign: "left" }}
          >
            <div ref={titleRef}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                {currentSlideData.title}
                <span className="text-primary block">
                  {currentSlideData.subtitle}
                </span>
              </h1>
            </div>

            <div ref={descriptionRef}>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
                {currentSlideData.description}
              </p>
            </div>

            <div
              ref={buttonsRef}
              className="flex flex-col sm:flex-row gap-4 items-start"
            >
              <Button
                size="lg"
                className="text-lg px-8 py-4 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                {currentSlideData.ctaText}
                <FiArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 bg-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <FiPlay className="mr-2 w-5 h-5" />
                View Our Work
              </Button>
            </div>
          </div>

          <div className="flex justify-center md:justify-start mt-12 space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  goToSlide(index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-primary scale-125"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="md:hidden fixed bottom-8 left-6 right-6 flex justify-between z-20">
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              disabled={currentSlide === 0}
              className={`p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg transition-all duration-300 ${
                currentSlide === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-white hover:scale-110 active:scale-95"
              }`}
              aria-label="Previous slide"
            >
              <FiChevronLeft className="w-6 h-6 text-gray-800" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              disabled={currentSlide === slides.length - 1}
              className={`p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg transition-all duration-300 ${
                currentSlide === slides.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-white hover:scale-110 active:scale-95"
              }`}
              aria-label="Next slide"
            >
              <FiChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </div>

          <div
            ref={statsRef}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left"
          >
            <div className="transition-transform duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Projects Completed</div>
            </div>
            <div className="transition-transform duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Sustainable Materials</div>
            </div>
            <div className="transition-transform duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-primary mb-2">5+</div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
