import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FiSearch, FiStar, FiMapPin, FiCalendar, FiMail, FiArrowLeft } from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/src/components/ui/Button";
import { Badge } from "@/src/components/ui/Badge";
import { Input } from "@/src/components/ui/Input";
import { Card, CardContent } from "@/src/components/ui/Card";
import { Skeleton } from "@/src/components/ui/Skeleton";
import { api, type Professional } from "@/src/lib/api";

gsap.registerPlugin(ScrollTrigger);

export default function ProfileProjectsPage() {
  const params = useParams();
  const navigate = useNavigate();
  const profileId = params.id as string;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);

  const [professional, setProfessional] = useState<Professional | null>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);

  const profilePanelRef = useRef<HTMLDivElement>(null);
  const projectsGridRef = useRef<HTMLDivElement>(null);

  // Load professional and projects
  useEffect(() => {
    if (profileId) {
      loadProfessional();
      loadProjects();
    }
  }, [profileId]);

  const loadProfessional = async () => {
    setIsLoading(true);
    try {
      const data = await api.getProfessional(profileId);
      setProfessional(data);
    } catch (error) {
      console.error("Failed to load professional:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadProjects = async () => {
    setIsLoadingProjects(true);
    try {
      const response = await api.getProfessionalProjects(profileId);
      setProjects(response.data);
    } catch (error) {
      console.error("Failed to load projects:", error);
      setProjects([]);
    } finally {
      setIsLoadingProjects(false);
    }
  };

  useEffect(() => {
    if (!professional) return;

    // GSAP animations
    const ctx = gsap.context(() => {
      // Profile panel slide in animation
      if (profilePanelRef.current) {
        gsap.fromTo(
          profilePanelRef.current,
          { x: -100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: profilePanelRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Project cards fade in
      if (projectsGridRef.current) {
        gsap.fromTo(
          ".project-card",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: projectsGridRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [professional]);

  useEffect(() => {
    let filtered = projects;

    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType !== "All") {
      filtered = filtered.filter((project) => project.type === selectedType);
    }

    if (selectedYear !== "All") {
      filtered = filtered.filter(
        (project) => project.year?.toString() === selectedYear
      );
    }

    if (selectedLocation !== "All") {
      filtered = filtered.filter(
        (project) => project.location === selectedLocation
      );
    }

    setFilteredProjects(filtered);
  }, [
    searchTerm,
    selectedType,
    selectedYear,
    selectedLocation,
    selectedRating,
    projects,
  ]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Skeleton className="h-8 w-48 mx-auto mb-4" />
          <Skeleton className="h-4 w-32 mx-auto" />
        </div>
      </div>
    );
  }

  if (!professional) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
          <Button onClick={() => navigate("/profiles")}>
            <FiArrowLeft className="mr-2" />
            Back to Profiles
          </Button>
        </div>
      </div>
    );
  }

  const projectTypes = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.type).filter(Boolean))),
  ];
  const projectYears = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.year?.toString()).filter(Boolean)))
      .sort()
      .reverse(),
  ];
  const projectLocations = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.location).filter(Boolean))),
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Layout */}
      <div className="hidden lg:relative pt-4 lg:grid lg:grid-cols-12">
        {/* Search Bar */}
        <div className="lg:col-span-8 lg:col-start-5">
          <div className="mb-4">
            <div className="relative max-w-md">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Projects Header */}
          <div className="mb-2">
            <h2 className="text-3xl font-bold mb-8">
              Projects by {professional.name}
            </h2>
          </div>
        </div>

        {/* Fixed Left Panel - 20% width */}
        <div className="lg:col-span-4">
          <div
            ref={profilePanelRef}
            className="sticky top-40 mb-8 left-0 bg-black h-[70vh] text-white z-10 flex flex-col justify-center"
            // className="relative left-0 top-1/2 -translate-y-1/2 w-full bg-black h-[70vh] text-white overflow-y-auto z-10 flex flex-col justify-center"
          >
            {/* Profile Image - Overlapping top */}
            <div className="absolute pl-12 -top-10 w-full z-100">
              <div className="flex justify-center">
                <div className="relative">
                  <img
                    src={professional.photo || "/placeholder.svg"}
                    alt={professional.name}
                    width={120}
                    height={120}
                    className="rounded-full border-4 border-red-500 shadow-lg"
                  />
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="pl-16 pr-4 scrollbar-hide pb-4 pt-6 h-full overflow-y-auto ">
              <h1 className="text-2xl font-bold mb-2 text-center">
                {professional.name}
              </h1>
              {professional.headline && (
                <p className="text-gray-300 text-center mb-1 text-sm">
                  {professional.headline}
                </p>
              )}
              <p className="text-gray-300 text-center mb-4 capitalize">
                {professional.profession_type}
              </p>

              <div className="space-y-2 mb-6">
                {professional.location && (
                  <div className="flex items-center gap-2 text-sm">
                    <FiMapPin className="text-green-500" />
                    <span>{professional.location}</span>
                  </div>
                )}
                {professional.experience_years !== undefined && (
                  <div className="flex items-center gap-2 text-sm">
                    <FiCalendar className="text-green-500" />
                    <span>{professional.experience_years} years experience</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <FiStar className="text-yellow-500" />
                  <span>
                    {professional.rating?.toFixed(1) || "N/A"} ({professional.projects_count || 0} projects)
                  </span>
                </div>
              </div>

              {/* Specialties */}
              {professional.specialties && professional.specialties.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold mb-2">Specialties</h3>
                  <div className="flex flex-wrap gap-1">
                    {professional.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Bio */}
              {professional.bio && (
                <div className="mb-6">
                  <p className="text-sm text-gray-300 line-clamp-4">{professional.bio}</p>
                </div>
              )}

              {/* Contact Button */}
              {professional.contact_email && (
                <div className="mb-8">
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    asChild
                  >
                    <a href={`mailto:${professional.contact_email}`}>
                      <FiMail className="mr-2 h-4 w-4" />
                      Contact {professional.name.split(" ")[0]}
                    </a>
                  </Button>
                </div>
              )}

              {/* Filters */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Filter Projects</h3>

                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white text-sm"
                  >
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Year</label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white text-sm"
                  >
                    {projectYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Location
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white text-sm"
                  >
                    {projectLocations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Min Rating
                  </label>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedType("All");
                    setSelectedYear("All");
                    setSelectedLocation("All");
                    setSelectedRating("All");
                    setSearchTerm("");
                  }}
                  className="w-full text-white bg-black border-gray-600 hover:bg-gray-800"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - 80% width with left margin */}
        <div className="lg:col-span-8 p-2 pt-0">
          {/* Search Bar */}
          {/* <div>
            <div className="mb-8">
              <div className="relative max-w-md">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div> */}

          {/* Projects Header */}
          {/* <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">
                Projects by {profile.name}
              </h2>
              <p className="text-muted-foreground">
                Showing {filteredProjects.length} of {projects.length} projects
              </p>
            </div>
          </div> */}
          <div className="mb-1">
            <p className="text-muted-foreground text-sm">
              Showing {filteredProjects.length} of {projects.length} projects
            </p>
          </div>

          {/* Projects Grid */}
          {isLoadingProjects ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="rounded-none">
                  <Skeleton className="w-full h-48" />
                  <CardContent className="px-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div
              ref={projectsGridRef}
              className="grid grid-cols-1 lg:grid-cols-2 gap-2"
            >
              {filteredProjects.map((project) => (
                <Card
                  key={project.id}
                  className="project-card group rounded-none overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.hero_images?.[0] || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {project.type && (
                      <div className="absolute top-4 left-4">
                        <Badge
                          variant="secondary"
                          className="bg-background/90 text-foreground"
                        >
                          {project.type}
                        </Badge>
                      </div>
                    )}
                  </div>

                  <CardContent className="px-4">
                    <div className="mb-3">
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        {project.location && (
                          <div className="flex items-center gap-1">
                            <FiMapPin size={14} />
                            {project.location}
                          </div>
                        )}
                        {project.year && (
                          <div className="flex items-center gap-1">
                            <FiCalendar size={14} />
                            {project.year}
                          </div>
                        )}
                        {project.status && (
                          <Badge variant="outline" className="text-xs">
                            {project.status}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {project.description && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {project.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <Button
                        className="w-full transition-all duration-300 hover:scale-105"
                        asChild
                      >
                        <Link to={`/projects/${project.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No projects found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Profile Header */}
        {professional && (
          <div className="bg-black text-white p-6">
            <div className="flex flex-col items-center text-center">
              <img
                src={professional.photo || "/placeholder.svg"}
                alt={professional.name}
                width={100}
                height={100}
                className="rounded-full border-4 border-white shadow-lg mb-4"
              />
              <h1 className="text-2xl font-bold mb-1">{professional.name}</h1>
              {professional.headline && (
                <p className="text-gray-300 text-sm mb-1">{professional.headline}</p>
              )}
              <p className="text-gray-300 mb-4 capitalize">{professional.profession_type}</p>

              <div className="flex flex-wrap justify-center gap-4 text-sm mb-4">
                {professional.location && (
                  <div className="flex items-center gap-1">
                    <FiMapPin className="text-green-500" />
                    <span>{professional.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <FiStar className="text-yellow-500" />
                  <span>{professional.rating?.toFixed(1) || "N/A"}</span>
                </div>
              </div>

              {professional.specialties && professional.specialties.length > 0 && (
                <div className="flex flex-wrap justify-center gap-1 mb-4">
                  {professional.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="p-6 bg-gray-50">
          <div className="space-y-4">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="p-2 border rounded text-sm"
              >
                {projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="p-2 border rounded text-sm"
              >
                {projectYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedType("All");
                setSelectedYear("All");
                setSelectedLocation("All");
                setSelectedRating("All");
                setSearchTerm("");
              }}
              className="w-full"
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Projects List */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">
            Projects ({filteredProjects.length})
          </h2>

          <div className="space-y-6">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="group overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.hero_images?.[0] || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {project.type && (
                    <div className="absolute top-4 left-4">
                      <Badge
                        variant="secondary"
                        className="bg-background/90 text-foreground"
                      >
                        {project.type}
                      </Badge>
                    </div>
                  )}
                </div>
                <CardContent className="px-4 pb-4">
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      {project.location && (
                        <div className="flex items-center gap-1">
                          <FiMapPin size={14} />
                          {project.location}
                        </div>
                      )}
                      {project.year && (
                        <div className="flex items-center gap-1">
                          <FiCalendar size={14} />
                          {project.year}
                        </div>
                      )}
                      {project.status && (
                        <Badge variant="outline" className="text-xs">
                          {project.status}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {project.description && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {project.description}
                    </p>
                  )}

                  <Button
                    className="w-full transition-all duration-300 hover:scale-105"
                    asChild
                  >
                    <Link to={`/projects/${project.id}`}>View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No projects found matching your criteria.
              </p>
            </div>
          )}
        </div>

        {/* Floating Contact Button */}
        {professional?.contact_email && (
          <div className="fixed bottom-6 right-6 z-50">
            <Button
              size="lg"
              className="rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg"
              asChild
            >
              <a href={`mailto:${professional.contact_email}`}>
                <FiMail className="h-5 w-5" />
              </a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
