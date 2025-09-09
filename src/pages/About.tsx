// import { Container } from "@/components/ui/container"
// import { Section } from "@/components/ui/section"
// import { TypographyH1, TypographyH2, TypographyH3, TypographyP } from "@/components/ui/typography"
// import { Card, CardContent } from "@/components/ui/card"
// import { CTASection } from "@/components/ui/cta-section"
import {
  FiTarget,
  FiEye,
  FiHeart,
  FiUsers,
  FiAward,
  FiTrendingUp,
} from "react-icons/fi";
import { Section } from "../components/ui/Section";
import { Container } from "../components/ui/Container";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyP,
} from "../components/ui/Typography";
import { Card, CardContent } from "../components/ui/Card";
import { CTASection } from "../components/ui/CtaSection";

const values = [
  {
    icon: FiTarget,
    title: "Sustainability First",
    description:
      "Every project prioritizes environmental responsibility and long-term ecological impact.",
  },
  {
    icon: FiHeart,
    title: "Affordability",
    description:
      "Quality architecture shouldn't be a luxury. We make great design accessible to all.",
  },
  {
    icon: FiUsers,
    title: "Community Focus",
    description:
      "Building stronger communities through thoughtful, locally-relevant architectural solutions.",
  },
  {
    icon: FiAward,
    title: "Quality Excellence",
    description:
      "Uncompromising standards in design, materials, and construction practices.",
  },
];

const achievements = [
  {
    icon: FiTrendingUp,
    title: "50+ Projects",
    description: "Successfully completed across Sierra Leone",
  },
  {
    icon: FiUsers,
    title: "100+ Families",
    description: "Now living in sustainable homes",
  },
  {
    icon: FiAward,
    title: "5 Awards",
    description: "For sustainable architecture excellence",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <Section
        className="bg-gradient-to-b from-background to-muted/30"
        padding="xl"
      >
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <TypographyH1 className="mb-6">
              Building a Sustainable Future for Sierra Leone
            </TypographyH1>
            <TypographyP className="text-xl text-muted-foreground leading-relaxed">
              SAAS (Sustainable and Affordable Architectural Solutions) is
              dedicated to transforming Sierra Leone's built environment through
              innovative, eco-friendly, and cost-effective architectural
              solutions.
            </TypographyP>
          </div>
        </Container>
      </Section>

      {/* Mission & Vision */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="p-8">
              <div className="flex items-center space-x-3 mb-4">
                <FiTarget className="w-8 h-8 text-accent" />
                <TypographyH2>Our Mission</TypographyH2>
              </div>
              <TypographyP className="text-lg leading-relaxed">
                To provide sustainable, affordable, and innovative architectural
                solutions that improve the quality of life for communities
                across Sierra Leone while preserving our natural environment for
                future generations.
              </TypographyP>
            </Card>

            <Card className="p-8">
              <div className="flex items-center space-x-3 mb-4">
                <FiEye className="w-8 h-8 text-accent" />
                <TypographyH2>Our Vision</TypographyH2>
              </div>
              <TypographyP className="text-lg leading-relaxed">
                To become Sierra Leone's leading architectural firm, recognized
                for creating beautiful, functional, and environmentally
                responsible buildings that serve as models for sustainable
                development across West Africa.
              </TypographyP>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section className="bg-muted/30">
        <Container>
          <div className="text-center mb-16">
            <TypographyH2 className="mb-4">Our Core Values</TypographyH2>
            <TypographyP className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide every decision we make and every project we
              undertake.
            </TypographyP>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-0">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-accent/10 rounded-lg">
                      <value.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <TypographyH3 className="mb-2">
                        {value.title}
                      </TypographyH3>
                      <TypographyP className="text-muted-foreground">
                        {value.description}
                      </TypographyP>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Story */}
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto">
            <TypographyH2 className="text-center mb-8">Our Story</TypographyH2>
            <div className="space-y-6 text-lg leading-relaxed">
              <TypographyP>
                Founded in 2019, SAAS emerged from a simple yet powerful vision:
                to make quality, sustainable architecture accessible to everyone
                in Sierra Leone. Our founders recognized that traditional
                construction methods often overlooked environmental impact and
                affordability, leaving many communities without access to
                well-designed, durable buildings.
              </TypographyP>
              <TypographyP>
                Starting with small residential projects in Freetown, we quickly
                gained recognition for our innovative approach to sustainable
                design. By incorporating locally-sourced materials, passive
                cooling techniques, and energy-efficient systems, we've been
                able to reduce construction costs while creating healthier, more
                comfortable living spaces.
              </TypographyP>
              <TypographyP>
                Today, SAAS has expanded to serve communities across Sierra
                Leone, from urban centers to rural villages. Our portfolio
                includes residential homes, schools, healthcare facilities, and
                commercial buildings—all designed with our core principles of
                sustainability, affordability, and community impact in mind.
              </TypographyP>
            </div>
          </div>
        </Container>
      </Section>

      {/* Achievements */}
      <Section className="bg-muted/30">
        <Container>
          <div className="text-center mb-16">
            <TypographyH2 className="mb-4">Our Achievements</TypographyH2>
            <TypographyP className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Milestones that reflect our commitment to excellence and community
              impact.
            </TypographyP>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center p-8">
                <achievement.icon className="w-12 h-12 text-accent mx-auto mb-4" />
                <TypographyH3 className="mb-2">
                  {achievement.title}
                </TypographyH3>
                <TypographyP className="text-muted-foreground">
                  {achievement.description}
                </TypographyP>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <CTASection
        title="Ready to Work With Us?"
        description="Join the growing number of satisfied clients who have chosen SAAS for their architectural needs."
      />
    </div>
  );
}
