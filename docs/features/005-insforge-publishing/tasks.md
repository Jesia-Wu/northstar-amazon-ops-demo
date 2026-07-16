# 005：GitHub 版本留档与 InsForge 正式发布任务清单

- [x] T0.1 冻结 GitHub 留档、InsForge 托管、GitHub Pages 退役的边界和回滚顺序。
  验证：`spec.md`、`plan.md`、`tasks.md` 和 `.codex/v5-project.json` 已建立。
- [x] T1.1 完成本地自动化与真实浏览器发布前验收。
  验证：测试、类型检查、生产构建、1440px 核心流程、控制台和网络请求通过。
- [x] T2.1 审计并推送当前版本到 GitHub `main`。
  验证：暂存区无凭据和临时文件，远端 SHA 与本地一致，Actions 验证成功（AC-501、AC-506）。
- [x] T2.2 登录并绑定用户的 InsForge“北极星”项目。
  验证：脱敏读取本地绑定配置只显示 `northstar`、区域、guard 与 Key 是否存在；回复与仓库不暴露凭据（AC-503）。
- [x] T2.3 部署同一 Git 提交并验证正式站。
  验证：提交 `806d2e96b4a00aacd2decd91a13489b9fabb3c3f` 部署状态为 `READY`；正式 URL、JS、CSS、压缩背景图和关键创意交互通过（AC-503、AC-504）。
- [x] T3.1 将 GitHub Pages 自动部署替换为纯验证工作流，并停用 Pages。
  验证：InsForge 已先验收成功；GitHub Actions run `29482070619` 的纯验证工作流为 success；Pages API 返回 404，GitHub 仓库和历史仍保留（AC-502、AC-505）。
- [x] T3.2 回写发布证据。
  验证：README 与 `task.md` 已记录发布 URL、部署 ID、验证、Key 轮换和回滚信息。
