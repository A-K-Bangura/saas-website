import {
  FiTarget,
  FiEye,
  FiUsers,
  FiPackage,
  FiBookOpen,
  FiFileText,
  FiCheckCircle,
  FiMapPin,
  FiTrendingUp,
  FiShield,
} from "react-icons/fi";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Section } from "../components/ui/Section";
import { Container } from "../components/ui/Container";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyP,
} from "../components/ui/Typography";
import { Card, CardContent } from "../components/ui/Card";
import { CTASection } from "../components/ui/CtaSection";
import { Button } from "../components/ui/Button";
import aboutHeroImage from "../assets/hero_images/about.png";
import saasLogoWhite from "../assets/logos/SAAS_SL_logo_white.png";

const whySaas = [
  {
    icon: FiUsers,
    title: "Right Professionals",
    description: "We know what to look for and hold teams accountable.",
  },
  {
    icon: FiPackage,
    title: "Inspected Materials",
    description: "Quality assured at competitive marketplace prices.",
  },
  {
    icon: FiBookOpen,
    title: "Trained Workforce",
    description: "Continuous technical training to global standards.",
  },
  {
    icon: FiFileText,
    title: "Documentation Ease",
    description: "Land, design, conveyance and permit support.",
  },
  {
    icon: FiShield,
    title: "Single Accountability",
    description: "One partner responsible for outcomes.",
  },
  {
    icon: FiMapPin,
    title: "Local Context",
    description: "Solutions designed for Sierra Leone realities.",
  },
];

const achievements = [
  {
    icon: FiTrendingUp,
    title: "20+ Projects",
    description: "Successfully delivered across Sierra Leone",
  },
  {
    icon: FiUsers,
    title: "30+ Professionals",
    description: "Curated teams ready for your contract",
  },
  {
    icon: FiCheckCircle,
    title: "Inspected Supply",
    description: "Materials reviewed before they reach your site",
  },
];

const documentationSteps = [
  { title: "Economic Fit", detail: "Project viability & budget guidance" },
  { title: "Location", detail: "Best-fit site assessment" },
  { title: "Land", detail: "Buying support & surveying" },
  { title: "Design", detail: "Drawings & technical docs" },
  { title: "Conveyance", detail: "Legal & transfer support" },
  { title: "Permit", detail: "Building permit readiness" },
];

export default function AboutPage() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [location.hash]);

  return (
    <div>
      {/* Hero */}
      <Section className="relative overflow-hidden" padding="xl">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${aboutHeroImage})` }}
        />
        <div className="absolute inset-0 bg-primary/30" />
        <Container>
          <div className="relative z-10 max-w-4xl text-secondary-foreground mx-auto text-center">
            <TypographyH1 className="mb-2 flex justify-center">
              <img
                src={saasLogoWhite}
                alt="SAAS SL"
                className="h-6 md:h-8 lg:h-10 w-auto object-contain"
              />
            </TypographyH1>
            <TypographyP className="text-xl md:text-2xl font-semibold text-muted leading-relaxed mb-4">
              The integrated partner for professional teams, quality materials,
              trained workforce & seamless project delivery across Sierra Leone.
            </TypographyP>
            <TypographyP className="text-base md:text-lg text-muted/90">
              Built Environment · Construction · Materials · Legal
            </TypographyP>
          </div>
        </Container>
      </Section>

      {/* Mission & Vision */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="p-8">
              <div className="flex items-center space-x-3 mb-4">
                <FiTarget className="w-8 h-8 text-accent" />
                <TypographyH2>Our Mission</TypographyH2>
              </div>
              <TypographyP className="text-lg leading-relaxed">
                To be the single accountable partner that aggregates the right
                professionals, supplies inspected materials, trains the
                workforce, and simplifies documentation — so clients across
                Sierra Leone can build with confidence.
              </TypographyP>
            </Card>

            <Card className="p-8">
              <div className="flex items-center space-x-3 mb-4">
                <FiEye className="w-8 h-8 text-accent" />
                <TypographyH2>Our Vision</TypographyH2>
              </div>
              <TypographyP className="text-lg leading-relaxed">
                To become Sierra Leone&apos;s most trusted built-environment
                partner — known for reliable teams, quality materials, and a
                clear path from land to construction.
              </TypographyP>
            </Card>
          </div>
        </Container>
      </Section>

      {/* How We Work — 4 pillars */}
      <Section className="bg-muted/30">
        <Container>
          <div className="text-center mb-8">
            <TypographyH2 className="mb-2">How We Work</TypographyH2>
            <TypographyP className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Four pillars. One integrated partner.
            </TypographyP>
          </div>

          <div className="space-y-20">
            {/* 01 Professionals */}
            <div id="professionals" className="scroll-mt-24 mb-12">
              <TypographyP className="text-sm font-semibold tracking-wide text-accent mb-2">
                01 | Professional Team Aggregation
              </TypographyP>
              <TypographyH3 className="mb-4 text-2xl md:text-3xl">
                We Hire the Right Team for Your Contract
              </TypographyH3>
              <TypographyP className="text-lg leading-relaxed mb-8 max-w-3xl">
                SAAS SL is an aggregation of the best professionals in the built
                environment. We carefully select and deploy the right expertise
                for every contract — architects, structural engineers, quantity
                surveyors, site supervisors and skilled trades.
              </TypographyP>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <TypographyH3 className="mb-4 text-lg">
                    What We Look For
                  </TypographyH3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex gap-3">
                      <FiCheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      Proven technical competence
                    </li>
                    <li className="flex gap-3">
                      <FiCheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      Relevant local project experience
                    </li>
                    <li className="flex gap-3">
                      <FiCheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      Professional registration & standards
                    </li>
                    <li className="flex gap-3">
                      <FiCheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      Reliability and accountability
                    </li>
                  </ul>
                </div>
                <div>
                  <TypographyH3 className="mb-4 text-lg">
                    How We Hold Them Accountable
                  </TypographyH3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex gap-3">
                      <FiCheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      Clear scopes and performance standards
                    </li>
                    <li className="flex gap-3">
                      <FiCheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      Ongoing site supervision & checks
                    </li>
                    <li className="flex gap-3">
                      <FiCheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      Documented quality and progress tracking
                    </li>
                    <li className="flex gap-3">
                      <FiCheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      Direct contractual accountability to SAAS SL
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-6">
                <Link to="/profiles">
                  <Button variant="outline">View Professionals</Button>
                </Link>
              </div>
            </div>

            {/* 02 Materials */}
            <div id="materials" className="scroll-mt-24 mb-12">
              <TypographyP className="text-sm font-semibold tracking-wide text-accent mb-2">
                02 | Materials Assurance & Marketplace
              </TypographyP>
              <TypographyH3 className="mb-4 text-2xl md:text-3xl">
                Best Materials. Competitive Prices. Inspected.
              </TypographyH3>
              <TypographyP className="text-lg leading-relaxed mb-8 max-w-3xl">
                We partner with trusted building-material suppliers, inspect
                quality, and surface only the best deals for our clients.
                Through the SAAS SL Online Marketplace, homeowners and
                contractors access high-quality materials at competitive prices
                in Sierra Leone.
              </TypographyP>
              <ol className="space-y-6 max-w-3xl">
                <li>
                  <TypographyH3 className="text-lg mb-1">
                    1. Quality Inspection
                  </TypographyH3>
                  <TypographyP className="text-muted-foreground">
                    Materials are reviewed against performance standards before
                    they reach your site.
                  </TypographyP>
                </li>
                <li>
                  <TypographyH3 className="text-lg mb-1">
                    2. Supplier Partnerships
                  </TypographyH3>
                  <TypographyP className="text-muted-foreground">
                    Direct relationships with reliable suppliers unlock better
                    pricing and consistency.
                  </TypographyP>
                </li>
                <li>
                  <TypographyH3 className="text-lg mb-1">
                    3. Client Advantage
                  </TypographyH3>
                  <TypographyP className="text-muted-foreground">
                    You receive competitive prices without sacrificing strength
                    or durability.
                  </TypographyP>
                </li>
              </ol>
              <div className="mt-6">
                <Link to="/store">
                  <Button variant="outline">Shop Materials</Button>
                </Link>
              </div>
            </div>

            {/* 03 Training */}
            <div id="training" className="scroll-mt-24 mb-12">
              <TypographyP className="text-sm font-semibold tracking-wide text-accent mb-2">
                03 | Workforce Training & Readiness
              </TypographyP>
              <TypographyH3 className="mb-4 text-2xl md:text-3xl">
                Continuously Trained to Global Construction Practices
              </TypographyH3>
              <TypographyP className="text-lg leading-relaxed mb-8 max-w-3xl">
                SAAS SL invests in structured technical and vocational training
                so that every team member understands correct methods, safety
                and quality standards before and during project delivery.
              </TypographyP>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                <li className="space-y-1">
                  <TypographyH3 className="text-lg">
                    Technical Methods
                  </TypographyH3>
                  <TypographyP className="text-muted-foreground text-sm">
                    Foundations, concrete, blockwork, reinforcement, roofing
                    details
                  </TypographyP>
                </li>
                <li className="space-y-1">
                  <TypographyH3 className="text-lg">
                    Drawings & Setting-Out
                  </TypographyH3>
                  <TypographyP className="text-muted-foreground text-sm">
                    Reading plans, accurate measurements, level control
                  </TypographyP>
                </li>
                <li className="space-y-1">
                  <TypographyH3 className="text-lg">
                    Safety & Discipline
                  </TypographyH3>
                  <TypographyP className="text-muted-foreground text-sm">
                    Site hazards, PPE, teamwork, accountability
                  </TypographyP>
                </li>
                <li className="space-y-1">
                  <TypographyH3 className="text-lg">
                    Quality Mindset
                  </TypographyH3>
                  <TypographyP className="text-muted-foreground text-sm">
                    Why standards matter and how they protect the client
                  </TypographyP>
                </li>
              </ul>
            </div>

            {/* 04 Documentation */}
            <div id="documentation" className="scroll-mt-24">
              <TypographyP className="text-sm font-semibold tracking-wide text-accent mb-2">
                04 | End-to-End Documentation Support
              </TypographyP>
              <TypographyH3 className="mb-4 text-2xl md:text-3xl">
                From Land to Building Permit — Simplified
              </TypographyH3>
              <TypographyP className="text-lg leading-relaxed mb-8 max-w-3xl">
                We make the documentation and decision journey clearer and
                faster so clients can move from idea to construction with
                confidence.
              </TypographyP>
              <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {documentationSteps.map((step, index) => (
                  <li key={step.title} className="space-y-1">
                    <TypographyP className="text-sm font-semibold text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </TypographyP>
                    <TypographyH3 className="text-lg">
                      {step.title}
                    </TypographyH3>
                    <TypographyP className="text-muted-foreground text-sm">
                      {step.detail}
                    </TypographyP>
                  </li>
                ))}
              </ol>
              <TypographyP className="text-muted-foreground max-w-3xl italic">
                Result: Clients spend less time navigating bureaucracy and more
                time making confident decisions about their project.
              </TypographyP>
            </div>
          </div>
        </Container>
      </Section>

      {/* Why SAAS SL */}
      <Section>
        <Container>
          <div className="text-center mb-10">
            <TypographyH2 className="mb-4">Why SAAS SL</TypographyH2>
            <TypographyP className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The complete advantage — one partner responsible for outcomes.
            </TypographyP>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whySaas.map((item) => (
              <div key={item.title} className="flex items-start space-x-4">
                <div className="p-3 bg-accent/10 rounded-lg shrink-0">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <TypographyH3 className="mb-2">{item.title}</TypographyH3>
                  <TypographyP className="text-muted-foreground">
                    {item.description}
                  </TypographyP>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Story */}
      <Section className="bg-muted/30">
        <Container>
          <div className="max-w-4xl mx-auto">
            <TypographyH2 className="text-center mb-8">Our Story</TypographyH2>
            <div className="space-y-6 text-lg leading-relaxed">
              <TypographyP>
                Founded in 2019 in Freetown, SAAS SL grew from a clear need:
                construction in Sierra Leone was fragmented - hard to find
                reliable professionals, uncertain materials, untrained site
                teams, and a confusing path from land to permit.
              </TypographyP>
              <TypographyP>
                We set out to become the integrated partner that closes those
                gaps: aggregating the right talent, assuring material quality
                through inspection and marketplace access, investing in
                workforce training, and guiding clients through documentation
                with a single point of accountability.
              </TypographyP>
              <TypographyP>
                Today we support residential, commercial and community projects
                across Sierra Leone - built environment, construction, materials
                and training under one roof, designed for local realities.
              </TypographyP>
            </div>
          </div>
        </Container>
      </Section>

      {/* Achievements */}
      <Section>
        <Container>
          <div className="text-center mb-10">
            <TypographyH2 className="mb-4">Our Achievements</TypographyH2>
            <TypographyP className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Milestones that reflect delivery, teams and material standards.
            </TypographyP>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement) => (
              <Card key={achievement.title} className="text-center p-8">
                <CardContent className="p-0">
                  <achievement.icon className="w-12 h-12 text-accent mx-auto mb-4" />
                  <TypographyH3 className="mb-2">
                    {achievement.title}
                  </TypographyH3>
                  <TypographyP className="text-muted-foreground">
                    {achievement.description}
                  </TypographyP>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <CTASection
        title="Build With Confidence"
        description="One Partner. Trained Teams. Trusted Materials. Clear path from land to construction. Contact SAAS SL to discuss your project, workforce needs, or material requirements."
        primaryButtonText="Chat on WhatsApp"
        secondaryButtonText="Professional Consultation"
      />
    </div>
  );
}
