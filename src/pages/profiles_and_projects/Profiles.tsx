"use client";

import { Hero } from "@/src/components/sections/home_sections/Hero";
import { Badge } from "@/src/components/ui/Badge";
import { Button } from "@/src/components/ui/Button";
import { Card, CardContent } from "@/src/components/ui/Card";
import { Input } from "@/src/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/Select";
import { Skeleton } from "@/src/components/ui/Skeleton";
import { useGSAPFadeIn } from "@/src/hooks/use-gsap-fade-in";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { api, type Professional } from "@/src/lib/api";
import {
  FiSearch,
  FiFilter,
  FiStar,
  FiMapPin,
  FiUser,
  FiEye,
  FiMail,
  FiX,
} from "react-icons/fi";

export default function ProfilesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get values from URL search params with defaults
  const searchTerm = searchParams.get("search") || "";
  const selectedProfession = searchParams.get("profession") || "all";
  const selectedExperience = searchParams.get("experience") || "all";
  const selectedLocation = searchParams.get("location") || "all";
  const selectedRating = searchParams.get("rating") || "all";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [locations, setLocations] = useState<string[]>([]);

  const fadeInRef = useGSAPFadeIn();

  // Helper function to update URL search params
  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.delete("page"); // Reset to page 1 when filters change
    setSearchParams(params);
  };

  // Load professionals from API
  useEffect(() => {
    loadProfessionals();
  }, [searchTerm, selectedProfession, selectedExperience, selectedLocation, selectedRating, currentPage]);

  const loadProfessionals = async () => {
    setIsLoading(true);
    try {
      // Map profession filter
      let professionType: string | undefined;
      if (selectedProfession !== "all") {
        professionType = selectedProfession.toLowerCase();
      }

      // Map experience filter to min_experience
      let minExperience: number | undefined;
      if (selectedExperience !== "all") {
        if (selectedExperience === "0-5") {
          minExperience = 0;
        } else if (selectedExperience === "6-10") {
          minExperience = 6;
        } else if (selectedExperience === "11+") {
          minExperience = 11;
        }
      }

      // Map rating filter to min_rating
      let minRating: number | undefined;
      if (selectedRating !== "all") {
        if (selectedRating === "4+") {
          minRating = 4;
        } else if (selectedRating === "4.5+") {
          minRating = 4.5;
        }
      }

      const response = await api.getProfessionals({
        search: searchTerm || undefined,
        profession_type: professionType,
        location: selectedLocation !== "all" ? selectedLocation : undefined,
        min_rating: minRating,
        min_experience: minExperience,
        status: "active",
        page: currentPage,
        per_page: 12,
      });

      setProfessionals(response.data);
      setTotalPages(response.meta.last_page);
      setTotalCount(response.meta.total);

      // Extract unique locations
      const uniqueLocations = Array.from(
        new Set(response.data.map((p) => p.location).filter(Boolean))
      ) as string[];
      setLocations(uniqueLocations);
    } catch (error) {
      console.error("Failed to load professionals:", error);
      setProfessionals([]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const hasActiveFilters =
    searchTerm ||
    selectedProfession !== "all" ||
    selectedExperience !== "all" ||
    selectedLocation !== "all" ||
    selectedRating !== "all";

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-muted/50 to-background pb-8">
        {/* <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-12" ref={fadeInRef}>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Professional Network
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect with Sierra Leone's top architects and constructors. Find
              the perfect professional for your next project.
            </p>
          </div> */}

        {/* Search Bar */}
        {/* <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <FiSearch
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                size={20}
              />
              <Input
                type="text"
                placeholder="Search by name, profession, or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-lg"
              />
            </div>
          </div>
        </div> */}
        <Hero />
      </section>

      <div className="container mx-auto px-2 max-w-7xl py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Desktop Filter Panel */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-16 self-start max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-thin">
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
                  {/* Profession Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Profession
                    </label>
                    <Select
                      value={selectedProfession}
                      onValueChange={(value) =>
                        updateSearchParams("profession", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Professions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Professions</SelectItem>
                        <SelectItem value="architect">Architect</SelectItem>
                        <SelectItem value="constructor">Constructor</SelectItem>
                        <SelectItem value="electrician">Electrician</SelectItem>
                        <SelectItem value="surveyor">Surveyor</SelectItem>
                        <SelectItem value="plumber">Plumber</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Experience Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Years of Experience
                    </label>
                    <Select
                      value={selectedExperience}
                      onValueChange={(value) =>
                        updateSearchParams("experience", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Experience Levels" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">
                          All Experience Levels
                        </SelectItem>
                        <SelectItem value="0-5">0-5 years</SelectItem>
                        <SelectItem value="6-10">6-10 years</SelectItem>
                        <SelectItem value="11+">11+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location Filter */}
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
                        <SelectValue placeholder="All Locations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        {locations.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Rating
                    </label>
                    <Select
                      value={selectedRating}
                      onValueChange={(value) =>
                        updateSearchParams("rating", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Ratings" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Ratings</SelectItem>
                        <SelectItem value="4+">4+ Stars</SelectItem>
                        <SelectItem value="4.5+">4.5+ Stars</SelectItem>
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
                  placeholder="Search by name, profession, or specialty..."
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
                          Profession
                        </label>
                        <Select
                          value={selectedProfession}
                          onValueChange={(value) =>
                            updateSearchParams("profession", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="All Professions" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Professions</SelectItem>
                            <SelectItem value="architect">Architect</SelectItem>
                            <SelectItem value="constructor">Constructor</SelectItem>
                            <SelectItem value="electrician">Electrician</SelectItem>
                            <SelectItem value="surveyor">Surveyor</SelectItem>
                            <SelectItem value="plumber">Plumber</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Experience
                        </label>
                        <Select
                          value={selectedExperience}
                          onValueChange={(value) =>
                            updateSearchParams("experience", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="All Experience" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Experience</SelectItem>
                            <SelectItem value="0-5">0-5 years</SelectItem>
                            <SelectItem value="6-10">6-10 years</SelectItem>
                            <SelectItem value="11+">11+ years</SelectItem>
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
                            <SelectValue placeholder="All Locations" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Locations</SelectItem>
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
                          Rating
                        </label>
                        <Select
                          value={selectedRating}
                          onValueChange={(value) =>
                            updateSearchParams("rating", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="All Ratings" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Ratings</SelectItem>
                            <SelectItem value="4+">4+ Stars</SelectItem>
                            <SelectItem value="4.5+">4.5+ Stars</SelectItem>
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
                    placeholder="Search by name, profession, or specialty..."
                    value={searchTerm}
                    onChange={(e) =>
                      updateSearchParams("search", e.target.value)
                    }
                    className="pl-10"
                  />
                </div>
              </div>
              <p className="text-muted-foreground">
                {totalCount} professional{totalCount !== 1 ? "s" : ""} found
              </p>
            </div>

            {/* Profiles Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="rounded-none">
                    <CardContent className="px-4 py-2">
                      <div className="flex items-start gap-6 mb-4">
                        <Skeleton className="w-12 h-12 rounded-full" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-5 w-3/4" />
                          <Skeleton className="h-4 w-1/2" />
                          <Skeleton className="h-4 w-2/3" />
                        </div>
                      </div>
                      <Skeleton className="h-16 w-full mb-4" />
                      <Skeleton className="h-6 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {professionals.map((professional, index) => (
                <Card
                  key={professional.id}
                  className="group rounded-none hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  <CardContent className="px-4 py-2">
                    <div className="flex items-start gap-6 mb-4">
                      {/* Profile Image */}
                      <div className="relative">
                        <img
                          src={professional.photo || "/placeholder.svg"}
                          alt={professional.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-muted"
                        />
                        {professional.rating !== undefined && professional.rating > 0 && (
                          <div className="absolute -bottom-1 -right-1 bg-accent text-white text-xs px-2 py-0.5 rounded-full">
                            {professional.rating.toFixed(1)}
                          </div>
                        )}
                      </div>

                      {/* Basic Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg text-foreground mb-1 truncate">
                          {professional.name}
                        </h3>
                        {professional.headline && (
                          <p className="text-xs text-muted-foreground mb-1 line-clamp-1">
                            {professional.headline}
                          </p>
                        )}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <FiUser size={14} />
                          <span className="capitalize">{professional.profession_type}</span>
                        </div>
                        {professional.location && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <FiMapPin size={14} />
                            <span>{professional.location}</span>
                          </div>
                        )}
                        {professional.experience_years !== undefined && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <FiStar size={14} />
                            <span>
                              {professional.experience_years} years experience
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bio */}
                    {professional.bio && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {professional.bio}
                      </p>
                    )}

                    {/* Specialties */}
                    {professional.specialties && professional.specialties.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {professional.specialties.slice(0, 3).map((specialty, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="text-[.5em]"
                          >
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {professional.contact_email && (
                        <Button 
                          className="flex-1 transition-all duration-300 hover:scale-105"
                          asChild
                        >
                          <a href={`mailto:${professional.contact_email}`}>
                            <FiMail className="mr-2" size={16} />
                            Contact
                          </a>
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        className="flex-1 transition-all duration-300 hover:scale-105 bg-transparent"
                        onClick={() => {
                          navigate(`/profiles/${professional.id || professional.slug}`);
                        }}
                      >
                        <FiEye className="mr-2" size={16} />
                        View Work
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            )}

            {!isLoading && professionals.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-4">
                  No professionals found matching your criteria.
                </p>
                <Button onClick={clearFilters} variant="outline">
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
