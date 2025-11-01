import { DocsHero } from "../components/docs/DocsHero";
import { QuickStartTiles } from "../components/docs/QuickStartTiles";
import { CodeSampleBlock } from "../components/docs/CodeSampleBlock";
import { DeveloperCTA } from "../components/docs/DeveloperCTA";

export function DocsPage() {
  return (
    <div className="min-h-screen bg-obsidian-black">
      <DocsHero />
      <QuickStartTiles />
      <CodeSampleBlock />
      <DeveloperCTA />
    </div>
  );
}
