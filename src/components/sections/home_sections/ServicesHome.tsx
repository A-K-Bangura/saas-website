import { Link } from "react-router-dom";
import { Section } from "../../ui/Section";
import { Container } from "../../ui/Container";
import {
  FiUsers,
  FiPackage,
  FiBookOpen,
  FiFileText,
  FiArrowRight,
  FiDollarSign,
  FiMessageSquare,
  FiShield,
} from "react-icons/fi";
import { useGsapScrollTrigger } from "@/src/hooks/use-gsap-scroll-trigger";
import { TypographyH2, TypographyP } from "../../ui/Typography";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/Card";
import { Button } from "../../ui/Button";

const pillars = [
  {
    href: "/about#professionals",
    icon: FiUsers,
    title: "Right Professionals",
    description:
      "Curated teams selected and held accountable for every contract.",
  },
  {
    href: "/about#materials",
    icon: FiPackage,
    title: "Quality Materials",
    description: "Inspected high-quality materials at competitive rates.",
  },
  {
    href: "/about#training",
    icon: FiBookOpen,
    title: "Trained Workforce",
    description:
      "Continuous training to global construction practices and safety.",
  },
  {
    href: "/about#documentation",
    icon: FiFileText,
    title: "Full Documentation",
    description:
      "Land to permit — clearer decisions and direction from idea to construction.",
  },
];

const serviceActions = [
  {
    href: "/services/estimation",
    icon: FiDollarSign,
    title: "Free Estimation",
    description: "Get a detailed cost estimate for your construction project.",
    cta: "Request Estimate",
  },
  {
    href: "/services/consultancy",
    icon: FiMessageSquare,
    title: "Consultancy",
    description:
      "Expert consultation for project planning, costs, and delivery.",
    cta: "Request Consultation",
  },
  {
    href: "/services/legal-advisory",
    icon: FiShield,
    title: "Legal Advisory",
    description:
      "Professional legal guidance for property, contracts, and permits.",
    cta: "Book Consultation",
  },
];

export function Services() {
  const pillarsRef = useGsapScrollTrigger({ y: 40, stagger: 0.15 });
  const actionsRef = useGsapScrollTrigger({ y: 40, stagger: 0.15 });

  return (
    <Section className="bg-muted/30">
      <Container>
        <div className="text-center mb-8 md:mb-10">
          <TypographyH2 className="mb-4">The Solution, One Integrated Partner - SAAS</TypographyH2>
          <TypographyP className="text-lg text-muted-foreground max-w-2xl mx-auto">
            SAAS SL aggregates the best professionals, supplies inspected
            materials, trains its workforce, and simplifies the journey from
            land to permit.
          </TypographyP>
        </div>

        <div
          ref={pillarsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 gsap-scroll-trigger mb-8"
        >
          {pillars.map((pillar) => (
            <Link
              key={pillar.href}
              to={pillar.href}
              className="group block space-y-3"
            >
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors duration-300">
                  <pillar.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold group-hover:text-accent transition-colors duration-300">
                  {pillar.title}
                </h3>
              </div>
              <TypographyP className="text-muted-foreground text-sm leading-relaxed">
                {pillar.description}
              </TypographyP>
              <span className="inline-flex items-center text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Learn more
                <FiArrowRight className="ml-1 w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>

        <div
          ref={actionsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 gsap-scroll-trigger"
        >
          {serviceActions.map((action) => (
            <Card
              key={action.href}
              className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
            >
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-all duration-300">
                    <action.icon className="w-6 h-6 text-accent transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-accent transition-colors duration-300">
                    {action.title}
                  </CardTitle>
                </div>
                <CardDescription className="text-base leading-relaxed">
                  {action.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to={action.href}>
                  <Button className="w-full group-hover:scale-105 transition-transform duration-300">
                    {action.cta}
                    <FiArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
