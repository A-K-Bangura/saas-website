// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
import { Section } from "../../ui/Section";
import { Container } from "../../ui/Container";
// import { TypographyH2, TypographyP } from "@/components/ui/typography";
import { FiHome, FiTool, FiUsers } from "react-icons/fi";
import { useGsapScrollTrigger } from "@/src/hooks/use-gsap-scroll-trigger";
import { TypographyH2, TypographyP } from "../../ui/Typography";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/Card";

const services = [
  {
    icon: FiHome,
    title: "Architectural Design",
    description:
      "Complete architectural design services from concept to construction documents with sustainability at the core.",
    features: [
      "Residential Design",
      "Commercial Planning",
      "3D Visualization",
      "Building Permits",
    ],
  },
  {
    icon: FiTool,
    title: "Construction Services",
    description:
      "Full-service construction management ensuring quality, timeline adherence, and cost-effectiveness.",
    features: [
      "Project Management",
      "Quality Control",
      "Timeline Management",
      "Cost Optimization",
    ],
  },
  {
    icon: FiUsers,
    title: "Project Consultation",
    description:
      "Expert consultation services to guide your project from initial planning through completion.",
    features: [
      "Site Analysis",
      "Feasibility Studies",
      "Budget Planning",
      "Regulatory Guidance",
    ],
  },
  {
    icon: FiTool,
    title: "Sustainable Solutions",
    description:
      "Eco-friendly building solutions that reduce environmental impact while maintaining affordability.",
    features: [
      "Green Materials",
      "Energy Efficiency",
      "Water Conservation",
      "Waste Reduction",
    ],
  },
];

export function Services() {
  const servicesRef = useGsapScrollTrigger({ y: 40, stagger: 0.2 });

  return (
    <Section className="bg-muted/30">
      <Container>
        <div className="text-center mb-16">
          <TypographyH2 className="mb-4">Our Services</TypographyH2>
          <TypographyP className="text-lg text-muted-foreground max-w-2xl mx-auto">
            One stop solution for all your architectural and construction
            worries
          </TypographyP>
        </div>

        <div
          ref={servicesRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
            >
              <CardHeader>
                <div className="flex items-center space-x-4">
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
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center space-x-2 text-sm text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 bg-accent rounded-full transition-all duration-300 group-hover:shadow-sm group-hover:shadow-accent" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
