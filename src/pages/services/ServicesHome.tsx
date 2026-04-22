import { Link } from "react-router-dom";
import { Section } from "@/src/components/ui/Section";
import { Container } from "@/src/components/ui/Container";
import {
  TypographyH1,
  TypographyH2,
  TypographyP,
} from "@/src/components/ui/Typography";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";
import { FiDollarSign, FiUsers, FiShield, FiArrowRight } from "react-icons/fi";
import { useGSAPFadeIn } from "@/src/hooks/use-gsap-fade-in";

const services = [
  {
    icon: FiDollarSign,
    title: "Free Estimation",
    description:
      "Get a detailed cost estimate for your construction project. Our experts analyze your requirements and provide accurate pricing.",
    href: "/services/estimation",
    features: [
      "Detailed cost breakdown",
      "Material & labor estimates",
      "Timeline projections",
      "Budget planning assistance",
    ],
  },
  {
    icon: FiUsers,
    title: "Consultancy Request",
    description:
      "One time free expert consultation services for sustainability, cost optimization, project management, and more.",
    href: "/services/consultancy",
    features: [
      "Sustainability consulting",
      "Cost optimization",
      "Project management",
      "Design review",
    ],
  },
  {
    icon: FiShield,
    title: "Legal Advise",
    description:
      "Professional legal guidance for property titles, contracts, permits, and construction-related legal matters.",
    href: "/services/legal-advisory",
    features: [
      "Property title verification",
      "Contract review",
      "Permit assistance",
      "Dispute resolution",
    ],
  },
];

export default function ServicesHome() {
  // const cardsRef = useGSAPFadeIn({ y: 40, stagger: 0.15 });

  return (
    <div className="min-h-screen bg-background">
      {/* Service Cards */}
      <Section>
        <Container>
          <div className="text-center mb-12">
            <TypographyH2 className="mb-4">Complementary Services</TypographyH2>
            {/* <TypographyP className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our range of professional services to get started on
              your project.
            </TypographyP> */}
          </div>

          <div
            // ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              >
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-accent/25">
                      <service.icon className="w-6 h-6 text-accent transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-accent transition-colors duration-300">
                      {service.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center space-x-2 text-sm text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={service.href}>
                    <Button className="w-full group-hover:scale-105 transition-transform duration-300">
                      Get Started
                      <FiArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
