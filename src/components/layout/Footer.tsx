import { Link } from "react-router-dom";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiFacebook,
  FiLinkedin,
  FiYoutube,
  FiInstagram,
} from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import SaasLogo1 from "../../assets/logos/SAASLogo1.png";
import SaasLogo2 from "../../assets/logos/SAASLogo2.png";

export function Footer() {
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || "info@saas-sl.com";
  const contactPhone = import.meta.env.VITE_CONTACT_PHONE || "+232 XX XXX XXXX";
  const socialLinks = {
    facebook: "https://example.com/facebook",
    twitter: "https://example.com/twitter",
    linkedin: "https://example.com/linkedin",
    youtube: "https://example.com/youtube",
    instagram: "https://example.com/instagram",
  };

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-6 max-w-7xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="">
              <img src={SaasLogo1} className="h-12" alt="SAAS company logo" />
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Sustainable and Affordable Architectural Solutions. Building a
              better future for Sierra Leone through innovative, eco-friendly,
              and cost-effective construction.
            </p>
            <div className="flex space-x-4">
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <FiFacebook className="w-5 h-5" />
              </a>
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <FaXTwitter className="w-5 h-5" />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <FiLinkedin className="w-5 h-5" />
              </a>
              <a
                href={socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <FiYoutube className="w-5 h-5" />
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <FiInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/profiles"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Profiles
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-muted-foreground">
                <FiMail className="w-4 h-4" />
                <span>{contactEmail}</span>
              </li>
              <li className="flex items-center space-x-2 text-muted-foreground">
                <FiPhone className="w-4 h-4" />
                <span>{contactPhone}</span>
              </li>
              <li className="flex items-center space-x-2 text-muted-foreground">
                <FiMapPin className="w-4 h-4" />
                <span>Freetown, Sierra Leone</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>
            &copy; 2024 SAAS - Sustainable and Affordable Architectural
            Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
