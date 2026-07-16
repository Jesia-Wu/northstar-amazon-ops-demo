# 003：GitHub Pages 持续静态发布实施方案

> 状态：历史方案，Pages 构建链路已退役；GitHub 现在只保存源码并运行持续检查。

## 1. 构建策略

Vite 配置根据 `DEPLOY_TARGET=github-pages` 生成仓库前缀 `/northstar-amazon-ops-demo/`。`build:pages` 只执行 Vite 静态构建，并将 `index.html` 复制为 `404.html`；不使用 Sites 专用 Worker 产物。

## 2. 工作流

1. 在 `main` 推送或手动运行时启动。
2. 使用固定 Node 运行环境与 `npm ci` 安装锁定依赖。
3. 运行测试、类型检查和 `build:pages`。
4. 使用官方 `configure-pages`、`upload-pages-artifact` 与 `deploy-pages` actions 发布 `dist/`。
5. 部署 Job 使用 `pages: write`、`id-token: write` 最小权限，并关联 `github-pages` 环境。

## 3. 仓库与远程策略

- 保留既有 `origin`（私有试用站源仓库），新增名为 `github` 的 GitHub 远程，不覆盖现有远程。
- 首次推送当前 `main` 作为 GitHub 仓库默认分支；之后以同一远程推送触发 Pages 自动更新。
- GitHub 仓库公开，但不添加任何凭据到代码、Git 历史、工作流或命令输出。

## 4. 验证策略

- 测试先行验证 Pages 构建产物含正确 `base` 路径与 `404.html`。
- 本地执行 `npm test`、`npm run typecheck`、`npm run build:pages`。
- 使用 GitHub CLI 验证仓库可访问、Pages 设置为 Actions 源，工作流完成且 Pages URL 返回成功响应。
