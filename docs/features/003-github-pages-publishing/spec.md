# 003：GitHub Pages 持续静态发布规格

> 状态：历史规格；GitHub Pages 已退役，现行托管与发布见 `../005-insforge-publishing/`。

## 1. 目标

将已验证的 Northstar Amazon 运营控制台发布到用户的 GitHub 公开仓库，并以 GitHub Pages 作为长期静态访问地址。后续向默认分支推送经过验证的改动时，页面自动重新构建和发布。

## 2. 冻结范围

- GitHub 账号：`Jesia-Wu`。
- 新建公开仓库：`Jesia-Wu/northstar-amazon-ops-demo`。
- 采用 GitHub Actions 的官方 Pages 发布流程：构建、上传 Pages artifact、部署。
- GitHub Pages 产物为当前 Vite 静态站；仓库路径前缀固定为 `/northstar-amazon-ops-demo/`。
- 站点仅保留已冻结的内置演示数据，不接入真实数据、MCP、Amazon、LLM、账号或外部写入。

## 3. 明确不做

- 不绑定自定义域名、不增加登录、数据库、埋点、分析脚本或第三方服务。
- 不迁移历史 Sites 部署，也不删除既有私有试用站。
- 不发布私钥、令牌、GitHub 凭据或其他密钥；工作流只使用 GitHub 提供的短期 `GITHUB_TOKEN`。

## 4. 风险与发布边界

- 风险等级：高风险；原因是创建公开 GitHub 仓库并进行公开生产发布。
- 用户已明确要求 GitHub 托管与长期访问，因此本次公开静态发布在授权范围内。
- 用户提供的冰水背景会随站点公开；它仅作为界面氛围素材，不包含真实 Amazon 数据。若日后更换为第三方或真实商品素材，需重新确认公开使用权。
- 回滚：保留每次 Git 提交和 GitHub Pages 部署记录；若新版本异常，可将默认分支回退至指定的已验证提交并自动重新部署。

## 5. 构建与状态边界

| 项目 | 冻结决定 | 状态拥有者 |
| --- | --- | --- |
| 前端页面状态 | 维持浏览器本地演示状态 | React 前端 |
| Pages 构建 | GitHub Actions 运行 `npm ci` 与 `npm run build:pages` | GitHub Actions |
| 静态产物 | Vite `dist/`，资产路径含仓库前缀 | Vite |
| 部署权限 | 仅 `pages: write` 与 `id-token: write` | GitHub Actions 临时令牌 |

## 6. 验收标准

| ID | 验收标准 |
| --- | --- |
| AC-301 | GitHub Pages 构建将站点资源输出到 `dist/`，且 `index.html` 中的资源路径带 `/northstar-amazon-ops-demo/` 前缀。 |
| AC-302 | 生成 `dist/404.html`，保障 Pages 环境下的静态 SPA 访问兜底。 |
| AC-303 | GitHub Actions 工作流只在默认分支推送或手动触发时运行，使用官方 Pages Actions 与最小部署权限。 |
| AC-304 | 创建公开仓库并推送已验证的源代码；仓库内不含凭据。 |
| AC-305 | GitHub Pages 部署完成，返回稳定的 `github.io` 访问地址。 |
| AC-306 | 公开站继续保持第一期“内置演示、无 MCP、无 Amazon、无 LLM、无真实数据”边界。 |
