// Push interior pages to WordPress via REST API.
//
// Usage:
//   WP_USER=... WP_APP_PASSWORD=... node wp-build/pages/push-pages.mjs           # push all 4
//   WP_USER=... WP_APP_PASSWORD=... node wp-build/pages/push-pages.mjs proof     # push one
//
// Reads <slug>.json (compact Elementor array), wraps it as the _elementor_data
// meta value, and PUTs to /wp-json/wp/v2/pages/<id>.

import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = 'https://1.josh.wpfarmpowered.com/apicaldental';
const ELEMENTOR_VERSION = '4.0.8';

const PAGES = {
  technology: 20,
  proof:      21,
  'for-dsos': 22,
  contact:    23,
};

const here = dirname(fileURLToPath(import.meta.url));

const user = process.env.WP_USER;
const pass = process.env.WP_APP_PASSWORD;
if (!user || !pass) {
  console.error('Missing WP_USER and/or WP_APP_PASSWORD env vars.');
  process.exit(1);
}

const auth = 'Basic ' + Buffer.from(`${user}:${pass}`).toString('base64');

const arg = process.argv[2];
const slugs = arg ? [arg] : Object.keys(PAGES);

for (const slug of slugs) {
  const id = PAGES[slug];
  if (!id) {
    console.error(`Unknown slug: ${slug}`);
    process.exitCode = 1;
    continue;
  }

  const jsonPath = resolve(here, `${slug}.json`);
  const raw = readFileSync(jsonPath, 'utf-8');
  // Re-stringify to make sure it's compact and valid.
  const elementorData = JSON.stringify(JSON.parse(raw));

  const body = {
    status: 'publish',
    meta: {
      _elementor_data: elementorData,
      _elementor_edit_mode: 'builder',
      _elementor_template_type: 'wp-page',
      _elementor_version: ELEMENTOR_VERSION,
    },
  };

  const url = `${SITE}/wp-json/wp/v2/pages/${id}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': auth,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`[${slug}#${id}] FAIL ${res.status}: ${text.slice(0, 500)}`);
    process.exitCode = 1;
    continue;
  }

  const data = await res.json();
  const live = data?.meta?._elementor_data || '';
  const hasPrefix = live.includes('/apicaldental/');
  console.log(`[${slug}#${id}] OK modified=${data.modified} bytes=${live.length} apicaldental=${hasPrefix ? 'yes' : 'NO'}`);
}
