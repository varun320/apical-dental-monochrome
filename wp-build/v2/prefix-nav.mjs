// Apply /apicaldental/ prefix to root-relative nav links across v2 sources.
// Idempotent: skip if already prefixed.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

// Order matters: longer/more specific first so /\\\"/contact\\\" doesn't accidentally match later.
const replacements = [
  // sections (escaped JSON) — href="/path" patterns
  [/href=\\"\/\\"/g, 'href=\\"/apicaldental/\\"'],
  [/href=\\"\/technology\\"/g, 'href=\\"/apicaldental/technology\\"'],
  [/href=\\"\/proof\\"/g, 'href=\\"/apicaldental/proof\\"'],
  [/href=\\"\/for-dsos\\"/g, 'href=\\"/apicaldental/for-dsos\\"'],
  [/href=\\"\/contact\\"/g, 'href=\\"/apicaldental/contact\\"'],
  // footer #anchor placeholders → real paths
  [/href=\\"#technology\\"/g, 'href=\\"/apicaldental/technology\\"'],
  [/href=\\"#proof\\"/g, 'href=\\"/apicaldental/proof\\"'],
  [/href=\\"#for-dsos\\"/g, 'href=\\"/apicaldental/for-dsos\\"'],
  [/href=\\"#about\\"/g, 'href=\\"/apicaldental/about\\"'],
  [/href=\\"#careers\\"/g, 'href=\\"/apicaldental/careers\\"'],
  [/href=\\"#press\\"/g, 'href=\\"/apicaldental/press\\"'],
  [/href=\\"#contact\\"/g, 'href=\\"/apicaldental/contact\\"'],
  [/href=\\"#how\\"/g, 'href=\\"/apicaldental/#how\\"'],
  // button link.url fields
  [/"url":"\/contact"/g, '"url":"/apicaldental/contact"'],
  [/"url":"\/technology"/g, '"url":"/apicaldental/technology"'],
  [/"url":"\/proof"/g, '"url":"/apicaldental/proof"'],
  [/"url":"\/for-dsos"/g, '"url":"/apicaldental/for-dsos"'],
];

const targets = [
  ...readdirSync(resolve(here, 'sections')).map(f => resolve(here, 'sections', f)),
  ...readdirSync(resolve(here, 'pages')).filter(f => f.endsWith('.json')).map(f => resolve(here, 'pages', f)),
];

let totalChanges = 0;
for (const filePath of targets) {
  const before = readFileSync(filePath, 'utf-8');
  let after = before;
  let fileChanges = 0;
  for (const [re, sub] of replacements) {
    after = after.replace(re, (m) => { fileChanges++; return sub; });
  }
  if (fileChanges > 0) {
    writeFileSync(filePath, after);
    console.log(`✓ ${filePath.split(/[\\/]/).slice(-2).join('/')} — ${fileChanges} replacements`);
    totalChanges += fileChanges;
  }
}
console.log(`\nTotal: ${totalChanges} link prefixes added across ${targets.length} files.`);
