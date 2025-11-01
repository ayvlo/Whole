import { ProductHero } from "../components/product/ProductHero";
import { CorePillars } from "../components/product/CorePillars";
import { BeforeAfterScroller } from "../components/product/BeforeAfterScroller";
import { FeatureMatrix } from "../components/product/FeatureMatrix";
import { TaglineBanner } from "../components/product/TaglineBanner";

export function ProductPage() {
  return (
    <div className="min-h-screen bg-obsidian-black">
      <ProductHero />
      <CorePillars />
      <BeforeAfterScroller />
      <FeatureMatrix />
      <TaglineBanner />
    </div>
  );
}
