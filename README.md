# Syed Saim Hussain — Portfolio

A Next.js 16, React 19, TypeScript, and Tailwind CSS 4 portfolio built from the supplied Canva design. All 15 pages are included, with the original fonts, artwork, colors, selection frames, and connectors.

The desktop composition scales proportionally from Canva’s 1122.52 × 793.70 coordinate system, using 85% of the available width on desktop with a 1400px maximum. Section viewports remove excess outer paper while preserving the content's layout. Grid and dot backgrounds fade at the joins, and the original timeline connects About, experience, and contents. Phone layouts use the same artwork with readable text and stacked projects. Text uses HTML, illustrations retain their SVG paths, and raster artwork is stored as lossless WebP.

## Run locally

1. Install Node.js 20.9 or newer.
2. Open a terminal in this folder and install the locked dependencies:

   ```powershell
   npm.cmd ci
   ```

3. Start the development server:

   ```powershell
   npm.cmd run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

Use `npm` instead of `npm.cmd` on macOS and Linux. The `.cmd` form works in Windows PowerShell without changing its script execution policy.

Local development works without environment configuration. For a custom production domain, copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the website’s full URL. Vercel’s production domain is detected automatically.

## How the design is built

1. **App setup:** Next.js App Router provides the page, metadata, and local image delivery. Tailwind’s PostCSS plugin and theme define the design colors and mobile styling.
2. **Original resources:** Artwork and font files come from the two shared Canva projects and are served locally. SVG color variants and lossless WebP assets reproduce the design’s palettes.
3. **Desktop composition:** Readable design data describes each element’s position, dimensions, font, color, and layering. The renderer scales those values together. Section viewports trim only outer spacing; background masks and aligned connector endpoints smooth the joins without rearranging the artwork.
4. **Typography:** Line heights, kerning, and baseline offsets follow Canva’s rendered text styles, including the script and decorative letterforms.
5. **Phone layouts:** Each section adapts for smaller screens. Project descriptions reuse the original design text, and the prototype drawing keeps its vector details.
6. **Interactions:** A sticky navbar links to About, Experience, Work, and Contact, with selection-frame hover effects and a keyboard accessible phone menu. Anchor destinations clear the navbar. The table of contents links to each category. Email links open a Gmail draft addressed to the original email, and phone links open a WhatsApp chat with the original number; both open in a new tab. Artwork opens in a keyboard accessible viewer; Escape closes it and returns focus.

## Editing the site

| File or folder | Purpose |
| --- | --- |
| `src/app/page.tsx` | Page order and semantic sections |
| `src/data/design.json` | Original desktop text, coordinates, styles, and SVG paths |
| `src/lib/portfolio.ts` | Contact information, section names, project labels, and experience |
| `src/lib/section-flow.ts` | Outer section spacing and shared connector endpoints |
| `src/components/design-canvas.tsx` | Proportional desktop renderer |
| `src/components/mobile-page.tsx` | Responsive phone compositions |
| `src/components/portfolio-nav.tsx` | Sticky navigation, section tracking, and phone menu |
| `src/components/portfolio-nav.module.css` | Navbar styling and selection-frame hover effects |
| `src/components/artwork-viewer.tsx` | Artwork previews and keyboard interaction |
| `src/app/globals.css` | Tailwind theme, precision styling, and motion preferences |
| `src/app/fonts.css` | Local original font faces |
| `public/assets/artwork/` | Original artwork prepared for the website |

The active application entrypoint is `src/app/page.tsx`.

## Validation

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
npm.cmd run test:e2e
```

The browser tests cover desktop and phone navigation, contact links, artwork viewing, keyboard focus, image loading, runtime errors, and horizontal overflow. They use the installed Google Chrome browser by default.

To use Playwright’s Chromium browser instead:

```powershell
npx.cmd playwright install chromium
$env:PLAYWRIGHT_CHANNEL = "chromium"
npm.cmd run test:e2e
```

After building, start the production server with `npm.cmd run start`. To test an already running production server, set `PLAYWRIGHT_BASE_URL` to its URL before running the browser tests.

## Saved version and recovery

The Git tag `pdf-matching-v1` marks the restored PDF-matching website. Keep this tag on its original commit so it remains a fixed recovery point. Commit future changes separately with descriptive messages.

To open this version on a new branch, first commit or stash any work in progress, then run:

```powershell
git fetch origin --tags
git switch -c restore-pdf-matching pdf-matching-v1
```

This creates a branch with the saved site and preserves the existing branch history. Run `npm.cmd ci` and `npm.cmd run dev` to preview it.

## Design references

- [Original portfolio design](https://canva.link/5bcevg5fq4cwwqc)
- [Original resource collection](https://canva.link/ly1v2k8n2g0dr9y)

The website runs entirely from the local files; viewing it does not require a Canva account or a connection to Canva.
