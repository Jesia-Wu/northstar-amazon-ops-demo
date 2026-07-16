# 004：卖点驱动图片创作台任务

## 模块 1：创意简报规则

- [x] 在 `src/lib/creativeStudio.test.ts` 写失败用例：空产品名、无有效卖点、换行去重、最多四条卖点、提示词包含产品名/尺寸/卖点。
- [x] 运行 `npx vitest run src/lib/creativeStudio.test.ts`，确认规则尚不存在而失败。
- [x] 在 `src/types.ts` 添加创意简报、方向、提案与生成状态类型。
- [x] 新建 `src/lib/creativeStudio.ts`，实现 `parseSellingPoints`、`validateCreativeBrief`、`buildCreativeProposals`。
- [x] 再次运行同一测试，确认通过。

## 模块 2：本地创作台界面

- [x] 新建 `src/data/demoCreativeStudio.ts`，提供四种固定画面方向及既有静态图片路径。
- [x] 在 `src/components/CreativeStudio.test.tsx` 写失败用例：可见字段标签、无效简报禁止生成、生成中状态、完成后四提案、点选提案更新主预览。
- [x] 运行 `npx vitest run src/components/CreativeStudio.test.tsx`，确认因组件不存在而失败。
- [x] 新建 `src/components/CreativeStudio.tsx`，以本地 state 实现表单、方向、250ms 模拟生成、预览和复制反馈；清理 timeout。
- [x] 将 `src/App.tsx` 的 `renderCreative` 替换为该组件，保留侧栏导航和其他模块。
- [x] 为 `src/App.css` 添加工作台的三栏、提案、状态、焦点和减少动态样式。
- [x] 重跑组件测试，确认通过。

## 模块 3：回归与桌面验收

- [x] 更新 `src/App.test.tsx`，断言“创意资产”进入的是“卖点驱动图片创作台”而非旧图库标题。
- [x] 运行 `npm test`、`npm run typecheck`、`npm run build`。
- [x] 在 1440px 真实浏览器输入产品名和卖点，生成四提案、切换主预览、复制提示词；检查 Network 中没有外部请求、控制台无 Error。
- [x] 更新 `task.md`：写入实际测试、浏览器证据、未接 API 的边界和下一步风险。
