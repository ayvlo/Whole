import { ContentHubHero } from "../components/content/ContentHubHero";
import { FeaturedArticle } from "../components/content/FeaturedArticle";
import { BlogGrid } from "../components/content/BlogGrid";
import { PodcastSpotlight } from "../components/content/PodcastSpotlight";
import { NewsletterSignup } from "../components/content/NewsletterSignup";

export function ContentHubPage() {
  return (
    <div className="min-h-screen bg-obsidian-black">
      <ContentHubHero />
      <FeaturedArticle />
      <BlogGrid />
      <PodcastSpotlight />
      <NewsletterSignup />
    </div>
  );
}
