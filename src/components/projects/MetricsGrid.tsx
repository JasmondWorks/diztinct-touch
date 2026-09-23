import { ProjectMetric } from "@/types/project";
import { Activity } from "lucide-react";
import { Card, Badge } from "@/components/ui";

interface MetricsGridProps {
  metrics: ProjectMetric[];
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 border-b border-border/80 pb-3">
        <Activity className="h-4 w-4 text-primary" />
        <h3 className="text-base font-bold uppercase tracking-wider text-foreground-heading">
          Measurable Performance &amp; Spatial Metrics
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <Card
            key={metric.label}
            className="flex flex-col justify-between p-4 transition-all hover:border-primary/40 shadow-xs"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                {metric.label}
              </span>
              {metric.changeBadge && (
                <Badge variant="gold" className="text-[10px] font-bold">
                  {metric.changeBadge}
                </Badge>
              )}
            </div>

            <div className="my-3 font-mono text-2xl sm:text-3xl font-black text-foreground-heading tracking-tight">
              {metric.value}
            </div>

            {metric.description && (
              <p className="text-xs text-muted-foreground leading-relaxed mt-auto pt-2 border-t border-border/60">
                {metric.description}
              </p>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
