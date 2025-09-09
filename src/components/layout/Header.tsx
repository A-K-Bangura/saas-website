import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/Button";
import { FiMenu, FiX } from "react-icons/fi";

import SaasLogo1 from "../../assets/logos/SAASLogo1.png";
import SaasLogo2 from "../../assets/logos/SAASLogo2.png";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Profiles", href: "/profiles" },
    { name: "Projects", href: "/projects" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between h-8">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2 group">
            <div className="text-2xl font-bold text-primary transition-all duration-300 group-hover:text-accent group-hover:drop-shadow-lg">
              <img src={SaasLogo2} className="h-8" alt="SAAS company logo" />
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className="text-foreground hover:text-primary transition-all duration-300 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </NavLink>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex">
            <Button className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
              See All We Do
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden transition-transform duration-300 hover:scale-110"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-in slide-in-from-top-2 duration-300">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className="text-foreground hover:text-primary transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
              <Button className="mt-4 transition-all duration-300 hover:scale-105">
                Get a Quote
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
