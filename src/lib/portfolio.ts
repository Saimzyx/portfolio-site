import originalPages from "@/data/design.json";
import originalAssets from "@/data/assets.json";
import type { DesignPage } from "@/lib/design-types";

export const designPages = originalPages as DesignPage[];
export const assets = originalAssets;
export const contact = {
  email: "sh3778257@gmail.com",
  phone: "+92 3083132363",
  phoneHref: "tel:+923083132363",
};

export const pageDetails = [
  { id: "hero", label: "Syed Saim Hussain — Portfolio", kind: "intro" },
  { id: "about", label: "About me", kind: "about" },
  { id: "experience", label: "Tools and experience", kind: "experience" },
  { id: "experience-continued", label: "More experience", kind: "experience" },
  { id: "contents", label: "Table of contents", kind: "contents" },
  { id: "social", label: "1. Social Media", kind: "divider" },
  { id: "verlio", label: "Verlio — Social media design", kind: "project" },
  { id: "luprix", label: "Luprix — Social media design", kind: "project" },
  { id: "twill-social", label: "Twill.co — Social media design", kind: "project" },
  { id: "logos", label: "2. Logo Design", kind: "divider" },
  { id: "azenkura-logo", label: "AzenKura — Logo design", kind: "project" },
  { id: "twill-logo", label: "Twill.co — Logo design", kind: "project" },
  { id: "prototyping", label: "3. Prototyping", kind: "divider" },
  { id: "azenkura-prototype", label: "AzenKura — Product prototype", kind: "project" },
  { id: "contact", label: "Let’s work together", kind: "contact" },
] as const;

export const artworkLabels: Record<string, string> = {
  MAHXEhAU5d8: "Verlio — Our Mission social media post",
  MAHXElVMoCw: "Verlio — What We Provide social media post",
  MAHSW1v05YE: "Verlio brand symbol on a dark background",
  MAHSAqV_8Fs: "Verlio brand symbol on a light background",
  MAHXnK5KZ4k: "Luprix brand symbol",
  MAHXnLY9Tok: "Luprix — Flat 20% off promotional post",
  MAHXmRyeTN8: "Twill.co — One of a Kind embroidered clothing tag",
  MAHXmUQ49fc: "Twill.co — Hand embroidered clothing care tag",
  MAHXXXDf2AM: "AzenKura — Interlocking A and K monogram",
  "MAHXmbp7k-4": "Twill.co — Logo typography and packaging variations",
  MAHXoT2Gv8E: "AzenKura briefcase — Front technical drawing",
  MAHXoU_6ixc: "AzenKura briefcase — Side technical drawing",
  MAHXodoIfN4: "AzenKura briefcase — Back technical drawing",
  MAHXoeB76Hc: "AzenKura briefcase — Handle technical drawing",
};

export const experience = [
  { date: "June 2026 – Now", role: "Brand Designer", company: "Verlio / Karachi, Pakistan", description: "Created the logo, brand identity, and social media posts for an early stage startup." },
  { date: "March 2026 – Now", role: "Brand Designer", company: "AzenKura / Karachi, Pakistan", description: "Helped launch a new brand by designing its logo, brand identity, and product prototypes." },
  { date: "Jan 2026 – Now", role: "Social Media Designer", company: "Luprix / Karachi, Pakistan", description: "Created social media posts and visual content for Luprix’s brand presence." },
  { date: "Aug 2025 – Jan 2026", role: "Brand Designer", company: "Twill.co / Karachi, Pakistan", description: "Designed the brand’s logo and social media posts." },
];
