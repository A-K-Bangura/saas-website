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
import { EstimateForm } from "@/src/components/forms/EstimateForm";
import { FiCheck, FiArrowRight, FiDollarSign } from "react-icons/fi";
import { useGSAPFadeIn } from "@/src/hooks/use-gsap-fade-in";
import estimateHeroImage from "@/src/assets/hero_images/estimate.png";

const benefits = [
  "Accurate cost projections for your project",
  "Detailed breakdown of materials and labor",
  "Timeline estimates for project completion",
  "Budget planning and optimization recommendations",
  "Free consultation with our experts",
];

const processSteps = [
  {
    step: 1,
    title: "Submit Request",
    description: "Fill out the form with your project details",
  },
  {
    step: 2,
    title: "Expert Review",
    description: "Our team reviews your requirements",
  },
  {
    step: 3,
    title: "Detailed Estimate",
    description: "Receive comprehensive cost breakdown within 48 hours",
  },
  {
    step: 4,
    title: "Follow-up Consultation",
    description: "Discuss your estimate and next steps",
  },
];

export default function EstimationPage() {
  const heroRef = useGSAPFadeIn({ y: 20, duration: 0.6 });
  const stepsRef = useGSAPFadeIn({ y: 30, stagger: 0.1 });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Section className="relative overflow-hidden" padding="xl">
        <div className="absolute inset-0">
          <img
            src={estimateHeroImage}
            alt="Project estimation workspace"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/30" />
        </div>
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center" ref={heroRef}>
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-accent/10 rounded-full">
                <FiDollarSign className="w-12 h-12 text-accent" />
              </div>
            </div>
            <TypographyH1 className="mb-3">
              Free Project Estimation
            </TypographyH1>
            <TypographyP className="text-xl font-semibold text-secondary leading-relaxed max-w-2xl mx-auto">
              Get a detailed, accurate cost estimate for your construction
              project. Our experts analyze your requirements and provide
              comprehensive pricing within 48 hours.
            </TypographyP>
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
                  Why Get an Estimate?
                </TypographyH2>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <FiCheck className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <TypographyP className="text-muted-foreground">
                        {benefit}
                      </TypographyP>
                    </li>
                  ))}
                </ul>
              </div>

              <Card className="p-6 bg-muted/30">
                <TypographyH2 className="mb-4 text-lg">
                  Our Process
                </TypographyH2>
                <div className="space-y-4" ref={stepsRef}>
                  {processSteps.map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <div>
                <Link to="/services/consultancy">
                  <Button variant="outline" className="w-full">
                    Need Consultation Instead?
                    <FiArrowRight className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="lg:sticky lg:top-24">
              <Card className="p-6">
                <TypographyH2 className="mb-2">
                  Request Your Free Estimate
                </TypographyH2>
                <TypographyP className="text-sm text-muted-foreground mb-6">
                  Fill out the form below and we'll get back to you within 48
                  hours with a detailed estimate.
                </TypographyP>
                <EstimateForm />
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
