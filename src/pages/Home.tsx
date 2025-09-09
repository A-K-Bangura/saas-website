import { Hero } from "@/src/components/sections/home_sections/Hero3";
import { Services } from "@/src/components/sections/home_sections/ServicesHome";
import { Portfolio } from "@/src/components/sections/home_sections/PortfolioHome";
import { Contact } from "@/src/components/sections/home_sections/ContactHome";
import { StatsSection } from "../components/ui/StatsSection";
import { CTASection } from "../components/ui/CtaSection";
import { Testimonials } from "../components/sections/home_sections/Testimonials";
import { BlogPreview } from "../components/sections/home_sections/BlogHome";
// import { CTASection } from "@/components/ui/cta-section";
// import { StatsSection } from "@/components/ui/stats-section";

const stats = [
  {
    number: "50+",
    label: "Projects Completed",
    description: "Across Sierra Leone",
  },
  {
    number: "100%",
    label: "Sustainable Materials",
    description: "Eco-friendly approach",
  },
  {
    number: "5+",
    label: "Years Experience",
    description: "In local construction",
  },
  {
    number: "24/7",
    label: "Support Available",
    description: "Project assistance",
  },
];

export default function HomePage() {
  return (
    <div>
      <Hero />
      <StatsSection stats={stats} />
      <Services />
      <Portfolio />
      <Testimonials />
      <CTASection />
      <Contact />
      <BlogPreview />
    </div>
  );
}
