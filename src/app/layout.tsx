import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Syed Saim Hussain — Portfolio",
  description: "Brand identities, expressive social media design, logos, and product prototypes by Syed Saim Hussain, a designer based in Karachi, Pakistan.",
  authors: [{ name: "Syed Saim Hussain" }],
  openGraph: {
    title: "Syed Saim Hussain — Portfolio",
    description: "Creative and expressive brand, social media, logo, and product design. Based in Pakistan.",
    type: "website",
    locale: "en_PK",
  },
  robots: { index: true, follow: true },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#ededed", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/poppins-400-REGULAR.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/poppins-700-BOLD.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/bukhari-script-400-REGULAR.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
