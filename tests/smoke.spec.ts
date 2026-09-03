import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const routes = [
  "/",
  "/work",
  "/work/akij-air",
  "/work/kicbak",
  "/work/flight-expert",
  "/experience",
  "/about",
  "/contact",
  "/resume",
];

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`console: ${m.text()}`);
  });
  return errors;
}

for (const route of routes) {
  test(`${route} renders, has a heading, and passes axe`, async ({ page }) => {
    const errors = collectErrors(page);
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1").first()).toBeVisible();

    // Let the entrance animations settle before auditing.
    await page.waitForTimeout(1500);

    const axe = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(
      axe.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`),
    ).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test("unknown routes return the custom 404", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("wandered off");
});

test("sitemap and robots are served", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  expect(await sitemap.text()).toContain("/work/akij-air");

  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBeTruthy();
  expect(await robots.text()).toContain("sitemap.xml");
});

test("open graph images render", async ({ request }) => {
  for (const path of ["/opengraph-image", "/work/akij-air/opengraph-image"]) {
    const res = await request.get(path);
    expect(res.ok(), path).toBeTruthy();
    expect(res.headers()["content-type"]).toContain("image/png");
  }
});

test("security headers are present", async ({ request }) => {
  const res = await request.get("/");
  const headers = res.headers();
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["content-security-policy"]).toContain("default-src 'self'");
});

test.describe("desktop only", () => {
  test.skip(({ isMobile }) => Boolean(isMobile), "keyboard shortcuts are desktop-only");

  test("command palette navigates with the keyboard", async ({ page }) => {
    await page.goto("/");
    const dialog = page.getByRole("dialog", { name: "Command palette" });
    // The palette is lazy-loaded, so retry the shortcut until its listener is attached.
    await expect(async () => {
      await page.keyboard.press("Control+k");
      await expect(dialog).toBeVisible({ timeout: 500 });
    }).toPass({ timeout: 10_000 });
    await page.getByLabel("Search commands").fill("contact");
    await expect(page.getByRole("option", { name: /^Contact/ })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/contact$/);
  });

  test("site defaults to light and the toggle switches to dark", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).not.toHaveClass(/dark/);
    await page.getByRole("button", { name: "Switch to dark theme" }).click();
    await expect(page.locator("html")).toHaveClass(/dark/);
    await expect(page.getByRole("button", { name: "Switch to light theme" })).toBeVisible();
  });
});
