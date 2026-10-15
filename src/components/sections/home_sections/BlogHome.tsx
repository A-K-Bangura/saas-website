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
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80",
    date: "2024-03-15",
    readTime: "5 min read",
    source: "SAAS Insights",
    link: "https://www.archdaily.com/search/projects/categories/sustainable-architecture",
  },
  {
    id: 2,
    title: "Affordable Housing Solutions: Making Architecture Accessible",
    description:
      "How innovative design approaches and local materials are making quality housing more affordable for Sierra Leone families.",
    category: "HOUSING",
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80",
    date: "2024-03-10",
    readTime: "7 min read",
    source: "Architecture Today",
    link: "https://www.dezeen.com/tag/housing/",
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

  /** Blog cards + “See more” CTA card */
  const totalSlides = blogPosts.length + 1;

  useEffect(() => {
    const max = Math.max(0, totalSlides - cardsPerView);
    setCurrentIndex((prev) => Math.min(prev, max));
  }, [cardsPerView, totalSlides]);

  const maxIndex = Math.max(0, totalSlides - cardsPerView);
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
  const totalPages = Math.max(1, Math.ceil(totalSlides / cardsPerView));

  return (
    <section ref={sectionRef} className="py-12 bg-gray-50">
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
                width: `${(totalSlides / cardsPerView) * 100}%`,
                transform: `translateX(-${(currentIndex * 100) / totalSlides}%)`,
              }}
            >
              {blogPosts.map((post) => (
                <div
                  key={post.id}
                  className="min-w-0 flex-shrink-0"
                  style={{ width: `${100 / totalSlides}%` }}
                >
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    <Card className="flex h-full min-h-0 flex-col py-0 gap-2 rounded-none hover:shadow-lg transition-shadow duration-300 bg-white">
                      <div className="relative w-full h-[200px] overflow-hidden">
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="flex min-h-0 flex-1 flex-col py-2 px-3">
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
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                          {post.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{post.source}</span>
                          <span>
                            {new Date(post.date).toLocaleDateString()}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                </div>
              ))}

              {/* See More Card */}
              <div
                className="min-w-0 flex-shrink-0"
                style={{ width: `${100 / totalSlides}%` }}
              >
                <Card className="flex h-full min-h-0 flex-col bg-accent-green hover:bg-accent-green/90 transition-colors duration-300 text-black">
                  <CardContent className="p-6 h-full flex flex-col items-center justify-center text-center">
                    <h3 className="font-bold text-xl mb-4">
                      Explore More Articles
                    </h3>
                    <p className="text-green-500 mb-6">
                      Discover our complete collection of insights on
                      Sustainable Architecture and Construction
                    </p>
                    <Link to="/blog">
                      <Button
                        variant="secondary"
                        className="bg-white text-accent-green hover:bg-gray-100"
                      >
                        See All Articles
                        <FiArrowRight className="ml-2 h-3 w-3" />
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
