import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FiHome, FiArrowLeft, FiSearch } from "react-icons/fi";
import { gsap } from "gsap";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
// import { Button } from "@/components/ui/button"
// import { Container } from "@/components/ui/container"

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && numberRef.current && contentRef.current) {
      const tl = gsap.timeline();

      // Animate the 404 number with a building construction effect
      tl.fromTo(
        numberRef.current,
        {
          opacity: 0,
          scale: 0.5,
          rotationY: -90,
        },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
        }
      );

      // Animate content with staggered fade-in
      tl.fromTo(
        contentRef.current.children,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
        },
        "-=0.6"
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Container className="text-center">
        <div ref={containerRef}>
          {/* Large 404 Number with architectural styling */}
          <div ref={numberRef} className="mb-8">
            <div className="text-[12rem] md:text-[16rem] font-bold text-primary leading-none tracking-tighter">
              4<span className="text-accent">0</span>4
            </div>
            <div className="h-1 w-32 bg-accent mx-auto -mt-4"></div>
          </div>

          {/* Content Section */}
          <div ref={contentRef} className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-2xl md:text-3xl font-semibold text-primary text-balance">
              Page Under Construction
            </h1>

            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              Like a well-designed building, this page is still in the planning
              phase. Our architects are working on creating something amazing
              for you.
            </p>

            <div className="bg-muted/50 border border-border rounded-lg p-6 text-left">
              <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
                <FiSearch className="w-5 h-5 text-accent" />
                What you can do:
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                  Check the URL for any typos
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                  Browse our portfolio of architectural projects
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                  Connect with our professional network
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                  Contact us for sustainable building solutions
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Link to="/" className="flex items-center gap-2">
                  <FiHome className="w-5 h-5" />
                  Return Home
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg">
                <Link to="/portfolio" className="flex items-center gap-2">
                  <FiArrowLeft className="w-5 h-5" />
                  View Portfolio
                </Link>
              </Button>
            </div>

            {/* Architectural Quote */}
            <div className="pt-8 border-t border-border">
              <blockquote className="text-muted-foreground italic text-balance">
                "Architecture is a visual art, and the buildings speak for
                themselves."
              </blockquote>
              <cite className="text-sm text-muted-foreground/80 mt-2 block">
                — Julia Morgan, Architect
              </cite>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          </div>
        </div>
      </Container>
    </div>
  );
}
