import { readFileSync } from 'node:fs';
const c1 = readFileSync(new URL('./chunk-1.txt', import.meta.url), 'utf-8');
const c2 = readFileSync(new URL('./chunk-2.txt', import.meta.url), 'utf-8');
const combined = c1 + c2;
// The chunks are JSON-escaped: " → \" and \ → \\.
// To decode back: replace \\ → \ and \" → "
const unesc = JSON.parse('"' + combined + '"');
const parsed = JSON.parse(unesc);
console.log('Valid. Sections:', parsed.length);
console.log('Combined escaped length:', combined.length);
console.log('First 50 chars:', combined.slice(0, 50));
console.log('Last 50 chars:', combined.slice(-50));
