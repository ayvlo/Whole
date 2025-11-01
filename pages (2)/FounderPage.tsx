import { FounderHero } from "../components/founder/FounderHero";
import { OriginStory } from "../components/founder/OriginStory";
import { PrinciplesGrid } from "../components/founder/PrinciplesGrid";
import { FounderQuoteSection } from "../components/founder/FounderQuoteSection";
import { PressRecognition } from "../components/founder/PressRecognition";

export function FounderPage() {
  return (
    <div className="bg-obsidian-black">
      <FounderHero />
      <OriginStory />
      <PrinciplesGrid />
      <FounderQuoteSection />
      <PressRecognition />
    </div>
  );
}
