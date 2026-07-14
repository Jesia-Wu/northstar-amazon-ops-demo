import { access, copyFile, mkdir } from 'node:fs/promises';
import { constants } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptsDirectory = dirname(fileURLToPath(import.meta.url));
const projectDirectory = resolve(scriptsDirectory, '..');
const builtIndex = resolve(projectDirectory, 'dist/index.html');
const workerSource = resolve(scriptsDirectory, 'site-worker.mjs');
const workerDestination = resolve(projectDirectory, 'dist/server/index.js');

await access(builtIndex, constants.R_OK);
await mkdir(dirname(workerDestination), { recursive: true });
await copyFile(workerSource, workerDestination);

console.log('Prepared Sites static Worker entry: dist/server/index.js');
