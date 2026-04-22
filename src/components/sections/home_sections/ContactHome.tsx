import type React from "react";

import { useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Container } from "@/components/ui/container";
// import { Section } from "@/components/ui/section";
// import { TypographyH2, TypographyP } from "@/components/ui/typography";
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend } from "react-icons/fi";
import { Section } from "../../ui/Section";
import { Container } from "../../ui/Container";
import { TypographyH2, TypographyP } from "../../ui/Typography";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/Card";
import { Input } from "../../ui/Input";
import { Label } from "../../ui/Label";
import { Textarea } from "../../ui/Textarea";
import { Button } from "../../ui/Button";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const contactEmail = import.meta.env.VITE_CONTACT_EMAIL;
    if (!contactEmail) {
      return;
    }

    const subject = encodeURIComponent(
      `New Project Enquiry${formData.projectType ? ` - ${formData.projectType}` : ""}`,
    );
    const body = encodeURIComponent(
      [
        `Full Name: ${formData.name}`,
        `Email: ${formData.email}`,
        `Phone: ${formData.phone || "N/A"}`,
        `Project Type: ${formData.projectType || "N/A"}`,
        "",
        "Message:",
        formData.message,
      ].join("\n"),
    );

    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: FiMail,
      title: "Email Us",
      details: import.meta.env.VITE_CONTACT_EMAIL,
      description: "Send us an email anytime",
    },
    {
      icon: FiPhone,
      title: "Call Us",
      details: import.meta.env.VITE_CONTACT_PHONE,
      description: "Mon-Fri from 8am to 5pm",
    },
    {
      icon: FiMapPin,
      title: "Visit Us",
      details: "20 Pike Street, Brookfields",
      description: "Freetown, Sierra Leone",
    },
    {
      icon: FiClock,
      title: "Working Hours",
      details: "Mon - Fri: 8:00 AM - 5:00 PM",
      description: "Saturday: 9:00 AM - 2:00 PM",
    },
  ];

  return (
    <Section className="bg-muted/30">
      <Container>
        <div className="text-center mb-16">
          <TypographyH2 className="mb-4">Get In Touch</TypographyH2>
          <TypographyP className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to start your project? Contact us today for a free
            consultation and let's bring your vision to life.
          </TypographyP>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>
                {" "}
                <span className="font-bold text-2xl">Send us an Email</span>
              </CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you within 24
                hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+232 XX XXX XXXX"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="projectType">Project Type</Label>
                    <Input
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      placeholder="e.g., Residential, Commercial"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  <FiSend className="mr-2 w-4 h-4" />
                  Send Email
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <info.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{info.title}</h3>
                    <p className="text-foreground font-medium mb-1">
                      {info.details}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {info.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}

            {/* Map Placeholder */}
            {/* <Card className="p-0 overflow-hidden">
              <div className="h-64 bg-muted flex items-center justify-center">
                <div className="text-center">
                  <FiMapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Interactive Map</p>
                  <p className="text-sm text-muted-foreground">
                    Freetown, Sierra Leone
                  </p>
                </div>
              </div>
            </Card> */}
          </div>
        </div>
      </Container>
    </Section>
  );
}
