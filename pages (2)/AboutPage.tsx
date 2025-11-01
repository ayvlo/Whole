import { AboutHero } from "../components/about/AboutHero";
import { MissionStatement } from "../components/about/MissionStatement";
import { VisionSection } from "../components/about/VisionSection";
import { FounderNote } from "../components/about/FounderNote";
import { TimelineStrip } from "../components/about/TimelineStrip";

export function AboutPage() {
  return (
    <div className="min-h-screen bg-obsidian-black">
      <AboutHero />
      <MissionStatement />
      <VisionSection />
      <FounderNote />
      <TimelineStrip />
    </div>
  );
}
