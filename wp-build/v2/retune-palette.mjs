import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Retunes wp-build/v2/sections/*.json from the bone (#F3EEE5) palette to true white,
// and re-prefixes element ids so v2 pages can coexist with v1 pages on the same WP install
// without Elementor id collisions inside the editor.

const here = dirname(fileURLToPath(import.meta.url));
const sectionsDir = resolve(here, 'sections');

// Each swap is [regex, replacerFn]. Replacer is always a function so we can
// safely interpolate captured groups (callbacks do NOT expand $1 in literal strings).
const swaps = [
  // Bone hex → true white
  [/#F3EEE5/g, () => '#FFFFFF'],
  // rgba(243,238,229,a) → rgba(255,255,255,a)
  [/rgba\(243,\s*238,\s*229,\s*([0-9.]+)\)/g, (_m, alpha) => `rgba(255,255,255,${alpha})`],
  // Soften light-section rule borders slightly
  [/rgba\(26,\s*26,\s*28,\s*0\.18\)/g, () => 'rgba(26,26,28,0.14)'],
  [/rgba\(26,\s*26,\s*28,\s*0\.15\)/g, () => 'rgba(26,26,28,0.12)'],
  [/rgba\(26,\s*26,\s*28,\s*0\.1\)/g,  () => 'rgba(26,26,28,0.08)'],
];

function prefixIds(node) {
  if (!node || typeof node !== 'object') return;
  if (typeof node.id === 'string' && !node.id.startsWith('v2')) {
    node.id = 'v2' + node.id;
  }
  if (Array.isArray(node.elements)) node.elements.forEach(prefixIds);
}

const files = readdirSync(sectionsDir).filter(f => f.endsWith('.json')).sort();
let totalSwaps = 0;

for (const file of files) {
  const path = resolve(sectionsDir, file);
  let raw = readFileSync(path, 'utf-8');
  let count = 0;
  for (const [from, fn] of swaps) {
    raw = raw.replace(from, (...args) => { count++; return fn(...args); });
  }
  const parsed = JSON.parse(raw);
  prefixIds(parsed);
  writeFileSync(path, JSON.stringify(parsed, null, 2));
  console.log(`${file}: ${count} color swaps, ids v2-prefixed`);
  totalSwaps += count;
}

console.log(`\nTotal: ${totalSwaps} color tokens swapped across ${files.length} files`);
