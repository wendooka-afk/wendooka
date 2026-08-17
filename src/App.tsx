import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import AuthGuard from "./components/AuthGuard";
import { Loader2 } from "lucide-react";

// Pages publiques - lazy loaded
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ServicesPage = lazy(() => import("./pages/Services"));
const PortfolioPage = lazy(() => import("./pages/Portfolio"));
const ServiceDetailPage = lazy(() => import("./pages/ServiceDetailPage"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"));
const ContactPage = lazy(() => import("./pages/Contact"));
const HostingPage = lazy(() => import("./pages/Hosting"));
const BlogPage = lazy(() => import("./pages/Blog"));
const BlogPostPage = lazy(() => import("./pages/BlogPost"));
const AboutPage = lazy(() => import("./pages/About"));
const TermsOfServicePage = lazy(() => import("./pages/TermsOfServicePage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const DynamicPage = lazy(() => import("./pages/DynamicPage"));
const LoginPage = lazy(() => import("./pages/Login"));

// Dashboard - lazy loaded (chunk séparé)
const DashboardLayout = lazy(() => import("@/layouts/DashboardLayout"));
const DashboardIndex = lazy(() => import("@/pages/dashboard/DashboardIndex"));
const PagesList = lazy(() => import("@/pages/dashboard/PagesList"));
const PageForm = lazy(() => import("@/pages/dashboard/PageForm"));
const MediaLibrary = lazy(() => import("@/pages/dashboard/MediaLibrary"));
const BlogPostsList = lazy(() => import("@/pages/dashboard/BlogPostsList"));
const BlogPostForm = lazy(() => import("@/pages/dashboard/BlogPostForm"));
const ProjectsList = lazy(() => import("@/pages/dashboard/ProjectsList"));
const ProjectForm = lazy(() => import("@/pages/dashboard/ProjectForm"));
const ServicesList = lazy(() => import("@/pages/dashboard/ServicesList"));
const ServiceForm = lazy(() => import("@/pages/dashboard/ServiceForm"));
const SettingsPage = lazy(() => import("@/pages/dashboard/SettingsPage"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-dark-black">
    <Loader2 className="h-10 w-10 animate-spin text-lime-accent" />
  </div>
);

// Redirect helper for /portfolio/:slug → /realisations/:slug
const RedirectProjectSlug = () => {
  const { projectSlug } = useParams();
  return <Navigate to={`/realisations/${projectSlug}`} replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/realisations" element={<PortfolioPage />} />
              <Route path="/realisations/:projectSlug" element={<ProjectDetailPage />} />
              {/* Redirects for old URLs */}
              <Route path="/portfolio" element={<Navigate to="/realisations" replace />} />
              <Route path="/portfolio/:projectSlug" element={<RedirectProjectSlug />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/hebergement-web-cameroun" element={<HostingPage />} />
              {/* Alias court vers la page hébergement */}
              <Route path="/hebergement-web" element={<Navigate to="/hebergement-web-cameroun" replace />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/a-propos" element={<AboutPage />} />
              {/* Redirect for old URL */}
              <Route path="/about" element={<Navigate to="/a-propos" replace />} />
              {/* Redirect old blog slug (2024 article updated to evergreen URL) */}
              <Route path="/blog/cout-dun-site-web-sur-mesure-en-2024" element={<Navigate to="/blog/combien-coute-site-web-cameroun" replace />} />
              <Route path="/blog/:postSlug" element={<BlogPostPage />} />
              <Route path="/services/:serviceSlug" element={<ServiceDetailPage />} />
              <Route path="/terms-of-service" element={<TermsOfServicePage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

              <Route path="/login" element={<LoginPage />} />

              {/* Routes du dashboard - Protégées par authentification */}
              <Route path="/dashboard" element={<AuthGuard><DashboardLayout /></AuthGuard>}>
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
                <Route path="services" element={<ServicesList />} />
                <Route path="services/new" element={<ServiceForm />} />
                <Route path="services/:id/edit" element={<ServiceForm />} />
                <Route path="media" element={<MediaLibrary />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>

              <Route path="/:slug" element={<DynamicPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
