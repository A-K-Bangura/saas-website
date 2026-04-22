import { Link } from "react-router-dom";
import { Section } from "@/src/components/ui/Section";
import { Container } from "@/src/components/ui/Container";
import {
  TypographyH1,
  TypographyH2,
  TypographyP,
} from "@/src/components/ui/Typography";
import { Card, CardContent } from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";
import { ConsultancyForm } from "@/src/components/forms/ConsultancyForm";
import { FiCheck, FiUsers, FiArrowRight } from "react-icons/fi";
import { useGSAPFadeIn } from "@/src/hooks/use-gsap-fade-in";
import consultHeroImage from "@/src/assets/hero_images/consult.png";

const consultancyTypes = [
  {
    title: "Sustainability & Green Building",
    description: "Eco-friendly design and construction practices",
  },
  {
    title: "Cost Optimization",
    description: "Maximize value while minimizing expenses",
  },
  {
    title: "Project Management",
    description: "Expert oversight and coordination",
  },
  {
    title: "Design Review & Optimization",
    description: "Improve your designs for better outcomes",
  },
];

const steps = [
  "Submit your consultancy request",
  "We match you with the right expert",
  "Schedule a consultation session",
  "Receive actionable recommendations",
];

export default function ConsultancyPage() {
  const heroRef = useGSAPFadeIn({ y: 20, duration: 0.6 });
  const cardsRef = useGSAPFadeIn({ y: 30, stagger: 0.1 });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Section className="relative overflow-hidden" padding="xl">
        <div className="absolute inset-0">
          <img
            src={consultHeroImage}
            alt="Consultancy services workspace"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/30" />
        </div>
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center" ref={heroRef}>
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-accent/10 rounded-full">
                <FiUsers className="w-12 h-12 text-accent" />
              </div>
            </div>
            <TypographyH1 className="mb-6">Consultancy Services</TypographyH1>
            <TypographyP className="text-xl font-semibold text-secondary leading-relaxed max-w-2xl mx-auto">
              Expert consultation services to guide your project from initial
              planning through completion. Get professional advice tailored to
              your specific needs.
            </TypographyP>
          </div>
        </Container>
      </Section>

      {/* Consultancy Types */}
      {/* <Section>
        <Container>
          <TypographyH2 className="text-center mb-8">Our Consultancy Offerings</TypographyH2>
          <div
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          >
            {consultancyTypes.map((type, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-lg mb-2">{type.title}</h3>
                <TypographyP className="text-muted-foreground text-sm">
                  {type.description}
                </TypographyP>
              </Card>
            ))}
          </div>
        </Container>
      </Section> */}

      {/* Main Content */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Information */}
            <div className="space-y-8">
              <div>
                <TypographyH2 className="mb-4">How It Works</TypographyH2>
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <TypographyP className="text-muted-foreground">
                          {step}
                        </TypographyP>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Card className="p-6 bg-muted/30">
                <TypographyH2 className="mb-4 text-lg">
                  What You'll Get
                </TypographyH2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <FiCheck className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <TypographyP className="text-muted-foreground">
                      Expert advice from experienced professionals
                    </TypographyP>
                  </li>
                  <li className="flex items-start gap-3">
                    <FiCheck className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <TypographyP className="text-muted-foreground">
                      Tailored recommendations for your project
                    </TypographyP>
                  </li>
                  <li className="flex items-start gap-3">
                    <FiCheck className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <TypographyP className="text-muted-foreground">
                      Actionable insights to improve outcomes
                    </TypographyP>
                  </li>
                  <li className="flex items-start gap-3">
                    <FiCheck className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <TypographyP className="text-muted-foreground">
                      Ongoing support and follow-up
                    </TypographyP>
                  </li>
                </ul>
              </Card>
            </div>

            {/* Right Column - Form */}
            <div className="lg:sticky lg:top-24">
              <Card className="p-6">
                <TypographyH2 className="mb-2">
                  Request Consultation
                </TypographyH2>
                <TypographyP className="text-sm text-muted-foreground mb-6">
                  Fill out the form below and our team will contact you to
                  schedule your consultation.
                </TypographyP>
                <ConsultancyForm />
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
