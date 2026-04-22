// import { Button } from "@/components/ui/button"
// import { Container } from "@/components/ui/container"
// import { Section } from "@/components/ui/section"
// import { TypographyH2, TypographyP } from "@/components/ui/typography"
import { FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
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
  description = "Get a in touch for your next architectural project or just to make a general enquiry. Let's build something amazing together.",
  primaryButtonText = "Chat on WhatsApp",
  secondaryButtonText = "Call for an Appointment",
  primaryButtonLink = "#",
  secondaryButtonLink = "#",
  secondaryButtonIcon = <FiPhone className="mr-2 w-5 h-5" />,
  className = "",
}: CTASectionProps) {
  const normalizedPhone = (import.meta.env.VITE_CONTACT_PHONE ?? "").replace(
    /\D/g,
    "",
  );
  const whatsappMessage = encodeURIComponent(
    "Hello, I would like to enquire about your services.",
  );
  const whatsappLink = normalizedPhone
    ? `https://wa.me/${normalizedPhone}?text=${whatsappMessage}`
    : primaryButtonLink;
  const callLink = normalizedPhone
    ? `tel:+${normalizedPhone}`
    : secondaryButtonLink;

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
              onClick={() =>
                window.open(whatsappLink, "_blank", "noopener,noreferrer")
              }
            >
              <FaWhatsapp className="mr-2 w-5 h-5" />
              {primaryButtonText}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent transition-all duration-300 hover:scale-105 hover:shadow-xl"
              onClick={() => (window.location.href = callLink)}
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
