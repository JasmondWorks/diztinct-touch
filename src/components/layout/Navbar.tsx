"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/siteConfig";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X, ArrowUpRight, Compass } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/80 bg-background/80 backdrop-blur-md py-3.5 shadow-sm"
          : "bg-transparent py-5"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Studio Monogram & Brand */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-[#9f1239] via-[#cc2b43] to-[#db4d24] text-white font-bold text-sm shadow-md transition-transform duration-300 group-hover:scale-105">
            {siteConfig.monogram}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight text-foreground-heading transition-colors group-hover:text-primary">
              {siteConfig.studioName}
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground">
              Architecture &amp; Design Practice
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-border/70 bg-card/60 px-4 py-1.5 backdrop-blur-md">
          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions: Commission Status & Theme Toggle */}
        <div className="hidden sm:flex items-center gap-3">
          <Button asChild size="sm" className="gap-1.5 h-8 text-xs font-semibold shadow-xs">
            <Link href="/contact">
              <span>Start a Project</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeToggle />
          <Button
            variant="outline"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="h-9 w-9 text-muted-foreground hover:text-foreground"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-border bg-background/95 backdrop-blur-xl px-6 py-6 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-3">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted/40"
              >
                <span>{link.label}</span>
                <Compass className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
            <div className="pt-3 border-t border-border">
              <Button asChild className="w-full gap-2 shadow-sm">
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Start a Project</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
