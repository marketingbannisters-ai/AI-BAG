import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, useLocation, Routes, Route } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import Login from "./pages/Login";
import Home from "./pages/home";
import Reports from "./pages/Reports";
import EmailGenius from "./pages/EmailGenius";
import SocialPostr from "./pages/SocialPostr";
import Designer from "./pages/Designer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen bg-white">
          {!isLoginPage && <Sidebar />}
          <div className={isLoginPage ? "" : "lg:pl-72 transition-all duration-300"}>
            <main className="min-h-screen">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/email-genius" element={<EmailGenius />} />
                <Route path="/socialpostr" element={<SocialPostr />} />
                <Route path="/design-genie" element={<Designer />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
