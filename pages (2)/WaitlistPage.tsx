import { WaitlistHero } from "../components/waitlist/WaitlistHero";
import { BetaSignupForm } from "../components/waitlist/BetaSignupForm";

export function WaitlistPage() {
  return (
    <div className="bg-obsidian-black min-h-screen">
      <WaitlistHero />
      <BetaSignupForm />
    </div>
  );
}
