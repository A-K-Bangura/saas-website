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
import { useGSAPFadeIn } from "@/src/hooks/use-gsap-fade-in";
import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Card, CardContent } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FiSearch,
  FiFilter,
  FiStar,
  FiMapPin,
  FiUser,
  FiEye,
  FiMail,
} from "react-icons/fi";
// import { useGSAPFadeIn } from "@/hooks/use-gsap-fade-in"

interface Professional {
  id: string;
  name: string;
  profession: "Constructor" | "Architect";
  experience: number;
  location: string;
  rating: number;
  projectTypes: string[];
  bio: string;
  specialties: string[];
  image: string;
  completedProjects: number;
}

const mockProfessionals: Professional[] = [
  {
    id: "1",
    name: "Aminata Kamara",
    profession: "Architect",
    experience: 8,
    location: "Freetown",
    rating: 4.9,
    projectTypes: ["Residential", "Commercial"],
    bio: "Passionate architect specializing in sustainable design and modern African architecture. Committed to creating spaces that blend tradition with innovation.",
    specialties: [
      "Sustainable Design",
      "Modern Architecture",
      "Urban Planning",
    ],
    image: "/professional-african-woman-architect.jpg",
    completedProjects: 45,
  },
  {
    id: "2",
    name: "Mohamed Sesay",
    profession: "Constructor",
    experience: 12,
    location: "Bo",
    rating: 4.8,
    projectTypes: ["Residential", "Infrastructure"],
    bio: "Experienced constructor with expertise in sustainable building practices and local materials. Known for delivering quality projects on time and within budget.",
    specialties: [
      "Project Management",
      "Sustainable Construction",
      "Local Materials",
    ],
    image: "/professional-african-man-constructor.jpg",
    completedProjects: 78,
  },
  {
    id: "3",
    name: "Fatima Bangura",
    profession: "Architect",
    experience: 6,
    location: "Kenema",
    rating: 4.7,
    projectTypes: ["Educational", "Healthcare"],
    bio: "Innovative architect focused on community-centered design and accessible architecture. Specializes in educational and healthcare facilities.",
    specialties: [
      "Community Design",
      "Healthcare Architecture",
      "Accessibility",
    ],
    image: "/professional-african-woman-architect-2.jpg",
    completedProjects: 32,
  },
  {
    id: "4",
    name: "Ibrahim Koroma",
    profession: "Constructor",
    experience: 15,
    location: "Makeni",
    rating: 4.9,
    projectTypes: ["Commercial", "Industrial"],
    bio: "Senior constructor with extensive experience in large-scale commercial and industrial projects. Expert in modern construction techniques and safety standards.",
    specialties: [
      "Commercial Construction",
      "Safety Management",
      "Quality Control",
    ],
    image: "/professional-african-man-constructor-2.jpg",
    completedProjects: 95,
  },
  {
    id: "5",
    name: "Adama Turay",
    profession: "Architect",
    experience: 10,
    location: "Freetown",
    rating: 4.8,
    projectTypes: ["Residential", "Hospitality"],
    bio: "Creative architect with a passion for luxury residential and hospitality design. Known for creating stunning spaces that reflect Sierra Leone's natural beauty.",
    specialties: [
      "Luxury Design",
      "Hospitality Architecture",
      "Interior Design",
    ],
    image: "/professional-african-woman-architect-3.jpg",
    completedProjects: 58,
  },
  {
    id: "6",
    name: "Sahr Conteh",
    profession: "Constructor",
    experience: 9,
    location: "Port Loko",
    rating: 4.6,
    projectTypes: ["Residential", "Agricultural"],
    bio: "Dedicated constructor specializing in rural development and agricultural infrastructure. Committed to improving living standards in rural communities.",
    specialties: [
      "Rural Development",
      "Agricultural Buildings",
      "Community Projects",
    ],
    image: "/professional-african-man-constructor-3.jpg",
    completedProjects: 67,
  },
];

export default function ProfilesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProfession, setSelectedProfession] = useState<string>("all");
  const [selectedExperience, setSelectedExperience] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [selectedRating, setSelectedRating] = useState<string>("all");
  const [selectedProjectType, setSelectedProjectType] = useState<string>("all");
  const [filteredProfessionals, setFilteredProfessionals] =
    useState<Professional[]>(mockProfessionals);
  const [showFilters, setShowFilters] = useState(false);

  const fadeInRef = useGSAPFadeIn();

  // Filter professionals based on search and filters
  useEffect(() => {
    const filtered = mockProfessionals.filter((professional) => {
      const matchesSearch =
        professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        professional.profession
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        professional.specialties.some((specialty) =>
          specialty.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesProfession =
        selectedProfession === "all" ||
        professional.profession === selectedProfession;

      const matchesExperience =
        selectedExperience === "all" ||
        (selectedExperience === "0-5" && professional.experience <= 5) ||
        (selectedExperience === "6-10" &&
          professional.experience >= 6 &&
          professional.experience <= 10) ||
        (selectedExperience === "11+" && professional.experience >= 11);

      const matchesLocation =
        selectedLocation === "all" ||
        professional.location === selectedLocation;

      const matchesRating =
        selectedRating === "all" ||
        (selectedRating === "4+" && professional.rating >= 4) ||
        (selectedRating === "4.5+" && professional.rating >= 4.5);

      const matchesProjectType =
        selectedProjectType === "all" ||
        professional.projectTypes.includes(selectedProjectType);

      return (
        matchesSearch &&
        matchesProfession &&
        matchesExperience &&
        matchesLocation &&
        matchesRating &&
        matchesProjectType
      );
    });

    setFilteredProfessionals(filtered);
  }, [
    searchTerm,
    selectedProfession,
    selectedExperience,
    selectedLocation,
    selectedRating,
    selectedProjectType,
  ]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedProfession("all");
    setSelectedExperience("all");
    setSelectedLocation("all");
    setSelectedRating("all");
    setSelectedProjectType("all");
  };

  const locations = Array.from(
    new Set(mockProfessionals.map((p) => p.location))
  );
  const projectTypes = Array.from(
    new Set(mockProfessionals.flatMap((p) => p.projectTypes))
  );

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
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full mb-4"
            >
              <FiFilter className="mr-2" size={16} />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>

          {/* Filter Panel */}
          <div
            className={`lg:w-70 lg:block ${showFilters ? "block" : "hidden"}`}
          >
            <Card className="sticky top-24">
              <CardContent className="py-6 px-3">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Profession Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Profession
                    </label>
                    <Select
                      value={selectedProfession}
                      onValueChange={setSelectedProfession}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Professions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Professions</SelectItem>
                        <SelectItem value="Architect">Architect</SelectItem>
                        <SelectItem value="Constructor">Constructor</SelectItem>
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
                      onValueChange={setSelectedExperience}
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
                      onValueChange={setSelectedLocation}
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
                      onValueChange={setSelectedRating}
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

                  {/* Project Type Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Project Type
                    </label>
                    <Select
                      value={selectedProjectType}
                      onValueChange={setSelectedProjectType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Project Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Project Types</SelectItem>
                        {projectTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profiles Grid */}
          <div className="flex-1">
            <div className="flex flex-col items-start mb-2">
              {/* Search Bar */}
              <div className="w-[70%] mx-auto mb-4">
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
                    className="pl-12 h-5 text-lg"
                  />
                </div>
              </div>
              <p className="text-muted-foreground">
                {filteredProfessionals.length} professional
                {filteredProfessionals.length !== 1 ? "s" : ""} found
              </p>
            </div>

            {/* Profiles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {filteredProfessionals.map((professional, index) => (
                <Card
                  key={professional.id}
                  className="group rounded-none hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  <CardContent className="px-4 py-2">
                    <div className="flex items-start gap-6 mb-4">
                      {/* Profile Image */}
                      <div className="relative">
                        <img
                          src={professional.image || "/placeholder.svg"}
                          alt={professional.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-muted"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-accent text-white text-xs px-2 py-0.5 rounded-full">
                          {professional.rating}
                        </div>
                      </div>

                      {/* Basic Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg text-foreground mb-1 truncate">
                          {professional.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <FiUser size={14} />
                          <span>{professional.profession}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <FiMapPin size={14} />
                          <span>{professional.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <FiStar size={14} />
                          <span>
                            {professional.experience} years experience
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {professional.bio}
                    </p>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {professional.specialties.slice(0, 3).map((specialty) => (
                        <Badge
                          key={specialty}
                          variant="secondary"
                          className="text-[.5em]"
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button className="flex-1 transition-all duration-300 hover:scale-105">
                        <FiMail className="mr-2" size={16} />
                        Contact
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 transition-all duration-300 hover:scale-105 bg-transparent"
                      >
                        <FiEye className="mr-2" size={16} />
                        View Work
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProfessionals.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-4">
                  No professionals found matching your criteria.
                </p>
                <Button onClick={clearFilters} variant="outline">
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
