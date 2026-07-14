import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('GitHub Pages 构建产物', () => {
  it('在仓库前缀下输出首页与 SPA 兜底页', () => {
    const projectRoot = process.cwd();
    const indexPath = join(projectRoot, 'dist', 'index.html');
    const fallbackPath = join(projectRoot, 'dist', '404.html');

    expect(existsSync(indexPath)).toBe(true);
    expect(existsSync(fallbackPath)).toBe(true);

    const index = readFileSync(indexPath, 'utf8');
    expect(index).toContain('/northstar-amazon-ops-demo/assets/');
  });
});
