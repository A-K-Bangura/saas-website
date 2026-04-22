import { Link } from "react-router-dom";
import { Section } from "@/src/components/ui/Section";
import { Container } from "@/src/components/ui/Container";
import {
  TypographyH1,
  TypographyH2,
  TypographyP,
} from "@/src/components/ui/Typography";
import { Card } from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";
import { LegalForm } from "@/src/components/forms/LegalForm";
import { FiCheck, FiShield } from "react-icons/fi";
import { useGSAPFadeIn } from "@/src/hooks/use-gsap-fade-in";
import legalHeroImage from "@/src/assets/hero_images/legal.png";

const legalServices = [
  {
    title: "Property Title & Ownership",
    description:
      "Verify property titles, resolve ownership disputes, and ensure clear title transfers.",
  },
  {
    title: "Contracts & Agreements",
    description:
      "Review and draft construction contracts, service agreements, and vendor contracts.",
  },
  {
    title: "Building Permits & Compliance",
    description:
      "Navigate permit applications, zoning regulations, and building code compliance.",
  },
  {
    title: "Dispute Resolution",
    description:
      "Mediation and legal support for construction disputes and conflicts.",
  },
];

// const trustIndicators = [
//   "Experienced legal professionals",
//   "Confidential consultations",
//   "Construction industry expertise",
//   "Local regulatory knowledge",
// ];

export default function LegalAdvisoryPage() {
  const heroRef = useGSAPFadeIn({ y: 20, duration: 0.6 });
  const servicesRef = useGSAPFadeIn({ y: 30, stagger: 0.1 });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Section className="relative overflow-hidden" padding="xl">
        <div className="absolute inset-0">
          <img
            src={legalHeroImage}
            alt="Legal advisory workspace"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/30" />
        </div>
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center" ref={heroRef}>
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-accent/10 rounded-full">
                <FiShield className="w-12 h-12 text-accent" />
              </div>
            </div>
            <TypographyH1 className="mb-3">
              Legal Advisory Services
            </TypographyH1>
            <TypographyP className="text-xl font-semibold text-secondary leading-relaxed max-w-2xl mx-auto">
              Professional legal guidance for all your construction and
              property-related legal matters. Get expert advice from experienced
              legal professionals.
            </TypographyP>
          </div>
        </Container>
      </Section>

      {/* Trust Indicators */}
      {/* <Section className="bg-muted/30">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <FiShield className="w-8 h-8 text-accent" />
                </div>
                <TypographyP className="text-sm font-medium">
                  {indicator}
                </TypographyP>
              </div>
            ))}
          </div>
        </Container>
      </Section> */}

      {/* Legal Services */}
      <Section>
        <Container>
          <TypographyH2 className="text-center mb-8">
            Our Legal Services
          </TypographyH2>
          <div
            ref={servicesRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          >
            {legalServices.map((service, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg gap-2 transition-shadow"
              >
                <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                <TypographyP className="text-muted-foreground text-sm">
                  {service.description}
                </TypographyP>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Main Content */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Information */}
            <div className="space-y-8">
              <div>
                <TypographyH2 className="mb-4">
                  Why Choose Our Legal Services?
                </TypographyH2>
                <ul className="space-y-3">
                  {[
                    "Expert knowledge of construction and property law",
                    "Fast response times - typically within 24 hours",
                    "Clear, practical advice you can act on",
                    "Confidential and secure consultations",
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <FiCheck className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <TypographyP className="text-muted-foreground">
                        {benefit}
                      </TypographyP>
                    </li>
                  ))}
                </ul>
              </div>

              <Card className="p-6 gap-2 bg-muted/30">
                <TypographyH2 className="mb-4 text-lg">
                  What to Expect
                </TypographyH2>
                <div className="space-y-3">
                  <TypographyP className="text-muted-foreground text-sm">
                    After submitting your request, a legal expert will review
                    your case and contact you within 24 hours to schedule a
                    consultation. During the consultation, you'll receive
                    professional guidance tailored to your specific legal needs.
                  </TypographyP>
                </div>
              </Card>
            </div>

            {/* Right Column - Form */}
            <div className="lg:sticky lg:top-24">
              <Card className="p-6">
                <TypographyH2 className="mb-2">
                  Request Legal Consultation
                </TypographyH2>
                <TypographyP className="text-sm text-muted-foreground mb-6">
                  Fill out the form below and a legal expert will contact you
                  within 24 hours.
                </TypographyP>
                <LegalForm />
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
