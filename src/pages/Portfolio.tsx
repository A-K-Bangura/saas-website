// import { Container } from "@/components/ui/container";
// import { Section } from "@/components/ui/section";
// import { TypographyH1, TypographyP } from "@/components/ui/typography";
// import { Portfolio } from "@/src/components/sections/PortfolioHome";
// import { CTASection } from "@/components/ui/cta-section";
// import { StatsSection } from "@/components/ui/stats-section";

import { Portfolio } from "../components/sections/home_sections/PortfolioHome";
import { Container } from "../components/ui/Container";
import { CTASection } from "../components/ui/CtaSection";
import { Section } from "../components/ui/Section";
import { StatsSection } from "../components/ui/StatsSection";
import { TypographyH1, TypographyP } from "../components/ui/Typography";

const portfolioStats = [
  {
    number: "50+",
    label: "Completed Projects",
    description: "Across Sierra Leone",
  },
  {
    number: "15",
    label: "Ongoing Projects",
    description: "Currently in development",
  },
  {
    number: "98%",
    label: "Client Satisfaction",
    description: "Based on project reviews",
  },
  {
    number: "30%",
    label: "Cost Savings",
    description: "Average savings vs traditional methods",
  },
];

export default function PortfolioPage() {
  return (
    <div>
      {/* Hero Section */}
      <Section
        className="bg-gradient-to-b from-background to-muted/30"
        padding="xl"
      >
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <TypographyH1 className="mb-6">Our Portfolio</TypographyH1>
            <TypographyP className="text-xl text-muted-foreground leading-relaxed">
              Explore our completed projects showcasing sustainable and
              innovative architectural solutions that have transformed
              communities across Sierra Leone.
            </TypographyP>
          </div>
        </Container>
      </Section>

      {/* Stats */}
      <StatsSection title="Project Impact" stats={portfolioStats} />

      {/* Portfolio Grid */}
      <Portfolio />

      <CTASection
        title="Inspired by Our Work?"
        description="Let's discuss how we can bring your architectural vision to life with our sustainable and affordable approach."
        primaryButtonText="Start Your Project"
        secondaryButtonText="Schedule Consultation"
      />
    </div>
  );
}
