// import { Container } from "@/components/ui/container";
// import { Section } from "@/components/ui/section";
// import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { Contact } from "@/src/components/sections/home_sections/ContactHome";
import { Section } from "../components/ui/Section";
import { Container } from "../components/ui/Container";
import { TypographyH1, TypographyP } from "../components/ui/Typography";

export default function ContactPage() {
  return (
    <div>
      {/* Hero Section */}
      {/* <div className="max-w-4xl mx-auto text-center">
            <TypographyH1 className="mb-6">Get In Touch</TypographyH1>
            <TypographyP className="text-xl text-muted-foreground leading-relaxed">
              Ready to start your architectural project? We're here to help
              bring your vision to life with sustainable and affordable
              solutions.
            </TypographyP>
          </div> */}
      <Contact />

      {/* Contact Form and Info */}
    </div>
  );
}
