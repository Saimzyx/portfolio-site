const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("mobile-menu");
const desktopLinks = document.querySelectorAll("#nav-links .nav-link");
const mobileLinks = document.querySelectorAll("#mobile-menu .mobile-link");
const sections = ["hero", "about", "social", "logos", "prototyping", "contact"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);

function setMenuOpen(open) {
  if (!toggle || !menu) return;
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  menu.classList.toggle("hidden", !open);
  menu.hidden = !open;
  document.body.classList.toggle("menu-open", open);
}

toggle?.addEventListener("click", () => {
  setMenuOpen(toggle.getAttribute("aria-expanded") !== "true");
});

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuOpen(false);
});

function setActive(id) {
  desktopLinks.forEach((link) => {
    const match = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("is-active", match);
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible?.target?.id && visible.target.id !== "hero") {
      setActive(visible.target.id);
    }
  },
  { rootMargin: "-35% 0px -50% 0px", threshold: [0.1, 0.35, 0.6] }
);

sections.forEach((section) => observer.observe(section));
