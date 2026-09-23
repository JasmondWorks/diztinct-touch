"use client";

import { useState } from "react";
import { siteConfig } from "@/data/siteConfig";
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, Compass } from "lucide-react";

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
            <span>Contact &amp; Consultations</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground-heading">
            Start a Project Consultation
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            We welcome commercial, institutional, and private inquiries. Our team is available to discuss site feasibility, planning permissions, construction budgets, and full architectural delivery.
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
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-foreground block">Locations</span>
                    <span className="text-muted-foreground">{siteConfig.location}</span>
                    <span className="text-[10px] text-muted-foreground block mt-1">
                      {siteConfig.coordinates}
                    </span>
                  </div>
                </div>

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

                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-foreground block">Studio Telephone</span>
                    <span className="text-muted-foreground">{siteConfig.phone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-foreground block">Operating Hours</span>
                    <span className="text-muted-foreground">Monday – Friday: 09:00 – 18:30 GMT</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card/60 p-6 space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
                Current Studio Capacity
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We are actively reviewing RFP invitations for Q3/Q4 masterplanning and architectural commissions. Typical response turnaround for initial site feasibility queries is within 48 hours.
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
                    Thank you for contacting Diztinct Touch Architecture. A director will review your project parameters and get in touch within one business day.
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
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Elena Rostova"
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
                        placeholder="elena@company.com"
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
                        <option>Bespoke Private Residence</option>
                        <option>Commercial / Mass Timber Office</option>
                        <option>Civic &amp; Cultural Building</option>
                        <option>Adaptive Reuse &amp; Renovation</option>
                        <option>Urban Masterplan &amp; Landscape</option>
                        <option>Other Architectural Commission</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold uppercase text-foreground">
                        Site Location / City
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Zurich, Switzerland"
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
                      placeholder="Outline your site conditions, estimated floor area, project timeline, and key requirements..."
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs font-bold text-white shadow-md hover:bg-primary/90 transition-all cursor-pointer"
                  >
                    <Send className="h-4 w-4" />
                    <span>Submit Project Inquiry</span>
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
