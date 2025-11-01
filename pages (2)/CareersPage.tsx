import { CareersHero } from "../components/careers/CareersHero";
import { OpenRoles } from "../components/careers/OpenRoles";
import { CulturePrinciples } from "../components/careers/CulturePrinciples";
import { BenefitsBar } from "../components/careers/BenefitsBar";
import { CareersCTA } from "../components/careers/CareersCTA";

export function CareersPage() {
  return (
    <div className="bg-obsidian-black">
      <CareersHero />
      <OpenRoles />
      <CulturePrinciples />
      <BenefitsBar />
      <CareersCTA />
    </div>
  );
}
