# AGENTS.md — DIZTINCT TOUCH HOME DESIGN

## Project Overview

**DIZTINCT TOUCH HOME DESIGN** is a registered contemporary architectural design and 3D visualization practice led by Mayowa. The portfolio web application showcases architectural projects (contemporary duplexes, bespoke villas, bungalows, commercial developments), interactive 3D virtual tours, 2D working drawings, client lead intake, construction site tracking, and an internal administrative management portal.

- **Core Stack:** Next.js 15 (App Router), React 19, TypeScript, Prisma ORM, Neon PostgreSQL, Neon S3 Storage, Sharp, Tailwind CSS v4, Class Variance Authority (CVA), Zod, Radix UI.
- **Package Manager:** `npm`

---

## Build & Test Commands

Always use these exact commands to verify changes:

- **Install:** `npm install`
- **Prisma Client Generate:** `npx prisma generate`
- **Prisma DB Sync:** `npx prisma db push`
- **Type Check:** `npx tsc --noEmit`
- **Build Project:** `npm run build`
- **Dev Server:** `npm run dev`

---

## Critical Architectural Constraints & Guidelines

All agents, contributors, and developers working on this codebase must strictly observe the following rules:

### 1. 100% Server Components for All Top-Level Pages & Rich SEO Metadata
- **Constraint:** Every top-level page (`src/app/**/page.tsx`) **must be a Server Component**.
  - **NEVER** add `"use client"` to any `page.tsx` file.
  - Page-level rendering must occur on the server for maximum SEO performance, OpenGraph social previews, and fast initial paint.
- **Mandatory Metadata:**
  - Every static page must export a descriptive `metadata: Metadata` object with `title`, `description`, `keywords`, and `openGraph`.
  - Every dynamic page (e.g., `src/app/projects/[slug]/page.tsx`) must export `generateMetadata({ params }): Promise<Metadata>` that fetches data via Prisma and provides project-specific titles, descriptions, and cover render images.
  - The root layout (`src/app/layout.tsx`) defines `metadataBase: new URL("https://diztincttouch.com")`.

### 2. Interactive UI Component Abstraction
- **Constraint:** Any part of the UI requiring user interactivity (state, React hooks, event listeners, client animations, or browser APIs) **must be abstracted into its own descriptively named Client Component** (`"use client"`).
- **Organization:**
  - Place feature-specific interactive components in their dedicated directory under `src/components/<feature>/` (e.g. `src/components/contact/ContactForm.tsx`, `src/components/gallery/GalleryViewer.tsx`, `src/components/admin/AdminLoginKeypad.tsx`, `src/components/admin/ProjectsTable.tsx`, `src/components/admin/MultiStepProjectForm.tsx`).
  - The Server Component page is solely responsible for server-side data fetching, metadata generation, and composing these interactive components.

### 3. Reusable UI Component System (`src/components/ui/`)
- **Constraint:** **Primitive UI elements must never be duplicated or hardcoded inline.** Always import and reuse the centralized component primitives in `src/components/ui/`.
- **Foundational Primitives:**
  - **`Button` (`src/components/ui/button.tsx`)**: Built with `class-variance-authority` (CVA). Must use predefined variants (`default` gold, `secondary`, `outline`, `ghost`, `destructive`, `link`, `emerald`) and sizes (`sm`, `default`, `lg`, `icon`).
  - **`InputField` (`src/components/ui/input-field.tsx`)**: Composite component featuring `<Label>` + `<Input>` + optional `<HelperText>` + `<ErrorMessage>`. Must support Zod schema validation errors.
  - **`TextareaField` (`src/components/ui/textarea-field.tsx`)**: Multi-line field with integrated Zod error handling.
  - **`SelectField` (`src/components/ui/select-field.tsx`)**: Form select with custom architectural chevron and Zod error state.
  - **`Badge` (`src/components/ui/badge.tsx`)**: CVA-powered status badges (`default`, `gold`, `success`, `warning`, `destructive`, `outline`).
  - **`Card` Family (`src/components/ui/card.tsx`)**: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`.
  - **`Dialog` (`src/components/ui/dialog.tsx`)**: Accessible modal dialog powered by `@radix-ui/react-dialog`.
- **Form Validation:** All form submissions must define and validate against a **Zod schema** (e.g., `leadSchema`) before dispatching Server Actions.
- **Design Tokens:** Maintain the firm's luxury dark-architectural aesthetic: obsidian black (`#080808` / `#0A0A0A`), warm architectural gold (`#C9A84C`), elevated surfaces (`#121212`), muted borders (`border-white/5` to `border-white/15`), and ivory text (`#F9F6F0`).
- **Zero Border + Shadow Combination Rule:** **Never combine borders and box shadows on the same container or UI component.** In contemporary architectural design, combining an outline border (`border`, `border-border`) with a box shadow (`shadow-sm`, `shadow-md`, `shadow-lg`, etc.) causes visual muddiness and unrefined "double framing." Elements must either feature a clean, crisp architectural border (`border border-border/80`) OR a subtle elevation shadow/glow—never both simultaneously.
- **Zero Sparkles Icons Policy:** **Never use `Sparkles` or `Sparkle` icons anywhere in the application.** As a registered contemporary architectural practice (*"Remarkable design, long lasting"*), the portfolio must convey structural gravitas, tectonic precision, and professional credibility. Never use novelty or AI-trope sparkles. Always substitute with architectural iconography (`Compass`, `Building2`, `Layers`, `Ruler`, `HardHat`, `CheckCircle2`, `Activity`) or minimalist status dots.

### 4. Prisma ORM for Database Access
- **Constraint:** All database operations against PostgreSQL (Neon) must use **Prisma ORM**.
  - Models are defined in `prisma/schema.prisma` (`Project`, `Lead`, `AnalyticsEvent`, `RefreshToken`).
  - Always use the global singleton instance from `@/lib/prisma` to prevent connection exhaustion.
  - **Never** write raw SQL queries when Prisma model methods (`prisma.<model>.findMany`, `create`, `update`, `delete`) are available.
  - Keep `prisma/schema.prisma` synchronized with Neon via `npx prisma db push` and `npx prisma generate`.

### 5. Two-Token Authentication Architecture
- **Constraint:** Administrative security at `/admin` enforces a two-token session model:
  1. **Refresh Token**:
     - Lifespan: 7 days.
     - Storage: Strictly in an `HttpOnly`, `Secure`, `SameSite=Lax`, `Path="/"` cookie (`dt_refresh_token`).
     - Inaccessible to client JavaScript, protecting against XSS attacks.
  2. **Access Token**:
     - Lifespan: 15 minutes.
     - Storage: Strictly in **client JavaScript memory** via `src/lib/tokenStorage.ts`.
     - **NEVER** store access tokens in `localStorage` or `sessionStorage`.
  3. **Silent Regeneration on Page Load/Reload**:
     - When a user refreshes the page or opens a new tab, the client `<AdminAuthProvider>` checks in-memory token state. If missing, it immediately invokes `refreshAccessTokenAction()`.
     - If the `HttpOnly` refresh cookie is valid and unrevoked, a new 15-minute access token is issued into memory without prompting Mayowa for his security PIN.
     - Active sessions schedule silent background refreshes every 13 minutes.
     - Logging out revokes the session in the database, deletes the cookie, and clears memory.

### 6. Strict 100% Server Actions Architecture
- **Constraint:** **No API routes (`/api/*`).**
  - All mutations, uploads, data modifications, and telemetry tracking must be implemented as Next.js Server Actions (`"use server"`).
  - Server actions must perform input sanitization and authorization checks (`isAdminAuthenticated()`) where appropriate.
  - File uploads to Neon S3 storage must go through `uploadProjectMediaAction` with client-side compression (`browser-image-compression`) and server-side WebP optimization (`sharp`) to respect the 512 MB free tier.

### 7. Services Modules Architecture & File Naming Conventions
- **Constraint:** Business logic, data operations, Zod validation schemas, DTOs, and hooks must be organized into domain-driven modules inside `src/services/<module_name>/` following a clean backend-oriented architecture.
- **Mandatory File Naming Convention:**
  - `{module_name}.types.ts`: Domain models, enums, entity interfaces, and internal types.
  - `{module_name}.schemas.ts`: Zod validation schemas for forms, inputs, query filters, and mutations.
  - `{module_name}.dtos.ts`: Data Transfer Objects (DTOs) for request inputs, response payloads, query filters, and data projections.
  - `{module_name}.service.ts`: Backend domain service class encapsulating database operations (Prisma queries, S3, image optimization) decoupled from Next.js server action request/cache wrappers.
  - `{module_name}.actions.ts`: `"use server"` Server Actions acting as controllers (session auth checks, Zod validation, calling domain services, revalidating cache, returning DTO responses).
  - `{module_name}.hooks.ts`: `"use client"` custom React hooks for state, client-side filtering, or mutations.
  - `index.ts`: Barrel export aggregating types, schemas, dtos, service, actions, and hooks for clean public consumption.
- **Defined Modules:**
  - `src/services/projects/`: Architectural projects, blueprints, galleries, and publishing toggles.
  - `src/services/leads/`: Prospective client intake, Zod validation, and CRM pipeline status tracking.
  - `src/services/analytics/`: Real-time page views, project views, and WhatsApp consultation telemetry.
  - `src/services/auth/`: Two-token session management, PIN verification, and silent regeneration.
  - `src/services/media/`: Neon S3 storage, client-side compression, and server-side Sharp WebP optimization.

### 8. Strict Iconography & Brand Integrity (No Sparkles Icons)
- **Constraint:** **Strict ban on all `Sparkles` / `Sparkle` icons.**
  - Sparkles icons degrade the architectural gravitas of DIZTINCT TOUCH HOME DESIGN and make the practice look like a casual AI wrapper.
  - Permitted visual metaphors:
    - Structural & Drafting: `Compass`, `Ruler`, `Layers`, `Building2`, `HardHat`.
    - Verification & Status: `CheckCircle2`, `ShieldCheck`, `Activity`, pulsing status dot indicators.
    - Media & Interaction: `Camera`, `FileText`, `ArrowRight`, `Eye`.


