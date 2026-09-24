"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { siteConfig } from "@/data/siteConfig";
import { Button, Badge } from "@/components/ui";
import { ArrowUpRight, Compass, MapPin } from "lucide-react";

export function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+Shift+A (Mac) or Ctrl+Shift+A (Windows/Linux) to access admin portal
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === "a" || e.key === "A")) {
        e.preventDefault();
        router.push("/admin");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  if (pathname.startsWith("/admin")) {
    return null;
  }
  return (
    <footer className="border-t border-border bg-card/40 pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:gap-12">
          {/* Col 1: Studio Monogram & Identity */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-[#9f1239] via-[#cc2b43] to-[#db4d24] text-white font-bold text-sm shadow-md">
                {siteConfig.monogram}
              </div>
              <div>
                <h3 className="text-base font-bold tracking-tight text-foreground-heading">
                  {siteConfig.studioName}
                </h3>
                <p className="text-xs text-muted-foreground font-mono">
                  {siteConfig.title}
                </p>
              </div>
            </div>
            <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
              {siteConfig.bio}
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <span>{siteConfig.coordinates}</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground-heading">
              Index
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/#featured"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Featured Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/#projects"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  All Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About Our Practice
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Inquiries &amp; Consultations
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Inquiries & Offices */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground-heading">
              Office Locations
            </h4>
            <div className="space-y-2.5 text-xs text-muted-foreground">
              <div>
                <span className="font-semibold text-foreground block">Head Office (Ibadan):</span>
                <span className="text-[11px] leading-relaxed block mt-0.5">{siteConfig.ibadanOffice}</span>
              </div>
              <div>
                <span className="font-semibold text-foreground block">Lagos Location:</span>
                <span className="text-[11px] leading-relaxed block mt-0.5">{siteConfig.lagosOffice}</span>
              </div>
              <p>
                <span className="font-semibold text-foreground">Direct Email:</span>{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-primary transition-colors underline decoration-dotted"
                >
                  {siteConfig.email}
                </a>
              </p>
              <p>
                <span className="font-semibold text-foreground">Phone / WhatsApp:</span>{" "}
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="hover:text-primary transition-colors font-medium text-foreground"
                >
                  {siteConfig.phone}
                </a>
              </p>
              <p className="text-[11px] text-muted-foreground/80 font-mono">
                Hours: {siteConfig.workingHours}
              </p>
            </div>
            <div className="pt-2 flex flex-wrap gap-2">
              <Button asChild variant="emerald" size="sm" className="h-7 text-[11px] px-2.5">
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>WhatsApp: {siteConfig.phoneRaw}</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </Button>
              {siteConfig.socials
                .filter((s) => s.name !== "WhatsApp" && s.name.toLowerCase() !== "linkedin")
                .map((social) => (
                  <Button key={social.name} asChild variant="outline" size="sm" className="h-7 text-[11px] px-2.5">
                    <a
                      href={social.url}
                      target={social.url.startsWith("http") ? "_blank" : undefined}
                      rel={social.url.startsWith("http") ? "noreferrer" : undefined}
                    >
                      <span>{social.name}</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </Button>
                ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-border/80 pt-6 text-xs text-muted-foreground font-mono">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <p>
              <Link
                href="/admin"
                className="hover:text-foreground transition-colors cursor-default select-none"
                title="Management Portal"
              >
                ©
              </Link>{" "}
              {new Date().getFullYear()} {siteConfig.registeredBusinessName ?? siteConfig.studioName}
              {siteConfig.registrationNumber && ` (Reg: ${siteConfig.registrationNumber})`}. All rights reserved.
            </p>
            <Badge variant="outline" className="gap-2 text-[11px] py-1 px-2.5 font-normal">
              <Compass className="h-3.5 w-3.5 text-primary" />
              <span>Registered Architectural Practice</span>
            </Badge>
          </div>
          {siteConfig.accreditations && siteConfig.accreditations.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-muted-foreground/80">
              <span className="font-semibold text-foreground">Accreditations:</span>
              {siteConfig.accreditations.join(" • ")}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
