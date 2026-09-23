"use client";

import { useState } from "react";
import { siteConfig } from "@/data/siteConfig";
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, Compass, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-4 border-b border-border/80 pb-8">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-primary">
            <Compass className="h-3.5 w-3.5" />
            <span>Consultations &amp; Inquiries</span>
          </div>
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
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-xs">
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
                <a
                  href={`https://wa.me/2349035011649?text=${encodeURIComponent("Hello Mayowa, I'd like to consult with DIZTINCT TOUCH HOME DESIGN on an architectural project.")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-500 transition-all w-full"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Chat on WhatsApp Directly (+234 903 501 1649)</span>
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card/60 p-6 space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
                Current Studio Capacity
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We are actively onboarding new residential duplexes, private residences, and commercial commissions. Initial design reviews and 3D concept consultations are scheduled within 24-48 hours.
              </p>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-10 shadow-sm">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground-heading">
                    Inquiry Received
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Thank you for contacting DIZTINCT TOUCH HOME DESIGN. Mayowa and our team will review your project parameters and get in touch within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 rounded-xl border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold uppercase text-foreground">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tunde Adeyemi"
                        className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold uppercase text-foreground">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. tunde@example.com"
                        className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold uppercase text-foreground">
                        Project Typology
                      </label>
                      <select className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-hidden">
                        <option>Contemporary Residential Duplex</option>
                        <option>Bespoke Private Villa / Residence</option>
                        <option>Executive Contemporary Bungalow</option>
                        <option>Commercial / Office Development</option>
                        <option>Photorealistic 3D Visualization Only</option>
                        <option>2D Working Drawings &amp; Approvals</option>
                        <option>Construction-Stage Site Oversight</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold uppercase text-foreground">
                        Site Location / City
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Ibadan, Lagos, Abuja, or Diaspora"
                        className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold uppercase text-foreground">
                      Project Brief &amp; Requirements *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Describe your property, number of bedrooms, site status (land purchased, foundation, or planning), desired timeline, and scope needed..."
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs font-bold text-white shadow-md hover:bg-primary/90 transition-all cursor-pointer"
                  >
                    <Send className="h-4 w-4" />
                    <span>Submit Project Inquiry to Mayowa</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
