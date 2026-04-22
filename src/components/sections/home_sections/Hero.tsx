// import { Button } from "@/components/ui/button";
import { FiArrowRight, FiPlay } from "react-icons/fi";
import { useGsapFadeIn } from "@/src/hooks/use-gsap-fade-in";
import { Button } from "../../ui/Button";
import hero1 from "../../../assets/hero_images/Hero1.jpg";
import heroMobile1 from "../../../assets/hero_images/HeroMobile1.jpg";
import hero2 from "../../../assets/hero_images/Hero2.png";

const slides = [
  {
    id: 1,
    title: "Sustainable & Affordable",
    subtitle: "Architectural Solutions",
    description:
      "Building a better future for Sierra Leone through innovative, eco-friendly, and cost-effective construction solutions that don't compromise on quality.",
    ctaText: "Get a Quote",
    ctaAction: "quote",
    backgroundImage: "/modern-sustainable-architecture-building-in-sierra.jpg",
  },
  {
    id: 2,
    title: "Measuring",
    subtitle: "Biodiversity",
    description:
      "Our eco-friendly designs integrate seamlessly with Sierra Leone's natural environment, preserving local ecosystems while creating beautiful spaces.",
    ctaText: "Learn More",
    ctaAction: "learn",
    backgroundImage: "/green-building-with-biodiversity-integration-sierr.jpg",
  },
  {
    id: 3,
    title: "Community-Centered",
    subtitle: "Design Solutions",
    description:
      "We work closely with local communities to create architectural solutions that reflect cultural values and meet specific regional needs.",
    ctaText: "View Projects",
    ctaAction: "projects",
    backgroundImage: "/community-building-architecture-sierra-leone-local.jpg",
  },
  {
    id: 4,
    title: "Affordable Housing",
    subtitle: "For Everyone",
    description:
      "Making quality housing accessible to all Sierra Leoneans through innovative construction methods and sustainable materials.",
    ctaText: "Get Started",
    ctaAction: "start",
    backgroundImage: "/affordable-housing-development-sierra-leone-sustai.jpg",
  },
];

export function Hero() {
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

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-6 max-w-7xl">
        <img
          src={hero1}
          alt="hero"
          className="absolute z-0 inset-0 w-full h-full object-cover hidden md:block"
          style={{ pointerEvents: "none" }}
        />
        <img
          src={heroMobile1}
          alt="hero"
          className="absolute z-0 inset-0 w-full h-full object-cover md:hidden"
          style={{ pointerEvents: "none" }}
        />
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(110deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 45%, rgba(255,255,255,0) 100%)",
          }}
        />
        <div ref={heroRef} className="relative z-20">
          <div className="flex flex-col align-left">
            <div ref={titleRef}>
              <h1 className="text-sm md:text-xl lg:text-xl font-bold tracking-tight">
                Sustainable & Affordable Architectural Solutions
              </h1>
              <p className="text-4xl md:text-7xl lg:text-[6rem] font-bold tracking-tight mb-2">
                No more worries
              </p>
            </div>

            <div ref={descriptionRef}>
              <p className="text-lg md:text-xl text-saas-gray-800 mb-4 max-w-2xl leading-relaxed">
                Building a better future for Sierra Leone through innovative,
                eco-friendly, and cost-effective construction solutions that
                don't compromise on quality.
              </p>
            </div>

            <div ref={buttonsRef} className="flex flex-col sm:flex-row">
              <Button
                size="lg"
                className="text-lg px-6 py-2 md:px-8 md:py-4 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Get a Contractor
                <FiArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
          {/* <div
            ref={statsRef}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
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
          </div> */}
        </div>
      </div>
    </section>
  );
}
