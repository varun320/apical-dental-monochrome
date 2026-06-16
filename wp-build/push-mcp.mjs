// Push pages through the WordPress MCP streamable JSON-RPC endpoint.
// Apache strips the Authorization header on /wp-json/* so direct REST 401s,
// but /wpmcp/streamable accepts the Bearer token from the apical-wordpress
// MCP config and routes through the WP REST internally.
//
// Usage:  node wp-build/push-mcp.mjs            # all 5
//         node wp-build/push-mcp.mjs proof      # one slug
import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const ELEMENTOR_VERSION = '4.0.8';

const PAGES = [
  { id: 12, slug: 'home',       file: resolve(here, 'home-elementor.json') },
  { id: 20, slug: 'technology', file: resolve(here, 'pages/technology.json') },
  { id: 64, slug: 'proof',      file: resolve(here, 'pages/proof.json') },
  { id: 61, slug: 'for-dsos',   file: resolve(here, 'pages/for-dsos.json') },
  { id: 23, slug: 'contact',    file: resolve(here, 'pages/contact.json') },
];

const cfg = JSON.parse(readFileSync(resolve(homedir(), '.claude.json'), 'utf8'));
const find = () => {
  const tryNodes = [cfg.mcpServers || {}];
  for (const p of Object.values(cfg.projects || {})) tryNodes.push(p.mcpServers || {});
  for (const node of tryNodes) {
    const m = node['apical-wordpress'];
    if (m?.headers?.Authorization && m?.url) return { auth: m.headers.Authorization, url: m.url };
  }
  throw new Error('apical-wordpress MCP entry not found');
};
const { auth, url: mcpUrl } = find();

const arg = process.argv[2];
const targets = arg ? PAGES.filter(p => p.slug === arg || String(p.id) === arg) : PAGES;
if (!targets.length) { console.error(`No match: ${arg}`); process.exit(1); }

let failed = 0;
for (const page of targets) {
  const compact = JSON.stringify(JSON.parse(readFileSync(page.file, 'utf8')));

  const body = {
    jsonrpc: '2.0', id: Date.now(),
    method: 'tools/call',
    params: {
      name: 'wp_update_page',
      arguments: {
        id: page.id,
        status: 'publish',
        meta: {
          _elementor_data: compact,
          _elementor_edit_mode: 'builder',
          _elementor_template_type: 'wp-page',
          _elementor_version: ELEMENTOR_VERSION,
          _elementor_css: null,
          _elementor_page_assets: null,
        },
      },
    },
  };
  // Additional Elementor refresh: hit the Elementor REST save endpoint after meta push.

  const res = await fetch(mcpUrl, {
    method: 'POST',
    headers: {
      'Authorization': auth,
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/event-stream',
    },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  if (!res.ok) {
    console.error(`[${page.slug}#${page.id}] FAIL ${res.status}: ${text.slice(0, 400)}`);
    failed++;
    continue;
  }

  const head = text.slice(0, 2000);
  const tailLen = text.length;
  console.log(`[${page.slug}#${page.id}] status=${res.status} respBytes=${tailLen} headSample=`);
  console.log(head);
  console.log('---END HEAD---');
}

if (failed) process.exit(1);
