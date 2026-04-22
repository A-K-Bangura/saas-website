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
import { useNavigate } from "react-router-dom";
// import { useGsapFadeIn } from "@/hooks/use-gsap-fade-in";

import hero1 from "../../../assets/hero_images/Hero1.jpg";
import heroMobile1 from "../../../assets/hero_images/HeroMobile1.jpg";
import hero2 from "../../../assets/hero_images/Hero2.png";
import estimate from "../../../assets/hero_images/estimate.png";
import store from "../../../assets/hero_images/store.png";
import projects from "../../../assets/hero_images/project.png";

const slides = [
  {
    id: 1,
    title: "Sustainable & Affordable Architectural Solutions",
    subtitle: "Expert Professionals You Can Trust",
    description:
      "Skip the stress of site mismanagement, endless excuses and late delivery. We provide certified, reliable professionals dedicated to precision, safety, and bringing your blueprint to life on time.",
    ctaText: "View Professionals",
    ctaAction: "professionals",
    backgroundImage: hero1,
    backgroundImageMobile: heroMobile1,
  },
  {
    id: 2,
    title: "Sustainable & Affordable Architectural Solutions",
    subtitle: "Know Your Costs Upfront",
    description:
      "Planning your dream build? Get a transparent, comprehensive cost breakdown tailored to your project requirements so you can build with confidence within your budget.",
    ctaText: "Get a Free Estimate",
    ctaAction: "estimates",
    backgroundImage: estimate,
    backgroundImageMobile: estimate,
  },
  {
    id: 3,
    title: "Sustainable & Affordable Architectural Solutions",
    subtitle: "Quality Materials, Delivered",
    description:
      "From eco-friendly blocks to premium finishing, browse our curated store for high-grade construction materials that stand the test of time.",
    ctaText: "Shop Materials",
    ctaAction: "store",
    backgroundImage: store,
    backgroundImageMobile: store,
  },
  {
    id: 4,
    title: "Sustainable & Affordable Architectural Solutions",
    subtitle: "Our Portfolio of Excellence",
    description:
      "Browse our portfolio of completed residential, commercial, and community projects across Sierra Leone — proof that quality construction and affordability can go hand in hand.",
    ctaText: "View Projects",
    ctaAction: "projects",
    backgroundImage: projects,
    backgroundImageMobile: projects,
  },
];

export function Hero() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cursorPosition, setCursorPosition] = useState<"left" | "right">(
    "right",
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
    [currentSlide],
  );

  const handleHeroClick = useCallback(() => {
    if (cursorPosition === "right" && currentSlide < slides.length - 1) {
      nextSlide();
    } else if (cursorPosition === "left" && currentSlide > 0) {
      prevSlide();
    }
  }, [cursorPosition, currentSlide, nextSlide, prevSlide]);

  const currentSlideData = slides[currentSlide];

  const handleCtaClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      const ctaRouteMap: Record<string, string> = {
        professionals: "/profiles",
        estimates: "/services/estimation",
        store: "/store",
        projects: "/projects",
      };

      const targetRoute = ctaRouteMap[currentSlideData.ctaAction] ?? "/contact";
      navigate(targetRoute);
    },
    [currentSlideData.ctaAction, navigate],
  );

  return (
    <section
      className={`relative min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-background to-muted overflow-hidden transition-all duration-500 ${
        isHovered
          ? cursorPosition === "right"
            ? "right-arrow-cursor"
            : "left-arrow-cursor"
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
              className="absolute z-0 inset-0 w-full h-full object-cover hidden md:block"
              style={{ pointerEvents: "none" }}
            />
            <img
              src={slide.backgroundImageMobile || "/placeholder.svg"}
              alt={`${slide.title} ${slide.subtitle}`}
              className="absolute z-0 inset-0 w-full h-full object-cover md:hidden"
              style={{ pointerEvents: "none" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent" />

            {/* <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(110deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 45%, rgba(255,255,255,0) 100%)",
              }}
            /> */}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div ref={heroRef} className="max-w-4xl">
          <div
            key={currentSlide}
            className="transition-all duration-500 transform flex flex-col align-left"
            style={{ textAlign: "left" }}
          >
            <div ref={titleRef}>
              <h1 className="text-sm md:text-xl lg:text-xl mt-10 font-bold tracking-tight">
                {currentSlideData.title}
              </h1>
              <p className="text-4xl md:text-7xl lg:text-[5rem] font-bold tracking-tight mb-2">
                {currentSlideData.subtitle}
              </p>
            </div>

            <div ref={descriptionRef}>
              <p className="text-lg md:text-xl text-saas-gray-800 mb-4 max-w-2xl leading-relaxed">
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
                onClick={handleCtaClick}
              >
                {currentSlideData.ctaText}
                <FiArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          <div className="flex justify-center md:justify-start mt-8 space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  goToSlide(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-primary scale-125"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="lg:hidden fixed -bottom-16 left-6 right-6 flex justify-between z-20">
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              disabled={currentSlide === 0}
              className={`p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg transition-all duration-300 ${
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
              className={`p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg transition-all duration-300 ${
                currentSlide === slides.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-white hover:scale-110 active:scale-95"
              }`}
              aria-label="Next slide"
            >
              <FiChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
