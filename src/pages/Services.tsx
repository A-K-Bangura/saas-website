// import { Container } from "@/components/ui/container";
// import { Section } from "@/components/ui/section";
// import {
//   TypographyH1,
//   TypographyH2,
//   TypographyH3,
//   TypographyP,
// } from "@/components/ui/typography";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { CTASection } from "@/components/ui/cta-section";
import { useState } from "react";
import {
  FiHome,
  FiTool,
  FiUsers,
  FiCheck,
  FiArrowRight,
  FiMail,
  FiMessageCircle,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { Section } from "../components/ui/Section";
import { Container } from "../components/ui/Container";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyP,
} from "../components/ui/Typography";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { CTASection } from "../components/ui/CtaSection";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Textarea } from "../components/ui/Textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/Dialog";
import ServicesHome from "./services/ServicesHome";
import servicesHeroImage from "../assets/hero_images/services1.png";

const services = [
  {
    icon: FiHome,
    title: "Architectural Design",
    description:
      "Complete architectural design services from initial concept to detailed construction documents.",
    features: [
      "Residential Design",
      "Commercial Planning",
      "3D Visualization & Renderings",
      "Building Permits & Approvals",
      "Site Analysis & Planning",
      "Interior Design Consultation",
    ],
    process: [
      "Initial Consultation & Site Visit",
      "Concept Development & Sketches",
      "Design Development & 3D Models",
      "Construction Documents",
      "Permit Applications",
      "Construction Administration",
    ],
    pricing: "Starting from $2,000",
  },
  {
    icon: FiTool,
    title: "Construction Services",
    description:
      "Full-service construction management ensuring quality, timeline adherence, and cost-effectiveness.",
    features: [
      "Project Management",
      "Quality Control & Inspections",
      "Timeline Management",
      "Cost Optimization",
      "Contractor Coordination",
      "Material Procurement",
    ],
    process: [
      "Project Planning & Scheduling",
      "Contractor Selection & Vetting",
      "Construction Oversight",
      "Quality Inspections",
      "Progress Reporting",
      "Final Handover",
    ],
    pricing: "10-15% of construction cost",
  },
  {
    icon: FiUsers,
    title: "Project Consultation",
    description:
      "Expert consultation services to guide your project from initial planning through completion.",
    features: [
      "Site Analysis & Feasibility",
      "Budget Planning & Cost Estimation",
      "Regulatory Guidance",
      "Design Review & Optimization",
      "Sustainability Assessment",
      "Risk Management",
    ],
    process: [
      "Project Assessment",
      "Feasibility Analysis",
      "Recommendations Report",
      "Implementation Planning",
      "Ongoing Support",
      "Performance Review",
    ],
    pricing: "$150-300 per hour",
  },
  // {
  //   icon: FiHome,
  //   title: "Sustainable Solutions",
  //   description:
  //     "Eco-friendly building solutions that reduce environmental impact while maintaining affordability.",
  //   features: [
  //     "Green Building Certification",
  //     "Energy Efficiency Design",
  //     "Water Conservation Systems",
  //     "Waste Reduction Strategies",
  //     "Local Material Integration",
  //     "Renewable Energy Planning",
  //   ],
  //   process: [
  //     "Sustainability Assessment",
  //     "Green Design Integration",
  //     "Material Selection",
  //     "System Design",
  //     "Implementation Oversight",
  //     "Performance Monitoring",
  //   ],
  //   pricing: "5-10% premium on standard design",
  // },
];

const additionalServices = [
  "Building Inspections & Assessments",
  "Renovation & Restoration Planning",
  "Landscape Architecture",
  "Urban Planning Consultation",
  "Building Code Compliance Review",
  "Energy Audits & Efficiency Upgrades",
];

export default function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactMethod, setContactMethod] = useState<"email" | "whatsapp">(
    "email",
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL ?? "";
  const normalizedPhone = (import.meta.env.VITE_CONTACT_PHONE ?? "").replace(
    /\D/g,
    "",
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenModal = (serviceTitle: string) => {
    setFormData((prev) => ({ ...prev, service: serviceTitle }));
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formattedMessage = [
      "New Service Request",
      "",
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone || "N/A"}`,
      `Service: ${formData.service || "General enquiry"}`,
      "",
      "Message:",
      formData.message,
    ].join("\n");

    if (contactMethod === "email") {
      if (!contactEmail) return;
      const subject = encodeURIComponent(
        `Service enquiry: ${formData.service || "General request"}`,
      );
      const body = encodeURIComponent(formattedMessage);
      window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    } else {
      if (!normalizedPhone) return;
      const whatsappUrl = `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(
        formattedMessage,
      )}`;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }

    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Hero Section */}
      <Section className="relative overflow-hidden" padding="xl">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${servicesHeroImage})` }}
        />
        <div className="absolute inset-0 bg-primary/30" />
        <Container>
          <div className="relative z-10 max-w-4xl text-secondary-foreground mx-auto text-center">
            <TypographyH1 className="mb-3 font-bold lg:text-6xl">
              Our Core Services
            </TypographyH1>
            <TypographyP className="text-xl font-semibold text-muted leading-relaxed">
              Comprehensive architectural and construction services designed to
              bring your vision to life sustainably, affordably, and
              beautifully.
            </TypographyP>
          </div>
        </Container>
      </Section>

      {/* Main Services */}
      <Section>
        <Container>
          <div className="space-y-16">
            {services.map((service, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <CardHeader className="p-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="p-3 bg-accent/10 rounded-lg">
                        <service.icon className="w-8 h-8 text-accent" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">
                          {service.title}
                        </CardTitle>
                        <Badge variant="outline" className="mt-2">
                          {service.pricing}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription className="text-base leading-relaxed mb-6">
                      {service.description}
                    </CardDescription>

                    <div className="space-y-4">
                      <TypographyH3 className="text-lg">
                        What's Included:
                      </TypographyH3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.features.map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="flex items-center space-x-2"
                          >
                            <FiCheck className="w-4 h-4 text-accent flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      className="mt-6"
                      onClick={() => handleOpenModal(service.title)}
                    >
                      Get Started
                      <FiArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardHeader>

                  <CardContent className="p-8 bg-muted/30">
                    <TypographyH3 className="mb-4">Our Process:</TypographyH3>
                    <div className="space-y-3">
                      {service.process.map((step, stepIndex) => (
                        <div
                          key={stepIndex}
                          className="flex items-start space-x-3"
                        >
                          <div className="w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                            {stepIndex + 1}
                          </div>
                          <span className="text-sm">{step}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <ServicesHome />

      {/* Additional Services */}
      <Section className="bg-muted/30">
        <Container>
          <div className="text-center mb-12">
            <TypographyH2 className="mb-4">Additional Services</TypographyH2>
            <TypographyP className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We also offer specialized services to support your project needs.
            </TypographyP>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {additionalServices.map((service, index) => (
              <Card
                key={index}
                className="p-4 text-center hover:shadow-md transition-shadow"
              >
                <TypographyP className="font-medium">{service}</TypographyP>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <CTASection
        title="Ready to Start Your Project?"
        description="Contact us today to make inquiries or call to book an appointment."
        primaryButtonText="Chat on WhatsApp"
        secondaryButtonText="Call for an Appointment"
      />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Start Your Service Request</DialogTitle>
            <DialogDescription>
              Fill out the form and choose whether to send via email or
              WhatsApp.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+232..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="service">Service</Label>
                <Input
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  placeholder="Type of service needed"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Project Details</Label>
              <Textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us briefly about your project requirements..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Send Via</Label>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  type="button"
                  variant={contactMethod === "email" ? "default" : "outline"}
                  className="justify-center"
                  onClick={() => setContactMethod("email")}
                >
                  <FiMail className="mr-2 w-4 h-4" />
                  Email
                </Button>
                <Button
                  type="button"
                  variant={contactMethod === "whatsapp" ? "default" : "outline"}
                  className="justify-center"
                  onClick={() => setContactMethod("whatsapp")}
                >
                  <FaWhatsapp className="mr-2 w-4 h-4" />
                  WhatsApp
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:justify-end pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                <FiMessageCircle className="mr-2 w-4 h-4" />
                Send Request
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
