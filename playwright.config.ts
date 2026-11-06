import { defineConfig } from "@playwright/test";

const externalServer = process.env.PLAYWRIGHT_BASE_URL;
const baseURL = externalServer || "http://127.0.0.1:3000";
const npm = process.platform === "win32" ? "npm.cmd" : "npm";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 2,
  reporter: "list",
  use: {
    baseURL,
    browserName: "chromium",
    channel: process.env.PLAYWRIGHT_CHANNEL || "chrome",
    reducedMotion: "reduce",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ],
  ...(!externalServer ? {
    webServer: {
      command: `${npm} run dev -- --hostname 127.0.0.1`,
      url: baseURL,
      reuseExistingServer: !process.env.CI,
      timeout: 120000,
    },
  } : {}),
});
