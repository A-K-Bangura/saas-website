// import { Button } from "@/components/ui/button"
// import { Container } from "@/components/ui/container"
// import { Section } from "@/components/ui/section"
// import { TypographyH2, TypographyP } from "@/components/ui/typography"
import { FiArrowRight, FiPhone } from "react-icons/fi";
import { Section } from "./Section";
import { Container } from "./Container";
import { TypographyH2, TypographyP } from "./Typography";
import { Button } from "./Button";

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  primaryButtonIcon?: React.ReactNode;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  secondaryButtonIcon?: React.ReactNode;
  className?: string;
}

export function CTASection({
  title = "Ready to Start Your Project?",
  description = "Get a free consultation and quote for your next architectural project. Let's build something amazing together.",
  primaryButtonText = "Get Free Quote",
  secondaryButtonText = "Call Us Now",
  primaryButtonLink = "#",
  primaryButtonIcon = (
    <FiArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
  ),
  secondaryButtonLink = "#",
  secondaryButtonIcon = <FiPhone className="mr-2 w-5 h-5" />,
  className = "",
}: CTASectionProps) {
  return (
    <Section className={`bg-primary text-primary-foreground ${className}`}>
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <TypographyH2 className="text-primary-foreground mb-4">
            {title}
          </TypographyH2>
          <TypographyP className="text-primary-foreground/90 text-lg mb-8">
            {description}
          </TypographyP>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 transition-all duration-300 hover:bg-primary-foreground hover:text-primary hover:scale-105 hover:shadow-xl group"
              onClick={() => (window.location.href = primaryButtonLink)}
            >
              {primaryButtonIcon}
              {primaryButtonText}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent transition-all duration-300 hover:scale-105 hover:shadow-xl"
              onClick={() => (window.location.href = secondaryButtonLink)}
            >
              {secondaryButtonIcon}
              {secondaryButtonText}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
