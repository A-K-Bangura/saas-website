import { Link } from "react-router-dom";
import { FiFacebook, FiTwitter, FiLinkedin, FiInstagram } from "react-icons/fi";
import SaasLogo1 from "../../assets/logos/SAASLogo1.png";

export function SimpleFooter() {
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
            <FiFacebook className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            <FiTwitter className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            <FiLinkedin className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            <FiInstagram className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
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
