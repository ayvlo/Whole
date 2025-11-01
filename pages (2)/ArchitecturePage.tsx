import { ArchitectureHero } from "../components/architecture/ArchitectureHero";
import { StackDiagram } from "../components/architecture/StackDiagram";
import { GlossaryHighlights } from "../components/architecture/GlossaryHighlights";
import { MetricsBanner } from "../components/architecture/MetricsBanner";
import { TransitionCTA } from "../components/architecture/TransitionCTA";

export function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-obsidian-black">
      <ArchitectureHero />
      <StackDiagram />
      <GlossaryHighlights />
      <MetricsBanner />
      <TransitionCTA />
    </div>
  );
}
