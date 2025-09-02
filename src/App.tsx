import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Testimonials from "./pages/Testimonials";
import Blog from "./pages/Blog";
import Auth from "./pages/Auth";
import AuthCallback from "./pages/AuthCallback";
import Dashboard from "./pages/Dashboard";
import ClientDashboard from "./pages/ClientDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import Welcome from "./pages/Welcome";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CurrencyProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/miv-secure-admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
      </CurrencyProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
