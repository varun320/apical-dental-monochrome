// One-shot: push proof page with BOTH content.raw and meta._elementor_data in
// a single wp_update_page MCP call, to force Elementor to regenerate
// content.rendered (the save_post hook keys off content updates).
import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
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

const meta = JSON.parse(readFileSync(resolve(here, '.meta_proof.json'), 'utf8'));

const body = {
  jsonrpc: '2.0', id: Date.now(),
  method: 'tools/call',
  params: {
    name: 'wp_update_page',
    arguments: {
      id: 21,
      status: 'publish',
      title: 'Proof',
      content: '<!-- elementor-built -->\n',
      meta: {
        _elementor_data: meta._elementor_data,
        _elementor_edit_mode: 'builder',
        _elementor_template_type: 'wp-page',
        _elementor_version: '4.0.8',
        _elementor_css: null,
        _elementor_page_assets: null,
      },
    },
  },
};

const res = await fetch(mcpUrl, {
  method: 'POST',
  headers: {
    Authorization: auth,
    'Content-Type': 'application/json',
    Accept: 'application/json, text/event-stream',
  },
  body: JSON.stringify(body),
});

const text = await res.text();
console.log('STATUS', res.status, 'BYTES', text.length);
console.log('HEAD', text.slice(0, 1500));
console.log('---');
console.log('TAIL', text.slice(-800));
