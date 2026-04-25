// V2 deployment — pushes Elementor payloads to draft pages on WP via REST API.
// Existing v1 pages (12, 20, 21, 22, 23) are NEVER touched; only v2 page IDs.
//
// Usage:
//   WP_USER='your-wp-username' WP_APP_PASSWORD='xxxx xxxx xxxx xxxx xxxx xxxx' \
//   node wp-build/v2/deploy.mjs [home|technology|proof|for-dsos|contact|all]
//
// Get an app password: WP admin → Users → Your profile → Application Passwords.
// Defaults to "all" if no arg given.

import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const meta = JSON.parse(readFileSync(resolve(here, 'page-meta.json'), 'utf-8'));

const SITE = meta.site_url; // https://1.josh.wpfarmpowered.com/apicaldental
const REST = `${SITE}/wp-json/wp/v2/pages`;
const USER = process.env.WP_USER;
const APP_PASS = process.env.WP_APP_PASSWORD;

if (!USER || !APP_PASS) {
  console.error('ERROR: set WP_USER and WP_APP_PASSWORD env vars first.');
  console.error('  Get an app password: WP admin → Users → Profile → Application Passwords');
  process.exit(1);
}

const auth = 'Basic ' + Buffer.from(`${USER}:${APP_PASS}`).toString('base64');

const targets = process.argv[2] && process.argv[2] !== 'all'
  ? [process.argv[2]]
  : Object.keys(meta.v2_pages);

// Safety: refuse to push to any v1 page id
const v1Locked = new Set(Object.values(meta.v1_pages_off_limits).filter(v => typeof v === 'number'));

function payloadFor(slugKey) {
  const cfg = meta.v2_pages[slugKey];
  if (!cfg) throw new Error(`Unknown v2 slug: ${slugKey}`);
  if (v1Locked.has(cfg.id)) throw new Error(`REFUSED — page id ${cfg.id} is in v1_pages_off_limits`);

  let elementorJsonPath;
  if (slugKey === 'home') {
    elementorJsonPath = resolve(here, 'home-elementor.json');
  } else {
    elementorJsonPath = resolve(here, 'pages', `${slugKey}.json`);
  }

  if (!existsSync(elementorJsonPath)) {
    throw new Error(`Missing payload: ${elementorJsonPath}. Run assemble + build-interior first.`);
  }

  const sections = JSON.parse(readFileSync(elementorJsonPath, 'utf-8'));
  const elementorData = JSON.stringify(sections);

  return {
    pageId: cfg.id,
    body: {
      title: cfg.title,
      status: cfg.status, // stays 'draft'
      meta: {
        _elementor_data: elementorData,
        _elementor_edit_mode: 'builder',
        _elementor_template_type: 'wp-page',
        _elementor_version: '3.21.0',
      },
    },
  };
}

async function pushOne(slugKey) {
  const { pageId, body } = payloadFor(slugKey);
  const url = `${REST}/${pageId}`;
  console.log(`→ ${slugKey}: pushing ${body.meta._elementor_data.length.toLocaleString()} chars to page ${pageId}`);

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': auth,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`  ✗ HTTP ${res.status}: ${text.slice(0, 500)}`);
    return { slugKey, ok: false, status: res.status };
  }
  const json = await res.json();
  const link = `${SITE}/?page_id=${json.id}&preview=true`;
  console.log(`  ✓ ok — preview: ${link}`);
  return { slugKey, ok: true, id: json.id, link };
}

console.log(`Deploying v2 to ${SITE}`);
console.log(`Targets: ${targets.join(', ')}\n`);

const results = [];
for (const t of targets) {
  try {
    results.push(await pushOne(t));
  } catch (e) {
    console.error(`  ✗ ${t}: ${e.message}`);
    results.push({ slugKey: t, ok: false, error: e.message });
  }
}

console.log('\n=== Summary ===');
for (const r of results) {
  console.log(r.ok ? `✓ ${r.slugKey} → ${r.link}` : `✗ ${r.slugKey}: ${r.status || r.error}`);
}
const failed = results.filter(r => !r.ok).length;
process.exit(failed > 0 ? 1 : 0);
