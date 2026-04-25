import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
for (const slug of ['technology', 'proof', 'for-dsos', 'contact']) {
  const raw = readFileSync(resolve(here, slug + '.json'), 'utf-8');
  const parsed = JSON.parse(raw);
  const compact = JSON.stringify(parsed);
  const escaped = compact.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  writeFileSync(resolve(here, slug + '.escaped.txt'), escaped);
  console.log('v2', slug, 'compact', compact.length, 'escaped', escaped.length);
}
