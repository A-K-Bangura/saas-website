import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import HomePage from "@/src/pages/Home";
import AboutPage from "@/src/pages/About";
import ServicesPage from "@/src/pages/Services";
import PortfolioPage from "@/src/pages/Portfolio";
import ContactPage from "@/src/pages/Contact";
import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";
import ProfilesPage from "./pages/profiles_and_projects/Profiles";
import ProjectsPage from "./pages/profiles_and_projects/Projects";
import ProfileProjectsPage from "./pages/profiles_and_projects/ProfileProjects";
import NotFound from "./pages/NotFound";
import BlogPage from "./pages/Blogs";
import { SimpleFooter } from "./components/layout/SimpleFooter";
import React from "react";
import ProjectDetailsPage from "./pages/profiles_and_projects/ProjectDetails";
import { Skeleton } from "./components/ui/Skeleton";
import { Toaster } from "./components/ui/Toaster";
import { WhatsAppCTA } from "./components/layout/WhatsAppCTA";

// Lazy load service pages
const ServicesHome = lazy(() => import("./pages/services/ServicesHome"));
const EstimationPage = lazy(() => import("./pages/services/Estimation"));
const ConsultancyPage = lazy(() => import("./pages/services/Consultancy"));
const LegalAdvisoryPage = lazy(() => import("./pages/services/LegalAdvisory"));
const RequestsPage = lazy(() => import("./pages/services/Requests"));

// Lazy load store pages
const StoreListPage = lazy(() => import("./pages/store/StoreList"));
const CategoryPage = lazy(() => import("./pages/store/Category"));
const ProductDetailPage = lazy(() => import("./pages/store/ProductDetail"));
const CartPage = lazy(() => import("./pages/store/Cart"));
const CheckoutPage = lazy(() => import("./pages/store/Checkout"));
const WishlistPage = lazy(() => import("./pages/store/Wishlist"));
const OrdersListPage = lazy(() => import("./pages/store/OrdersList"));
const OrderDetailsPage = lazy(() => import("./pages/store/OrderDetails"));

// Lazy load auth pages
const LoginPage = lazy(() => import("./pages/auth/Login"));
const RegisterPage = lazy(() => import("./pages/auth/Register"));
const ProfilePage = lazy(() => import("./pages/auth/Profile"));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="space-y-4 w-full max-w-4xl px-6">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-64 w-full" />
    </div>
  </div>
);

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  React.useEffect(() => {
    // Keep in-page hash navigation intact (e.g. /services#construction-services)
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <div>
      <ScrollToTop />
      <Header />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route
            path="/services/home"
            element={
              <Suspense fallback={<PageLoader />}>
                <ServicesHome />
              </Suspense>
            }
          />
          <Route
            path="/services/estimation"
            element={
              <Suspense fallback={<PageLoader />}>
                <EstimationPage />
              </Suspense>
            }
          />
          <Route
            path="/services/consultancy"
            element={
              <Suspense fallback={<PageLoader />}>
                <ConsultancyPage />
              </Suspense>
            }
          />
          <Route
            path="/services/legal-advisory"
            element={
              <Suspense fallback={<PageLoader />}>
                <LegalAdvisoryPage />
              </Suspense>
            }
          />
          <Route
            path="/requests"
            element={
              <Suspense fallback={<PageLoader />}>
                <RequestsPage />
              </Suspense>
            }
          />
          <Route path="/profiles" element={<ProfilesPage />} />
          <Route path="/profiles/:id" element={<ProfileProjectsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:project" element={<ProjectDetailsPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/articles-and-insights" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/store"
            element={
              <Suspense fallback={<PageLoader />}>
                <StoreListPage />
              </Suspense>
            }
          />
          <Route
            path="/store/category/:slug"
            element={
              <Suspense fallback={<PageLoader />}>
                <CategoryPage />
              </Suspense>
            }
          />
          <Route
            path="/store/product/:id"
            element={
              <Suspense fallback={<PageLoader />}>
                <ProductDetailPage />
              </Suspense>
            }
          />
          <Route
            path="/cart"
            element={
              <Suspense fallback={<PageLoader />}>
                <CartPage />
              </Suspense>
            }
          />
          <Route
            path="/checkout"
            element={
              <Suspense fallback={<PageLoader />}>
                <CheckoutPage />
              </Suspense>
            }
          />
          <Route
            path="/wishlist"
            element={
              <Suspense fallback={<PageLoader />}>
                <WishlistPage />
              </Suspense>
            }
          />
          <Route
            path="/orders"
            element={
              <Suspense fallback={<PageLoader />}>
                <OrdersListPage />
              </Suspense>
            }
          />
          <Route
            path="/orders/:id"
            element={
              <Suspense fallback={<PageLoader />}>
                <OrderDetailsPage />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<PageLoader />}>
                <LoginPage />
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={<PageLoader />}>
                <RegisterPage />
              </Suspense>
            }
          />
          <Route
            path="/profile"
            element={
              <Suspense fallback={<PageLoader />}>
                <ProfilePage />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <WhatsAppCTA />
      {(() => {
        // Track the current pathname in state and update on route change
        const [currentPath, setCurrentPath] = React.useState(
          window.location.pathname,
        );

        React.useEffect(() => {
          const handleRouteChange = () =>
            setCurrentPath(window.location.pathname);
          window.addEventListener("popstate", handleRouteChange);
          window.addEventListener("pushstate", handleRouteChange);
          window.addEventListener("replacestate", handleRouteChange);

          // Monkey-patch pushState/replaceState to emit events
          const origPushState = window.history.pushState;
          const origReplaceState = window.history.replaceState;
          window.history.pushState = function (...args) {
            origPushState.apply(this, args);
            window.dispatchEvent(new Event("pushstate"));
            window.dispatchEvent(new Event("locationchange"));
          };
          window.history.replaceState = function (...args) {
            origReplaceState.apply(this, args);
            window.dispatchEvent(new Event("replacestate"));
            window.dispatchEvent(new Event("locationchange"));
          };
          window.addEventListener("locationchange", handleRouteChange);

          return () => {
            window.removeEventListener("popstate", handleRouteChange);
            window.removeEventListener("pushstate", handleRouteChange);
            window.removeEventListener("replacestate", handleRouteChange);
            window.removeEventListener("locationchange", handleRouteChange);
            window.history.pushState = origPushState;
            window.history.replaceState = origReplaceState;
          };
        }, []);

        return [
          "/",
          "/about",
          "/services",
          "/portfolio",
          "/articles-and-insights",
          "/contact",
        ].includes(currentPath) ? (
          <Footer />
        ) : (
          <SimpleFooter />
        );
      })()}
      <Toaster />
    </div>
  );
}
