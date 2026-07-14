# 003：GitHub Pages 持续静态发布任务清单

- [x] T0.1 冻结公开 GitHub Pages 边界、公开素材风险、回滚与验收点。  
  验证：`spec.md`、`plan.md`、`tasks.md` 与项目记录更新。
- [x] T1.1 先写 Pages 静态产物测试。  
  验证：现有构建缺少仓库前缀或 `404.html` 时测试失败（AC-301、AC-302）。
- [x] T1.2 实现 Pages 专用构建与官方 Actions 工作流。  
  验证：定向测试、类型检查和 Pages 构建通过（AC-301 至 AC-303）。
- [x] T2.1 创建公开 GitHub 仓库、添加独立远程并推送当前主分支。  
  验证：GitHub API 返回公开仓库 URL，远程 `github` 指向该仓库（AC-304）。
- [x] T2.2 启用 GitHub Pages Actions 源并等待工作流完成。  
  验证：部署 Job 成功，Pages URL 返回工作台 HTML（AC-303、AC-305）。
- [x] T3.1 回写发布证据、后续更新方式与边界。  
  验证：`task.md` 记录仓库、Pages URL、工作流与回滚点（AC-306）。
