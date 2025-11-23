import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
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
import { Skeleton } from "@/src/components/ui/Skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/Select";
import { Link } from "react-router-dom";
import { api, type Project } from "@/src/lib/api";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get values from URL search params with defaults
  const searchTerm = searchParams.get("search") || "";
  const selectedType = searchParams.get("type") || "All";
  const selectedLocation = searchParams.get("location") || "All";
  const selectedYear = searchParams.get("year") || "All";
  const selectedStatus = searchParams.get("status") || "All";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [projectTypes, setProjectTypes] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);

  // Helper function to update URL search params
  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "All" || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.delete("page"); // Reset to page 1 when filters change
    setSearchParams(params);
  };

  const cardsRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);

  // Load projects from API
  useEffect(() => {
    loadProjects();
  }, [searchTerm, selectedType, selectedLocation, selectedYear, selectedStatus, currentPage]);

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const response = await api.getProjects({
        search: searchTerm || undefined,
        type: selectedType !== "All" ? selectedType : undefined,
        location: selectedLocation !== "All" ? selectedLocation : undefined,
        year: selectedYear !== "All" ? parseInt(selectedYear, 10) : undefined,
        status: selectedStatus !== "All" ? selectedStatus : undefined,
        page: currentPage,
        per_page: 12,
      });

      setProjects(response.data);
      setTotalPages(response.meta.last_page);
      setTotalCount(response.meta.total);

      // Extract unique values for filters
      const uniqueTypes = Array.from(new Set(response.data.map(p => p.type).filter(Boolean))) as string[];
      const uniqueLocations = Array.from(new Set(response.data.map(p => p.location).filter(Boolean))) as string[];
      const uniqueYears = Array.from(new Set(response.data.map(p => p.year?.toString()).filter(Boolean))) as string[];

      setProjectTypes(["All", ...uniqueTypes]);
      setLocations(["All", ...uniqueLocations]);
      setYears(["All", ...uniqueYears.sort().reverse()]);
    } catch (error) {
      console.error("Failed to load projects:", error);
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // GSAP animations
    if (cardsRef.current && !isLoading) {
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
  }, [projects, isLoading]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const hasActiveFilters =
    searchTerm ||
    selectedType !== "All" ||
    selectedLocation !== "All" ||
    selectedYear !== "All" ||
    selectedStatus !== "All";

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Desktop Filter Panel */}
          <div className="hidden lg:block lg:col-span-3">
            <div
              className="sticky top-16 self-start max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-thin"
              ref={filtersRef}
            >
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
                    <Select
                      value={selectedType}
                      onValueChange={(value) =>
                        updateSearchParams("type", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All" />
                      </SelectTrigger>
                      <SelectContent>
                        {projectTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Location
                    </label>
                    <Select
                      value={selectedLocation}
                      onValueChange={(value) =>
                        updateSearchParams("location", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Year */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Year
                    </label>
                    <Select
                      value={selectedYear}
                      onValueChange={(value) =>
                        updateSearchParams("year", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Status
                    </label>
                    <Select
                      value={selectedStatus}
                      onValueChange={(value) =>
                        updateSearchParams("status", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Statuses</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="ongoing">Ongoing</SelectItem>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
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
                  onChange={(e) => updateSearchParams("search", e.target.value)}
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
                        <Select
                          value={selectedType}
                          onValueChange={(value) =>
                            updateSearchParams("type", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="All" />
                          </SelectTrigger>
                          <SelectContent>
                            {projectTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Location
                        </label>
                        <Select
                          value={selectedLocation}
                          onValueChange={(value) =>
                            updateSearchParams("location", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="All" />
                          </SelectTrigger>
                          <SelectContent>
                            {locations.map((location) => (
                              <SelectItem key={location} value={location}>
                                {location}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Year
                        </label>
                        <Select
                          value={selectedYear}
                          onValueChange={(value) =>
                            updateSearchParams("year", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="All" />
                          </SelectTrigger>
                          <SelectContent>
                            {years.map((year) => (
                              <SelectItem key={year} value={year}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Status
                        </label>
                        <Select
                          value={selectedStatus}
                          onValueChange={(value) =>
                            updateSearchParams("status", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="All" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="All">All Statuses</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="ongoing">Ongoing</SelectItem>
                            <SelectItem value="upcoming">Upcoming</SelectItem>
                          </SelectContent>
                        </Select>
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
                    onChange={(e) =>
                      updateSearchParams("search", e.target.value)
                    }
                    className="pl-10"
                  />
                </div>
              </div>
              <p className="text-muted-foreground">
                {totalCount} project{totalCount !== 1 ? "s" : ""} found
              </p>
            </div>

            {/* Projects Grid */}
            {isLoading ? (
              <div
                ref={cardsRef}
                className="grid grid-cols-1 md:grid-cols-2 gap-2"
              >
                {[...Array(6)].map((_, i) => (
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
                ref={cardsRef}
                className="grid grid-cols-1 md:grid-cols-2 gap-2"
              >
                {projects.map((project) => (
                  <Card
                    key={project.id}
                    className="group rounded-none overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={project.hero_images?.[0] || "/placeholder.svg"}
                        alt={project.title}
                        width={400}
                        height={250}
                        loading="lazy"
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
                      {project.status && (
                        <div className="absolute top-4 right-4">
                          <Badge
                            variant="outline"
                            className="bg-background/90 text-foreground capitalize"
                          >
                            {project.status}
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
                          {project.professionals_count !== undefined && project.professionals_count > 0 && (
                            <div className="flex items-center gap-1">
                              <FiStar size={14} className="text-yellow-500" />
                              {project.professionals_count} professional{project.professionals_count !== 1 ? "s" : ""}
                            </div>
                          )}
                        </div>
                      </div>

                      {project.description && (
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                          {project.description}
                        </p>
                      )}

                    <Button className="w-full transition-all duration-300 hover:scale-105" asChild>
                      <Link to={`/projects/${project.id}`}>View Details</Link>
                    </Button>

                    {/* <div className="flex items-center justify-between">
                      <Button className="transition-all duration-300 hover:scale-105">
                        <Link to={project.id.toString()}>View Details</Link>
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
                    </div> */}
                  </CardContent>
                </Card>
              ))}
            </div>
            )}

            {/* No Results */}
            {!isLoading && projects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  No projects found matching your criteria.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
