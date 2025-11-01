import { UseCasesHero } from "../components/use-cases/UseCasesHero";
import { PersonaTabs } from "../components/use-cases/PersonaTabs";
import { CaseCardGallery } from "../components/use-cases/CaseCardGallery";
import { ValidationBanner } from "../components/use-cases/ValidationBanner";
import { CTABar } from "../components/use-cases/CTABar";

export function UseCasesPage() {
  return (
    <div className="min-h-screen bg-obsidian-black">
      <UseCasesHero />
      <PersonaTabs />
      <CaseCardGallery />
      <ValidationBanner />
      <CTABar />
    </div>
  );
}
