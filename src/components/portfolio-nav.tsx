"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./portfolio-nav.module.css";

const links = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "contents", label: "Work" },
  { id: "contact", label: "Contact" },
] as const;

export function PortfolioNav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sections = links.map(({ id }) => document.getElementById(id));
    let frame = 0;

    const update = () => {
      frame = 0;
      const edge = (headerRef.current?.offsetHeight ?? 0) + 24;
      let current = "";
      for (const section of sections) {
        if (section && section.getBoundingClientRect().top <= edge) current = section.id;
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) current = "contact";
      setActive(current);
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={styles.header}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          toggleRef.current?.focus();
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <div className={styles.inner}>
        <a href="#hero" className={styles.brand} aria-label="Saim Hussain — back to top" onClick={() => setOpen(false)}>
          <span className={styles.monogram} aria-hidden="true">s.</span>
          <span className={styles.identity}>SAIM HUSSAIN<span>DESIGN PORTFOLIO</span></span>
        </a>
        <span className={styles.connector} aria-hidden="true" />
        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="portfolio-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
          <span className={styles.menuIcon} aria-hidden="true"><span /><span /></span>
        </button>
        <nav id="portfolio-navigation" aria-label="Main navigation" className={styles.navigation} data-open={open}>
          {links.map(({ id, label }, index) => (
            <a
              key={id}
              href={`#${id}`}
              className={`${styles.link} ${id === "contact" ? styles.contact : ""}`}
              aria-current={active === id ? "location" : undefined}
              onClick={() => setOpen(false)}
            >
              <span className={styles.number} aria-hidden="true">0{index + 1}</span>
              {label}
              {id === "contact" && <svg className={styles.arrow} width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 16 16 4M4 4h12v12" stroke="currentColor" strokeWidth="1.4" /></svg>}
              <span className={styles.selection} aria-hidden="true"><span /></span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
