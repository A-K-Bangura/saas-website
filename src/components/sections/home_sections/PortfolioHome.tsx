import { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Container } from "@/components/ui/container";
// import { Section } from "@/components/ui/section";
// import {
//   TypographyH2,
//   TypographyH3,
//   TypographyP,
// } from "@/components/ui/typography";
import { FiArrowRight, FiExternalLink, FiMapPin } from "react-icons/fi";
import { useGsapScrollTrigger } from "@/src/hooks/use-gsap-scroll-trigger";
import { Section } from "../../ui/Section";
import { Container } from "../../ui/Container";
import { TypographyH2, TypographyH3, TypographyP } from "../../ui/Typography";
import { Button } from "../../ui/Button";
import { Card, CardContent } from "../../ui/Card";
import { Badge } from "../../ui/Badge";

const projects = [
  {
    id: 1,
    title: "Eco-Friendly Family Home",
    category: "Residential",
    location: "Freetown, Sierra Leone",
    image: "/modern-sustainable-family-home-architecture.jpg",
    description:
      "A 3-bedroom sustainable home featuring solar panels, rainwater harvesting, and locally sourced materials.",
    features: ["Solar Energy", "Rainwater Harvesting", "Local Materials"],
    year: "2024",
  },
  {
    id: 2,
    title: "Community Health Center",
    category: "Commercial",
    location: "Bo, Sierra Leone",
    image: "/modern-health-center-building-architecture.jpg",
    description:
      "A modern healthcare facility designed for accessibility and energy efficiency in rural communities.",
    features: [
      "Accessible Design",
      "Natural Ventilation",
      "Modular Construction",
    ],
    year: "2023",
  },
  {
    id: 3,
    title: "Sustainable School Complex",
    category: "Educational",
    location: "Kenema, Sierra Leone",
    image: "/sustainable-school-building-architecture.jpg",
    description:
      "Educational facility with passive cooling, natural lighting, and flexible classroom spaces.",
    features: ["Passive Cooling", "Natural Lighting", "Flexible Spaces"],
    year: "2023",
  },
  {
    id: 4,
    title: "Green Office Building",
    category: "Commercial",
    location: "Freetown, Sierra Leone",
    image: "/green-office-building-sustainable-architecture.jpg",
    description:
      "Modern office space incorporating green walls, energy-efficient systems, and sustainable materials.",
    features: ["Green Walls", "Energy Efficient", "Sustainable Materials"],
    year: "2024",
  },
];

const categories = ["All", "Residential", "Commercial", "Educational"];

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const portfolioRef = useGsapScrollTrigger({ y: 50, stagger: 0.15 });

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <Section>
      <Container>
        <div className="text-center">
          <TypographyH2 className="mb-4">Our Portfolios</TypographyH2>
          <TypographyP className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            {/* Explore our completed projects showcasing sustainable and innovative
            architectural solutions across Sierra Leone. */}
            Work from top Architectures and Constructors nationwide available at
            your disposal
          </TypographyP>

          <Button
            size="lg"
            variant="secondary"
            className="text-lg px-8 transition-all duration-300 hover:scale-105 hover:shadow-xl group"
          >
            View Profiles
            <FiArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </Container>
    </Section>
  );
}
