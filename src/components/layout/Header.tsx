import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { FiMenu, FiX, FiChevronDown, FiUser } from "react-icons/fi";
import { isAuthenticated, getUser } from "@/src/lib/auth";

// import SaasLogo1 from "../../assets/logos/SAASLogo1.png";
import SaasLogo2 from "../../assets/logos/SAASlogoinvert.png";

export function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuth, setIsAuth] = useState(isAuthenticated());
  const [user, setUser] = useState(getUser());

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update auth state when it changes
  useEffect(() => {
    const checkAuth = () => {
      setIsAuth(isAuthenticated());
      setUser(getUser());
    };

    // Check auth on mount
    checkAuth();

    // Listen for auth changes (from same window)
    const handleAuthChange = () => checkAuth();
    window.addEventListener("auth-change", handleAuthChange);

    // Listen for storage changes (from other tabs)
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("auth-change", handleAuthChange);
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    {
      name: "Services",
      href: "/services",
      dropdown: [
        { name: "Services Home", href: "/services" },
        { name: "Free Estimation", href: "/services/estimation" },
        { name: "Consultancy Request", href: "/services/consultancy" },
        { name: "Legal Advise", href: "/services/legal-advisory" },
      ],
    },
    {
      name: "Portfolio",
      href: "/portfolio",
      dropdown: [
        { name: "Profiles", href: "/profiles" },
        { name: "Projects", href: "/projects" },
      ],
    },
    { name: "Store", href: "/store" },
    { name: "Contact", href: "/contact" },
  ];

  const toggleDropdown = (itemName: string) => {
    setOpenDropdown(openDropdown === itemName ? null : itemName);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl" ref={dropdownRef}>
        <div className="flex items-center justify-between h-8">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2 group">
            <div className="text-2xl font-bold text-primary transition-all duration-300 group-hover:text-accent group-hover:drop-shadow-lg">
              <img src={SaasLogo2} className="h-8" alt="SAAS company logo" />
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className="flex items-center space-x-1 text-foreground hover:text-primary transition-all duration-300 relative group"
                    >
                      <span>{item.name}</span>
                      <FiChevronDown
                        className={`transition-transform duration-300 ${
                          openDropdown === item.name ? "rotate-180" : ""
                        }`}
                        size={16}
                      />
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                    </button>
                    {openDropdown === item.name && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg py-2 animate-in slide-in-from-top-2 duration-200">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            to={dropdownItem.href}
                            className="block px-4 py-2 text-foreground hover:text-primary hover:bg-muted transition-colors duration-200"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    // key={item.name}
                    to={item.href}
                    className="text-foreground hover:text-primary transition-all duration-300 relative group"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                  </NavLink>
                )}
              </div>
            ))}
          </nav>

          {/* Auth Button / Profile */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuth ? (
              <Button
                variant="outline"
                onClick={() => navigate("/profile")}
                className="transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2"
              >
                <FiUser className="w-4 h-4" />
                <span>{user?.name || "Profile"}</span>
              </Button>
            ) : (
              <Button
                onClick={() => navigate("/login")}
                className="transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Login
              </Button>
            )}
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
                <div key={item.name}>
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(`mobile-${item.name}`)}
                        className="flex items-center justify-between w-full text-foreground hover:text-primary transition-colors duration-300"
                      >
                        <span>{item.name}</span>
                        <FiChevronDown
                          className={`transition-transform duration-300 ${
                            openDropdown === `mobile-${item.name}`
                              ? "rotate-180"
                              : ""
                          }`}
                          size={16}
                        />
                      </button>
                      {openDropdown === `mobile-${item.name}` && (
                        <div className="ml-4 mt-2 space-y-2 animate-in slide-in-from-top-1 duration-200">
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.href}
                              className="block text-muted-foreground hover:text-primary transition-colors duration-300"
                              onClick={() => {
                                setIsMenuOpen(false);
                                setOpenDropdown(null);
                              }}
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <NavLink
                      // key={item.name}
                      to={item.href}
                      className="text-foreground hover:text-primary transition-colors duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </NavLink>
                  )}
                </div>
              ))}
              {isAuth ? (
                <Button
                  variant="outline"
                  onClick={() => {
                    navigate("/profile");
                    setIsMenuOpen(false);
                  }}
                  className="mt-4 transition-all duration-300 hover:scale-105 w-full flex items-center justify-center gap-2"
                >
                  <FiUser className="w-4 h-4" />
                  <span>{user?.name || "Profile"}</span>
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    navigate("/login");
                    setIsMenuOpen(false);
                  }}
                  className="mt-4 transition-all duration-300 hover:scale-105 w-full"
                >
                  Login
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
