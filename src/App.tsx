import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/hooks/useAuth";

// Lazy load pages for performance optimization

// Helper for lazy loading with artificial delay to show loader
const lazyLoad = (importFunc: () => Promise<any>) => {
  return lazy(() => {
    return Promise.all([
      importFunc(),
      new Promise(resolve => setTimeout(resolve, 2000)) // 2 second minimum delay
    ]).then(([moduleExports]) => moduleExports);
  });
};

// Lazy load pages for performance optimization
const Index = lazyLoad(() => import("./pages/Index"));
const About = lazyLoad(() => import("./pages/About"));
const Leadership = lazyLoad(() => import("./pages/Leadership"));
const Academics = lazyLoad(() => import("./pages/Academics"));
const StudentLife = lazyLoad(() => import("./pages/StudentLife"));
const News = lazyLoad(() => import("./pages/News"));
const Gallery = lazyLoad(() => import("./pages/Gallery"));
const Contact = lazyLoad(() => import("./pages/Contact"));
const AdminLogin = lazyLoad(() => import("./pages/AdminLogin"));
const AdminDashboard = lazyLoad(() => import("./pages/AdminDashboard"));
const DynamicPage = lazyLoad(() => import("./pages/DynamicPage"));
const NotFound = lazyLoad(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Loading Fallback Component
import { PageLoader } from "@/components/ui/PageLoader";

const App = () => {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'IMG') {
        e.preventDefault();
      }
    };
    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about-us" element={<About />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/leadership" element={<Leadership />} />
                  <Route path="/academics" element={<Academics />} />
                  <Route path="/student-life" element={<StudentLife />} />
                  <Route path="/news" element={<News />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/p/:slug" element={<DynamicPage />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
