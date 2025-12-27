import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Youtube } from "lucide-react";
import khsLogo from "@/assets/Logos/logo.png";
import { HeritageCard } from "@/components/ui/HeritageCard";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src={khsLogo} alt="KHS Logo" className="h-16 w-auto" />
              <div>
                <h3 className="font-display text-xl font-bold">Kabarnet High School</h3>
                <p className="text-secondary text-sm italic">Strong to Excel</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              A premier institution of academic excellence, nurturing future leaders
              with integrity, discipline, and innovation since 1925.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-secondary">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {["About Us", "Academics", "Admissions", "News & Events", "Gallery", "Contact"].map((link) => (
                <li key={link}>
                  <Link
                    to={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-secondary">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80 text-sm">
                  P.O. Box 16-30400<br />
                  Kabarnet, Baringo County<br />
                  Kenya
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <a href="tel:+25453022459" className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm">
                  +254 53 22459
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <a href="mailto:info@kabarnethigh.sc.ke" className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm">
                  info@kabarnethigh.sc.ke
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Heritage */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-secondary">
              Connect With Us
            </h4>
            <div className="flex gap-4 mb-6">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Youtube, href: "#" },
              ].map(({ icon: Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <HeritageCard />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © {new Date().getFullYear()} Kabarnet High School. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-primary-foreground/60 hover:text-secondary text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-primary-foreground/60 hover:text-secondary text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
