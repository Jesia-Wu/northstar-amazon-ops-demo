# 005：GitHub 版本留档与 InsForge 正式发布任务清单

- [x] T0.1 冻结 GitHub 留档、InsForge 托管、GitHub Pages 退役的边界和回滚顺序。
  验证：`spec.md`、`plan.md`、`tasks.md` 和 `.codex/v5-project.json` 已建立。
- [x] T1.1 完成本地自动化与真实浏览器发布前验收。
  验证：测试、类型检查、生产构建、1440px 核心流程、控制台和网络请求通过。
- [ ] T2.1 审计并推送当前版本到 GitHub `main`。
  验证：暂存区无凭据和临时文件，远端 SHA 与本地一致，Actions 验证成功（AC-501、AC-506）。
- [ ] T2.2 登录并绑定用户的 InsForge“北极星”项目。
  验证：官方 CLI `current` 显示正确组织和项目，回复与仓库不暴露凭据（AC-503）。
- [ ] T2.3 部署同一 Git 提交并验证正式站。
  验证：状态 `READY`，正式 URL、静态资源、关键交互和控制台通过（AC-503、AC-504）。
- [ ] T3.1 将 GitHub Pages 自动部署替换为纯验证工作流，并停用 Pages。
  验证：InsForge 已先验收成功；GitHub 仓库保留，工作流只含检查，Pages 已停用（AC-502、AC-505）。
- [ ] T3.2 回写发布证据。
  验证：README 与 `task.md` 记录发布 URL、部署 ID、验证和回滚信息。
