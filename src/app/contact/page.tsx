import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";
import { ContactForm } from "@/components/contact/ContactForm";
import { Button, Badge, Card } from "@/components/ui";
import { Mail, Phone, MapPin, Clock, Compass, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Mayowa & Start a Project | DIZTINCT TOUCH HOME DESIGN",
  description:
    "Consult directly with Mayowa regarding contemporary duplex design, 2D architectural drawings, 3D visualization, or construction site supervision in Ibadan, Lagos, and across Nigeria.",
  keywords: [
    "hire architect Ibadan",
    "architectural consultation Nigeria",
    "DIZTINCT TOUCH contact",
    "Mayowa phone number",
    "residential duplex architect",
    "Ibadan architecture office",
  ],
  openGraph: {
    title: "Initiate Project Consultation | DIZTINCT TOUCH HOME DESIGN",
    description:
      "Discuss site feasibility, drawings, 3D modelling, and on-site oversight with Mayowa and the team.",
    url: "https://diztincttouch.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-4 border-b border-border/80 pb-8">
          <Badge variant="outline" className="gap-2 text-xs py-1 px-3">
            <Compass className="h-3.5 w-3.5 text-primary" />
            <span>Consultations &amp; Inquiries</span>
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground-heading">
            Start a Project with Mayowa
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            We welcome residential, commercial, and private commissions across Nigeria and from international diaspora clients. Mayowa and our team are available to discuss site feasibility, 2D working drawings, 3D visualization, and on-site construction oversight.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details & Office Coordinates */}
          <div className="lg:col-span-5 space-y-8">
            <Card className="p-6 sm:p-8 space-y-6 shadow-xs">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-primary border-b border-border/80 pb-3">
                Office Locations &amp; Direct Contact
              </h3>

              <div className="space-y-4 text-xs font-mono">
                {/* Ibadan Head Office */}
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-foreground block">Principal Head Office (Ibadan)</span>
                    <span className="text-muted-foreground leading-relaxed block mt-0.5">
                      {siteConfig.ibadanOffice}
                    </span>
                  </div>
                </div>

                {/* Lagos Office */}
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-foreground block">Lagos Office Location</span>
                    <span className="text-muted-foreground leading-relaxed block mt-0.5">
                      {siteConfig.lagosOffice}
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-foreground block">Direct Electronic Inquiries</span>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-primary hover:underline"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-foreground block">Studio Telephone / WhatsApp</span>
                    <a
                      href={`tel:${siteConfig.phoneRaw}`}
                      className="text-foreground hover:text-primary transition-colors font-semibold"
                    >
                      {siteConfig.phone} ({siteConfig.phoneRaw})
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-foreground block">Working Hours</span>
                    <span className="text-muted-foreground">{siteConfig.workingHours}</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick Consultation Button */}
              <div className="pt-2 border-t border-border/70">
                <Button asChild variant="emerald" className="w-full">
                  <a
                    href={`https://wa.me/2349035011649?text=${encodeURIComponent("Hello Mayowa, I'd like to consult with DIZTINCT TOUCH HOME DESIGN on an architectural project.")}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Chat on WhatsApp Directly (+234 903 501 1649)</span>
                  </a>
                </Button>
              </div>
            </Card>

            <Card className="p-6 space-y-2 bg-card/60">
              <Badge variant="gold" className="text-xs font-mono font-bold">
                Current Studio Capacity
              </Badge>
              <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                We are actively onboarding new residential duplexes, private residences, and commercial commissions. Initial design reviews and 3D concept consultations are scheduled within 24-48 hours.
              </p>
            </Card>
          </div>

          {/* Form Container */}
          <div className="lg:col-span-7">
            <Card className="p-6 sm:p-10 shadow-sm">
              <ContactForm />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
