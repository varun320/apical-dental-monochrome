import { readFileSync, writeFileSync } from 'node:fs';
const src = readFileSync(new URL('./home-elementor.json', import.meta.url), 'utf-8');
const parsed = JSON.parse(src);
const stringified = JSON.stringify(parsed);
const meta = {
  _elementor_data: stringified,
  _elementor_edit_mode: 'builder',
  _elementor_template_type: 'wp-page',
  _elementor_version: '3.21.0',
};
writeFileSync(new URL('./meta-payload.json', import.meta.url), JSON.stringify(meta, null, 2));
console.log('V2 meta-payload.json bytes:', JSON.stringify(meta).length);
console.log('V2 elementor_data chars:', stringified.length);
