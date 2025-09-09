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
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
