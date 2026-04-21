import { readFileSync, writeFileSync } from 'node:fs';
const src = readFileSync(new URL('./home-elementor.json', import.meta.url), 'utf-8');
const parsed = JSON.parse(src);
const stringified = JSON.stringify(parsed);
// The escaped form is the JSON-string literal — replace " with \" and \ with \\.
const escaped = stringified.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
const half = Math.floor(escaped.length / 2);
// Split on a safe boundary (not mid-escape). Walk forward from `half` until we find a char that's safe to split after.
let split = half;
while (split < escaped.length && escaped[split] === '\\') split++; // avoid trailing lone backslash
writeFileSync(new URL('./chunk-1.txt', import.meta.url), escaped.slice(0, split));
writeFileSync(new URL('./chunk-2.txt', import.meta.url), escaped.slice(split));
console.log('chunk-1.txt:', escaped.slice(0, split).length);
console.log('chunk-2.txt:', escaped.slice(split).length);
console.log('total escaped:', escaped.length);
