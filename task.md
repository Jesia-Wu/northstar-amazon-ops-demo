# 项目开发记录

## 当前快照

- 项目：Amazon ASIN 运营工作台
- V5 等级：高风险（`high`；GitHub 外部推送、InsForge 生产部署与托管切换）
- 当前功能：`docs/features/005-insforge-publishing/`
- 当前里程碑：先以 GitHub 保存可追溯版本，再将同一提交发布到 InsForge，并在新站验收后停用 GitHub Pages。
- 当前状态：创意工作台、压缩背景和发布前验收已完成；用户已明确授权推送和 InsForge 发布，官方 CLI 已通过 Zen 登录成功。
- 下一动作：审计并推送 GitHub；远端检查成功后绑定截图中的“北极星”项目并部署同一提交。

## 已完成

| 日期 | 事项 | 证据 |
| --- | --- | --- |
| 2026-07-13 | 将需求分级为标准项目，冻结第一期只读边界 | `AGENTS.md`、功能规格 AC-001 至 AC-014 |
| 2026-07-13 | 完成产品规格、技术方案、数据模型和任务拆分 | `docs/features/001-amazon-asin-workbench/` |
| 2026-07-13 | 创建 V5 项目标记 | `.codex/v5-project.json` |
| 2026-07-13 | 用户确认初级网站不接 MCP，采用内置演示数据 | `AGENTS.md`、`spec.md`、`plan.md` 更新 |
| 2026-07-13 | 用户在可视化草图中选择 A：证据优先工作台 | `ui-design.md`、草图会话事件 |
| 2026-07-13 | 安装 React、Vite、Vitest、浏览器验证等本地开发依赖 | `package.json`、`package-lock.json`、`node_modules/` |
| 2026-07-14 | 完成本地单页运营控制台：控制台、产品研究、Listing、广告、创意、利润六个视图及本地演示交互 | `src/App.tsx`、`src/App.css`、`src/lib/`、`src/data/demoResearch.ts` |
| 2026-07-14 | 完成 Summer Glass Operations 桌面视觉，并换用用户提供的冰水背景 | `public/assets/ice-water-bottles.jpg`、`src/App.css`、`ui-design.md` |
| 2026-07-14 | 完成桌面端浏览器主路径、静态请求与视觉检查 | `output/playwright/desktop-water-console.png`、本记录的验证条目 |
| 2026-07-14 | 加固输入、目标枚举、步骤状态机和“刷新演示内容”重置；把演示数据缺口显式呈现 | `src/lib/asin.ts`、`src/lib/demoMachine.ts`、`src/App.tsx`、`src/data/demoResearch.ts`、18 条测试 |
| 2026-07-14 | 补齐本地启动说明、最终桌面验收截图和 AC 验收矩阵 | `README.md`、`output/playwright/desktop-final-usable.png`、本记录 |
| 2026-07-14 | 用户要求可直接打开的静态试用站；建立 owner-only 发布规格包并将发布阶段上调为高风险 | `docs/features/002-private-static-preview/`、`.codex/v5-project.json` |
| 2026-07-14 | 尝试发布 owner-only 私有静态试用站 | 私有部署状态 `succeeded`；版本 1 基于提交 `afa9bca5ffc73b6e113a9da27bf1fe197869804e`，但用户试用根路径返回 404，不能作为可用交付 |
| 2026-07-14 | 修复并重新发布 owner-only 私有静态试用站 | 版本 2 基于提交 `58b292c45df4304e076874477428d5833f2be2a9`；私有诊断验证根路径、JS、CSS 与背景图均返回 200 |
| 2026-07-14 | 用户授权将站点发布至公开 GitHub 仓库并改用 GitHub Pages 长期托管 | `docs/features/003-github-pages-publishing/`、`.codex/v5-project.json` |
| 2026-07-14 | 创建 `Jesia-Wu/northstar-amazon-ops-demo` 公开仓库并启用 GitHub Pages Actions 源 | GitHub API 返回仓库与 Pages URL；首次工作流发现构建前测试的顺序问题 |
| 2026-07-14 | 修复工作流并完成 GitHub Pages 首次发布 | Actions run `29310323742` 成功；公网根页面、JS、CSS、背景图与真实浏览器均验证可用 |
| 2026-07-14 | 用户要求创意资产向“卖点输入 → 图片生成方案”工作台升级；按 V5 建立本地原型规格 | `docs/features/004-creative-image-studio/`、`.codex/v5-project.json` |
| 2026-07-14 | 完成本地卖点驱动图片创作台原型：四种画面方向、本地生成状态、主预览、提示词摘要与复制反馈 | `src/components/CreativeStudio.tsx`、`src/lib/creativeStudio.ts`、`src/data/demoCreativeStudio.ts` |
| 2026-07-16 | 压缩网页冰水背景并保持既有资源路径 | `public/assets/ice-water-bottles.jpg` 从 6,400,908 B / 6000×4000 降至 700,324 B / 2560×1706；真实浏览器视觉、静态请求与控制台复验通过 |
| 2026-07-16 | 用户将正式托管目标改为 InsForge，并要求 GitHub 继续作为代码历史与回滚来源 | `docs/features/005-insforge-publishing/`、`.codex/v5-project.json` |

## 已作决策

1. 第一阶段以“ASIN 研究工作台”而不是“全功能卖家后台”为产品定位。
2. 仅美国站、只读数据、建议草稿；禁止 Amazon 后台写入和自动广告操作。
3. MCP 被封装为可替换数据源适配器；截图中提及的数据源名称尚未验证，不能直接依赖其字段或可用性。
4. AI 只能基于已保存的证据生成结论，结果需要显示证据、时间和置信度。
5. 初级网站是本地单页演示：无 MCP、无 Amazon、无数据库、无真实 LLM、无任何外部请求。
6. 曾采用深森林绿固定侧栏、暖米白工作区和就地证据标签；视觉方向已由第 10–12 条决策替代，竞品矩阵仍作为独立页面，不塞进第一屏。
7. 2026-07-13：用户明确授权后续自行执行，不再要求逐段确认。作为本次 V5 流程例外，先完成初级网站实现、测试和浏览器验收，再统一汇报。
8. 2026-07-13：初级网站升级为“新品运营闭环控制台”；用阶段、今日任务、风险与下一动作组织页面。早期 Precision Glass Console 已被后续 Summer Glass Operations 替代，仍不复制参考网站布局或配色。
9. 2026-07-13：澄清 V5 是通用开发方法；未修改全局 V5 Skill。根目录 `AGENTS.md` 只保存通用协作规则，本次对话与当前网站需求继续保存在当前功能规格包和本文件。
10. 2026-07-13：用户否决深色与浓妆 Cosplay 背景，要求白亮透、清新夏日氛围。冰白水蓝玻璃系统保留；早期人像背景已由第 11 条用户提供资产替代。
11. 2026-07-14：用户提供冰水照片作为网页背景。它经低饱和、提亮、轻微柔焦和白色叠层处理，只承担冷感氛围；包装文字不作为页面信息。
12. 2026-07-14：用户明确本期只做桌面端；桌面 `>= 1024px` 是唯一验收范围，已有小屏样式只是非承诺的兜底。
13. 2026-07-14：用户授权在当前冻结范围内自主完成可用版本，无需中途确认；该授权不包含真实账号、真实数据、外部写入或生产发布。
14. 2026-07-14：无效 ASIN 与未知目标必须即时阻止提交；演示步骤禁止跳跃；“刷新演示内容”恢复输入、步骤和今日任务初态；缺少真实评论、搜索词或广告表现时，页面必须明确标为数据缺口而非伪造结论。
15. 2026-07-14：用户要求先直接试用静态网站。发布仅限 owner-only 私有地址；若托管平台无法验证私有访问，不把请求擅自扩大成公开站点。
16. 2026-07-14：Sites 的私有部署接口成功接受版本 1，owner-only 前提得到满足；但用户截图与私有诊断均证明根路径返回 404。问题不是访问权限，而是托管产物布局未满足运行时约定；未使用公开部署、分享设置或自定义域名。
17. 2026-07-14：将 Vite 静态产物从 `dist/` 根整理至 Sites 约定的 `dist/client/`，并保留 Worker 于 `dist/server/index.js`；版本 2 的私有诊断已实际返回工作台 HTML 与静态资源，证明修复有效。
18. 2026-07-14：用户明确要求 GitHub 仓库和 GitHub Pages 长期托管；公开仓库固定命名为 `Jesia-Wu/northstar-amazon-ops-demo`，既有私有 Sites 远程保留为独立 `origin`，不被覆盖。
19. 2026-07-14：GitHub Pages 流程采用官方 Actions。首次运行证明 Pages 产物测试不能在构建之前执行，因此将 `build:pages` 收进 `npm test`，让本地与 CI 始终先生成同一份 Pages 静态产物再验证。
20. 2026-07-14：公开站的长期入口固定为 `https://jesia-wu.github.io/northstar-amazon-ops-demo/`；GitHub `main` 为自动发布源，保留历史提交作为回滚点。
21. 2026-07-14：图片创作台本期只模拟“卖点 → 视觉方案”的交互，不接 GPT Image、不开 API Key 输入。未来真实模型接入独立升为高风险功能，Key 仅服务端环境变量持有；用户此前授权本项目持续推进，因此本轮不等待额外视觉确认。
22. 2026-07-14：当前 Node 24 桌面环境下，Vitest 默认并行线程池会停在 `RUN` 阶段；已用现有测试复现，并在 `vite.config.ts` 固定单一 `forks` worker。小型前端套件保持可重复运行，未改变应用运行时或发布产物。
23. 2026-07-16：用户要求保留历史版本可追溯，因此发布链路改为“本地验证 → GitHub `main` 留档 → InsForge 部署同一提交”。GitHub 不再承担正式网站托管；GitHub Pages 仅在 InsForge 正式站验证成功后停用。

## 风险与待确认

- 真实数据源，以及用户提供冰水照片与包装文字的对外发布使用权，留到正式发布前由项目方核验。
- 未来若接入 MCP、卖家 SP-API、广告写入或团队账号体系，风险等级需要重新评估，部分能力将升级为高风险。

## 验证记录

- 2026-07-13：文档结构已按 V5 规则创建；无应用代码、无服务凭据、无外部调用。
- 2026-07-14：`npm test -- src/App.test.tsx src/lib/asin.test.ts src/lib/demoMachine.test.ts` 通过：3 个文件、10 个测试全部通过。
- 2026-07-14：`npm run typecheck` 与 `npm run build` 均通过；生产构建成功生成静态资源。
- 2026-07-14：桌面浏览器（1440 × 1024）验证控制台视觉、模块切换、本地分析完成、证据 E-002 追溯、草稿复制反馈“已复制草稿”和禁用导出说明；截图保存于 `output/playwright/desktop-water-console.png`。
- 2026-07-14：浏览器请求检查显示仅 23 个本地静态请求，未发现 MCP、Amazon、LLM 或第三方数据请求。
- 2026-07-14：TDD 加固后执行 `npm test`：4 个测试文件、18 条测试全部通过；覆盖 ASIN/目标校验、顺序状态机、演示重置、产品资料、证据链和数据缺口。
- 2026-07-14：执行 `npm run typecheck` 与 `npm run build` 均通过；构建产物为静态站点。
- 2026-07-14：最终桌面浏览器（1440 × 1024）验证：输入 `B123` 时字段标记无效、显示错误并禁用启动；输入 `b0cx8n7p4q` 自动规范为大写并完成本地研究；产品研究页显示两个演示数据缺口；完成今日任务后刷新恢复为 `0/3 已处理`。最终截图：`output/playwright/desktop-final-usable.png`。
- 2026-07-14：最终浏览器检查：23 个请求均为本地静态资源；控制台 Errors: 0、Warnings: 0（仅 React DevTools 信息提示）。
- 2026-07-14：发布前执行 `npm test`：5 个测试文件、19 条测试全部通过；`npm run typecheck` 和 `npm run build:site` 通过，发布包包含 `dist/server/index.js` 与 `dist/.openai/hosting.json`。
- 2026-07-14：Sites 版本 1 已保存，保存版本的源提交与本地已验证提交同为 `afa9bca5ffc73b6e113a9da27bf1fe197869804e`；私有部署状态为 `succeeded`。链接仅作为当前项目方试用入口，未配置公开访问或自定义域名。
- 2026-07-14：用户截图显示部署根路径 404。使用私有诊断访问同一根路径复现为 HTTP 404 且响应体为空；未携带私有诊断凭据时为 401，证明访问策略正常。对照 Sites 模板发现当前构建把静态资源置于 `dist/` 根而非模板使用的 `dist/client/`，形成待验证的单一修复假设。
- 2026-07-14：修复后执行 `npm test`：5 个测试文件、20 条测试全部通过；`npm run typecheck` 与 `npm run build:site` 通过，发布包含 `dist/client/index.html`、`dist/server/index.js` 和 `dist/.openai/hosting.json`。
- 2026-07-14：Sites 版本 2 已保存并部署成功，源提交为 `58b292c45df4304e076874477428d5833f2be2a9`。私有诊断请求根路径返回 HTTP 200 与 Northstar 页面 HTML；JS、CSS、冰水背景资源均返回 HTTP 200。版本 1 仍保留作失败发布证据，但不再作为可用版本。
- 2026-07-14：GitHub CLI 实测登录账号为 `Jesia-Wu`；仓库 `Jesia-Wu/northstar-amazon-ops-demo` 创建成功，Pages API 已设为 Actions 源。首次工作流 `29310148019` 在“Verify application”失败：`github-pages-build.test.js` 读取构建产物时 `dist/index.html` 尚未生成；未进入部署步骤。
- 2026-07-14：修复验证顺序后，本地 `npm test`（包含 `build:pages`）通过：6 个测试文件、21 条测试；`npm run typecheck` 通过。待修复提交推送后重新验证 GitHub Actions。
- 2026-07-14：GitHub Actions run `29310323742` 的 build 与 deploy jobs 均为 `success`。公网请求 GitHub Pages 根路径返回 HTTP 200 和 Northstar HTML；JS（227,808 B）、CSS（27,381 B）和冰水背景图（6,400,908 B）均返回 HTTP 200。Playwright 1440 × 1024 真实浏览器验证标题、六模块导航、任务与本地演示标识均可见。
- 2026-07-14：图片创作台 TDD：`creativeStudio.test.ts` 先因模块不存在失败；实现后规则测试 3/3 通过。`CreativeStudio.test.tsx` 先因组件不存在失败；实现后组件测试 2/2 通过。`npm test` 通过：8 个文件、27 条测试；`npm run typecheck` 和 `npm run build` 通过。本机预览 `http://127.0.0.1:5173/` 返回 HTTP 200，并已在 Codex 内置浏览器打开；尚未完成 1440px 真实浏览器网络/控制台完整检查。
- 2026-07-16：冰水背景保持 JPEG 路径不变，缩至 2560×1706、700,324 B，较原始 6,400,908 B 减少约 89.1%。`npm test` 通过 8 个文件、27 条测试；`npm run typecheck` 与 `npm run build` 通过。Playwright 在 1440×1024 打开生产预览，背景请求返回 HTTP 200、`content-length: 700324`，控制台 0 Error / 0 Warning；验收截图为 `output/playwright/background-compression-verified.png`。本轮未发布或推送远程。
- 2026-07-16：按 InsForge 官方说明使用 `npx @insforge/cli` 发起 Zen 浏览器登录。前两次网页授权成功回调，但 CLI 经本机代理换取凭据时超时；比较连接后改用直连，第三次登录成功。未改用邮箱密码，也未在仓库或回复中暴露凭据。登录后项目列表接口仍偶发连接超时，GitHub 留档步骤先按冻结顺序继续。

## 验收矩阵

| 验收点 | 验证证据 |
| --- | --- |
| AC-001 / AC-002 | `asin.test.ts` 与 `App.test.tsx` 覆盖合法、非法 ASIN 和未知目标；最终浏览器复验错误提示与禁用状态。 |
| AC-003 | `demoMachine.test.ts` 覆盖顺序推进和终态；浏览器完成本地研究并验证刷新重置。 |
| AC-004 至 AC-007 | 固定 `demoResearch` fixture、`demoResearch.test.ts` 与产品研究页人工验收，覆盖档案、字段来源、资产及缺口。 |
| AC-008 | Brief 与证据编号由 fixture 回溯；产品研究页显示证据与数据缺口，避免把未知信息说成事实。 |
| AC-009 / AC-010 | Listing、广告、创意行动包均是草稿；既有浏览器验收确认复制反馈，导出始终禁用并说明原因。 |
| AC-011 | `App.test.tsx` 覆盖导航、任务重置与输入错误；最终浏览器复验任务进度从 `1/3` 重置为 `0/3`。 |
| AC-012 / AC-013 | 源码不含网络数据接入；最终浏览器仅见 23 个本地静态请求，无 MCP、Amazon 或 LLM 调用。 |
| AC-014 | 最终截图与浏览器人工验收：1440 × 1024 桌面端清晰可用。 |
| AC-015 / AC-016 | `App.test.tsx` 覆盖控制台与广告模块；浏览器核验六模块导航、阶段、任务、风险和下一行动可见。 |

## 本轮需求快照

- 当前任务：将创意工作台和压缩背景先推送到 GitHub 留档，再将同一版本发布到用户的 InsForge“北极星”项目。
- 设计：沿用 Summer Glass Operations 的冰白、水蓝、薄荷玻璃系统与用户提供的冰水背景；三栏工作流强调“卖点 → 画面方案 → 提示词摘要”，而不是通用 AI 聊天框。
- 边界：仅浏览器内存与固定本地素材；不接 GPT Image、MCP、Amazon 或其他网络服务，不接收/保存 API Key，不上传产品信息或生成真实图片。
- 验证现状：规则、组件与应用回归共 27 条测试、类型检查和普通生产构建通过。1440px 真实浏览器已完成产品/卖点输入、四提案生成、主预览切换和复制反馈；控制台 0 Error / 0 Warning，Network 仅有本站静态资源。
- 发布：用户已明确授权推送 GitHub 和部署 InsForge。GitHub 负责版本历史，InsForge 负责正式网站；GitHub Pages 在 InsForge 验收通过后停用。

## 下一步

1. 完成 InsForge 登录、发布前验证、GitHub 推送和 InsForge 正式部署，再停用 GitHub Pages。
2. 若进入真实数据版，先独立确认首个数据源、字段、权限、条款与只读边界；这不是给演示数据套个假胡子就能上线的事。
3. 若需要保存多个 ASIN 或历史对比，另建持久化功能包并先确定本地存储/云端账户边界。
4. 若进入移动端，另立任务完成导航、信息层级与触控体验的专项设计和测试。
