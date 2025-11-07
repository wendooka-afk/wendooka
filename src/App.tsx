import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ServicesPage from "./pages/Services";
import PortfolioPage from "./pages/Portfolio";
import ServiceDetailPage from "./pages/ServiceDetail";
import ContactPage from "./pages/Contact";
import BlogPage from "./pages/Blog";
import BlogPostPage from "./pages/BlogPost";
import AboutPage from "./pages/About";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import DashboardLayout from "@/layouts/DashboardLayout.tsx";
import DashboardIndex from "@/pages/dashboard/DashboardIndex.tsx";
import PagesList from "@/pages/dashboard/PagesList.tsx";
import PageForm from "@/pages/dashboard/PageForm.tsx";
import DynamicPage from "@/pages/DynamicPage.tsx";
import MediaLibrary from "@/pages/dashboard/MediaLibrary.tsx";
import BlogPostsList from "@/pages/dashboard/BlogPostsList.tsx";
import BlogPostForm from "@/pages/dashboard/BlogPostForm.tsx";
import ProjectsList from "@/pages/dashboard/ProjectsList.tsx";
import ProjectForm from "@/pages/dashboard/ProjectForm.tsx";
import ServicesList from "@/pages/dashboard/ServicesList.tsx"; // New import
import ServiceForm from "@/pages/dashboard/ServiceForm.tsx";   // New import

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog/:postSlug" element={<BlogPostPage />} />
          <Route path="/services/:serviceSlug" element={<ServiceDetailPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          
          {/* Dashboard Routes - Now public */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardIndex />} />
            <Route path="pages" element={<PagesList />} />
            <Route path="pages/new" element={<PageForm />} />
            <Route path="pages/:id/edit" element={<PageForm />} />
            <Route path="blog" element={<BlogPostsList />} />
            <Route path="blog/new" element={<BlogPostForm />} />
            <Route path="blog/:id/edit" element={<BlogPostForm />} />
            <Route path="projects" element={<ProjectsList />} />
            <Route path="projects/new" element={<ProjectForm />} />
            <Route path="projects/:id/edit" element={<ProjectForm />} />
            <Route path="services" element={<ServicesList />} /> {/* New route */}
            <Route path="services/new" element={<ServiceForm />} />   {/* New route */}
            <Route path="services/:id/edit" element={<ServiceForm />} /> {/* New route */}
            <Route path="media" element={<MediaLibrary />} />
          </Route>

          {/* Dynamic Page Route - MUST be after specific static routes but before catch-all */}
          <Route path="/:slug" element={<DynamicPage />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;