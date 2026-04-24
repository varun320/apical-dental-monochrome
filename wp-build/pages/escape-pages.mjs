import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
for (const slug of ['technology', 'proof', 'for-dsos', 'contact']) {
  const raw = readFileSync(resolve(here, slug + '.json'), 'utf-8');
  // raw is already compact JSON (array of sections). JSON.stringify of the parsed is the same.
  const parsed = JSON.parse(raw);
  const compact = JSON.stringify(parsed);
  const escaped = compact.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  writeFileSync(resolve(here, slug + '.escaped.txt'), escaped);
  console.log(slug, 'compact', compact.length, 'escaped', escaped.length);
}
