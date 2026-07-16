# 005：GitHub 版本留档与 InsForge 正式发布实施方案

## 1. 发布准备

1. 检查工作区差异，只纳入当前工作台、创意图片原型、压缩背景、测试与项目文档。
2. 保留现有 GitHub Pages 发布链路直到 InsForge 正式站验证成功，再将它替换为纯验证工作流。
3. 运行 `npm test`、`npm run typecheck`、`npm run build`，并在真实浏览器完成关键交互检查。
4. 审计暂存区文件与凭据风险，记录回滚提交。

## 2. GitHub 留档

1. 创建范围清晰的提交并推送 `github/main`。
2. 核对本地与远端提交 SHA 一致。
3. 等待 GitHub Actions 验证成功；失败则不进入 InsForge 部署。

## 3. InsForge 发布

1. 通过 `npx @insforge/cli` 登录用户账号。
2. 从账号内项目列表选择截图中的“北极星”项目并绑定当前目录。
3. 从干净的 Git 提交内容部署，避免打包未跟踪的本地临时目录。
4. 查询部署状态，取得正式 URL，并验证 HTTP、资源、控制台和核心交互。

## 4. 托管切换

1. InsForge 验收通过后，将 GitHub Pages 工作流替换为纯验证工作流，并停用 Pages 服务。
2. 更新 README 与 `task.md`，记录 GitHub 提交、InsForge 部署 ID/URL、验证证据和回滚点。
3. 将发布记录作为文档提交推送到 GitHub；应用代码未变化时无需重复部署。
