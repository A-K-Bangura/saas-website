import { useState, useEffect, useRef } from "react";
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
  FiUser,
} from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/src/components/ui/Button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/src/components/ui/Carousel";
import { Badge } from "@/src/components/ui/Badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/Card";
import { Skeleton } from "@/src/components/ui/Skeleton";
import { TypographyH3 } from "@/src/components/ui/Typography";
import { CTASection } from "@/src/components/ui/CtaSection";
import { api, type Project } from "@/src/lib/api";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectDetailsPage() {
  const params = useParams<{ project: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [heroApi, setHeroApi] = useState<CarouselApi>();
  const [progressApi, setProgressApi] = useState<CarouselApi>();
  const [rendersApi, setRendersApi] = useState<CarouselApi>();

  const heroRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        const projectParam = params.project as string;
        if (!projectParam) {
          setProject(null);
          setLoading(false);
          return;
        }
        // Try to convert to number if it's a numeric string, otherwise use as-is
        const projectId = /^\d+$/.test(projectParam) ? parseInt(projectParam, 10) : projectParam;
        const projectData = await api.getProject(projectId);
        setProject(projectData);
      } catch (error) {
        console.error("Failed to load project:", error);
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    if (params.project) {
      fetchProject();
    }
  }, [params.project]);

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

  // Auto-play hero carousel every 5 seconds
  useEffect(() => {
    if (!heroApi) return;

    const interval = setInterval(() => {
      heroApi.scrollNext();
    }, 7000);

    return () => clearInterval(interval);
  }, [heroApi]);

  // Auto-play progress carousel on hover0008970-=-
  const handleProgressMouseEnter = () => {
    if (!progressApi) return;

    const interval = setInterval(() => {
      progressApi.scrollNext();
    }, 7000);

    // Store interval ID for cleanup
    (progressApi as any).autoPlayInterval = interval;
  };

  const handleProgressMouseLeave = () => {
    if (progressApi && (progressApi as any).autoPlayInterval) {
      clearInterval((progressApi as any).autoPlayInterval);
      (progressApi as any).autoPlayInterval = null;
    }
  };

  // Auto-play renders carousel on hover
  const handleRendersMouseEnter = () => {
    if (!rendersApi) return;

    const interval = setInterval(() => {
      rendersApi.scrollNext();
    }, 7000);

    // Store interval ID for cleanup
    (rendersApi as any).autoPlayInterval = interval;
  };

  const handleRendersMouseLeave = () => {
    if (rendersApi && (rendersApi as any).autoPlayInterval) {
      clearInterval((rendersApi as any).autoPlayInterval);
      (rendersApi as any).autoPlayInterval = null;
    }
  };

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

        <Carousel
          className="h-full"
          setApi={setHeroApi}
          opts={{
            loop: true,
            duration: 20,
            dragFree: false,
          }}
        >
          <CarouselContent>
            {((project.hero_images && project.hero_images.length > 0) ? project.hero_images : ["/placeholder.svg"]).map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[90vh]">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${project.title} - Image ${index + 1}`}
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
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-2 mb-2">
            {project.type && (
              <Badge
                variant="secondary"
                className="bg-white/20 text-white border-white/30"
              >
                {project.type}
              </Badge>
            )}
            {project.status && (
              <Badge
                variant="secondary"
                className="bg-white/20 text-white border-white/30 capitalize"
              >
                {project.status}
              </Badge>
            )}
          </div>
          {project.location && (
            <p className="text-xl opacity-90">{project.location}</p>
          )}
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
              {project.description && (
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>
              )}

              {project.details && project.details.length > 0 && (
                <>
                  <h3 className="text-xl font-semibold mb-4">Technical Details</h3>
                  <ul className="space-y-2">
                    {project.details.map((detail, index) => {
                      const key = typeof detail === 'object' && detail !== null && 'key' in detail ? detail.key : `Detail ${index + 1}`;
                      const value = typeof detail === 'object' && detail !== null && 'value' in detail ? detail.value : String(detail);
                      return (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-1 h-1 bg-accent rounded-full mt-1 flex-shrink-0" />
                          <span className="text-muted-foreground">
                            <strong>{key}:</strong> {value}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </div>

            {/* Professionals */}
            {project.professionals && project.professionals.length > 0 && (
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle>Team</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {project.professionals.map((professional) => (
                      <div key={professional.id} className="flex items-center gap-3">
                        {professional.photo && (
                          <img
                            src={professional.photo}
                            alt={professional.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <p className="font-medium">{professional.name}</p>
                          <p className="text-sm text-muted-foreground capitalize">
                            {professional.profession_type}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Project Metadata */}
        <div className="animate-section">
          <h2 className="text-3xl font-bold mb-8">Project Details</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {project.year && (
              <Card>
                <CardContent className="p-4 text-center">
                  <FiCalendar className="w-4 h-4 text-accent mx-auto mb-3" />
                  <TypographyH3 className=" text-2xl font-semibold mb-1">
                    Year
                  </TypographyH3>
                  <p className="text-muted-foreground">{project.year}</p>
                </CardContent>
              </Card>
            )}

            {project.budget && (
              <Card>
                <CardContent className="p-4 text-center">
                  <FiDollarSign className="w-4 h-4 text-accent mx-auto mb-3" />
                  <TypographyH3 className=" text-2xl font-semibold mb-1">
                    Budget
                  </TypographyH3>
                  <p className="text-muted-foreground">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'SLL',
                      minimumFractionDigits: 0,
                    }).format(project.budget)}
                  </p>
                </CardContent>
              </Card>
            )}

            {project.duration && (
              <Card>
                <CardContent className="p-4 text-center">
                  <FiClock className="w-4 h-4 text-accent mx-auto mb-3" />
                  <TypographyH3 className=" text-2xl font-semibold mb-1">
                    Duration
                  </TypographyH3>
                  <p className="text-muted-foreground">
                    {project.duration}
                  </p>
                </CardContent>
              </Card>
            )}

            {project.professionals_count !== undefined && (
              <Card>
                <CardContent className="p-4 text-center">
                  <FiUser className="w-4 h-4 text-accent mx-auto mb-3" />
                  <TypographyH3 className=" text-2xl font-semibold mb-1">
                    Team
                  </TypographyH3>
                  <p className="text-muted-foreground">
                    {project.professionals_count} professional{project.professionals_count !== 1 ? "s" : ""}
                  </p>
                </CardContent>
              </Card>
            )}
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
          {project.progress_images && project.progress_images.length > 0 && (
            <div className="md:flex flex-col items-end justify-end">
              <h3 className="text-xl font-semibold mb-4">
                Construction Progress
              </h3>
              <div
                className="relative w-full md:w-[80%] h-[350px] md:h-[400px] lg:h-[450px]"
                onMouseEnter={handleProgressMouseEnter}
                onMouseLeave={handleProgressMouseLeave}
              >
                <Carousel
                  className="overflow-hidden"
                  setApi={setProgressApi}
                  opts={{
                    loop: true,
                    duration: 20,
                    dragFree: false,
                  }}
                >
                  <CarouselContent>
                    {project.progress_images.map((image, index) => (
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
          {project.render_images && project.render_images.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Architectural Renders
              </h3>
              <div
                className="relative w-full md:w-[80%] h-[350px] md:h-[400px] lg:h-[450px]"
                onMouseEnter={handleRendersMouseEnter}
                onMouseLeave={handleRendersMouseLeave}
              >
                <Carousel
                  className="overflow-hidden"
                  setApi={setRendersApi}
                  opts={{
                    loop: true,
                    duration: 20,
                    dragFree: false,
                  }}
                >
                  <CarouselContent>
                    {project.render_images.map((image, index) => (
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
        {project.professionals && project.professionals.length > 0 && (
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
                      src={professional.photo || "/placeholder.svg"}
                      alt={professional.name}
                      className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                      loading="lazy"
                    />
                    <TypographyH3 className="font-semibold text-lg">
                      {professional.name}
                    </TypographyH3>
                    <p className="text-muted-foreground mb-2 capitalize">
                      {professional.profession_type}
                    </p>
                    {professional.role && (
                      <p className="text-sm text-muted-foreground mb-2">
                        {professional.role}
                      </p>
                    )}
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
        )}

        {/* Technical Details */}
        {project.details && project.details.length > 0 && (
          <div className="animate-section">
            <h2 className="text-3xl font-bold mb-8">Technical Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.details.map((detail, index) => {
                const key = typeof detail === 'object' && detail !== null && 'key' in detail ? detail.key : `Specification ${index + 1}`;
                const value = typeof detail === 'object' && detail !== null && 'value' in detail ? detail.value : String(detail);
                return (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{key}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg">{value}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

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

        {/* Related Projects - Can be added later with API */}
        {/* <div className="animate-section">
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
        </div> */}
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
