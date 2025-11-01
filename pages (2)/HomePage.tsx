import { Hero } from "../components/Hero";
import { ProblemSection } from "../components/ProblemSection";
import { ApproachSection } from "../components/ApproachSection";
import { FounderQuote } from "../components/FounderQuote";
import { UseCases } from "../components/UseCases";
import { Comparison } from "../components/Comparison";
import { WaitlistCTA } from "../components/WaitlistCTA";

export function HomePage() {
  return (
    <div className="min-h-screen bg-obsidian-black">
      <Hero />
      <ProblemSection />
      <ApproachSection />
      <FounderQuote />
      <UseCases />
      <Comparison />
      <WaitlistCTA />
    </div>
  );
}
