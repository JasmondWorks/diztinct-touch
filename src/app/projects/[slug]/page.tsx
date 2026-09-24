import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getProjectBySlugAction, getProjectsAction } from "@/actions/projects";
import { isAdminAuthenticated } from "@/lib/auth-session";
import { trackEventAction } from "@/actions/analytics";
import { AdminEditBar } from "@/components/projects/AdminEditBar";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { MetricsGrid } from "@/components/projects/MetricsGrid";
import { DecisionsBento } from "@/components/projects/DecisionsBento";
import { DrawingsViewer } from "@/components/projects/DrawingsViewer";
import { Button, Badge, Card } from "@/components/ui";
import {
  ChevronRight,
  ChevronLeft,
  Calendar,
  MapPin,
  Building,
  DollarSign,
  Compass,
  FileText,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  Layers,
  ArrowUpRight,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjectsAction(false);
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlugAction(slug);
  if (!project) return { title: "Project Not Found | DIZTINCT TOUCH" };

  return {
    title: `${project.title} | DIZTINCT TOUCH HOME DESIGN`,
    description: project.shortDescription,
    keywords: [
      project.title,
      project.buildingType || project.category,
      project.location || "Nigeria",
      "DIZTINCT TOUCH HOME DESIGN",
      "Mayowa architect",
    ],
    openGraph: {
      title: `${project.title} — DIZTINCT TOUCH HOME DESIGN`,
      description: project.shortDescription,
      images: project.coverImage ? [{ url: project.coverImage }] : [],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [project, allProjects, isAuth] = await Promise.all([
    getProjectBySlugAction(slug),
    getProjectsAction(false),
    isAdminAuthenticated(),
  ]);

  if (!project) {
    notFound();
  }

  // If project is unpublished and visitor is not admin, hide it
  if (project.isPublished === false && !isAuth) {
    notFound();
  }

  // Fire-and-forget view telemetry
  trackEventAction("project_view", `/projects/${slug}`, { title: project.title });

  const projectIndex = allProjects.findIndex((p) => p.slug === slug);
  const prevProject =
    projectIndex > 0
      ? allProjects[projectIndex - 1]
      : allProjects[allProjects.length - 1] || project;
  const nextProject =
    projectIndex < allProjects.length - 1
      ? allProjects[projectIndex + 1]
      : allProjects[0] || project;

  // Similar / Related projects
  const relatedProjects = allProjects
    .filter((p) => p.id !== project.id)
    .slice(0, 2);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-mono text-muted-foreground pt-4">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/#projects" className="hover:text-foreground transition-colors">
            Projects
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-primary font-bold">{project.category}</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground truncate max-w-xs">{project.title}</span>
        </nav>

        {/* Project Hero Header */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="gold" className="text-xs py-1 px-3">
              {project.category}
            </Badge>
            {project.featured && (
              <Badge variant="warning" className="text-xs py-1 px-3">
                Featured Project
              </Badge>
            )}
            {project.buildingType && (
              <Badge variant="outline" className="text-xs py-1 px-3">
                {project.buildingType}
              </Badge>
            )}
            {project.currentStage && (
              <Badge variant="outline" className="border-primary/40 text-primary text-xs py-1 px-3">
                {project.currentStage}
              </Badge>
            )}
            {project.location && (
              <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                {project.location}
              </span>
            )}
            {project.yearCompleted && (
              <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                {project.yearCompleted}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground-heading leading-tight">
            {project.title}
          </h1>

          <p className="max-w-4xl text-base sm:text-xl text-muted-foreground leading-relaxed">
            {project.shortDescription}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.liveUrl && (
              <Button asChild variant="default">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Compass className="h-4 w-4" />
                  <span>Launch Interactive 3D Model Tour</span>
                </a>
              </Button>
            )}

            {project.githubUrl && (
              <Button asChild variant="outline">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FileText className="h-4 w-4" />
                  <span>Download Drawing Sheets (PDF/BIM)</span>
                </a>
              </Button>
            )}

            <Button asChild variant="outline">
              <Link href="/contact">
                <span>Inquire Commission</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Primary Hero Media Feature */}
        <div className="relative aspect-16/9 sm:aspect-21/9 overflow-hidden rounded-3xl border border-border bg-muted/40">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Floating Details Overlay */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4 text-white">
            {(project.location || project.yearCompleted) && (
              <div className="space-y-1">
                <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
                  Exterior View
                </span>
                <p className="text-xs sm:text-sm font-medium drop-shadow-md">
                  {[
                    project.location,
                    project.yearCompleted
                      ? project.yearCompleted.toLowerCase().includes("construction") ||
                        project.yearCompleted.toLowerCase().includes("completed")
                        ? project.yearCompleted
                        : `Completed ${project.yearCompleted}`
                      : null,
                  ]
                    .filter(Boolean)
                    .join(" • ")}
                </p>
              </div>
            )}

            <div className="flex items-center gap-3">
              {project.gfa && (
                <Badge variant="outline" className="bg-black/60 backdrop-blur-md border-white/20 text-white font-mono text-xs">
                  GFA: {project.gfa}
                </Badge>
              )}
              {project.budget && (
                <Badge variant="outline" className="bg-black/60 backdrop-blur-md border-white/20 text-white font-mono text-xs">
                  Budget: {project.budget}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Measurable Results & Sustainability Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="py-2">
            <MetricsGrid metrics={project.metrics} />
          </div>
        )}

        {/* Detailed Project Case Study Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main 8-Col Editorial Narrative */}
          <div className="lg:col-span-8 space-y-12">
            {/* Case Study Full Narrative */}
            {(project.longDescription || project.fullCaseStudy) && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 border-b border-border/80 pb-3">
                  <FileText className="h-4 w-4 text-primary" />
                  <h3 className="text-base font-bold uppercase tracking-wider text-foreground-heading">
                    Case Study &amp; Design Statement
                  </h3>
                </div>

                <div className="prose prose-invert max-w-none space-y-4 text-muted-foreground leading-relaxed">
                  {project.longDescription && (
                    <p className="text-base text-foreground font-medium">
                      {project.longDescription}
                    </p>
                  )}

                  {project.fullCaseStudy && (
                    <div className="space-y-6 pt-4">
                      {project.fullCaseStudy.contextAndChallenge && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-bold uppercase tracking-wider text-foreground-heading font-mono">
                            Context &amp; Site Challenges
                          </h4>
                          <p className="text-sm">
                            {project.fullCaseStudy.contextAndChallenge}
                          </p>
                        </div>
                      )}

                      {project.fullCaseStudy.designConcept && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-bold uppercase tracking-wider text-foreground-heading font-mono">
                            Computational Concept &amp; Geometry
                          </h4>
                          <p className="text-sm">
                            {project.fullCaseStudy.designConcept}
                          </p>
                        </div>
                      )}

                      {project.fullCaseStudy.materialityAndStructure && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-bold uppercase tracking-wider text-foreground-heading font-mono">
                            Materiality &amp; Structural Mechanics
                          </h4>
                          <p className="text-sm">
                            {project.fullCaseStudy.materialityAndStructure}
                          </p>
                        </div>
                      )}

                      {project.fullCaseStudy.environmentalPerformance && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-bold uppercase tracking-wider text-foreground-heading font-mono">
                            Environmental &amp; Passive Strategies
                          </h4>
                          <p className="text-sm">
                            {project.fullCaseStudy.environmentalPerformance}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Picture-Heavy Interactive Photo Gallery with Lightbox */}
            {project.gallery && project.gallery.length > 0 && (
              <ProjectGallery title={project.title} images={project.gallery} />
            )}

            {/* Architectural Drawings & Axonometric Section Blueprint */}
            {((project.drawings && project.drawings.length > 0) || project.architecture?.diagramUrl) && (
              <DrawingsViewer
                drawings={project.drawings}
                axonometricUrl={project.architecture?.diagramUrl}
                axonometricDescription={project.architecture?.description}
              />
            )}

            {/* Tectonic & Material Decisions Bento */}
            {project.engineeringDecisions && project.engineeringDecisions.length > 0 && (
              <DecisionsBento decisions={project.engineeringDecisions} />
            )}

            {/* Future Phases / Planned Expansions */}
            {project.futureImprovements && project.futureImprovements.length > 0 && (
              <Card className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-primary" />
                  <h3 className="text-base font-bold uppercase tracking-wider text-foreground-heading">
                    Future Phases &amp; Planned Expansions
                  </h3>
                </div>
                <ul className="space-y-3">
                  {project.futureImprovements.map((improvement, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{improvement}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>

          {/* Sidebar 4-Col Specifications */}
          <div className="lg:col-span-4 space-y-6 sticky top-24">
            {/* Project Specifications Card */}
            <Card className="p-6 space-y-5">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-primary border-b border-border/80 pb-3">
                Project Overview &amp; Specifications
              </h3>

              <div className="space-y-3 text-xs font-mono">
                <div className="flex items-center justify-between border-b border-border/60 pb-2">
                  <span className="text-muted-foreground">Architect &amp; Designer:</span>
                  <span className="font-semibold text-primary">DIZTINCT TOUCH</span>
                </div>
                {project.client && (
                  <div className="flex items-center justify-between border-b border-border/60 pb-2">
                    <span className="text-muted-foreground">Commission Client:</span>
                    <span className="font-semibold text-foreground text-right">{project.client}</span>
                  </div>
                )}
                <div className="flex items-center justify-between border-b border-border/60 pb-2">
                  <span className="text-muted-foreground">Typology:</span>
                  <span className="font-semibold text-primary">{project.category}</span>
                </div>
                {project.buildingType && (
                  <div className="flex items-center justify-between border-b border-border/60 pb-2">
                    <span className="text-muted-foreground">Building Type:</span>
                    <span className="font-semibold text-foreground">{project.buildingType}</span>
                  </div>
                )}
                {project.currentStage && (
                  <div className="flex items-center justify-between border-b border-border/60 pb-2">
                    <span className="text-muted-foreground">Current Stage:</span>
                    <span className="font-semibold text-primary">{project.currentStage}</span>
                  </div>
                )}
                {project.location && (
                  <div className="flex items-center justify-between border-b border-border/60 pb-2">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-semibold text-foreground">{project.location}</span>
                  </div>
                )}
                {project.yearCompleted && (
                  <div className="flex items-center justify-between border-b border-border/60 pb-2">
                    <span className="text-muted-foreground">Completion:</span>
                    <span className="font-semibold text-foreground">{project.yearCompleted}</span>
                  </div>
                )}
                {project.bedroomCount && (
                  <div className="flex items-center justify-between border-b border-border/60 pb-2">
                    <span className="text-muted-foreground">Bedrooms:</span>
                    <span className="font-semibold text-foreground">{project.bedroomCount}</span>
                  </div>
                )}
                {project.siteArea && (
                  <div className="flex items-center justify-between border-b border-border/60 pb-2">
                    <span className="text-muted-foreground">Site Area:</span>
                    <span className="font-semibold text-foreground">{project.siteArea}</span>
                  </div>
                )}
                {project.gfa && (
                  <div className="flex items-center justify-between border-b border-border/60 pb-2">
                    <span className="text-muted-foreground">Gross Internal Area:</span>
                    <span className="font-semibold text-foreground">{project.gfa}</span>
                  </div>
                )}
                {project.budget && (
                  <div className="flex items-center justify-between border-b border-border/60 pb-2">
                    <span className="text-muted-foreground">Estimated Budget:</span>
                    <span className="font-semibold text-foreground">{project.budget}</span>
                  </div>
                )}
              </div>

              {/* Material and Software Systems / Scope */}
              {project.techStack && project.techStack.length > 0 && (
                <div className="pt-2 space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                    Project Scope &amp; Architectural Input
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="text-[10px] bg-muted/40 font-semibold"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Direct Inquiry CTA */}
              <div className="pt-4 border-t border-border">
                <Button asChild variant="default" className="w-full">
                  <Link href="/contact">
                    <span>Inquire Regarding Similar Site</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </Card>

            {/* Related Typology Works */}
            {relatedProjects && relatedProjects.length > 0 && (
              <Card className="p-6 space-y-4">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-foreground-heading">
                  Related Architectural Works
                </h4>
                <div className="space-y-3">
                  {relatedProjects.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/projects/${rel.slug}`}
                      className="group flex items-center gap-3 rounded-xl border border-border/60 p-2.5 hover:border-primary/40 hover:bg-muted/30 transition-all"
                    >
                      <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-muted/40">
                        <Image
                          src={rel.coverImage}
                          alt={rel.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <div className="space-y-0.5 min-w-0">
                        <span className="text-[10px] font-mono text-primary uppercase">
                          {rel.category}
                        </span>
                        <h5 className="text-xs font-bold text-foreground-heading truncate group-hover:text-primary transition-colors">
                          {rel.title}
                        </h5>
                        <span className="text-[10px] font-mono text-muted-foreground">
                          {rel.location}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Previous / Next Project Navigation Bar */}
        <div className="border-t border-border pt-8 flex items-center justify-between gap-4">
          <Link
            href={`/projects/${prevProject.slug}`}
            className="group flex items-center gap-3 text-left"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card group-hover:border-primary/40 transition-colors">
              <ChevronLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                Previous Project
              </span>
              <p className="text-xs sm:text-sm font-bold text-foreground-heading group-hover:text-primary transition-colors line-clamp-1">
                {prevProject.title}
              </p>
            </div>
          </Link>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="group flex items-center gap-3 text-right"
          >
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                Next Project
              </span>
              <p className="text-xs sm:text-sm font-bold text-foreground-heading group-hover:text-primary transition-colors line-clamp-1">
                {nextProject.title}
              </p>
            </div>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card group-hover:border-primary/40 transition-colors">
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </Link>
        </div>

        {/* Floating Admin View Switcher Bar */}
        {isAuth && <AdminEditBar project={project} />}
      </div>
    </div>
  );
}
