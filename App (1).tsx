import { useState } from "react";
import { Toaster } from "./components/ui/sonner";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ProductPage } from "./pages/ProductPage";
import { ArchitecturePage } from "./pages/ArchitecturePage";
import { UseCasesPage } from "./pages/UseCasesPage";
import { DocsPage } from "./pages/DocsPage";
import { ContentHubPage } from "./pages/ContentHubPage";
import { FounderPage } from "./pages/FounderPage";
import { CareersPage } from "./pages/CareersPage";
import { WaitlistPage } from "./pages/WaitlistPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "about":
        return <AboutPage />;
      case "product":
        return <ProductPage />;
      case "architecture":
        return <ArchitecturePage />;
      case "use-cases":
        return <UseCasesPage />;
      case "docs":
        return <DocsPage />;
      case "content":
        return <ContentHubPage />;
      case "founder":
        return <FounderPage />;
      case "careers":
        return <CareersPage />;
      case "waitlist":
        return <WaitlistPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-black text-foreground antialiased">
      <Navigation onNavigate={setCurrentPage} currentPage={currentPage} />
      {renderPage()}
      <Footer onNavigate={setCurrentPage} />
      <Toaster position="top-right" />
    </div>
  );
}
