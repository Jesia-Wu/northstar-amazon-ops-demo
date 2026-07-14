# 002：私有静态试用站实施方案

## 1. 发布方式

保留现有 Vite 工程。新增发布专用构建步骤：先运行既有生产构建，将 Vite 的静态文件整理到 `dist/client/`，再复制一个 Cloudflare Worker 兼容 ESM 入口到 `dist/server/index.js`。这与 Sites 模板的 client/server 产物边界一致；入口优先交给平台的静态资源绑定处理请求，对无扩展名的 SPA 路径回退到 `index.html`。

## 2. 模块职责

| 模块 | 职责 | 不负责 |
| --- | --- | --- |
| 现有 Vite 构建 | 生成前端静态资源 | 服务端数据、认证 |
| `site-worker.mjs` | 静态资源转发与 SPA 回退 | 业务逻辑、数据处理 |
| `.openai/hosting.json` | 仅保存 Sites 项目 ID | 凭据、环境变量、访问令牌 |
| Sites | 私有站点、版本、部署状态 | Amazon 或 MCP 连接 |

## 3. 发布流程

1. 新增 Worker 入口和 `build:site`，运行原有测试、类型检查和发布构建。
2. 创建最小 `.openai/hosting.json`，创建一次 Sites 项目后只回写其项目 ID。
3. 初始化本项目专用 Git 历史，忽略依赖、构建产物和历史输出；只推送本次工作台源代码。
4. 使用短期写入凭据推送准确提交，打包同一提交的 `dist/`。
5. 保存版本，优先执行 owner-only 私有部署，轮询至成功或失败。
6. 成功后打开部署地址；失败则停止，不降级为公开部署。

## 4. 验证策略

- `npm test`、`npm run typecheck`、`npm run build:site` 必须通过。
- 检查 `dist/client/index.html`、`dist/server/index.js` 和 `dist/.openai/hosting.json` 均进入发布包。
- Sites 保存版本返回的提交 SHA 必须与本地 `HEAD` 一致。
- 部署状态必须为 `succeeded`；若失败，不宣称有可试用站点。
- 使用私有诊断访问部署根路径，必须返回工作台 HTML；仅有部署状态成功不构成可用证明。
