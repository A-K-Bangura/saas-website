import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiLinkedin,
  FiInstagram,
  FiYoutube,
} from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import SaasLogo1 from "../../assets/logos/SAASLogo1.png";

export function SimpleFooter() {
  const socialLinks = {
    facebook: "https://example.com/facebook",
    twitter: "https://example.com/twitter",
    linkedin: "https://example.com/linkedin",
    instagram: "https://example.com/instagram",
    youtube: "https://example.com/youtube",
  };

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 max-w-7xl py-2">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Copyright and Company */}
          <div className="md:flex md:flex-1 md:flex-col md:items-start md:justify-center text-center md:text-left">
            <img src={SaasLogo1} className="h-6" alt="SAAS company logo" />
          </div>
          {/* Social Links */}
          <div className="flex items-center md:flex-1 justify-center space-x-4">
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <FiFacebook className="w-4 h-4" />
            </a>
            <a
              href={socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <FaXTwitter className="w-4 h-4" />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <FiLinkedin className="w-4 h-4" />
            </a>
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <FiInstagram className="w-4 h-4" />
            </a>
            <a
              href={socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <FiYoutube className="w-4 h-4" />
            </a>
          </div>
          {/* Policy Links */}
          <div className="flex md:flex-1 md:justify-end items-center space-x-6 text-sm">
            <Link
              to="/privacy"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
        <p className="text-muted-foreground text-center mt-2 text-[0.7rem]">
          &copy; 2024 Sustainable and Affordable Architectural Solutions. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}
