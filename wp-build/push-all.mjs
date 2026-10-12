// One-shot pusher: reads WP_APP_USER/WP_APP_PASSWORD from ~/.claude.json
// (apical-elementor MCP env block) and PUTs all 5 Elementor pages via REST.
//
// Usage:  node wp-build/push-all.mjs            # all 5
//         node wp-build/push-all.mjs contact    # one slug or numeric id

import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const ELEMENTOR_VERSION = '4.0.8';

const PAGES = [
  { id: 12, slug: 'home',       file: resolve(here, 'home-elementor.json') },
  { id: 16, slug: 'technology', file: resolve(here, 'pages/technology.json') },
  { id: 17, slug: 'proof',      file: resolve(here, 'pages/proof.json') },
  { id: 18, slug: 'for-dsos',   file: resolve(here, 'pages/for-dsos.json') },
  { id: 19, slug: 'contact',    file: resolve(here, 'pages/contact.json') },
];

// Env override wins (used for prod pushes). Falls back to MCP config for staging.
const findAuth = () => {
  const base = process.env.WP_BASE || 'https://apicaldental.com';
  if (process.env.WP_USER && process.env.WP_APP_PASSWORD) {
    const token = Buffer.from(`${process.env.WP_USER}:${process.env.WP_APP_PASSWORD}`).toString('base64');
    return { auth: `Basic ${token}`, site: base.replace(/\/$/, '') };
  }
  const cfg = JSON.parse(readFileSync(resolve(homedir(), '.claude.json'), 'utf8'));
  const tryNodes = [cfg.mcpServers || {}];
  for (const p of Object.values(cfg.projects || {})) tryNodes.push(p.mcpServers || {});
  for (const node of tryNodes) {
    const e = node['apical-elementor'];
    if (e?.env?.WP_APP_USER && e?.env?.WP_APP_PASSWORD && e?.env?.WP_URL) {
      const u = new URL(e.env.WP_URL);
      const site = `${u.protocol}//${u.host}${u.pathname.replace(/\/(wp-json.*)?$/, '')}`;
      const token = Buffer.from(`${e.env.WP_APP_USER}:${e.env.WP_APP_PASSWORD}`).toString('base64');
      return { auth: `Basic ${token}`, site };
    }
  }
  for (const node of tryNodes) {
    const m = node['apical-wordpress'];
    if (m?.headers?.Authorization && m?.url) {
      const u = new URL(m.url);
      const site = `${u.protocol}//${u.host}${u.pathname.split('/wp-json')[0]}`;
      return { auth: m.headers.Authorization, site };
    }
  }
  throw new Error('No apical-elementor or apical-wordpress MCP entry found in ~/.claude.json');
};
const { auth, site } = findAuth();

const arg = process.argv[2];
const targets = arg
  ? PAGES.filter(p => p.slug === arg || String(p.id) === arg)
  : PAGES;

if (!targets.length) {
  console.error(`No page matched "${arg}". Known: ${PAGES.map(p => `${p.id}/${p.slug}`).join(', ')}`);
  process.exit(1);
}

let failed = 0;
for (const page of targets) {
  const raw = readFileSync(page.file, 'utf8');
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

  const url = `${site}/wp-json/wp/v2/pages/${page.id}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: auth, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`[${page.slug}#${page.id}] FAIL ${res.status}: ${text.slice(0, 400)}`);
    failed++;
    continue;
  }

  const data = await res.json();
  const live = data?.meta?._elementor_data || '';
  console.log(`[${page.slug}#${page.id}] OK modified=${data.modified} bytes=${live.length} sections=${(live.match(/"elType":"section"/g) || []).length}`);
}

if (failed) process.exit(1);
