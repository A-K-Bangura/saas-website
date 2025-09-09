import { useState, useMemo } from "react";
import { FiSearch, FiFilter, FiX } from "react-icons/fi";
import { useGSAPFadeIn } from "../hooks/use-gsap-fade-in";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../components/ui/Select";
import { SelectTrigger } from "@radix-ui/react-select";
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import Link from "next/link";
// import Image from "next/image";
// import { useGSAPFadeIn } from "@/hooks/use-gsap-fade-in";

const allBlogPosts = [
  {
    id: 1,
    title:
      "Sustainable Building Materials: The Future of Construction in Sierra Leone",
    description:
      "Exploring eco-friendly materials that are revolutionizing construction practices while supporting local communities and reducing environmental impact.",
    category: "SUSTAINABILITY",
    topics: ["Green Building", "Materials", "Environment"],
    image: "/modern-sustainable-architecture-building-in-sierra.jpg",
    date: "2024-03-15",
    readTime: "5 min read",
    source: "SAAS Insights",
    featured: true,
  },
  {
    id: 2,
    title: "Affordable Housing Solutions: Making Architecture Accessible",
    description:
      "How innovative design approaches and local materials are making quality housing more affordable for Sierra Leone families.",
    category: "HOUSING",
    topics: ["Affordable Housing", "Design", "Community"],
    image: "/affordable-housing-development-sierra-leone-sustai.jpg",
    date: "2024-03-10",
    readTime: "7 min read",
    source: "Architecture Today",
    featured: true,
  },
  {
    id: 3,
    title: "Community-Centered Design: Building for Local Needs",
    description:
      "The importance of understanding local culture and needs when designing buildings that serve Sierra Leone communities effectively.",
    category: "COMMUNITY",
    topics: ["Community Design", "Culture", "Local Needs"],
    image: "/community-building-architecture-sierra-leone-local.jpg",
    date: "2024-03-05",
    readTime: "6 min read",
    source: "SAAS Insights",
    featured: false,
  },
  {
    id: 4,
    title:
      "Green Building Certifications: Standards for Sustainable Construction",
    description:
      "Understanding international green building standards and how they apply to construction projects in West Africa.",
    category: "CERTIFICATION",
    topics: ["Certification", "Standards", "Green Building"],
    image: "/green-building-with-biodiversity-integration-sierr.jpg",
    date: "2024-02-28",
    readTime: "8 min read",
    source: "Green Building Council",
    featured: false,
  },
  {
    id: 5,
    title: "Climate-Responsive Architecture in Tropical Environments",
    description:
      "Designing buildings that work with Sierra Leone's climate to provide comfort while minimizing energy consumption.",
    category: "CLIMATE",
    topics: ["Climate Design", "Energy Efficiency", "Tropical Architecture"],
    image: "/modern-health-center-building-architecture.jpg",
    date: "2024-02-20",
    readTime: "6 min read",
    source: "SAAS Insights",
    featured: false,
  },
  {
    id: 6,
    title: "Local Workforce Development in Construction",
    description:
      "How SAAS is training local workers in sustainable construction techniques, creating jobs and building community capacity.",
    category: "WORKFORCE",
    topics: ["Training", "Employment", "Skills Development"],
    image: "/sustainable-school-building-architecture.jpg",
    date: "2024-02-15",
    readTime: "5 min read",
    source: "Skills Development",
    featured: false,
  },
  {
    id: 7,
    title: "Innovation in Low-Cost Construction Techniques",
    description:
      "Exploring new methods and technologies that reduce construction costs without compromising quality or sustainability.",
    category: "INNOVATION",
    topics: ["Innovation", "Cost Reduction", "Technology"],
    image: "/green-office-building-sustainable-architecture.jpg",
    date: "2024-02-10",
    readTime: "7 min read",
    source: "Construction Innovation",
    featured: false,
  },
  {
    id: 8,
    title: "Traditional Architecture Meets Modern Sustainability",
    description:
      "How traditional Sierra Leonean building techniques can inform modern sustainable construction practices.",
    category: "TRADITION",
    topics: ["Traditional Architecture", "Cultural Heritage", "Sustainability"],
    image: "/modern-sustainable-family-home-architecture.jpg",
    date: "2024-02-05",
    readTime: "6 min read",
    source: "SAAS Insights",
    featured: false,
  },
];

const categories = [
  "ALL",
  "SUSTAINABILITY",
  "HOUSING",
  "COMMUNITY",
  "CERTIFICATION",
  "CLIMATE",
  "WORKFORCE",
  "INNOVATION",
  "TRADITION",
];
const topics = [
  "Green Building",
  "Materials",
  "Environment",
  "Affordable Housing",
  "Design",
  "Community",
  "Certification",
  "Standards",
  "Climate Design",
  "Energy Efficiency",
  "Training",
  "Innovation",
  "Technology",
  "Traditional Architecture",
  "Cultural Heritage",
];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedTopic, setSelectedTopic] = useState("ALL");
  const [showFilters, setShowFilters] = useState(false);
  const sectionRef = useGSAPFadeIn();

  const filteredPosts = useMemo(() => {
    return allBlogPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.topics.some((topic) =>
          topic.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "ALL" || post.category === selectedCategory;
      const matchesTopic =
        selectedTopic === "ALL" || post.topics.includes(selectedTopic);

      return matchesSearch && matchesCategory && matchesTopic;
    });
  }, [searchTerm, selectedCategory, selectedTopic]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("ALL");
    setSelectedTopic("ALL");
  };

  const hasActiveFilters =
    searchTerm || selectedCategory !== "ALL" || selectedTopic !== "ALL";

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Insights & Articles</h1>
            <p className="text-xl text-gray-300">
              Explore our latest thoughts on sustainable architecture,
              construction innovation, and community-centered design
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section ref={sectionRef} className="py-8 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Search Bar */}
            <div className="relative mb-6">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search articles by title, content, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg"
              />
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
              >
                <FiFilter className="mr-2 h-4 w-4" />
                Filters
              </Button>

              <div
                className={`flex flex-wrap items-center gap-4 ${
                  showFilters ? "block" : "hidden md:flex"
                }`}
              >
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "ALL" ? "All Categories" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Topics</SelectItem>
                    {topics.map((topic) => (
                      <SelectItem key={topic} value={topic}>
                        {topic}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    onClick={clearFilters}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <FiX className="mr-2 h-4 w-4" />
                    Clear Filters
                  </Button>
                )}
              </div>

              <div className="ml-auto text-sm text-gray-600">
                {filteredPosts.length}{" "}
                {filteredPosts.length === 1 ? "article" : "articles"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  No articles found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search terms or filters to find what you're
                  looking for.
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="h-full hover:shadow-lg transition-shadow duration-300 bg-white"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-t-lg">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      {post.featured && (
                        <Badge className="absolute top-4 left-4 bg-accent-green text-white">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge
                          variant="secondary"
                          className="text-xs font-medium"
                        >
                          {post.category}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2 hover:text-accent-green transition-colors">
                        <Link to={`/blog/${post.id}`}>{post.title}</Link>
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.topics.slice(0, 2).map((topic) => (
                          <Badge
                            key={topic}
                            variant="outline"
                            className="text-xs"
                          >
                            {topic}
                          </Badge>
                        ))}
                        {post.topics.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{post.topics.length - 2} more
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{post.source}</span>
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
