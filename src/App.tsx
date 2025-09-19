import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import Index from "./pages/Index";
import Reports from "./pages/Reports";
import EmailGenius from "./pages/EmailGenius";
import SocialPostr from "./pages/SocialPostr";
import Designer from "./pages/Designer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
        <div className="min-h-screen bg-white">
          <Sidebar />
          <div className="lg:pl-72 transition-all duration-300">
            <main className="min-h-screen">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/email-genius" element={<EmailGenius />} />
                <Route path="/socialpostr" element={<SocialPostr />} />
                <Route path="/designer" element={<Designer />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
