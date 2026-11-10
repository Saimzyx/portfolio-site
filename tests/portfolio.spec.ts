import { expect, test } from "@playwright/test";

test("shows all fifteen portfolio sections with the correct identity", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Syed Saim Hussain — Portfolio");
  await expect(page.locator("main > section")).toHaveCount(15);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Syed Saim Hussain — Portfolio");
  await expect(page.getByRole("link", { name: "Syed Saim Hussain", exact: true })).toBeVisible();
});

test("navigates from the introduction through all table of contents links", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Syed Saim Hussain", exact: true }).click();
  await expect(page).toHaveURL(/#contents$/);
  const headerHeight = await page.getByRole("banner").evaluate((header) => header.getBoundingClientRect().height);

  for (const [name, id] of [["1. Social Media", "social"], ["2. Logo Design", "logos"], ["3. Prototyping", "prototyping"]]) {
    await page.goto("/#contents");
    await page.locator("#contents").getByRole("link", { name, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect.poll(async () => {
      const top = await page.locator(`#${id}`).evaluate((section) => section.getBoundingClientRect().top);
      return top >= headerHeight && top < headerHeight + 24;
    }).toBe(true);
  }
});

test("navigates with the sticky header and keeps destinations visible", async ({ page, isMobile }) => {
  await page.goto("/");
  const header = page.getByRole("banner");
  const navigation = header.getByRole("navigation", { name: "Main navigation" });

  for (const [label, id] of [["About", "about"], ["Experience", "experience"], ["Work", "contents"], ["Contact", "contact"]]) {
    if (isMobile) await header.getByRole("button", { name: "Menu", exact: true }).click();
    const link = navigation.getByRole("link", { name: label, exact: true });
    await link.click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(header.locator(`a[href="#${id}"]`)).toHaveAttribute("aria-current", "location");
    await expect(header).toBeInViewport();
    await expect.poll(async () => {
      const headerBottom = await header.evaluate((element) => element.getBoundingClientRect().bottom);
      const sectionTop = await page.locator(`#${id}`).evaluate((element) => element.getBoundingClientRect().top);
      const atEnd = await page.evaluate(() => window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2);
      return sectionTop >= headerBottom && (sectionTop < headerBottom + 24 || atEnd);
    }).toBe(true);
    if (isMobile) await expect(navigation).toBeHidden();
  }

  await header.getByRole("link", { name: "Saim Hussain — back to top" }).click();
  await expect(page).toHaveURL(/#hero$/);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});

test("supports keyboard navigation and dismisses the phone menu", async ({ page, isMobile }) => {
  test.skip(!isMobile, "The desktop links are always visible.");
  await page.goto("/");
  const header = page.getByRole("banner");
  const toggle = header.getByRole("button", { name: "Menu", exact: true });
  const navigation = header.getByRole("navigation", { name: "Main navigation" });
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(navigation).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(navigation.getByRole("link", { name: "About", exact: true })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(navigation).toBeHidden();
  await expect(toggle).toBeFocused();

  await toggle.click();
  await page.locator("#hero").click({ position: { x: 10, y: 400 } });
  await expect(navigation).toBeHidden();
});

test("opens Gmail and WhatsApp from all contact links", async ({ page, context }) => {
  // Verify the destination in a new tab without contacting either service.
  await context.route((url) => ["mail.google.com", "wa.me"].includes(url.hostname), (route) => route.fulfill({ contentType: "text/html", body: "Contact destination" }));
  await page.goto("/#contact");
  const destinations = [
    { name: "+92 3083132363", href: "https://wa.me/923083132363" },
    { name: "sh3778257@gmail.com", href: "https://mail.google.com/mail/?view=cm&fs=1&to=sh3778257%40gmail.com" },
  ];

  for (const { name, href } of destinations) {
    const links = page.getByRole("link", { name, exact: true });
    await expect(links).toHaveCount(2);
    for (const link of await links.all()) {
      await expect(link).toHaveAttribute("href", href);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  }

  const contact = page.locator("#contact");
  for (const { name, href } of [...destinations, { name: "Let’s Work Together!", href: destinations[1].href }]) {
    const popupReady = page.waitForEvent("popup");
    await contact.getByRole("link", { name, exact: true }).click();
    const popup = await popupReady;
    await expect(popup).toHaveURL(href);
    await popup.close();
    await expect(page).toHaveURL(/#contact$/);
  }
  await expect(page.locator('a[href^="mailto:"], a[href^="tel:"]')).toHaveCount(0);
  await contact.getByRole("link", { name: "Thank you for scrolling all the way to here!", exact: true }).click();
  await expect(page).toHaveURL(/#hero$/);
});

test("opens artwork and restores keyboard focus when the viewer closes", async ({ page }) => {
  await page.goto("/#verlio");
  const artwork = page.getByRole("button", { name: "View Verlio — Our Mission social media post", exact: true });
  await artwork.focus();
  await page.keyboard.press("Enter");
  const viewer = page.getByRole("dialog");
  await expect(viewer).toBeVisible();
  await expect(viewer.getByRole("img")).toHaveAttribute("alt", "Verlio — Our Mission social media post");
  await page.keyboard.press("Escape");
  await expect(viewer).not.toBeVisible();
  await expect(artwork).toBeFocused();
  await artwork.click();
  await viewer.getByRole("button", { name: "Close artwork" }).click();
  await expect(viewer).not.toBeVisible();
});

test("loads visible artwork without runtime errors or horizontal overflow", async ({ page, isMobile }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");

  const sections = page.locator("main > section");
  for (const section of await sections.all()) {
    await section.scrollIntoViewIfNeeded();
    const images = section.locator("img").filter({ visible: true });
    const loaded = await images.evaluateAll(async (elements) => {
      await Promise.all(elements.map((element) => (element as HTMLImageElement).decode().catch(() => {})));
      return elements.every((element) => (element as HTMLImageElement).naturalWidth > 0 && element.getBoundingClientRect().height > 0);
    });
    expect(loaded).toBe(true);
    if (!isMobile) {
      const clippedContent = await section.evaluate((element) => {
        const bounds = element.getBoundingClientRect();
        return Array.from(element.querySelectorAll<HTMLElement>(".design-text, .artwork-button"))
          .filter((content) => {
            const rect = content.getBoundingClientRect();
            return rect.width > 0 && (rect.top < bounds.top - 2 || rect.bottom > bounds.bottom + 2);
          })
          .map((content) => content.getAttribute("aria-label") || content.textContent);
      });
      expect(clippedContent, "Section spacing must keep its text and project artwork visible").toEqual([]);
    }
  }

  const dimensions = await page.evaluate(() => ({width: window.innerWidth, content: document.documentElement.scrollWidth}));
  expect(dimensions.content).toBeLessThanOrEqual(dimensions.width);
  expect(errors).toEqual([]);
});
