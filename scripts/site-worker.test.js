import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('Sites 静态 Worker 入口', () => {
  it('使用静态资源绑定并为 SPA 路由回退到 index.html', () => {
    const worker = readFileSync(join(process.cwd(), 'scripts', 'site-worker.mjs'), 'utf8');

    expect(worker).toContain('env.ASSETS.fetch');
    expect(worker).toContain("'/index.html'");
  });
});
