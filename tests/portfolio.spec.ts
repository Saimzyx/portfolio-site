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

  for (const [name, id] of [["1. Social Media", "social"], ["2. Logo Design", "logos"], ["3. Prototyping", "prototyping"]]) {
    await page.goto("/#contents");
    await page.locator("#contents").getByRole("link", { name, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect.poll(async () => (await page.locator(`#${id}`).boundingBox())?.y).toBeLessThan(25);
  }
});

test("provides the original email and phone contact links", async ({ page }) => {
  await page.goto("/#contact");
  const contact = page.locator("#contact");
  await expect(contact.getByRole("link", { name: "+92 3083132363", exact: true })).toHaveAttribute("href", "tel:+923083132363");
  await expect(contact.getByRole("link", { name: "sh3778257@gmail.com", exact: true })).toHaveAttribute("href", "mailto:sh3778257@gmail.com");
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

test("loads visible artwork without runtime errors or horizontal overflow", async ({ page }) => {
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
  }

  const dimensions = await page.evaluate(() => ({width: window.innerWidth, content: document.documentElement.scrollWidth}));
  expect(dimensions.content).toBeLessThanOrEqual(dimensions.width);
  expect(errors).toEqual([]);
});
