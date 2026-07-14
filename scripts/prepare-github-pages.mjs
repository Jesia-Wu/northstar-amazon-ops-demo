import { access, copyFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptsDirectory = resolve(fileURLToPath(new URL('.', import.meta.url)));
const projectDirectory = resolve(scriptsDirectory, '..');
const indexPath = resolve(projectDirectory, 'dist/index.html');
const fallbackPath = resolve(projectDirectory, 'dist/404.html');

await access(indexPath, constants.R_OK);
await copyFile(indexPath, fallbackPath);

console.log('Prepared GitHub Pages fallback: dist/404.html');
