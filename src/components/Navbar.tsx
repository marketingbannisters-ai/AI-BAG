import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Reports", href: "/reports" },
  { name: "Email Genius", href: "/email-genius" },
  { name: "SocialPostr", href: "/socialpostr" },
  { name: "Designer", href: "/designer" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-navbar-bg border-b border-brand-navy/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-navbar-text text-xl font-bold hover:text-navbar-active transition-colors"
            >
              AI-BAG
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "px-3 py-2 text-navbar-text hover:text-navbar-active transition-colors relative",
                  "focus-visible:outline-2 focus-visible:outline-navbar-active focus-visible:outline-offset-2 rounded-sm",
                  location.pathname === item.href &&
                    "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-navbar-active"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-navbar-text hover:text-navbar-active p-2 rounded-md focus-visible:outline-2 focus-visible:outline-navbar-active focus-visible:outline-offset-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-navbar-bg border-t border-brand-navy/20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-3 py-3 text-navbar-text hover:text-navbar-active transition-colors rounded-md",
                  "focus-visible:outline-2 focus-visible:outline-navbar-active focus-visible:outline-offset-2",
                  "text-lg font-medium",
                  location.pathname === item.href &&
                    "bg-brand-navy/30 text-navbar-active"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};