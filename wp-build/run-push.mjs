// Loads creds from .wp-creds.env and runs push-pages.mjs for the given slugs.
// Wrapper exists so the password never appears in the command line.
import { readFileSync, existsSync, unlinkSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const here = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(here, '.wp-creds.env');

if (!existsSync(envPath)) { console.error('Missing wp-build/.wp-creds.env'); process.exit(1); }

const env = { ...process.env };
for (const line of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
  const t = line.trim();
  if (!t || t.startsWith('#')) continue;
  const eq = t.indexOf('=');
  if (eq < 0) continue;
  env[t.slice(0, eq)] = t.slice(eq + 1);
}

const args = process.argv.slice(2);
const script = resolve(here, 'pages', 'push-pages.mjs');

const slugs = args.length ? args : ['proof', 'for-dsos'];

const runOne = (slug) => new Promise((res) => {
  const child = spawn(process.execPath, [script, slug], { env, stdio: 'inherit' });
  child.on('exit', (code) => res(code ?? 0));
});

let failed = 0;
for (const slug of slugs) {
  const code = await runOne(slug);
  if (code !== 0) failed++;
}

// Best-effort cleanup of the creds file so we don't leave the secret on disk.
try { unlinkSync(envPath); console.log('(creds file removed)'); } catch {}

process.exit(failed ? 1 : 0);
