# 项目开发记录

## 当前快照

- 项目：Northstar · Amazon ASIN 运营工作台。
- V5 恢复入口：`.codex/v5-project.json` 仍指向已完成的 `docs/features/005-insforge-publishing/`；当前没有进行中的功能开发。
- 产品状态：静态单页本地演示，使用固定 fixture；不连接 Amazon、MCP、LLM、数据库或真实账号。
- 正式网站：<https://9kjrnynx.insforge.site/>。
- 源码事实源：GitHub `Jesia-Wu/northstar-amazon-ops-demo` 的 `main`；GitHub Actions 只做持续检查，GitHub Pages 已停用。
- 发布事实：应用提交 `806d2e96b4a00aacd2decd91a13489b9fabb3c3f` 对应 InsForge deployment `8022c824-c84f-4bbf-99b3-42e408544ea7`，状态 `READY`。
- 下一动作：后续功能继续执行“本地验证 → GitHub 留档与 Actions → InsForge 部署对应提交”。

## 稳定决策

1. 本期只做 Amazon US、只读演示和运营建议草稿；禁止 Amazon 后台写入、真实数据伪装和隐蔽外部请求。
2. 浏览器内存是运行状态唯一拥有者；刷新可重置，不保存研究历史。
3. 桌面端 `>= 1024px` 是当前验收范围；移动端专项适配需另立功能包。
4. 视觉采用 Summer Glass Operations：冰白、水蓝、薄荷玻璃和用户提供的冰水背景；背景只承担低对比氛围。
5. 创意资产只模拟“卖点 → 四个视觉方案 → 提示词摘要”，不上传产品信息、不调用图像模型、不接收 API Key。
6. GitHub 保存源码、版本历史和回滚点；InsForge 只负责正式前端托管。发布与回滚遵循 `docs/operator-runbook.md`。
7. InsForge 数据库、认证、存储、函数、实时、模型网关和支付均未接入；任何真实数据或账户能力都需重新按高风险分级。
8. 禁止回显 InsForge `current --json` 或原始凭据配置；CLI 状态只读取普通输出或白名单脱敏字段。

## 已完成里程碑

| 日期 | 里程碑 | 主要证据 |
| --- | --- | --- |
| 2026-07-13 | 冻结第一期只读演示范围和 V5 工件 | `docs/features/001-amazon-asin-workbench/`、`.codex/v5-project.json` |
| 2026-07-14 | 完成本地运营控制台、六模块导航、证据链、输入校验和演示状态机 | `src/App.tsx`、`src/lib/`、`src/data/demoResearch.ts` |
| 2026-07-14 | 完成 Summer Glass 桌面视觉与冰水背景 | `src/App.css`、`public/assets/ice-water-bottles.jpg` |
| 2026-07-14 | 完成卖点驱动图片创作台 | `docs/features/004-creative-image-studio/`、`src/components/CreativeStudio.tsx` |
| 2026-07-16 | 将背景压缩至 2560×1706、700,324 B | `public/assets/ice-water-bottles.jpg`，较原文件减少约 89.1% |
| 2026-07-16 | 将发布链路切换为 GitHub 留档、InsForge 正式托管 | `docs/features/005-insforge-publishing/` |
| 2026-07-16 | 完成 InsForge 生产部署与公网验收 | deployment `8022c824-c84f-4bbf-99b3-42e408544ea7`、HTTP 200、状态 `READY` |
| 2026-07-16 | 退役 GitHub Pages，保留 GitHub 仓库和纯验证 Actions | Pages API 404；`Verify application` workflow success |

## 最新验证证据

- 自动化：2026-07-16 收尾后 `npm test` 通过 6 个文件、24 条现役测试；`npm run typecheck` 与 `npm run build` 通过。
- 浏览器：1440×1024 走通控制台、产品研究、创意资产、四提案生成、清洁路径图切换和提示词复制。
- 网络边界：页面只请求本站静态资源，没有 Amazon、MCP、LLM 或第三方数据调用。
- 正式站：根页面、JS、CSS 和 700,324 B 背景图均返回 HTTP 200；InsForge 状态为 `READY`。
- GitHub：纯验证 workflow 在托管切换和最终记录提交上均成功；GitHub Pages 查询返回 404。
- 凭据：官方 CLI 曾意外回显旧管理员 Key；旧 Key 已立即轮换失效，新 Key 未进入源码、暂存区或 Git 历史。
- 2026-07-16 收尾清理：已移除退役的 GitHub Pages / 私有 Sites 构建链路和过期实现计划；测试、类型检查和生产构建均已通过，远端验证在提交推送后执行。

## 风险与边界

- 用户提供的冰水照片已用于公开正式站；若替换为第三方或真实商品素材，需重新确认公开使用权和包装文字风险。
- 真实评论、搜索词、广告表现、卖家数据和账户权限均不存在；页面不得据此输出确定性经营结论。
- 接入 MCP、SP-API、InsForge 后端、图像模型、认证、支付或外部写入时，必须新建高风险功能包并冻结权限、成本、数据处理和回滚方案。

## 下一步候选

1. 真实数据版：先确认单一数据源、字段、权限、条款和只读边界。
2. 历史研究：若需保存多个 ASIN 或对比记录，先确定本地存储或云端账户边界。
3. 移动端：另立任务重做导航、信息层级和触控体验，不把桌面布局硬挤进手机。
