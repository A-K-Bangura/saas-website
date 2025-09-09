import { useState, useEffect, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent } from "@/components/ui/card";
import {
  FiSearch,
  FiFilter,
  FiStar,
  FiMapPin,
  FiCalendar,
  FiX,
} from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent } from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { Badge } from "@/src/components/ui/Badge";

gsap.registerPlugin(ScrollTrigger);

interface Professional {
  id: number;
  name: string;
  profession: string;
  image: string;
}

interface Project {
  id: number;
  name: string;
  type: "Residential" | "Commercial" | "Public";
  location: string;
  year: number;
  rating: number;
  image: string;
  badges: string[];
  description: string;
  professional: Professional;
  detailsLink: string;
}

const projects: Project[] = [
  {
    id: 101,
    name: "EcoSmart Housing Estate",
    type: "Residential",
    location: "Freetown",
    year: 2023,
    rating: 4.9,
    image: "/modern-sustainable-family-home-architecture.jpg",
    badges: ["Eco-friendly", "Affordable Housing"],
    description:
      "A modern housing estate designed with sustainable materials and solar energy integration for affordable living.",
    professional: {
      id: 1,
      name: "James Kamara",
      profession: "Architect",
      image: "/professional-african-man-constructor.jpg",
    },
    detailsLink: "/projects/ecosmart-housing",
  },
  {
    id: 102,
    name: "Sierra Leone Medical Center",
    type: "Public",
    location: "Bo",
    year: 2022,
    rating: 4.8,
    image: "/modern-health-center-building-architecture.jpg",
    badges: ["Award-winning", "Healthcare"],
    description:
      "State-of-the-art medical facility designed to serve the community with modern healthcare infrastructure.",
    professional: {
      id: 2,
      name: "Fatima Sesay",
      profession: "Architect",
      image: "/professional-african-woman-architect.jpg",
    },
    detailsLink: "/projects/medical-center",
  },
  {
    id: 103,
    name: "Green Office Complex",
    type: "Commercial",
    location: "Freetown",
    year: 2023,
    rating: 4.7,
    image: "/green-office-building-sustainable-architecture.jpg",
    badges: ["Eco-friendly", "LEED Certified"],
    description:
      "Modern office complex featuring green building technologies and sustainable design principles.",
    professional: {
      id: 3,
      name: "Mohamed Bangura",
      profession: "Civil Engineer",
      image: "/professional-african-man-constructor-2.jpg",
    },
    detailsLink: "/projects/green-office",
  },
  {
    id: 104,
    name: "Community School Project",
    type: "Public",
    location: "Kenema",
    year: 2022,
    rating: 4.9,
    image: "/sustainable-school-building-architecture.jpg",
    badges: ["Community Impact", "Educational"],
    description:
      "Educational facility designed to provide quality learning environment for local community children.",
    professional: {
      id: 4,
      name: "Aminata Koroma",
      profession: "Architect",
      image: "/professional-african-woman-architect-2.jpg",
    },
    detailsLink: "/projects/community-school",
  },
  {
    id: 105,
    name: "Luxury Residential Villa",
    type: "Residential",
    location: "Freetown",
    year: 2023,
    rating: 4.8,
    image: "/modern-sustainable-architecture-building-in-sierra.jpg",
    badges: ["Luxury", "Custom Design"],
    description:
      "High-end residential villa featuring contemporary design with traditional Sierra Leonean architectural elements.",
    professional: {
      id: 5,
      name: "Ibrahim Turay",
      profession: "Architect",
      image: "/professional-african-man-constructor-3.jpg",
    },
    detailsLink: "/projects/luxury-villa",
  },
  {
    id: 106,
    name: "Sustainable Market Complex",
    type: "Commercial",
    location: "Makeni",
    year: 2022,
    rating: 4.6,
    image: "/community-building-architecture-sierra-leone-local.jpg",
    badges: ["Sustainable", "Community"],
    description:
      "Modern market facility designed to support local commerce while incorporating sustainable building practices.",
    professional: {
      id: 6,
      name: "Adama Conteh",
      profession: "Civil Engineer",
      image: "/professional-african-woman-architect-3.jpg",
    },
    detailsLink: "/projects/market-complex",
  },
];

const projectTypes = ["All", "Residential", "Commercial", "Public"];
const locations = ["All", "Freetown", "Bo", "Kenema", "Makeni"];
const years = ["All", "2023", "2022", "2021"];
const ratings = ["All", "4.5+", "4.0+", "3.5+"];

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState(projects);

  const cardsRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP animations
    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [filteredProjects]);

  useEffect(() => {
    let filtered = projects;

    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          project.badges.some((badge) =>
            badge.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    if (selectedType !== "All") {
      filtered = filtered.filter((project) => project.type === selectedType);
    }

    if (selectedLocation !== "All") {
      filtered = filtered.filter(
        (project) => project.location === selectedLocation
      );
    }

    if (selectedYear !== "All") {
      filtered = filtered.filter(
        (project) => project.year.toString() === selectedYear
      );
    }

    if (selectedRating !== "All") {
      const minRating = Number.parseFloat(selectedRating.replace("+", ""));
      filtered = filtered.filter((project) => project.rating >= minRating);
    }

    setFilteredProjects(filtered);
  }, [
    searchTerm,
    selectedType,
    selectedLocation,
    selectedYear,
    selectedRating,
  ]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedType("All");
    setSelectedLocation("All");
    setSelectedYear("All");
    setSelectedRating("All");
  };

  const hasActiveFilters =
    searchTerm ||
    selectedType !== "All" ||
    selectedLocation !== "All" ||
    selectedYear !== "All" ||
    selectedRating !== "All";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-secondary text-secondary-foreground py-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Projects
            </h1>
            <p className="text-xl text-secondary-foreground/80 max-w-2xl mx-auto">
              Explore our portfolio of sustainable and innovative architectural
              projects across Sierra Leone
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-2 max-w-7xl py-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Desktop Filter Panel */}
          <div className="hidden lg:block w-70 flex-shrink-0">
            <div className="sticky top-24" ref={filtersRef}>
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Clear All
                    </Button>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Search */}
                  {/* <div>
                    <label className="text-sm font-medium mb-2 block">
                      Search
                    </label>
                    <div className="relative">
                      <FiSearch
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                        size={16}
                      />
                      <Input
                        placeholder="Search projects..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div> */}

                  {/* Project Type */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Project Type
                    </label>
                    <div className="space-y-2">
                      {projectTypes.map((type) => (
                        <label
                          key={type}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="type"
                            value={type}
                            checked={selectedType === type}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="text-accent focus:ring-accent"
                          />
                          <span className="text-sm">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Location
                    </label>
                    <div className="space-y-2">
                      {locations.map((location) => (
                        <label
                          key={location}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="location"
                            value={location}
                            checked={selectedLocation === location}
                            onChange={(e) =>
                              setSelectedLocation(e.target.value)
                            }
                            className="text-accent focus:ring-accent"
                          />
                          <span className="text-sm">{location}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Year */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Year
                    </label>
                    <div className="space-y-2">
                      {years.map((year) => (
                        <label
                          key={year}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="year"
                            value={year}
                            checked={selectedYear === year}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="text-accent focus:ring-accent"
                          />
                          <span className="text-sm">{year}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Rating
                    </label>
                    <div className="space-y-2">
                      {ratings.map((rating) => (
                        <label
                          key={rating}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="rating"
                            value={rating}
                            checked={selectedRating === rating}
                            onChange={(e) => setSelectedRating(e.target.value)}
                            className="text-accent focus:ring-accent"
                          />
                          <span className="text-sm">{rating}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Search and Filter Toggle */}
            <div className="lg:hidden mb-6 space-y-4">
              <div className="relative">
                <FiSearch
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  size={16}
                />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="flex items-center gap-2"
                >
                  <FiFilter size={16} />
                  Filters
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="ml-1">
                      Active
                    </Badge>
                  )}
                </Button>
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                )}
              </div>

              {/* Mobile Filters */}
              {showMobileFilters && (
                <Card className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Filters</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowMobileFilters(false)}
                      >
                        <FiX size={16} />
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Type
                        </label>
                        <select
                          value={selectedType}
                          onChange={(e) => setSelectedType(e.target.value)}
                          className="w-full p-2 border rounded-md"
                        >
                          {projectTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Location
                        </label>
                        <select
                          value={selectedLocation}
                          onChange={(e) => setSelectedLocation(e.target.value)}
                          className="w-full p-2 border rounded-md"
                        >
                          {locations.map((location) => (
                            <option key={location} value={location}>
                              {location}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Year
                        </label>
                        <select
                          value={selectedYear}
                          onChange={(e) => setSelectedYear(e.target.value)}
                          className="w-full p-2 border rounded-md"
                        >
                          {years.map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Rating
                        </label>
                        <select
                          value={selectedRating}
                          onChange={(e) => setSelectedRating(e.target.value)}
                          className="w-full p-2 border rounded-md"
                        >
                          {ratings.map((rating) => (
                            <option key={rating} value={rating}>
                              {rating}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </div>

            {/* Results Count */}
            <div className="mb-2">
              {/* Desktop Search */}
              <div className="w-[70%] mx-auto hidden lg:block mb-4">
                <div className="relative">
                  <FiSearch
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    size={16}
                  />
                  <Input
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <p className="text-muted-foreground">
                Showing {filteredProjects.length} of {projects.length} projects
              </p>
            </div>

            {/* Projects Grid */}
            <div
              ref={cardsRef}
              className="grid grid-cols-1 md:grid-cols-2 gap-2"
            >
              {filteredProjects.map((project) => (
                <Card
                  key={project.id}
                  className="group rounded-none overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.name}
                      width={400}
                      height={250}
                      loading="lazy"
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge
                        variant="secondary"
                        className="bg-background/90 text-foreground"
                      >
                        {project.type}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="px-4">
                    <div className="mb-3">
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                        {project.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <FiMapPin size={14} />
                          {project.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <FiCalendar size={14} />
                          {project.year}
                        </div>
                        <div className="flex items-center gap-1">
                          <FiStar size={14} className="text-yellow-500" />
                          {project.rating}
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.badges.map((badge) => (
                        <Badge
                          key={badge}
                          variant="outline"
                          className="text-xs"
                        >
                          {badge}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <Button className="transition-all duration-300 hover:scale-105">
                        View Details
                      </Button>
                      <div className="flex items-center gap-2">
                        <img
                          src={project.professional.image || "/placeholder.svg"}
                          alt={project.professional.name}
                          width={32}
                          height={32}
                          loading="lazy"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="text-xs">
                          <p className="font-medium">
                            {project.professional.name}
                          </p>
                          <p className="text-muted-foreground">
                            {project.professional.profession}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* No Results */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  No projects found matching your criteria.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
