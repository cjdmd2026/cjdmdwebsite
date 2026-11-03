import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { teams } from '../server/teams.mjs';
import { limits } from '../server/policy.mjs';
import { buildMainIntro } from './build-main-intro.mjs';

const root = path.resolve(fileURLToPath(new URL('../', import.meta.url)));
await buildMainIntro();
const output = path.resolve(root, 'public-dist');
// Delete only this script's generated output, after verifying the absolute target.
if (!output.startsWith(root + path.sep) || path.basename(output) !== 'public-dist') throw new Error('Unsafe build output path');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
const publicDirectories = new Set(['archive', 'assembly', 'assets', 'countdown', 'css', 'designer', 'js', 'main', 'project', ...teams.map(team => team.slug)]);
for (const entry of await readdir(root, { withFileTypes: true })) {
  if ((entry.isDirectory() && publicDirectories.has(entry.name)) || (entry.isFile() && /\.(html|ico|txt|xml|webmanifest)$/i.test(entry.name))) {
    await cp(path.join(root, entry.name), path.join(output, entry.name), { recursive: true, dereference: false });
  }
}
await mkdir(path.join(output, 'submit'), { recursive: true });
for (const file of ['index.html', 'style.css', 'countdown.mjs']) await cp(path.join(root, 'submit', file), path.join(output, 'submit', file));
await build({ entryPoints: [path.join(root, 'submit', 'app.mjs')], outfile: path.join(output, 'submit', 'app.js'), bundle: true, format: 'esm', platform: 'browser', target: ['es2022'], minify: true, define: { __TEAMS__: JSON.stringify(teams), __LIMITS__: JSON.stringify(limits) } });
console.log('Built public-dist/ (existing exhibition + /submit/). Server files and secrets are excluded.');
