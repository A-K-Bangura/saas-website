import { Link } from "react-router-dom";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiFacebook,
  FiTwitter,
  FiLinkedin,
} from "react-icons/fi";
import SaasLogo1 from "../../assets/logos/SAASLogo1.png";
import SaasLogo2 from "../../assets/logos/SAASLogo2.png";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-6 max-w-7xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold text-primary mb-4">
              <img src={SaasLogo1} className="h-8" alt="SAAS company logo" />
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Sustainable and Affordable Architectural Solutions. Building a
              better future for Sierra Leone through innovative, eco-friendly,
              and cost-effective construction.
            </p>
            <div className="flex space-x-4">
              <FiFacebook className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <FiTwitter className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <FiLinkedin className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
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
                  to="/portfolio"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Portfolio
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
                <span>info@saas-sl.com</span>
              </li>
              <li className="flex items-center space-x-2 text-muted-foreground">
                <FiPhone className="w-4 h-4" />
                <span>+232 XX XXX XXXX</span>
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
