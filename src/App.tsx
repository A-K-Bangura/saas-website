import { Routes, Route } from "react-router-dom";
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

export default function App() {
  return (
    <div>
      <Header />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/profiles" element={<ProfilesPage />} />
          <Route path="/profiles/:id" element={<ProfileProjectsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailsPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/articles-and-insights" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {(() => {
        // Track the current pathname in state and update on route change
        const [currentPath, setCurrentPath] = React.useState(
          window.location.pathname
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
    </div>
  );
}
