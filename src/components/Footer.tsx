import { Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-muted-foreground text-sm">
              © 2024 Automation Hub. Built to streamline workflows across teams.
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <a
              href="mailto:automation@company.com"
              className="inline-flex items-center space-x-2 text-brand-blue2 hover:text-brand-blue1 transition-colors focus-visible:outline-2 focus-visible:outline-brand-blue1 focus-visible:outline-offset-2 rounded-sm"
            >
              <Mail size={16} />
              <span className="text-sm">Contact</span>
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-brand-blue2 transition-colors text-sm focus-visible:outline-2 focus-visible:outline-brand-blue1 focus-visible:outline-offset-2 rounded-sm"
            >
              Guidelines
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};