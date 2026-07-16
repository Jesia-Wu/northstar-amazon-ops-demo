# 005：GitHub 版本留档与 InsForge 正式发布规格

## 1. 目标

将当前已验证的 Amazon ASIN 运营工作台先提交到 GitHub，保留完整代码历史和回滚点，再把同一提交部署到用户的 InsForge 项目。InsForge 成为正式网站托管方，GitHub 只承担源码、版本追踪和持续检查，不再承担静态网站托管。

## 2. 冻结范围

- 源码仓库固定为公开仓库 `Jesia-Wu/northstar-amazon-ops-demo`，默认分支为 `main`。
- 发布顺序固定为：本地验证通过 -> 提交并推送 GitHub -> 确认远端提交 SHA -> 部署同一提交到 InsForge。
- InsForge 目标为用户截图中的“北极星”项目生产环境；实际项目 ID 只从官方 CLI 登录后的项目列表选择，不写入公开文档。
- 使用 InsForge 官方 `@insforge/cli` 完成登录、项目绑定、部署、状态查询和正式网址获取。
- GitHub Pages 在 InsForge 正式站验证成功后停用；GitHub Actions 只保留测试、类型检查和普通生产构建。
- 本轮发布包含卖点驱动图片创作台和压缩后的冰水背景；继续保持本地模拟、无真实 Amazon 数据、无外部模型调用。

## 3. 明确不做

- 不把 InsForge 用户 API Key、浏览器会话、Cookie、项目密钥或其他凭据写入源码、Git 历史、日志或回复。
- 不在本轮接入 InsForge Database、Authentication、Storage、Model Gateway 或 Payments。
- 不上传工作区中的 Playwright 缓存、临时截图、表格输出或其他未提交文件。
- 不删除 GitHub 仓库和历史提交；停用的只有 GitHub Pages 托管能力。

## 4. 风险与回滚

- 风险等级：高风险；原因是公开源码推送、生产部署和托管平台切换。
- 用户已明确要求保留 GitHub 历史并改由 InsForge 部署，以上外部写入在本轮授权范围内。
- 发布前回滚点为 GitHub 提交 `737a41e1cb0337a94b49fbfb3b14ad3d77c80fa7`；若新版本失败，InsForge 恢复部署最近可用提交，GitHub 仍保留全部版本。
- 只有 InsForge 正式网址、静态资源和关键交互验证通过后，才停用 GitHub Pages，避免先拆桥再发现船没油。

## 5. 状态与所有权

| 项目 | 冻结决定 | 状态拥有者 |
| --- | --- | --- |
| 源码与版本历史 | GitHub `main` | GitHub |
| 持续检查 | GitHub Actions 运行测试、类型检查与普通生产构建 | GitHub Actions |
| 正式网站 | InsForge Sites / Deployment | InsForge |
| 页面运行状态 | 浏览器本地演示状态 | React 前端 |
| 登录凭据 | InsForge CLI 用户级凭据，不进入项目仓库 | InsForge CLI |

## 6. 验收标准

| ID | 验收标准 |
| --- | --- |
| AC-501 | 当前功能、压缩背景、规格和测试以明确提交推送到 GitHub `main`，远端提交 SHA 可核对。 |
| AC-502 | GitHub Actions 不再部署 Pages，只执行测试、类型检查和普通生产构建。 |
| AC-503 | InsForge 官方 CLI 绑定到用户确认的“北极星”项目，并从与 GitHub 提交一致的源码部署。 |
| AC-504 | InsForge 部署状态为 `READY`，正式网址返回 HTTP 200，核心页面与创意资产流程可用。 |
| AC-505 | GitHub Pages 仅在 AC-504 通过后停用；GitHub 仓库和历史继续保留。 |
| AC-506 | 发布范围内不含凭据、本地缓存、临时截图、表格输出或其他无关文件。 |
