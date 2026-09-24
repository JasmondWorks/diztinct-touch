import { ProjectDecision } from "@/types/project";
import { Check, HelpCircle, AlertTriangle, Cpu } from "lucide-react";
import { Card } from "@/components/ui";

interface DecisionsBentoProps {
  decisions: ProjectDecision[];
}

export function DecisionsBento({ decisions }: DecisionsBentoProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 border-b border-border/80 pb-3">
        <Cpu className="h-4 w-4 text-primary" />
        <h3 className="text-base font-bold uppercase tracking-wider text-foreground-heading">
          Key Design &amp; Engineering Decisions
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {decisions.map((decision, idx) => (
          <Card
            key={decision.topic}
            className="flex flex-col p-5 space-y-4 hover:border-primary/40 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
                0{idx + 1} // {decision.topic}
              </span>
            </div>

            {/* Chose */}
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-primary">
                <Check className="h-3.5 w-3.5" />
                <span>Chose</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-foreground-heading">
                {decision.decision}
              </p>
            </div>

            {/* Why */}
            <div className="rounded-lg border border-border/80 bg-muted/20 p-3 space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                <HelpCircle className="h-3.5 w-3.5 text-primary" />
                <span>Rationale &amp; Physics</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {decision.reason}
              </p>
            </div>

            {/* Tradeoff */}
            {decision.tradeoff && (
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 space-y-1 mt-auto">
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-500">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  <span>Engineering Trade-off</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {decision.tradeoff}
                </p>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
