import { ArtworkViewer } from "@/components/artwork-viewer";
import { DesignCanvas } from "@/components/design-canvas";
import { MobilePage } from "@/components/mobile-page";
import { PortfolioNav } from "@/components/portfolio-nav";
import { designPages, pageDetails } from "@/lib/portfolio";
import { desktopViewports } from "@/lib/section-flow";

export default function Home() {
  return (
    <ArtworkViewer>
      <a href="#about" className="skip-link">Skip to content</a>
      <PortfolioNav />
      <main className="portfolio-main">
        {designPages.map((page, index) => {
          const details = pageDetails[index];
          return (
            <section key={details.id} id={details.id} data-kind={details.kind} tabIndex={-1} aria-labelledby={`${details.id}-title`} className="portfolio-section">
              {index === 0 ? <h1 id={`${details.id}-title`} className="sr-only">{details.label}</h1> : <h2 id={`${details.id}-title`} className="sr-only">{details.label}</h2>}
              <div className="desktop-page hidden md:block"><DesignCanvas page={page} viewport={desktopViewports[page.number]} /></div>
              <div className="mobile-page md:hidden"><MobilePage number={page.number} /></div>
            </section>
          );
        })}
      </main>
    </ArtworkViewer>
  );
}
