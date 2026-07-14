import { access, copyFile, mkdir, readdir, rename } from 'node:fs/promises';
import { constants } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptsDirectory = dirname(fileURLToPath(import.meta.url));
const projectDirectory = resolve(scriptsDirectory, '..');
const buildDirectory = resolve(projectDirectory, 'dist');
const builtIndex = resolve(projectDirectory, 'dist/index.html');
const clientDirectory = resolve(buildDirectory, 'client');
const workerSource = resolve(scriptsDirectory, 'site-worker.mjs');
const workerDestination = resolve(projectDirectory, 'dist/server/index.js');

await access(builtIndex, constants.R_OK);
const staticEntries = await readdir(buildDirectory);
await mkdir(clientDirectory, { recursive: true });

for (const entry of staticEntries) {
  if (entry === 'client' || entry === 'server') continue;
  await rename(resolve(buildDirectory, entry), resolve(clientDirectory, entry));
}

await mkdir(dirname(workerDestination), { recursive: true });
await copyFile(workerSource, workerDestination);

console.log('Prepared Sites client and Worker output: dist/client + dist/server/index.js');
