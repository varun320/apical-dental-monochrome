import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const sectionsDir = resolve(here, 'sections');
const order = readdirSync(sectionsDir).filter(f => f.endsWith('.json')).sort();

const sections = order.map(name => {
  const raw = readFileSync(resolve(sectionsDir, name), 'utf-8');
  return JSON.parse(raw);
});

const ids = new Set();
const collectIds = (node) => {
  if (!node || typeof node !== 'object') return;
  if (typeof node.id === 'string') {
    if (ids.has(node.id)) throw new Error(`Duplicate id: ${node.id}`);
    ids.add(node.id);
  }
  if (Array.isArray(node.elements)) node.elements.forEach(collectIds);
};
sections.forEach(collectIds);

writeFileSync(resolve(here, 'home-elementor.json'), JSON.stringify(sections, null, 2));
writeFileSync(resolve(here, 'home-elementor-compact.txt'), JSON.stringify(sections));

console.log(`Assembled ${sections.length} sections, ${ids.size} unique ids.`);
console.log('Order:', order.join(', '));
console.log('Compact bytes:', JSON.stringify(sections).length);
