import { Link, useLocation } from "react-router-dom";
import { Home, FileText, Mail, Share2, Palette, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Email Genius", href: "/email-genius", icon: Mail },
  { name: "SocialPostr", href: "/socialpostr", icon: Share2 },
  { name: "DesignGenie", href: "/design-genie", icon: Palette },
  { name: "Reports", href: "/reports", icon: FileText },
];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-6 left-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-brand-primary text-white p-3 rounded-xl shadow-lg hover:bg-brand-primary/90 hover:shadow-xl transition-all duration-200 border border-brand-primary/20"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-72 bg-gradient-to-b from-brand-primary to-brand-primary/95 backdrop-blur-sm transition-transform duration-300 ease-in-out lg:translate-x-0 shadow-2xl",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-8 border-b border-white/10">
        <Link
    to="/"
    className="flex items-center space-x-4"
    onClick={() => setIsOpen(false)}
  >
    <img
      src="https://res.cloudinary.com/dhwhrk0oe/image/upload/c_auto,w_300/BAG_Wordmark_White_gmwxli.png"   // <-- replace with your logo path
      alt="AI-BAG Logo"  // adjust height as needed
    />
  </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-3">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center space-x-4 px-4 py-4 rounded-xl transition-all duration-200 group relative overflow-hidden",
                    "focus-visible:outline-2 focus-visible:outline-brand-gold2 focus-visible:outline-offset-2",
                    isActive
                      ? "bg-white/15 text-white shadow-lg backdrop-blur-sm border border-white/20"
                      : "text-white/70 hover:text-white hover:bg-white/10 hover:shadow-md hover:backdrop-blur-sm"
                  )}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-gold2 rounded-r-full" />
                  )}
                  
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200",
                    isActive 
                      ? "bg-brand-blue1 shadow-lg" 
                      : "bg-white/10 group-hover:bg-white/20"
                  )}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <span className="font-medium text-base">{item.name}</span>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl" />
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-white/10">
            <p className="text-xs text-white/50 text-center font-medium">
              © 2025 Bannister
            </p>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};