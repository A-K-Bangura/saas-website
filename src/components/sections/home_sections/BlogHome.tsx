import { useGSAPFadeIn } from "@/src/hooks/use-gsap-fade-in";
import { useState, useRef, useEffect } from "react";
import { FiChevronLeft, FiChevronRight, FiArrowRight } from "react-icons/fi";
import { Button } from "../../ui/Button";
import { Card, CardContent } from "../../ui/Card";
import { Badge } from "../../ui/Badge";
import { Link } from "react-router-dom";
import { Section } from "../../ui/Section";
import { TypographyH2, TypographyP } from "../../ui/Typography";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import Link from "next/link";
// import Image from "next/image";
// import { useGSAPFadeIn } from "@/hooks/use-gsap-fade-in";

const blogPosts = [
  {
    id: 1,
    title:
      "Sustainable Building Materials: The Future of Construction in Sierra Leone",
    description:
      "Exploring eco-friendly materials that are revolutionizing construction practices while supporting local communities and reducing environmental impact.",
    category: "SUSTAINABILITY",
    image: "/modern-sustainable-architecture-building-in-sierra.jpg",
    date: "2024-03-15",
    readTime: "5 min read",
    source: "SAAS Insights",
  },
  {
    id: 2,
    title: "Affordable Housing Solutions: Making Architecture Accessible",
    description:
      "How innovative design approaches and local materials are making quality housing more affordable for Sierra Leone families.",
    category: "HOUSING",
    image: "/affordable-housing-development-sierra-leone-sustai.jpg",
    date: "2024-03-10",
    readTime: "7 min read",
    source: "Architecture Today",
  },
  {
    id: 3,
    title: "Community-Centered Design: Building for Local Needs",
    description:
      "The importance of understanding local culture and needs when designing buildings that serve Sierra Leone communities effectively.",
    category: "COMMUNITY",
    image: "/community-building-architecture-sierra-leone-local.jpg",
    date: "2024-03-05",
    readTime: "6 min read",
    source: "SAAS Insights",
  },
  {
    id: 4,
    title:
      "Green Building Certifications: Standards for Sustainable Construction",
    description:
      "Understanding international green building standards and how they apply to construction projects in West Africa.",
    category: "CERTIFICATION",
    image: "/green-building-with-biodiversity-integration-sierr.jpg",
    date: "2024-02-28",
    readTime: "8 min read",
    source: "Green Building Council",
  },
  {
    id: 5,
    title: "Climate-Responsive Architecture in Tropical Environments",
    description:
      "Designing buildings that work with Sierra Leone's climate to provide comfort while minimizing energy consumption.",
    category: "CLIMATE",
    image: "/modern-health-center-building-architecture.jpg",
    date: "2024-02-20",
    readTime: "6 min read",
    source: "SAAS Insights",
  },
  {
    id: 6,
    title: "Local Workforce Development in Construction",
    description:
      "How SAAS is training local workers in sustainable construction techniques, creating jobs and building community capacity.",
    category: "WORKFORCE",
    image: "/sustainable-school-building-architecture.jpg",
    date: "2024-02-15",
    readTime: "5 min read",
    source: "Skills Development",
  },
  {
    id: 7,
    title: "Innovation in Low-Cost Construction Techniques",
    description:
      "Exploring new methods and technologies that reduce construction costs without compromising quality or sustainability.",
    category: "INNOVATION",
    image: "/green-office-building-sustainable-architecture.jpg",
    date: "2024-02-10",
    readTime: "7 min read",
    source: "Construction Innovation",
  },
];

export function BlogPreview() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useGSAPFadeIn();

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(4);
      } else if (window.innerWidth >= 768) {
        setCardsPerView(2);
      } else {
        setCardsPerView(1);
      }
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const maxIndex = Math.max(0, blogPosts.length + 4 - cardsPerView);
  const canGoNext = currentIndex < maxIndex;
  const canGoPrev = currentIndex > 0;

  const handleNext = () => {
    if (canGoNext) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (canGoPrev) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const currentPage = Math.floor(currentIndex / cardsPerView) + 1;
  const totalPages = Math.ceil(blogPosts.length / cardsPerView);

  return (
    <section ref={sectionRef} className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <TypographyH2 className="mb-4">
            Latest Insights & Articles
          </TypographyH2>
          <TypographyP className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest trends in sustainable architecture and
            construction practices
          </TypographyP>
        </div>

        <div className="relative">
          {/* Blog Cards Container */}
          <div ref={containerRef} className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out gap-4"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / cardsPerView)
                }%)`,
                width: `${(blogPosts.length / cardsPerView) * 100}%`,
              }}
            >
              {blogPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex-shrink-0"
                  style={{ width: `${100 / cardsPerView}%` }}
                >
                  <Card className="h-full py-0 gap-2 rounded-none hover:shadow-lg transition-shadow duration-300 bg-white">
                    <div className="relative w-full h-[200px] overflow-hidden">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="py-2 px-3">
                      <div className="flex items-center justify-between mb-2">
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
                      <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 hover:text-accent transition-colors">
                        <Link to={`/blog/${post.id}`}>{post.title}</Link>
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                        {post.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{post.source}</span>
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}

              {/* See More Card */}
              <div
                className="flex-shrink-0"
                style={{ width: `${100 / cardsPerView}%` }}
              >
                <Card className="h-full bg-accent-green hover:bg-accent-green/90 transition-colors duration-300 text-white">
                  <CardContent className="p-6 h-full flex flex-col items-center justify-center text-center">
                    <h3 className="font-bold text-xl mb-4">
                      Explore More Articles
                    </h3>
                    <p className="text-green-100 mb-6">
                      Discover our complete collection of insights on
                      sustainable architecture and construction
                    </p>
                    <Link to="/blog">
                      <Button
                        variant="secondary"
                        className="bg-white text-accent-green hover:bg-gray-100"
                      >
                        See All Articles
                        <FiArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Mobile Scroll Indicator */}
          <div className="md:hidden mt-6 text-center">
            <span className="text-sm text-gray-500">
              Swipe to see more articles
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-between items-center mt-4">
            <div className="flex gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrev}
                disabled={!canGoPrev}
                className="rounded-full bg-transparent"
              >
                <FiChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                disabled={!canGoNext}
                className="rounded-full bg-transparent"
              >
                <FiChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <span className="text-sm text-gray-500">
              {currentPage} / {totalPages}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
