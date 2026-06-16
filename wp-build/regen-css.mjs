// regen-css.mjs — Trigger Elementor CSS regeneration after a payload push.
//
// Why this exists: pushing _elementor_data via WP REST updates the meta but
// Elementor's compiled CSS file (post-<id>.css) is only regenerated when the
// editor saves. Until you regenerate, the live page renders old markup with
// old CSS — that's the "icons all messed up" symptom.
//
// What it does:
//   1. Logs into wp-admin via /wp-login.php (form POST)
//   2. For each page in page-meta.json, opens the Elementor editor
//   3. Runs window.$e.run('document/save/update') and waits for save toast
//   4. Optionally screenshots the FRONT-END URL at 1440 + 390
//
// One-time setup:
//   npx playwright install chromium
//
// Usage:
//   WP_LOGIN_USER='mohammed@firstmovers.ai' \
//   WP_LOGIN_PASS='your-wp-login-password' \
//   node regen-css.mjs                       # all pages
//   node regen-css.mjs home                  # one slug
//   node regen-css.mjs --shots               # also save screenshots to ./shots/

import { readFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const pageMeta = JSON.parse(readFileSync(resolve(here, 'page-meta.json'), 'utf8'));
const SITE = pageMeta.site_url;
const ALL_PAGES = pageMeta.page_ids; // { home: 12, technology: 20, ... }

const args = process.argv.slice(2);
const shots = args.includes('--shots');
const slugArg = args.find((a) => !a.startsWith('--'));

const targets = slugArg
  ? { [slugArg]: ALL_PAGES[slugArg] }
  : ALL_PAGES;

if (Object.values(targets).some((v) => v == null)) {
  console.error(`Unknown slug "${slugArg}". Known: ${Object.keys(ALL_PAGES).join(', ')}`);
  process.exit(1);
}

const USER = process.env.WP_LOGIN_USER;
const PASS = process.env.WP_LOGIN_PASS;
if (!USER || !PASS) {
  console.error('Set WP_LOGIN_USER and WP_LOGIN_PASS env vars (regular WP login, not Application Password).');
  process.exit(1);
}

// Lazy-import so the script loads even before `npx playwright install` runs.
let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.error('Playwright not installed. Run: npx playwright install chromium && npm i -g playwright');
  process.exit(1);
}

const shotsDir = resolve(here, 'shots');
if (shots && !existsSync(shotsDir)) mkdirSync(shotsDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ ignoreHTTPSErrors: true });

// 1. Login once
const loginPage = await ctx.newPage();
await loginPage.goto(`${SITE}/wp-login.php`, { waitUntil: 'domcontentloaded' });
await loginPage.fill('#user_login', USER);
await loginPage.fill('#user_pass', PASS);
await Promise.all([
  loginPage.waitForNavigation({ waitUntil: 'domcontentloaded' }),
  loginPage.click('#wp-submit'),
]);
if (!loginPage.url().includes('/wp-admin')) {
  console.error('Login failed — still at:', loginPage.url());
  await browser.close();
  process.exit(1);
}
console.log('Logged in.');
await loginPage.close();

let failed = 0;
for (const [slug, id] of Object.entries(targets)) {
  console.log(`\n[${slug}#${id}] Opening Elementor editor…`);
  const page = await ctx.newPage();

  try {
    await page.goto(`${SITE}/wp-admin/post.php?post=${id}&action=elementor`, {
      waitUntil: 'domcontentloaded',
      timeout: 90_000,
    });
    // Wait for the editor's command bus to be ready
    await page.waitForFunction(() => window.$e && window.$e.run, null, { timeout: 90_000 });
    console.log(`[${slug}#${id}] Editor ready — triggering save.`);

    // Trigger save and wait until Elementor reports complete
    await page.evaluate(async () => {
      await window.$e.run('document/save/update');
    });

    // Give the CSS regen a beat (Elementor writes post-<id>.css after save)
    await page.waitForTimeout(12_000);

    console.log(`[${slug}#${id}] Saved. CSS regen triggered.`);
  } catch (e) {
    console.error(`[${slug}#${id}] FAIL:`, e.message);
    failed++;
    await page.close();
    continue;
  }
  await page.close();

  // 2. Screenshot the FRONT-END URL at 1440 + 390 if --shots
  if (shots) {
    for (const [label, viewport] of [
      ['desktop-1440', { width: 1440, height: 900 }],
      ['mobile-390', { width: 390, height: 844 }],
    ]) {
      const shotPage = await ctx.newPage();
      await shotPage.setViewportSize(viewport);
      const url = slug === 'home' ? `${SITE}/` : `${SITE}/${slug}/`;
      await shotPage.goto(`${url}?z=${Date.now()}`, { waitUntil: 'networkidle', timeout: 60_000 });
      const file = resolve(shotsDir, `${slug}-${label}.png`);
      await shotPage.screenshot({ path: file, fullPage: true });
      console.log(`[${slug}] ${label} → ${file}`);
      await shotPage.close();
    }
  }
}

await browser.close();
if (failed) process.exit(1);
console.log('\nAll done.');
