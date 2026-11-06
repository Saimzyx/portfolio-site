import { ArtworkViewer } from "@/components/artwork-viewer";
import { DesignCanvas } from "@/components/design-canvas";
import { MobilePage } from "@/components/mobile-page";
import { designPages, pageDetails } from "@/lib/portfolio";

export default function Home() {
  return (
    <ArtworkViewer>
      <a href="#about" className="skip-link">Skip to content</a>
      <main>
        {designPages.map((page, index) => {
          const details = pageDetails[index];
          return (
            <section key={details.id} id={details.id} aria-labelledby={`${details.id}-title`} className="portfolio-section">
              {index === 0 ? <h1 id={`${details.id}-title`} className="sr-only">{details.label}</h1> : <h2 id={`${details.id}-title`} className="sr-only">{details.label}</h2>}
              <div className="hidden md:block"><DesignCanvas page={page} /></div>
              <div className="md:hidden"><MobilePage number={page.number} /></div>
            </section>
          );
        })}
      </main>
    </ArtworkViewer>
  );
}
