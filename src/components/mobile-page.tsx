import Image from "next/image";
import type { ReactNode } from "react";
import { ArtworkImage } from "@/components/artwork-viewer";
import { DesignCanvas, DesignFragment } from "@/components/design-canvas";
import { artworkLabels, assets, contact, designPages, experience } from "@/lib/portfolio";
import type { DesignNode } from "@/lib/design-types";

function Frame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`selection-frame ${className}`}><span className="frame-handles" aria-hidden="true" />{children}</div>;
}

function Decoration({ asset, className = "", position = "relative" }: { asset: keyof typeof assets; className?: string; position?: "relative" | "absolute" }) {
  return <div style={{position}} className={className} aria-hidden="true"><Image src={assets[asset].src} alt="" fill unoptimized sizes="100vw" className="object-contain" /></div>;
}

function Art({ asset, className = "", contain = false }: { asset: keyof typeof assets; className?: string; contain?: boolean }) {
  return <ArtworkImage src={assets[asset].src} label={artworkLabels[asset]} className={`relative w-full ${className}`} imageStyle={{objectFit: contain ? "contain" : "cover"}} />;
}

function ProjectTopline({ category }: { category: string }) {
  return <div className="mb-8 flex items-center gap-3 text-[10px] font-semibold text-ink"><span>{category}</span><span className="project-rule flex-1" aria-hidden="true" /><span>SYED SAIM HUSSAIN</span></div>;
}

function sourceText(page: number, start: string) {
  function search(nodes: DesignNode[]): string | undefined {
    for (const node of nodes) {
      if (node.type === "text" && node.text.startsWith(start)) return node.text;
      if (node.type === "group") {
        const result = search(node.children);
        if (result) return result;
      }
    }
  }
  return search(designPages[page - 1].nodes) || "";
}

function MobileIntro() {
  return (
    <div className="mobile-intro relative min-h-[620px] overflow-hidden">
      <div className="mobile-paper-top absolute" aria-hidden="true"><Image src={assets.MAHXCncnPwY.src} alt="" fill preload unoptimized sizes="100vw" /></div>
      <a href="#contents" className="absolute right-7 top-8 z-10 flex items-start gap-1 text-[13px]">
        Syed Saim Hussain
        <Decoration asset="MAEe18Da6Us" className="mt-3 h-7 w-6" />
      </a>
      <div className="mobile-paper-bottom absolute" aria-hidden="true"><Image src={assets.MAHXCncnPwY.src} alt="" fill unoptimized sizes="100vw" /></div>
      <div className="mobile-portfolio-word absolute inset-x-4 z-10 flex items-baseline justify-center font-bold text-charcoal" aria-hidden="true">
        <span>p</span><span className="mobile-portrait-letter relative inline-block"><span className="absolute -top-1 left-1 flex gap-2"><i className="h-3 w-3 rounded-full bg-ink" /><i className="h-3 w-3 rounded-full bg-ink" /></span></span><span>rt</span><span className="relative -mr-2 -ml-1 font-script font-normal text-ink">f</span><span className="border-2 border-ink leading-[1.15]">olio</span>
      </div>
      <div className="mobile-intro-portrait absolute bottom-0 z-20" aria-hidden="true"><Image src={assets.MAHXCsGwdCI.src} alt="" fill preload unoptimized sizes="75vw" className="object-contain object-bottom" /></div>
    </div>
  );
}

function MobileAbout() {
  return (
    <div className="relative overflow-hidden px-7 pt-10 pb-14">
      <div className="relative mx-auto mb-10 h-[350px] max-w-[330px]">
        <div className="absolute inset-x-5 bottom-5 aspect-square rounded-full bg-ink" />
        <div className="absolute inset-0 z-10"><Image src={assets.MAHXCsGwdCI.src} alt="Syed Saim Hussain" fill unoptimized sizes="330px" className="object-contain object-bottom" /></div>
        <Decoration asset="MAFx7ZjanGQ" position="absolute" className="-right-16 -bottom-5 -left-16 h-24 opacity-20" />
      </div>
      <p className="text-[17px] leading-[1.6]">Based in Pakistan, I <span className="inline-block rotate-[4deg] font-script text-[23px] text-ink">design</span> brand identities with an emphasis on creating social media content.</p>
      <div className="mt-8 rotate-[-2deg] border-2 border-ink p-4 text-right text-[15px] leading-[1.55]">My design style is creative and expressive. I am experienced in creating logos that standout in this pool of social media.</div>
    </div>
  );
}

function MobileExperience({ continued = false }: { continued?: boolean }) {
  const items = continued ? experience.slice(2) : experience.slice(0, 2);
  return (
    <div className={`relative overflow-hidden px-7 ${continued ? "pt-4 pb-12" : "pt-14 pb-4"}`}>
      <Decoration asset={continued ? "MAGGgcqE8zA" : "MAE4mE--hTA"} position="absolute" className="pointer-events-none inset-0 h-full w-full opacity-15" />
      {!continued && <>
        <div className="relative mb-8 flex items-center justify-between">
          <div className="rounded-full bg-ink px-5 py-2 text-paper"><span className="mr-0.5 align-middle font-display text-[30px] leading-none text-cream">T</span><span className="text-lg italic">ools</span></div>
          <div className="bg-ink px-5 py-3 font-script text-[22px] text-paper">Experiences</div>
        </div>
        <div className="relative mb-12 flex items-center gap-5" aria-label="Tools: Canva, Figma, ChatGPT, and Claude">
          {(["MAEsHc0xokM", "MAHXEAXNEGU", "MAHFebG9brk", "MAHXELrBXjY"] as const).map((asset) => <Decoration key={asset} asset={asset} className="h-12 w-12" />)}
        </div>
      </>}
      <div className="relative ml-2 border-l-2 border-ink pl-7">
        {items.map((item) => <article key={item.company} className="relative pb-10 last:pb-0">
          <span className="absolute top-1 -left-[33px] h-2 w-2 bg-ink" aria-hidden="true" />
          <p className="mb-2 text-xs font-medium text-[#474747]">{item.date}</p>
          <h3 className="text-base font-semibold">{item.role}</h3>
          <p className="mt-0.5 text-[13px] font-medium italic">{item.company}</p>
          <p className="mt-2 text-[13px] leading-[1.6]">{item.description}</p>
        </article>)}
      </div>
      {continued && <div className="relative mt-12 max-w-[290px] overflow-hidden rounded-lg border-2 border-[#474747]">
        <p className="bg-cream px-4 py-3 text-sm font-semibold text-[#474747]">Lets Create Something Together!</p>
        <div className="space-y-3 border-t-2 border-[#474747] bg-slate px-4 py-4 text-[12px] text-[#243f56]">
          <a className="flex items-center gap-2" href={contact.phoneHref}><Decoration asset="MAHXohD5Szs" className="h-5 w-5 shrink-0" />{contact.phone}</a>
          <a className="flex items-center gap-2" href={`mailto:${contact.email}`}><Decoration asset="MAHXoh4zrho" className="h-5 w-5 shrink-0" />{contact.email}</a>
        </div>
      </div>}
    </div>
  );
}

function MobileContents() {
  return (
    <div className="relative overflow-hidden px-7 pt-9 pb-16 text-ink">
      <Decoration asset="MAGGgcqE8zA" position="absolute" className="inset-0 h-full w-full opacity-20" />
      <div className="relative mb-9 flex items-center justify-between gap-12">
        <Frame className="h-20 w-20"><Decoration asset="MAFrhBZ3gHs" className="h-full w-full p-1" /></Frame>
        <Frame className="h-[130px] w-[130px]"><Decoration asset="MAGlsk8xMdo" className="h-full w-full" /></Frame>
      </div>
      <Frame className="relative mb-5 px-3 py-4"><h3 className="text-[23px] font-semibold tracking-tight">Table of Contents</h3></Frame>
      <nav aria-label="Portfolio sections" className="relative grid grid-cols-4 gap-3 text-[14px] font-semibold">
        <a href="#social" className="selection-frame col-span-3 px-3 py-4"><span className="frame-handles" aria-hidden="true" />1. Social Media</a>
        <span className="bg-slate" aria-hidden="true" />
        <span className="grid place-items-center bg-slate text-[28px] text-paper" aria-hidden="true">∞</span>
        <a href="#logos" className="selection-frame col-span-3 px-3 py-4"><span className="frame-handles" aria-hidden="true" />2. Logo Design</a>
        <a href="#prototyping" className="selection-frame col-span-3 px-3 py-4"><span className="frame-handles" aria-hidden="true" />3. Prototyping</a>
        <span className="grid place-items-center bg-slate text-[28px] text-paper" aria-hidden="true">↙</span>
      </nav>
    </div>
  );
}

function VerlioProject() {
  return (
    <div className="px-7 pt-8 pb-14">
      <ProjectTopline category="SOCIAL MEDIA" />
      <h3 className="mb-5 inline-block border-2 border-dashed border-ink px-2 py-1 text-[26px] font-semibold text-ink">Verlio</h3>
      <p className="mb-3 text-[14px] leading-[1.6]">{sourceText(7, "Verlio is")}</p>
      <p className="mb-7 text-[14px] leading-[1.6]">{sourceText(7, "Founded in")}</p>
      <div className="grid grid-cols-2 items-start gap-4">
        <div className="space-y-4"><Art asset="MAHSW1v05YE" className="aspect-square" /><Art asset="MAHXElVMoCw" className="aspect-[4/5]" /></div>
        <div className="space-y-4"><Art asset="MAHXEhAU5d8" className="aspect-[4/5]" /><Art asset="MAHSAqV_8Fs" className="aspect-square" /></div>
      </div>
      <div className="mt-7 grid grid-cols-4 gap-3 text-[9px] text-[#474747]">
        {[["#742cf6", "742cf6"], ["#ededed", "ededed"], ["#050c1e", "050c1e"], ["#ffffff", "ffffff"]].map(([color, code]) => <div key={code}><span className="mb-2 block h-7" style={{backgroundColor: color}} aria-hidden="true" />{code}</div>)}
      </div>
    </div>
  );
}

function LuprixProject() {
  return (
    <div className="px-7 pt-8 pb-14">
      <ProjectTopline category="SOCIAL MEDIA" />
      <div className="mb-7 flex items-center gap-5"><Art asset="MAHXnK5KZ4k" className="aspect-square max-w-20 bg-black" contain /><h3 className="text-[30px] font-semibold text-ink">Luprix</h3></div>
      <Art asset="MAHXnLY9Tok" className="aspect-[4/5]" />
      <p className="mt-7 border-2 border-dashed border-ink p-4 text-[14px] leading-[1.6]">{sourceText(8, "Designed promotional")}</p>
    </div>
  );
}

function TwillTitle() {
  return <span className="text-ink"><span style={{fontFamily: '"Caladea", serif'}}>Twill</span><span style={{fontFamily: '"Anaktoria", serif'}}>.co</span></span>;
}

function TwillSocialProject() {
  return (
    <div className="px-7 pt-8 pb-14">
      <ProjectTopline category="SOCIAL MEDIA" />
      <Frame className="mx-auto mb-8 w-fit px-2 py-1 text-ink"><h3 className="text-[30px]"><TwillTitle /></h3></Frame>
      <div className="grid grid-cols-2 items-start gap-5"><Art asset="MAHXmRyeTN8" className="aspect-[5/7]" /><Art asset="MAHXmUQ49fc" className="mt-9 aspect-[5/7]" /></div>
      <p className="mt-8 border-2 border-dashed border-ink p-4 text-[14px] leading-[1.6]">{sourceText(9, "Social media graphics")}</p>
    </div>
  );
}

function AzenKuraTitle() {
  return <span style={{fontFamily: '"Kenao Sans Serif", serif'}} className="text-ink">AzenKura</span>;
}

function AzenKuraLogoProject() {
  return (
    <div className="px-7 pt-8 pb-14">
      <ProjectTopline category="LOGO DESIGN" />
      <h3 className="mb-7 text-[30px]"><AzenKuraTitle /></h3>
      <Art asset="MAHXXXDf2AM" className="mx-auto aspect-square max-w-[260px] bg-white" contain />
      <Frame className="mt-8 p-4 text-[#474747]"><p className="text-[14px] leading-[1.6] text-black">{sourceText(11, "A custom monogram")}</p></Frame>
    </div>
  );
}

function TwillLogoProject() {
  return (
    <div className="px-7 pt-8 pb-14">
      <ProjectTopline category="LOGO DESIGN" />
      <Frame className="mb-7 w-fit px-2 py-1 text-ink"><h3 className="text-[30px]"><TwillTitle /></h3></Frame>
      <Art asset="MAHXmbp7k-4" className="aspect-square bg-white" contain />
      <Frame className="mt-8 p-4 text-[#474747]"><p className="text-[14px] leading-[1.6] text-black">{sourceText(12, "A logo for Twill.co")}</p></Frame>
    </div>
  );
}

function PrototypeProject() {
  return (
    <div className="px-7 pt-8 pb-14">
      <ProjectTopline category="PROTOTYPING" />
      <Frame className="mb-8 w-fit px-2 py-1 text-[#474747]"><h3 className="text-[30px]"><AzenKuraTitle /></h3></Frame>
      <DesignFragment node={designPages[13].nodes[1]} className="mb-8 bg-white" />
      <p className="border-2 border-dashed border-ink p-4 text-[14px] leading-[1.6]">{sourceText(14, "Developed technical prototype")}</p>
    </div>
  );
}

function MobileContact() {
  return (
    <footer className="relative overflow-hidden px-7 pt-14 pb-14 text-ink">
      <Decoration asset="MAGGgcqE8zA" position="absolute" className="-top-16 -left-24 h-[450px] w-[450px] rotate-180 opacity-25" />
      <Frame className="relative border-dashed p-4"><a href="#hero" className="text-[14px] font-medium">Thank you for scrolling all the way to here!</a></Frame>
      <svg className="relative mx-auto my-4 h-28 w-32" viewBox="0 0 128 112" fill="none" aria-hidden="true"><path d="M75 0v12q0 14-14 14H37q-14 0-14 14t14 14h47q14 0 14 14T84 82H64q-14 0-14 14v12m-5-6 5 6 5-6" stroke="#474747" strokeWidth="2" strokeDasharray="6 3" strokeLinecap="round" /></svg>
      <Frame className="relative mx-auto mb-12 w-fit border-dashed px-3 py-3"><a href={`mailto:${contact.email}`} className="text-[27px] font-semibold tracking-tight">Let’s Work Together!</a></Frame>
      <div className="relative flex flex-col items-start gap-6 text-[13px] text-[#474747]">
        <a href={contact.phoneHref} className="selection-frame ml-auto flex items-center gap-3 border-dashed bg-slate px-4 py-3"><span className="frame-handles" aria-hidden="true" /><Decoration asset="MAHXohD5Szs" className="h-6 w-6 shrink-0" />{contact.phone}</a>
        <a href={`mailto:${contact.email}`} className="selection-frame flex items-center gap-3 border-dashed bg-slate px-4 py-3"><span className="frame-handles" aria-hidden="true" />{contact.email}<Decoration asset="MAHXoh4zrho" className="h-6 w-6 shrink-0" /></a>
      </div>
    </footer>
  );
}

export function MobilePage({ number }: { number: number }) {
  switch (number) {
    case 1: return <MobileIntro />;
    case 2: return <MobileAbout />;
    case 3: return <MobileExperience />;
    case 4: return <MobileExperience continued />;
    case 5: return <MobileContents />;
    case 6: case 10: case 13: return <DesignCanvas page={designPages[number - 1]} />;
    case 7: return <VerlioProject />;
    case 8: return <LuprixProject />;
    case 9: return <TwillSocialProject />;
    case 11: return <AzenKuraLogoProject />;
    case 12: return <TwillLogoProject />;
    case 14: return <PrototypeProject />;
    case 15: return <MobileContact />;
    default: return null;
  }
}
