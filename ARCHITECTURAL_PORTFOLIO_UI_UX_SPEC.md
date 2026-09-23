# ARCHITECTURAL PORTFOLIO — UI/UX DESIGN SYSTEM & IMPLEMENTATION SPECIFICATION
> **A Comprehensive Engineering Blueprint for Replicating the Unique Portfolio UX for an Architectural Designer**  
> *Target Framework: Next.js (App Router), TypeScript (Strict), Tailwind CSS v4, Framer Motion, Lucide Icons.*

---

## 1. DESIGN PHILOSOPHY & OBJECTIVE

### 1.1 The Senior Craft Ethos (Clarity > Flash)
This UI/UX system is engineered to communicate **technical depth, structural honesty, and uncompromising craft**. It rejects generic landing page tropes (excessive neon glows, chaotic glassmorphism, or frivolous gimmicks) in favor of:
- **Architectural & Structural Honesty**: Clean geometric grids, deliberate whitespace, legible hierarchy, and functional density inspired by architectural drawings and editorial monographs.
- **Data-Driven Everything**: Every case study is rendered from a centralized, strictly-typed data source (`src/data/projects.ts`), avoiding hard-coded content.
- **Purposeful Micro-Interactions**: Video crossfades on hover, smooth layout transitions via Framer Motion, tactile pills, and subtle border highlights that guide the eye without causing layout shifts.
- **Dark-First, High-Legibility Palette**: Designed for dark mode by default with balanced contrast, accompanied by a calibrated high-contrast light mode.

---

## 2. COLOR PALETTE & TAILWIND CSS v4 THEME ENGINE

### 2.1 The Architectural Reddish Color Hues (Color Theory & Rationale)

Pure primary red (`hsl(0 100% 50%)` or `#ff0000`) should **never** be used in professional architectural portfolios: it is aggressive, causes optical fatigue, and is universally perceived as a system error, form validation alert, or discount badge.

For an architectural designer, red must feel **grounded, tectonic, material-driven, and editorial**—drawing direct inspiration from natural building materials:
- **Kiln-fired clay brick and terracotta roofing**
- **Venetian red marmorino plaster**
- **Oxidized weathering steel (Corten steel)**
- **Drafting ink and architectural rotring pens**

---

### 2.2 Curated Architectural Red Hue Options

Here are three tested, accessible architectural red palettes to choose from. **Option A is pre-configured by default**:

#### Option A: Venetian Carmine & Warm Terracotta (Recommended / Default)
*A sophisticated, timeless palette inspired by Mediterranean and Italian civic architecture.*
- **Light Mode Primary**: `hsl(354 70% 48%)` (`#cc2b43`) — Contrast 5.1:1 (WCAG AA/AAA Pass)
- **Light Mode Accent**: `hsl(14 78% 50%)` (`#db4d24` - Terracotta Sienna)
- **Light Mode Gradients**:
  - `--gradient-1`: `#9f1239` (Deep Garnet / Rose-800)
  - `--gradient-2`: `#be123c` (Carmine Crimson / Rose-700)
  - `--gradient-3`: `#c2410c` (Architectural Terracotta / Orange-700)
- **Dark Mode Primary**: `hsl(354 84% 65%)` (`#f25972`) — Soft luminous rose-red (No ocular glare)
- **Dark Mode Accent**: `hsl(14 86% 65%)` (`#f57b56` - Terracotta Coral)
- **Dark Mode Gradients**:
  - `--gradient-1`: `#fb7185` (Luminous Rose-400)
  - `--gradient-2`: `#f87171` (Warm Carmine-400)
  - `--gradient-3`: `#fb923c` (Amber Terracotta-400)

#### Option B: Corten Rust & Weathering Ochre
*An industrial, tectonic palette inspired by steel structures, oxidized metal panels, and desert brutalism.*
- **Light Mode Primary**: `hsl(12 76% 45%)` (`#c93a1c`) — Deep Corten rust
- **Light Mode Accent**: `hsl(28 85% 48%)` (`#e26d14` - Burnt Ochre)
- **Light Mode Gradients**:
  - `--gradient-1`: `#881337` (Dark Rust Iron)
  - `--gradient-2`: `#c2410c` (Corten Red-Orange)
  - `--gradient-3`: `#d97706` (Weathered Amber)
- **Dark Mode Primary**: `hsl(12 85% 62%)` (`#ee6a4b`) — Luminous oxidized copper-red
- **Dark Mode Accent**: `hsl(28 90% 64%)` (`#f79344`)
- **Dark Mode Gradients**:
  - `--gradient-1`: `#f87171` (Warm Rust-400)
  - `--gradient-2`: `#fb923c` (Ochre-400)
  - `--gradient-3`: `#facc15` (Warm Sunlight-400)

#### Option C: Scandinavian Brick & Sandstone Rose
*A calm, muted Nordic palette inspired by Danish brickwork and Stockholm sandstone.*
- **Light Mode Primary**: `hsl(358 60% 46%)` (`#ba3237`) — Heritage brick
- **Light Mode Accent**: `hsl(20 62% 48%)` (`#c65530` - Sandstone)
- **Light Mode Gradients**:
  - `--gradient-1`: `#831843` (Deep Brick)
  - `--gradient-2`: `#9f1239` (Rose Brick)
  - `--gradient-3`: `#9a3412` (Earthy Terracotta)
- **Dark Mode Primary**: `hsl(358 75% 66%)` (`#e8686d`) — Muted rose chalk
- **Dark Mode Accent**: `hsl(20 80% 66%)` (`#eb8263`)
- **Dark Mode Gradients**:
  - `--gradient-1`: `#fda4af` (Rose Chalk-300)
  - `--gradient-2`: `#fb7185` (Brick Rose-400)
  - `--gradient-3`: `#fdba74` (Sandstone-300)

---

### 2.3 Detailed Color Token Matrix (Option A Specification)

| Token Name | Light Mode Value | Dark Mode Value | Usage in Interface | Material Metaphor |
| :--- | :--- | :--- | :--- | :--- |
| `--primary` | `hsl(354 70% 48%)` | `hsl(354 84% 65%)` | Main CTAs, active filter tabs, card title hover, focus rings | Carmine plaster / drafting ink |
| `--primary-foreground` | `hsl(0 0% 100%)` | `hsl(0 0% 100%)` | Text on primary buttons and active badges | Pure white chalk |
| `--accent` | `hsl(14 78% 50%)` | `hsl(14 86% 65%)` | Secondary highlights, gradient bridge, hover tags | Terracotta sienna / kiln clay |
| `--ring` | `hsl(354 70% 48%)` | `hsl(354 84% 65%)` | Keyboard accessibility focus outlines | Drafting guideline |
| `--gradient-1` | `#9f1239` | `#fb7185` | Gradient start: deep anchor tone | Deep rose garnet |
| `--gradient-2` | `#be123c` | `#f87171` | Gradient middle: vibrant bridge tone | Venetian carmine |
| `--gradient-3` | `#c2410c` | `#fb923c` | Gradient end: warm material glow | Terracotta rust |
| `::selection` | `hsl(354 84% 65% / 0.25)` | `hsl(354 84% 65% / 0.25)` | Text selection highlight | Highlighter wash |
| `.gradient-border` | `#9f1239, #be123c, #c2410c` | `#fb7185, #f87171, #fb923c` | Card hover border glow | Structural outline glow |

---

### 2.4 Complete `src/app/globals.css` (Tailwind CSS v4)
Tailwind CSS v4 replaces `tailwind.config.js` theme extensions with native CSS `@theme inline` blocks. Design tokens declared in `:root` and `.dark` are bridged directly into utility classes (`bg-primary`, `text-primary`, `border-primary`, `ring-primary`, `bg-card`, etc.).

```css
@import "tailwindcss";

/* ============================================================
   DESIGN TOKENS – Architectural Carmine & Terracotta Palette
   ============================================================ */
:root {
  /* Surfaces */
  --background: 0 0% 100%; /* Pure white */
  --foreground: 240 10% 12%; /* Charcoal/soft black for readable text */
  --foreground-heading: 240 10% 8%; /* Deep black for headings */

  --card: 0 0% 100%;
  --card-foreground: 240 10% 12%;

  --popover: 0 0% 100%;
  --popover-foreground: 240 10% 12%;

  /* Brand - Architectural Carmine & Terracotta (WCAG AAA compliant on white) */
  --primary: 354 70% 48%; /* Deep Architectural Carmine / Venetian Red */
  --primary-foreground: 0 0% 100%; /* Pure white text on primary background */

  --accent: 14 78% 50%; /* Architectural Terracotta / Burnt Sienna */
  --accent-foreground: 240 10% 8%;

  /* Neutrals */
  --secondary: 240 5% 96%;
  --secondary-foreground: 240 10% 12%;

  --muted: 240 5% 96%; /* Very soft grey */
  --muted-foreground: 240 5% 25%; /* Darker soft grey for readable secondary text */

  /* Semantic */
  --destructive: 0 84% 45%;
  --destructive-foreground: 0 0% 100%;

  --success: 142 70% 35%;

  /* Borders - Soft, visible but low contrast */
  --border: 240 5% 90%; /* Visible light grey */
  --input: 240 5% 90%;
  --ring: 354 70% 48%;

  /* Geometry */
  --radius: 0.75rem; /* 12px rounded for modern premium feel */

  /* Gradients - Deep Carmine to Venetian Red to Architectural Terracotta */
  --gradient-1: #9f1239; /* rose-800 / deep garnet */
  --gradient-2: #be123c; /* rose-700 / carmine crimson */
  --gradient-3: #c2410c; /* orange-700 / terracotta rust */
}

.dark {
  --background: 240 6% 4%; /* #09090b Obsidian */
  --foreground: 240 5% 90%;
  --foreground-heading: 0 0% 100%;

  --card: 240 5% 9%; /* #141417 Elevated dark card */
  --card-foreground: 240 5% 90%;

  --popover: 240 5% 9%;
  --popover-foreground: 240 5% 90%;

  --primary: 354 84% 65%; /* Luminous Architectural Carmine-Rose */
  --primary-foreground: 0 0% 100%;

  --secondary: 240 4% 16%;
  --secondary-foreground: 240 5% 90%;

  --muted: 240 4% 12%;
  --muted-foreground: 240 4% 60%;

  --accent: 14 86% 65%; /* Luminous Terracotta Coral */
  --accent-foreground: 0 0% 100%;

  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;

  --border: 240 4% 16%;
  --input: 240 4% 16%;
  --ring: 354 84% 65%;

  /* Gradients - Luminous Rose-400 to Carmine-Red-400 to Warm Terracotta-400 */
  --gradient-1: #fb7185; /* rose-400 */
  --gradient-2: #f87171; /* red-400 */
  --gradient-3: #fb923c; /* amber-orange-400 terracotta */
}

/* ============================================================
   TAILWIND v4 THEME BRIDGE
   Generates utility classes: bg-primary, text-foreground, etc.
   ============================================================ */
@theme inline {
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-foreground-heading: hsl(var(--foreground-heading));

  --color-card: hsl(var(--card));
  --color-card-foreground: hsl(var(--card-foreground));
  --color-popover: hsl(var(--popover));
  --color-popover-foreground: hsl(var(--popover-foreground));

  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));
  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));
  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));
  --color-destructive: hsl(var(--destructive));
  --color-destructive-foreground: hsl(var(--destructive-foreground));

  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));

  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);

  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

/* ============================================================
   BASE RESETS & GLOBAL STYLES
   ============================================================ */
html {
  scroll-behavior: smooth;
}

body {
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  font-family: var(--font-geist-sans), system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

/* Custom Minimal Scrollbar */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: hsl(var(--border));
  border-radius: 9999px;
}
::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--muted-foreground));
}

/* Selection */
::selection {
  background: hsl(354 84% 65% / 0.25);
  color: white;
}

/* Focus Ring */
:focus-visible {
  outline: 2px solid hsl(var(--primary));
  outline-offset: 2px;
  border-radius: 4px;
}

/* ============================================================
   SIGNATURE UTILITY CLASSES
   ============================================================ */

/* Static gradient text */
.gradient-text {
  background: linear-gradient(
    135deg,
    var(--gradient-1) 0%,
    var(--gradient-2) 50%,
    var(--gradient-3) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
}

/* Animated continuous gradient text */
.gradient-text-animated {
  background: linear-gradient(
    90deg,
    var(--gradient-1),
    var(--gradient-2),
    var(--gradient-3),
    var(--gradient-2),
    var(--gradient-1)
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-x 4s linear infinite;
  display: inline-block;
}

/* Glass surface */
.glass {
  background: hsl(var(--card) / 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid hsl(var(--border) / 0.6);
}

/* Hover glowing gradient border */
.gradient-border {
  position: relative;
}
.gradient-border::before {
  content: "";
  position: absolute;
  inset: -1px;
  border-radius: calc(var(--radius) + 1px);
  background: linear-gradient(135deg, #f87171, #fb923c, #fb7185);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}
.gradient-border:hover::before {
  opacity: 1;
}

/* Atmospheric Glow Orb */
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
}

/* Architectural Dot Grid Matrix */
.dot-grid {
  background-image: radial-gradient(
    hsl(var(--border) / 0.5) 1px,
    transparent 1px
  );
  background-size: 24px 24px;
}

/* ============================================================
   KEYFRAME ANIMATIONS
   ============================================================ */
@keyframes gradient-x {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
}

@keyframes glow-pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.65; }
}

@keyframes status-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
  50% { box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); }
}

@keyframes slide-down {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

## 3. ARCHITECTURAL ADAPTATION MATRIX (SOFTWARE -> ARCHITECTURE)

| Software Engineer Concept | Architectural Designer Equivalent | Implementation Impact |
| :--- | :--- | :--- |
| **Project Categories** | `Residential`, `Commercial`, `Civic & Cultural`, `Adaptive Reuse`, `Urban Masterplan` | Category segmented tabs on project grid |
| **Tech Stack** | `Revit (BIM)`, `Rhino 8`, `Grasshopper`, `Enscape`, `V-Ray`, `Mass Timber`, `Rammed Earth` | Displayed as technical chips on cards & detail pages |
| **Demo Video** | **Lumion / Enscape 3D Walkthrough Flyover** (MP4, muted, loop) | Autoplays on project card hover with smooth crossfade |
| **Architecture Diagram** | **Axonometric Exploded View, Floor Plan, or Spatial Section** | Displayed in the dedicated Architecture/Blueprint section |
| **Engineering Decisions** | **Design & Material Decisions** (Chose / Why / Trade-off) | Explains structural system, facade glazing, orientation, solar shading |
| **Performance Metrics** | **Spatial & Sustainability Metrics** (GFA, Embodied Carbon, Daylight Autonomy, Cost) | Large-number tabular cards in sidebar |
| **"If I Had More Time"** | **Phase II Masterplan & Speculative Interventions** | Checkmark list of future expansions |
| **GitHub Repo Link** | **Specification Sheets / Drawings Download / Virtual Model** | External link button on cards & detail hero |
| **Live App Demo Link** | **Interactive 3D Walkthrough / Matterport / WebGL Model** | Primary CTA button with external link icon |

---

## 4. PROJECT DATA SCHEMA (`src/types/project.ts`)

Every architectural project is strictly typed to guarantee consistency across grids, cards, and deep-dive detail pages:

```typescript
export type ArchitecturalCategory =
  | "Residential"
  | "Commercial"
  | "Civic & Cultural"
  | "Adaptive Reuse"
  | "Urban & Masterplan"
  | "Competitions";

export interface ProjectMetric {
  label: string; // e.g., "Gross Floor Area", "Operational Carbon", "Daylight Autonomy"
  value: string; // e.g., "4,850 m²", "-42% vs Baseline", "87% sDA"
  description?: string;
}

export interface ProjectDecision {
  topic: string; // e.g., "Structural Core", "Envelope Glazing", "Passive Cooling"
  decision: string; // e.g., "Hybrid Cross-Laminated Timber (CLT) & Low-Carbon Concrete"
  reason: string; // e.g., "Reduces embodied carbon by 38% while exposing warm wood grain internally"
  tradeoff?: string; // e.g., "Required stricter moisture management during wet-season construction"
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: ArchitecturalCategory;
  location?: string; // e.g., "Kyoto, Japan" or "Zurich, Switzerland"
  yearCompleted?: string; // e.g., "2025" or "Under Construction"
  shortDescription: string; // 1-2 sentence pitch
  longDescription: string; // Comprehensive design statement & brief
  techStack: string[]; // Software tools & material systems
  coverImage: string; // High-resolution exterior rendering/photo
  demoVideo?: string; // Cinematic walk-through video (MP4) for hover playback
  githubUrl?: string; // Link to BIM Docs / Drawings PDF / Model viewer
  liveUrl?: string; // Interactive 3D Model / Virtual Tour URL

  // Detailed Project Breakdown
  architecture?: {
    diagramUrl?: string; // Axonometric drawing, section, or exploded BIM diagram
    description: string; // Spatial organization, circulation, and structural flow
  };

  engineeringDecisions: ProjectDecision[];
  metrics: ProjectMetric[];
  futureImprovements?: string[]; // Phase II extensions, future retrofits
  featured?: boolean;
  dateStr: string; // ISO date string (YYYY-MM-DD) for chronological ordering
}
```

---

## 5. COMPONENT BLUEPRINTS & SIGNATURE INTERACTIONS

### 5.1 Project Card (`src/components/projects/ProjectCard.tsx`)
The signature project card features:
1. **Aspect Ratio**: `aspect-video` (16:9 widescreen format optimal for architectural photography & 3D renderings).
2. **Hover Video Preview**: Shows static high-res photo by default. On card `mouseenter`, an overlaid muted `<video>` plays automatically, smoothly cross-fading in (`opacity-0` -> `opacity-100` via CSS transition `duration-500`). On `mouseleave`, video pauses and resets to frame 0.
3. **Badges**:
   - Top-left: Category chip (tinted with category-specific translucent backgrounds).
   - Top-right: Gold "Featured" star badge if `project.featured === true`.
4. **Action Overlays**:
   - Bottom-left: "Explore Model" / "Visit Site" pill button appears on hover.
   - Bottom-right: Circular crimson arrow button (`h-8 w-8 bg-primary text-white`) animates on hover.
5. **Content**:
   - Title: Single-line clamp, transitions to primary carmine red on group hover.
   - Description: Two-line clamp in `text-muted-foreground`.
   - Material/Tool tags: Shows first 4 items + `+N` count pill.
   - Footer: "Case Study" link with directional arrow + External link action buttons.

```tsx
"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project, ArchitecturalCategory } from "@/types/project";
import { ExternalLink, ArrowRight, Star, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const CATEGORY_STYLES: Record<ArchitecturalCategory, string> = {
  Residential: "bg-red-500/10 text-red-500 border-red-500/20",
  Commercial: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  "Civic & Cultural": "bg-rose-500/10 text-rose-500 border-rose-500/20",
  "Adaptive Reuse": "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  "Urban & Masterplan": "bg-blue-500/10 text-blue-500 border-blue-500/20",
  Competitions: "bg-purple-500/10 text-purple-500 border-purple-500/20",
};

export function ProjectCard({ project }: { project: Project }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    videoRef.current?.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group h-full"
    >
      <div
        className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/20 hover:-translate-y-1 cursor-pointer shadow-sm hover:shadow-md"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-10">
          <span className="sr-only">View {project.title}</span>
        </Link>

        {/* Media Container */}
        <div className="relative aspect-video overflow-hidden bg-muted/20">
          <div className="absolute inset-0 z-10 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Static Image */}
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-500",
              isHovered && project.demoVideo ? "opacity-0" : "opacity-100"
            )}
          >
            {project.coverImage ? (
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted/30">
                <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                  No Render
                </span>
              </div>
            )}
          </div>

          {/* Hover Video */}
          {project.demoVideo && (
            <video
              ref={videoRef}
              src={project.demoVideo}
              muted
              loop
              playsInline
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
                isHovered ? "opacity-100" : "opacity-0"
              )}
            />
          )}

          {/* Top Badges */}
          <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
            <span
              className={cn(
                "rounded-lg border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md bg-background/80",
                CATEGORY_STYLES[project.category]
              )}
            >
              {project.category}
            </span>
          </div>

          {project.featured && (
            <div className="absolute top-3 right-3 z-20">
              <span className="inline-flex items-center gap-1 rounded-lg border border-yellow-500/20 bg-yellow-500/10 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold text-yellow-500 uppercase tracking-wider">
                <Star className="h-2.5 w-2.5 fill-yellow-500 text-yellow-500" />
                Featured
              </span>
            </div>
          )}

          {/* Bottom Overlays */}
          {project.liveUrl && (
            <div className="absolute bottom-3 left-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-background/90 backdrop-blur-md px-2.5 py-1 text-xs font-semibold text-foreground shadow-lg hover:border-primary/40 hover:text-primary transition-all"
              >
                <ExternalLink className="h-3.5 w-3.5 text-primary" />
                <span>3D Walkthrough</span>
              </a>
            </div>
          )}

          <div className="absolute bottom-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-md">
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="flex flex-1 flex-col p-5 gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
              <span>{project.location ?? "Architectural Project"}</span>
              <span>{project.yearCompleted ?? ""}</span>
            </div>
            <h3 className="font-bold text-base text-foreground-heading tracking-tight line-clamp-1 group-hover:text-primary transition-colors duration-200">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {project.shortDescription}
            </p>
          </div>

          {/* Materials & Tools Chips */}
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border bg-muted/30 px-2 py-0.5 text-[10px] text-muted-foreground font-bold uppercase tracking-wider"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="rounded-md border border-border bg-muted/30 px-2 py-0.5 text-[10px] text-muted-foreground font-bold">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between border-t border-border pt-3.5 mt-auto">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors">
              Monograph Case Study <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </span>

            <div className="flex items-center gap-2 relative z-20">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  title="Drawings & Drawings Specs"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
                >
                  <FileText className="h-4 w-4" />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  title="Open Interactive Tour"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-primary/20 bg-primary/10 px-2.5 py-1.5 text-xs font-semibold text-primary hover:bg-primary hover:text-white transition-all duration-200"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Model</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
```

---

### 5.2 Projects Grid & Multi-Filter Control (`src/components/home/ProjectsGrid.tsx`)
- **Search Bar**: Debounced live search with clear icon button.
- **Segmented Typology Control**: Pill buttons with active indicator (`bg-primary text-white`).
- **Software / Material Filters**: Multi-select filter pills (e.g., `Revit`, `Rhino`, `Grasshopper`, `Mass Timber`).
- **Reactive Result Counter**: Visual count divider (`Showing X out of Y projects`).
- **AnimatePresence Layout Animation**: Grid reorders with smooth spring animations.

---

### 5.3 Hero Section (`src/components/home/Hero.tsx`)
- **Viewport Bound**: `h-[100dvh]` with centered layout.
- **Background Architecture**:
  - `dot-grid` background with elliptical radial gradient mask.
  - 3 animated atmospheric ambient orbs pulsing with `glow-pulse` and floating on independent Lissajous loops (`bg-rose-500/5`, `bg-red-500/5`, `bg-amber-500/5`).
- **Live Status Indicator**:
  ```tsx
  <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
    <span className="h-2 w-2 rounded-full bg-red-500 animate-status-pulse" />
    Available for Design & Masterplanning Commissions
  </div>
  ```
- **Headline**: High-impact editorial typography with animated gradient span:
  `"Designing structures where geometry meets material permanence."`
- **Stats Row**: Three-column metrics counter (e.g., `12+ Built Projects`, `45k m² Delivered`, `8 International Honors`).
- **Dual Framing Portrait**: Desktop portrait frame with double glowing gradient backdrop.
- **Scroll Indicator**: Bouncing chevron at the viewport base.

---

### 5.4 Case Study Detail Page (`src/app/projects/[slug]/page.tsx`)
The detail page is split into an asymmetrical 2:1 editorial grid:
1. **Breadcrumb**: `Home > Projects > [Project Name]` with subtle chevron separators.
2. **Hero Header**: Category badge, completion year, featured star, title in `text-4xl lg:text-5xl font-bold`, value pitch, and action buttons.
3. **Hero Media Carousel / Video Player**: High-definition rendering viewer with full-screen capability.
4. **Left Column (2/3)**:
   - **SectionLabel Component**: Custom icon box in `bg-primary/10` with uppercase tracking and dynamic horizontal divider rule.
   - **Overview**: Full narrative detailing client brief, urban context, and zoning challenges.
   - **Architecture & Axonometric Section**: Embedded SVG/image blueprint diagram with callout description.
   - **Technical & Material Decisions Grid**: 2-column bento boxes with numbered index, `Chose` (primary border), `Why` (neutral border), and `Trade-off` (amber border).
   - **Future Phases / Masterplan**: Clean checklist items with icon indicators.
5. **Right Column / Sidebar (1/3)**:
   - **Impact & Metrics Cards**: Big typography cards (`text-2xl font-black tabular-nums`).
   - **Similar Works**: Related projects filtered by identical typology.
   - **Inquiry Callout**: Sticky "Collaborate on a Project" card with direct contact button.

---

## 6. MOCK DATASET FOR ARCHITECTURAL PORTFOLIO (`src/data/projects.ts`)

```typescript
import { Project } from "@/types/project";

export const architecturalProjects: Project[] = [
  {
    id: "pavilion-corten",
    title: "Komorebi Forest Pavilion & Research Center",
    slug: "komorebi-pavilion",
    category: "Civic & Cultural",
    location: "Nagano, Japan",
    yearCompleted: "2025",
    shortDescription:
      "A mass-timber canopy structure balancing delicate reciprocal timber framing with raw rammed-earth thermal mass walls.",
    longDescription:
      "Commissioned by the Nagano Forestry Institute, the Komorebi Pavilion serves as a public exhibition hall and climate research facility. The primary design challenge was building within a sensitive alpine cedar grove with zero root disruption. The solution employs an elevated pad foundation system supporting a reciprocal timber lattice made entirely of locally felled Japanese Larch. Deep eaves eliminate midday solar gain while allowing low-angle winter sunlight to passively charge the rammed-earth interior cores.",
    techStack: ["Rhino 8", "Grasshopper", "Revit", "Mass Timber", "Rammed Earth", "Enscape"],
    coverImage: "/projects/komorebi/cover.jpg",
    demoVideo: "/projects/komorebi/walkthrough.mp4",
    githubUrl: "https://example.com/bim-sheets",
    liveUrl: "https://example.com/virtual-tour",
    featured: true,
    dateStr: "2025-06-15",
    architecture: {
      diagramUrl: "/projects/komorebi/exploded-axonometric.svg",
      description:
        "The roof structure uses an algorithmic Voronoi reciprocal frame generated via Grasshopper, distributing snow loads laterally onto four hyper-compact rammed-earth shear pylons. Natural ventilation operates via stack effect through an automated operable oculus at the canopy zenith.",
    },
    engineeringDecisions: [
      {
        topic: "Structural Primary Framing",
        decision: "Reciprocal Dowel-Laminated Timber (DLT) instead of Glulam with steel plates.",
        reason: "Eliminates petrochemical adhesives and visible steel connector plates, allowing all timber members to be disassembled, reclaimed, or naturally composted at end-of-life.",
        tradeoff: "Required sub-millimeter CNC fabrication tolerances (±0.5mm) and strict offsite prefabrication sheltering.",
      },
      {
        topic: "Thermal Mass & Envelope",
        decision: "350mm Stabilized Rammed Earth (SRE) spine walls.",
        reason: "Provides a 12-hour thermal lag that absorbs internal heat gains during operational hours and releases it during freezing alpine nights.",
        tradeoff: "Increased total foundation bearing load, requiring micro-piles anchored into basalt bedrock.",
      },
    ],
    metrics: [
      {
        label: "Embodied Carbon",
        value: "-148 kgCO₂e/m²",
        description: "Carbon-negative superstructure sequestering more carbon than emitted during extraction and transport.",
      },
      {
        label: "Gross Internal Area",
        value: "2,400 m²",
        description: "Exhibition spaces, research labs, and botanical greenhouse.",
      },
      {
        label: "Daylight Autonomy",
        value: "91% sDA",
        description: "Operates 91% of working daylight hours without artificial lighting.",
      },
    ],
    futureImprovements: [
      "Phase II expansion: 60-meter elevated canopy skywalk connecting the pavilion to upper ridge observatories.",
      "Integration of integrated greywater phytoremediation reedbeds along the southern terrace slope.",
    ],
  },
  {
    id: "brutalist-residence",
    title: "The Monolith: Cantilevered Coastal Villa",
    slug: "the-monolith",
    category: "Residential",
    location: "Cascais, Portugal",
    yearCompleted: "2024",
    shortDescription:
      "A board-marked concrete cliffside residence designed around internal courtyards, maritime wind shielding, and framed Atlantic vistas.",
    longDescription:
      "Perched on an Atlantic bluff exposed to gale-force westerly winds and salt spray, The Monolith is conceived as an excavated rock mass. Rather than opening completely to the ocean with fragile floor-to-ceiling glass, the house organizes living spaces around sheltered micro-climate courtyards that capture warm southern daylight while blocking harsh sea winds.",
    techStack: ["Revit", "V-Ray", "AutoCAD", "Post-Tensioned Concrete", "Corten Steel"],
    coverImage: "/projects/monolith/cover.jpg",
    demoVideo: "/projects/monolith/drone-reel.mp4",
    liveUrl: "https://example.com/monolith-tour",
    featured: true,
    dateStr: "2024-11-20",
    architecture: {
      diagramUrl: "/projects/monolith/structural-section.svg",
      description:
        "A 9-meter post-tensioned board-marked concrete cantilever hovers over the cliff edge. Internal structural walls act as deep beams, preventing deflection and transferring wind uplift into deep rock anchors.",
    },
    engineeringDecisions: [
      {
        topic: "Facade Materiality & Salt Durability",
        decision: "White Pozzolanic Concrete with board-marked texture, impregnated with hydrophobic silane.",
        reason: "Withstands extreme maritime salt crystallisation without spalling or requiring recurring repainting.",
        tradeoff: "Demanded bespoke Scandinavian pine formwork constructed by specialist maritime carpenters.",
      },
    ],
    metrics: [
      {
        label: "Cantilever Span",
        value: "9.2 meters",
        description: "Post-tensioned clear span floating unobstructed over the coastal slope.",
      },
      {
        label: "Acoustic Attenuation",
        value: "48 dB",
        description: "Internal calm achieved even during Force 9 coastal gale conditions.",
      },
    ],
    futureImprovements: [
      "Subterranean wine cellar and ocean-view meditation cave excavated into the cliff strata.",
    ],
  },
];
```

---

## 7. MASTER PROMPT FOR AN AI AGENT (RUNBOOK)

When instructing an AI agent to build the architectural portfolio project from scratch, copy and paste the prompt below:

```markdown
You are a senior full-stack engineer and design systems architect. Your goal is to build a production-grade personal portfolio for an Architectural Designer using Next.js (App Router), TypeScript (Strict), Tailwind CSS v4, and Framer Motion.

Follow these strict rules:

1. ARCHITECTURAL UX PRINCIPLES:
- The design must feel tectonic, editorial, minimal, and structural—modeled after premium architectural monographs (e.g., Swiss / Japanese / Scandinavian architectural ateliers).
- Dark mode by default with obsidian surfaces (`hsl(240 6% 4%)`), elevated card surfaces (`hsl(240 5% 9%)`), and a crisp high-contrast light mode.
- Use Architectural Carmine Red (`hsl(354 70% 48%)` light, `hsl(354 84% 65%)` dark) as `--primary`, with warm terracotta (`hsl(14 78% 50%)`) as `--accent`.
- Gradients must smoothly span from deep garnet/rose to carmine red to warm terracotta.

2. TAILWIND v4 CONFIGURATION:
- Configure `src/app/globals.css` using Tailwind v4 `@import "tailwindcss";` and `@theme inline { ... }`.
- Bridge all CSS custom properties (`--color-background`, `--color-primary`, `--color-card`, `--radius-lg`, etc.) directly into Tailwind classes.
- Implement the utility classes `.gradient-text`, `.gradient-text-animated`, `.gradient-border`, `.orb`, and `.dot-grid`.

3. DATA ARCHITECTURE:
- All portfolio items MUST come from a strictly typed central source (`src/data/projects.ts`) following the `Project` interface with `category`, `engineeringDecisions` (Chose/Why/Trade-off), `metrics`, and `architecture` diagrams.
- No hard-coded UI content.

4. SIGNATURE INTERACTION MECHANICS:
- Project cards must feature an aspect-video media box showing a high-res rendering by default and seamlessly crossfading into a muted looping walkthrough video on card hover.
- Multi-filtering must support categories (`Residential`, `Commercial`, `Civic & Cultural`, `Adaptive Reuse`, `Urban & Masterplan`) and material/tool chips with live count and smooth `framer-motion` layout animations.
- Case study detail pages (`/projects/[slug]`) must render an asymmetrical 2:1 editorial layout with SectionLabel headers, an architectural diagram box, structured technical decision cards, spatial metrics, and related projects.

Implement all components cleanly, modularly, and with zero console warnings or lint errors.
```

---

## 8. STEP-BY-STEP SCAFFOLDING CHECKLIST

- [x] **Step 1**: Install Next.js 15/16 App Router with TypeScript & Tailwind CSS v4 (`@tailwindcss/postcss`).
- [x] **Step 2**: Replace `src/app/globals.css` with the full Architectural Carmine token palette and Tailwind v4 `@theme inline` bridge.
- [x] **Step 3**: Define TypeScript interfaces in `src/types/project.ts`.
- [x] **Step 4**: Create `src/data/siteConfig.ts` with the architectural designer's details (Name, Studio, Bio, Coordinates, Monogram).
- [x] **Step 5**: Create `src/data/projects.ts` with real or mock architectural projects containing spatial decisions and metrics.
- [x] **Step 6**: Build component primitives:
  - `src/components/layout/Navbar.tsx` (Monogram badge, glass blur on scroll, mobile menu)
  - `src/components/layout/Footer.tsx` (Studio location, coordinates, copyright)
  - `src/components/home/Hero.tsx` (100dvh, dot-grid, ambient floating orbs, headline, stats counter)
  - `src/components/projects/ProjectCard.tsx` (Video hover crossfade, category pill, 16:9 frame)
  - `src/components/home/ProjectsGrid.tsx` (Search, category segmented tabs, tool filters, AnimatePresence)
  - `src/components/home/AboutSection.tsx` (Design philosophy, architectural pillars, tools & methods matrix)
  - `src/app/projects/[slug]/page.tsx` (Editorial case study monograph layout)
- [x] **Step 7**: Verify zero build errors with `next build`.
