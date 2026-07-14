import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('Sites 静态 Worker 入口', () => {
  it('把客户端静态文件与 Worker 分别输出到 Sites 约定目录', () => {
    const projectRoot = process.cwd();

    expect(existsSync(join(projectRoot, 'dist', 'client', 'index.html'))).toBe(true);
    expect(existsSync(join(projectRoot, 'dist', 'server', 'index.js'))).toBe(true);
  });

  it('使用静态资源绑定并为 SPA 路由回退到 index.html', () => {
    const worker = readFileSync(join(process.cwd(), 'scripts', 'site-worker.mjs'), 'utf8');

    expect(worker).toContain('env.ASSETS.fetch');
    expect(worker).toContain("'/index.html'");
  });
});
