// One-shot teardown: delete the v2 (white-palette) draft pages on WordPress.
// v1 page IDs (12, 20, 21, 22, 23) are NEVER touched — explicitly refused.
//
// Usage:
//   WP_USER='your-wp-username' WP_APP_PASSWORD='xxxx xxxx xxxx xxxx xxxx xxxx' \
//   node wp-build/delete-v2-pages.mjs
//
// Pass --dry-run to print the plan without calling the API.

const SITE = 'https://1.josh.wpfarmpowered.com/apicaldental';
const REST = `${SITE}/wp-json/wp/v2/pages`;

const V1_OFF_LIMITS = new Set([12, 20, 21, 22, 23]);
const V2_PAGES = [
  { id: 36, slug: 'home-v2',       title: 'Home (v2 — Magazine)' },
  { id: 37, slug: 'technology-v2', title: 'Technology (v2)' },
  { id: 38, slug: 'proof-v2',      title: 'Proof (v2)' },
  { id: 39, slug: 'for-dsos-v2',   title: 'For DSOs (v2)' },
  { id: 40, slug: 'contact-v2',    title: 'Contact (v2)' },
];

const dryRun = process.argv.includes('--dry-run');
const USER = process.env.WP_USER;
const APP_PASS = process.env.WP_APP_PASSWORD;

if (!dryRun && (!USER || !APP_PASS)) {
  console.error('ERROR: set WP_USER and WP_APP_PASSWORD env vars (or pass --dry-run).');
  process.exit(1);
}

const auth = USER && APP_PASS
  ? 'Basic ' + Buffer.from(`${USER}:${APP_PASS}`).toString('base64')
  : null;

for (const p of V2_PAGES) {
  if (V1_OFF_LIMITS.has(p.id)) {
    console.error(`REFUSED — page id ${p.id} is in v1 off-limits set.`);
    process.exit(1);
  }
  const url = `${REST}/${p.id}?force=true`;
  if (dryRun) {
    console.log(`[dry-run] DELETE ${url}  (${p.title})`);
    continue;
  }
  const res = await fetch(url, { method: 'DELETE', headers: { Authorization: auth } });
  const body = await res.text();
  if (!res.ok) {
    console.error(`FAIL ${p.id} ${p.title}: ${res.status} ${body.slice(0, 200)}`);
    continue;
  }
  console.log(`OK   ${p.id} ${p.title}`);
}
