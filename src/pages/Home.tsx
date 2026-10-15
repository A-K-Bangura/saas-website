import { Hero } from "@/src/components/sections/home_sections/Hero3";
import { Challenge } from "@/src/components/sections/home_sections/ChallengeHome";
import { Services } from "@/src/components/sections/home_sections/ServicesHome";
import { Portfolio } from "@/src/components/sections/home_sections/PortfolioHome";
import { Contact } from "@/src/components/sections/home_sections/ContactHome";
import { StatsSection } from "../components/ui/StatsSection";
import { CTASection } from "../components/ui/CtaSection";
import { Testimonials } from "../components/sections/home_sections/Testimonials";
import { BlogPreview } from "../components/sections/home_sections/BlogHome";

const stats = [
  {
    number: "30+",
    label: "Projects Delivered",
    description: "Across Sierra Leone",
  },
  {
    number: "100%",
    label: "Inspected Materials",
    description: "Quality assured at competitive prices",
  },
  {
    number: "300+",
    label: "Years Cumulative Experience",
    description: "In the built environment",
  },
  {
    number: "100+",
    label: "Trusted Professionals",
    description: "Curated and accountable teams",
  },
];

export default function HomePage() {
  return (
    <div>
      <Hero />
      <StatsSection stats={stats} />
      <Challenge />
      <Services />
      <Portfolio />
      <Testimonials />
      <CTASection
        title="Build With Confidence"
        description="One Partner. Trained Teams. Trusted Materials. Clear path from land to construction."
        primaryButtonText="Chat on WhatsApp"
        secondaryButtonText="Professional Consultation"
      />
      <Contact />
      <BlogPreview />
    </div>
  );
}
