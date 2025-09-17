import { useState, useEffect, useRef } from "react";
// import { useParams } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
import {
  FiStar,
  FiMapPin,
  FiCalendar,
  FiDollarSign,
  FiClock,
  FiPhone,
  FiMail,
  FiArrowLeft,
  FiExternalLink,
} from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/src/components/ui/Button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/Carousel";
import { Badge } from "@/src/components/ui/Badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/Card";
import { TypographyH3 } from "@/src/components/ui/Typography";
import { CTASection } from "@/src/components/ui/CtaSection";

gsap.registerPlugin(ScrollTrigger);

interface Professional {
  id: number;
  name: string;
  profession: string;
  image: string;
}

interface ProjectDetails {
  id: number;
  name: string;
  type: "Residential" | "Commercial" | "Public";
  location: string;
  coordinates: [number, number];
  year: number;
  status: "Completed" | "In Progress" | "Planning";
  rating: number;
  badges: string[];
  overview: string;
  highlights: string[];
  heroImages: string[];
  progressShots?: string[];
  renders?: string[];
  details: {
    budget: string;
    duration: string;
    materials: string[];
    style: string;
    certifications?: string[];
  };
  professionals: Professional[];
  testimonial?: {
    client: string;
    quote: string;
  };
  relatedProjects: number[];
}

const projectsData: Record<string, ProjectDetails> = {
  "101": {
    id: 101,
    name: "EcoSmart Housing Estate",
    type: "Residential",
    location: "Freetown, Sierra Leone",
    coordinates: [8.4657, -13.2317],
    year: 2023,
    status: "Completed",
    rating: 4.9,
    badges: ["Eco-friendly", "Affordable Housing", "Solar Powered"],
    overview:
      "A modern housing estate designed with sustainable materials and solar energy integration. This innovative project represents the future of affordable housing in Sierra Leone, combining contemporary design with traditional building techniques. The development features 50 family units, each equipped with solar panels, rainwater harvesting systems, and energy-efficient appliances.",
    highlights: [
      "Solar energy integration for 100% renewable power",
      "Affordable construction model reducing costs by 30%",
      "Green building materials sourced locally",
      "Rainwater harvesting system for water conservation",
      "Community spaces and recreational areas",
      "Earthquake-resistant construction techniques",
    ],
    heroImages: [
      "/modern-eco-friendly-housing-estate.jpg",
      "/luxury-hilltop-apartments.jpg",
      "/modern-sustainable-family-home-architecture.jpg",
    ],
    progressShots: [
      "/modern-sustainable-family-home-architecture.jpg",
      "/green-office-building-sustainable-architecture.jpg",
    ],
    renders: [
      "/sustainable-school-building-architecture.jpg",
      "/modern-health-center-building-architecture.jpg",
    ],
    details: {
      budget: "$2.5M",
      duration: "18 months",
      materials: [
        "Local timber",
        "Recycled concrete",
        "Solar panels",
        "Bamboo",
        "Clay bricks",
      ],
      style: "Contemporary Sustainable",
      certifications: ["LEED Gold", "Green Building Council"],
    },
    professionals: [
      {
        id: 1,
        name: "James Kamara",
        profession: "Lead Architect",
        image: "/professional-african-man-constructor.jpg",
      },
      {
        id: 2,
        name: "Fatima Sesay",
        profession: "Structural Engineer",
        image: "/professional-african-woman-architect.jpg",
      },
    ],
    testimonial: {
      client: "Ministry of Housing",
      quote:
        "This project has transformed affordable living in Freetown, setting a new standard for sustainable development in Sierra Leone.",
    },
    relatedProjects: [102, 103, 104],
  },
};

const relatedProjectsData = [
  {
    id: 102,
    name: "Sierra Leone Medical Center",
    type: "Public",
    image: "/modern-health-center-building-architecture.jpg",
    location: "Bo",
    year: 2022,
    rating: 4.8,
    badges: ["Healthcare", "Award-winning"],
    description:
      "State-of-the-art medical facility designed to serve the community with modern healthcare infrastructure.",
  },
  {
    id: 103,
    name: "Green Office Complex",
    type: "Commercial",
    image: "/green-office-building-sustainable-architecture.jpg",
    location: "Freetown",
    year: 2023,
    rating: 4.7,
    badges: ["LEED Certified", "Eco-friendly"],
    description:
      "Modern office complex featuring green building technologies and sustainable design principles.",
  },
  {
    id: 104,
    name: "Community School Project",
    type: "Public",
    image: "/sustainable-school-building-architecture.jpg",
    location: "Kenema",
    year: 2022,
    rating: 4.9,
    badges: ["Educational", "Community Impact"],
    description:
      "Educational facility designed to provide a quality learning environment for local community children.",
  },
];

export default function ProjectDetailsPage() {
  const params = useParams();
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const heroRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const projectId = params.id as string;
      const projectData = projectsData[projectId];

      if (projectData) {
        setProject(projectData);
      }
      setLoading(false);
    };

    fetchProject();
  }, [params.id]);

  useEffect(() => {
    if (!project) return;

    if (sectionsRef.current) {
      const sections = sectionsRef.current.querySelectorAll(".animate-section");

      gsap.fromTo(
        sections,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [project]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The project you're looking for doesn't exist.
          </p>
          <Link to="/projects">
            <Button>
              <FiArrowLeft className="mr-2" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative bg-amber-300 h-[90vh] overflow-hidden"
      >
        {/* Back Button */}
        {/* <div className="absolute top-0 left-0 z-50">
          <Link to="/projects">
            <Button variant="ghost" className="p-0 m-0">
              <FiArrowLeft className="text-white text-4xl" />
              Back to Projects
            </Button>
          </Link>
        </div> */}

        {/* Back Button */}
        <div className="absolute top-0 left-0 z-50">
          <Link to="/projects">
            <Button
              variant="ghost"
              className="p-0 m-0 flex items-center gap-2 text-white"
            >
              <FiArrowLeft className="w-8 h-8 shrink-0 text-4xl" />
              <span>Back to Projects</span>
            </Button>
          </Link>
        </div>

        <Carousel className="h-full">
          <CarouselContent>
            {project.heroImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[90vh]">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${project.name} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-black/30" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-6" />
          <CarouselNext className="right-6" />
        </Carousel>

        {/* Project Name Overlay */}
        <div className="absolute bottom-4 left-8 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-2">
            {project.name}
          </h1>
          <div className="flex flex-wrap gap-2 mb-2">
            {project.badges.map((badge) => (
              <Badge
                key={badge}
                variant="secondary"
                className="bg-white/20 text-white border-white/30"
              >
                {badge}
              </Badge>
            ))}
          </div>
          <p className="text-xl opacity-90">{project.location}</p>
        </div>
      </div>

      <div
        ref={sectionsRef}
        className="container mx-auto px-6 max-w-7xl py-12 space-y-16"
      >
        {/* Overview Section */}
        <div className="animate-section">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-6">Project Overview</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {project.overview}
              </p>

              <h3 className="text-xl font-semibold mb-4">Key Highlights</h3>
              <ul className="space-y-2">
                {project.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-1 h-1 bg-accent rounded-full mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Testimonial */}
            {project.testimonial && (
              <Card className="h-fit">
                <CardContent className="p-6">
                  <blockquote className="text-lg italic mb-4">
                    "{project.testimonial.quote}"
                  </blockquote>
                  <cite className="text-sm font-medium text-accent">
                    — {project.testimonial.client}
                  </cite>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Project Metadata */}
        <div className="animate-section">
          <h2 className="text-3xl font-bold mb-8">Project Details</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <FiCalendar className="w-4 h-4 text-accent mx-auto mb-3" />
                <TypographyH3 className=" text-2xl font-semibold mb-1">
                  Year
                </TypographyH3>
                <p className="text-muted-foreground">{project.year}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <FiDollarSign className="w-4 h-4 text-accent mx-auto mb-3" />
                <TypographyH3 className=" text-2xl font-semibold mb-1">
                  Budget
                </TypographyH3>
                <p className="text-muted-foreground">
                  {project.details.budget}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <FiClock className="w-4 h-4 text-accent mx-auto mb-3" />
                <TypographyH3 className=" text-2xl font-semibold mb-1">
                  Duration
                </TypographyH3>
                <p className="text-muted-foreground">
                  {project.details.duration}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <FiStar className="w-4 h-4 text-accent mx-auto mb-3" />
                <TypographyH3 className=" text-2xl font-semibold mb-1">
                  Rating
                </TypographyH3>
                <p className="text-muted-foreground">{project.rating}/5.0</p>
              </CardContent>
            </Card>
          </div>

          {/* Map Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Project Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <FiMapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Interactive Map</p>
                  <p className="text-sm text-muted-foreground">
                    {project.location}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Coordinates: {project.coordinates[0]},{" "}
                    {project.coordinates[1]}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gallery Section */}
        <div className="animate-section space-y-8">
          <h2 className="text-3xl font-bold">Project Gallery</h2>

          {/* Progress Shots */}
          {project.progressShots && project.progressShots.length > 0 && (
            <div className="md:flex flex-col items-end justify-end">
              <h3 className="text-xl font-semibold mb-4">
                Construction Progress
              </h3>
              <div className="relative w-full md:w-[80%] h-[350px] md:h-[400px] lg:h-[450px]">
                <Carousel className="overflow-hidden">
                  <CarouselContent>
                    {project.progressShots.map((image, index) => (
                      <CarouselItem
                        key={index}
                        // className="md:basis-1/2 lg:basis-1/3"
                      >
                        <div className="relative h-[350px] md:h-[400px] lg:h-[450px]">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Progress shot ${index + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>
              </div>
            </div>
          )}

          {/* Architectural Renders */}
          {project.renders && project.renders.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Architectural Renders
              </h3>
              <div className="relative w-full md:w-[80%] h-[350px] md:h-[400px] lg:h-[450px]">
                <Carousel className="overflow-hidden">
                  <CarouselContent>
                    {project.renders.map((image, index) => (
                      <CarouselItem
                        key={index}
                        // className="md:basis-1/2 lg:basis-1/3"
                      >
                        <div className="relative h-[350px] md:h-[400px] lg:h-[450px]">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Render ${index + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>
              </div>
            </div>
          )}
        </div>

        {/* Associated Professionals */}
        <div className="animate-section">
          <h2 className="text-3xl font-bold mb-8">Project Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {project.professionals.map((professional) => (
              <Card
                key={professional.id}
                className="py-4 rounded-none md:py-2 text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="md:p-2 p-4">
                  <img
                    src={professional.image || "/placeholder.svg"}
                    alt={professional.name}
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                    loading="lazy"
                  />
                  <TypographyH3 className="font-semibold text-lg">
                    {professional.name}
                  </TypographyH3>
                  <p className="text-muted-foreground mb-2">
                    {professional.profession}
                  </p>
                  <Link to={`/profiles/${professional.id}`}>
                    <Button variant="outline" size="sm" className="w-[80%] h-6">
                      View Profile
                      <FiExternalLink className="ml-2 w-2 h-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Technical Details */}
        <div className="animate-section">
          <h2 className="text-3xl font-bold mb-8">Technical Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Materials Used</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.details.materials.map((material, index) => (
                    <Badge key={index} variant="outline">
                      {material}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Design Style</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">{project.details.style}</p>
              </CardContent>
            </Card>

            {project.details.certifications && (
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Certifications & Awards</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.details.certifications.map((cert, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-accent/10 text-accent"
                      >
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className="animate-section">
          {/* <Card className="bg-accent/5 border-accent/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">
                Interested in a Similar Project?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Contact SAAS today to discuss your architectural needs and get a
                free consultation for your next project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-accent hover:bg-accent/90">
                  <FiPhone className="mr-2" />
                  Contact SAAS
                </Button>
                <Button size="lg" variant="outline">
                  <FiMail className="mr-2" />
                  Request Free Estimation
                </Button>
              </div>
            </CardContent>
          </Card> */}

          <CTASection
            title="Ready to Start Your Project?"
            description="Contact SAAS today to discuss your architectural needs and get a
                free consultation for your next project."
            primaryButtonText="Contact SAAS"
            secondaryButtonText="Request Free Estimation"
            primaryButtonLink="/contact"
            secondaryButtonLink="/contact"
            primaryButtonIcon={<FiPhone className="mr-2" />}
            secondaryButtonIcon={<FiMail className="mr-2" />}
            className="-mx-12"
          />
        </div>

        {/* Related Projects */}
        <div className="animate-section">
          <h2 className="text-3xl font-bold mb-8">Related Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {relatedProjectsData.map((relatedProject) => (
              <Card
                key={relatedProject.id}
                className="group py-2 rounded-none overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={relatedProject.image || "/placeholder.svg"}
                    alt={relatedProject.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge
                      variant="secondary"
                      className="bg-background/90 text-foreground"
                    >
                      {relatedProject.type}
                    </Badge>
                  </div>
                </div>
                <CardContent className="px-4 pb-2">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                    {relatedProject.name}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <FiMapPin size={14} />
                      {relatedProject.location}
                    </div>
                    {relatedProject.year && (
                      <div className="flex items-center gap-1">
                        <FiCalendar size={14} />
                        {relatedProject.year}
                      </div>
                    )}
                    {typeof relatedProject.rating !== "undefined" && (
                      <div className="flex items-center gap-1">
                        <FiStar size={14} className="text-yellow-500" />
                        {relatedProject.rating}
                      </div>
                    )}
                  </div>

                  {relatedProject.description && (
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-3">
                      {relatedProject.description}
                    </p>
                  )}

                  {Array.isArray(relatedProject.badges) &&
                    relatedProject.badges.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {relatedProject.badges.map((badge) => (
                          <Badge
                            key={badge}
                            variant="outline"
                            className="text-xs"
                          >
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    )}

                  <div className="flex items-center justify-between">
                    <Button
                      className=" w-full transition-all duration-300 hover:scale-105"
                      asChild
                    >
                      <Link to={`/projects/${relatedProject.id}`}>
                        View Project
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Contact Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg transition-all duration-300 hover:w-auto w-14 h-14 group"
          asChild
        >
          <a href="tel:+23280126121">
            <FiPhone className="h-6 w-6 group hover:mr-2 transition-all duration-300" />
            <span className=" hidden group-hover:block opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
              Contact
            </span>
          </a>
        </Button>
      </div>
    </div>
  );
}
