# Amazon ASIN 初级工作台 Implementation Plan

> 状态：此文件保留为早期实现草案。当前实施以同目录的 `spec.md`、`plan.md`、`tasks.md`、`ui-design.md` 为准；尤其不要沿用本文中“单一 ASIN 页面、暖纸色配色”的旧描述。现在的目标是使用内置数据的 Summer Glass 新品运营控制台。

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个无 MCP、无外部请求、使用内置演示数据的可交互 Amazon US ASIN 研究工作台。

**Architecture:** 使用 Vite + React + TypeScript 单页应用。产品档案、图片、证据、Brief 和行动草稿存放在本地 fixture；表单启动受测试保护的六步演示状态机，所有 UI 从该状态和 fixture 投影而来。界面采用选定的“证据优先工作台”方向，冰白水蓝玻璃与低对比冰水远景构成主视觉，交互在浏览器本地完成。

**Tech Stack:** Vite、React、TypeScript、Vitest、React Testing Library、@playwright/test、Lucide React、纯 CSS design tokens。

## Global Constraints

- 仅 `US`、仅本地演示数据；不得使用 MCP、Amazon SP-API、LLM、浏览器爬取、网络请求、数据库或密钥。
- 所有数据/进度必须可见地标记为“内置演示数据”或“演示进度”，不得暗示实时 Amazon 采集。
- 不提供 Amazon 写入、广告操作、账号登录、导出文件或外部凭据输入。
- 主视觉固定为冰白 `#F4FBFA`、雾蓝 `#E6F3FA`、海盐蓝 `#4D9DCC` 与薄荷 `#32B89E`；图标使用 Lucide SVG，不使用 emoji 作为功能图标。
- 按 TDD：每项业务规则与交互先写失败测试、确认红灯，再写最小实现并确认绿灯。
- 必须支持 375、768、1024、1440 px；键盘焦点可见；尊重 `prefers-reduced-motion`；不以颜色单独传达状态。
- 当前目录不是 Git 仓库，不能执行提交；每个已验证任务改为更新 `task.md` 记录实际证据。

---

## File Structure

| 文件 | 职责 |
| --- | --- |
| `package.json` | 运行、测试、类型检查、构建脚本与依赖。 |
| `vite.config.ts` / `tsconfig*.json` | Vite、TypeScript 与 Vitest 运行时配置。 |
| `src/types.ts` | 演示数据、证据、步骤、研究目标的共享类型。 |
| `src/data/demoResearch.ts` | 单一固定研究档案及证据引用映射。 |
| `src/lib/asin.ts` | ASIN 规范化与 US/目标校验。 |
| `src/lib/demoMachine.ts` | 六步演示状态机的纯函数。 |
| `src/App.tsx` | 可访问的表单、工作台布局和本地交互状态。 |
| `src/App.css` | design tokens、响应式布局、克制动效、交互状态。 |
| `src/main.tsx` | React 启动入口。 |
| `src/test/setup.ts` | Testing Library 的 DOM matcher 设置。 |
| `src/lib/asin.test.ts` | 输入校验的 TDD 单元测试。 |
| `src/lib/demoMachine.test.ts` | 状态机的 TDD 单元测试。 |
| `src/App.test.tsx` | 表单、进度、证据、复制、禁用导出的组件测试。 |
| `e2e/workbench.spec.ts` | 真实浏览器主路径与无外部请求检查。 |
| `public/assets/*.svg` | 本地演示产品与功能图片，无远程图像依赖。 |

### Task 1: 建立可测试的前端运行时

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/App.css`, `src/test/setup.ts`, `.gitignore`

**Interfaces:**
- Produces: `npm run dev`, `npm run test`, `npm run typecheck`, `npm run build` 均可执行的空白 React 应用。

- [ ] **Step 1: 初始化 npm 并安装运行时/测试依赖（不生成业务页面）**

Run:

```bash
npm init -y
npm install react react-dom lucide-react
npm install -D vite @vitejs/plugin-react typescript vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/react @types/react-dom @playwright/test
```

Expected: `package.json` 与 `node_modules/` 出现，尚无业务功能代码。

- [ ] **Step 2: 写失败的启动渲染测试**

Create `src/App.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the ASIN workbench title', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: 'ASIN 工作台' })).toBeInTheDocument();
});
```

- [ ] **Step 3: 运行测试并确认红灯**

Run: `npm run test -- src/App.test.tsx`

Expected: FAIL，因为 `App` 和 Vitest 配置尚未存在。

- [ ] **Step 4: 实现最小启动运行时**

Create Vite React 配置、测试 setup、`main.tsx` 与最小 `App`，使 `App` 返回：

```tsx
export default function App() {
  return <h1>ASIN 工作台</h1>;
}
```

在 `package.json` 设置：

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "typecheck": "tsc -b --pretty false",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

- [ ] **Step 5: 确认绿灯与运行时基线**

Run:

```bash
npm run test -- src/App.test.tsx
npm run typecheck
npm run build
```

Expected: 三项均 PASS；更新 `AGENTS.md` 的实际运行命令和 `task.md` 的 Task 1 证据。

### Task 2: 实现本地数据、输入校验与演示状态机

**Files:**
- Create: `src/types.ts`, `src/data/demoResearch.ts`, `src/lib/asin.ts`, `src/lib/asin.test.ts`, `src/lib/demoMachine.ts`, `src/lib/demoMachine.test.ts`

**Interfaces:**
- Produces: `validateResearchInput(input): ValidationResult`；`createDemoSteps(): DemoStep[]`；`advanceDemoSteps(steps, completedId): DemoStep[]`；`demoResearch`。
- Consumes: 无外部服务；全为纯函数和本地常量。

- [ ] **Step 1: 写 ASIN 格式与研究目标的失败测试**

Create `src/lib/asin.test.ts`:

```ts
import { validateResearchInput } from './asin';

test('accepts a ten-character US ASIN and research objective', () => {
  expect(validateResearchInput('B0C9PZ8M1V', 'competitor_analysis')).toEqual({ ok: true, asin: 'B0C9PZ8M1V' });
});

test('rejects an invalid ASIN with a Chinese message', () => {
  expect(validateResearchInput('B123', 'competitor_analysis')).toEqual({ ok: false, message: '请输入 10 位 ASIN，例如 B0XXXXXXXX' });
});

test('rejects an empty research objective', () => {
  expect(validateResearchInput('B0C9PZ8M1V', '')).toEqual({ ok: false, message: '请选择研究目标' });
});
```

- [ ] **Step 2: 运行校验测试并确认红灯**

Run: `npm run test -- src/lib/asin.test.ts`

Expected: FAIL，因为 `validateResearchInput` 尚未存在。

- [ ] **Step 3: 写状态机的失败测试**

Create `src/lib/demoMachine.test.ts`:

```ts
import { advanceDemoSteps, createDemoSteps } from './demoMachine';

test('moves exactly one demo step from active to complete', () => {
  const initial = createDemoSteps();
  const next = advanceDemoSteps(initial, 'validate_input');
  expect(next[0].status).toBe('complete');
  expect(next[1].status).toBe('active');
  expect(next.slice(2).every((step) => step.status === 'pending')).toBe(true);
});
```

- [ ] **Step 4: 运行状态机测试并确认红灯**

Run: `npm run test -- src/lib/demoMachine.test.ts`

Expected: FAIL，因为 `demoMachine` 尚未存在。

- [ ] **Step 5: 实现最小纯函数和 fixture**

定义固定步骤：`validate_input`、`prepare_profile`、`prepare_assets`、`prepare_brief`、`prepare_action_pack`、`complete`。`demoResearch` 必须包含产品标题、品牌、类目、美元价格、评分、评论数、三条卖点、六张本地 SVG 图片、证据 `E-001` 至 `E-008`、三段 Brief 洞察和 Listing/广告/图片草稿。

`validateResearchInput` 的完整核心分支：

```ts
const asinPattern = /^[A-Z0-9]{10}$/;

export function validateResearchInput(asin: string, objective: string) {
  const normalized = asin.trim().toUpperCase();
  if (!asinPattern.test(normalized)) return { ok: false as const, message: '请输入 10 位 ASIN，例如 B0XXXXXXXX' };
  if (!objective) return { ok: false as const, message: '请选择研究目标' };
  return { ok: true as const, asin: normalized };
}
```

- [ ] **Step 6: 确认 Task 2 绿灯**

Run:

```bash
npm run test -- src/lib/asin.test.ts src/lib/demoMachine.test.ts
npm run typecheck
```

Expected: PASS；在 `task.md` 记录 fixture 为内置演示数据、零网络依赖。

### Task 3: 实现证据优先工作台与高级但克制的交互

**Files:**
- Modify: `src/App.tsx`, `src/App.css`, `src/App.test.tsx`, `src/main.tsx`
- Create: `public/assets/popcorn-main.svg`, `public/assets/popcorn-feature-1.svg`, `public/assets/popcorn-feature-2.svg`, `public/assets/popcorn-feature-3.svg`, `public/assets/popcorn-feature-4.svg`, `public/assets/popcorn-feature-5.svg`

**Interfaces:**
- Consumes: `demoResearch`, `validateResearchInput`, `createDemoSteps`, `advanceDemoSteps`。
- Produces: 单页工作台，其中 `data-evidence-id` 标记所有可高亮证据；无任何 fetch/XHR 调用。

- [ ] **Step 1: 写工作台交互的失败组件测试**

替换 `src/App.test.tsx` 为至少包含：

```tsx
test('shows an input error instead of starting the demo for an invalid ASIN', async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.clear(screen.getByLabelText('ASIN'));
  await user.type(screen.getByLabelText('ASIN'), 'B123');
  await user.click(screen.getByRole('button', { name: '开始演示分析' }));
  expect(screen.getByText('请输入 10 位 ASIN，例如 B0XXXXXXXX')).toBeInTheDocument();
});

test('labels product data as built-in demo data', () => {
  render(<App />);
  expect(screen.getAllByText('内置演示数据').length).toBeGreaterThan(0);
});

test('marks an evidence tag pressed when it is selected', async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole('button', { name: '查看证据 E-003' }));
  expect(screen.getByRole('button', { name: '查看证据 E-003' })).toHaveAttribute('aria-pressed', 'true');
});

test('explains why exporting is unavailable', async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.hover(screen.getByRole('button', { name: '导出研究' }));
  expect(screen.getByText('真实数据版开放')).toBeInTheDocument();
});
```

- [ ] **Step 2: 运行组件测试并确认红灯**

Run: `npm run test -- src/App.test.tsx`

Expected: FAIL，因为最小标题页尚无输入、证据、导出控件。

- [ ] **Step 3: 实现组件结构与数据展示**

`App.tsx` 必须使用语义区块：`aside > nav`、`main`、`form`、`section`、`article`。页面顺序严格为：顶部标题/演示徽章 -> ASIN 表单 + 当前研究说明 -> 六步时间线 + 产品档案 -> 本地图片画廊 -> Brief -> 三类行动草稿。

实现事件：

```tsx
const [activeEvidence, setActiveEvidence] = useState<string | null>(null);
const [copyMessage, setCopyMessage] = useState('');

async function copyDraft(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    setCopyMessage('已复制草稿');
  } catch {
    setCopyMessage('浏览器未允许自动复制，请手动复制内容');
  }
}
```

“开始演示分析”完成验证后，以固定短延时逐步推进 UI，且以 `aria-live="polite"` 报告当前步骤。演示完成时把焦点移至产品档案标题；每个证据按钮设置 `aria-pressed`，并高亮对应字段/图片。

- [ ] **Step 4: 实现设计系统与动效**

`App.css` 必须定义 CSS variables：

```css
:root {
  --forest-950: #123b2f;
  --forest-700: #246b4f;
  --paper-50: #f6f4ee;
  --ink-950: #14261f;
  --ink-500: #68756e;
  --line-200: #d9dfd7;
  --signal-500: #e8a623;
  --radius-card: 12px;
  --ease-out: cubic-bezier(.22, 1, .36, 1);
}
```

实现：窄侧栏的细颗粒纹理、暖纸色阅读区、不可泛滥的薄阴影、卡片层级、可见焦点环、44 px 触控目标、短促 `opacity/transform` 过渡、完成步骤的轻量进入动画。所有 `animation` 和 `transition` 在 `prefers-reduced-motion: reduce` 下关闭。断点在 `1024px` 将侧栏变为顶部条，`768px` 下双列变单列、图片轨道可横滑。

- [ ] **Step 5: 创建本地 SVG 演示素材**

每个 SVG 使用 `viewBox="0 0 600 420"`、产品轮廓、功能标签和不同暖色/森林绿构图；每个在 `App.tsx` 使用有意义的中文 `alt`。不得引用 Unsplash、Amazon CDN 或任何远程 URL。

- [ ] **Step 6: 确认组件测试绿灯**

Run:

```bash
npm run test -- src/App.test.tsx
npm run typecheck
npm run build
```

Expected: PASS；更新 `task.md`，记录截图风格的深绿/米白系统与局部动效规则。

### Task 4: 完成浏览器验收与质量修整

**Files:**
- Create: `e2e/workbench.spec.ts`, `playwright.config.ts`
- Modify: `src/App.tsx`, `src/App.css`, `task.md`, `AGENTS.md`, `docs/features/001-amazon-asin-workbench/tasks.md`

**Interfaces:**
- Consumes: 已构建的 Vite 网站。
- Produces: 可复跑的浏览器主路径验证、无外部请求证据和 V5 完成记录。

- [ ] **Step 1: 写失败的 E2E 主路径测试**

Create `e2e/workbench.spec.ts`:

```ts
import { expect, test } from '@playwright/test';

test('runs the local ASIN demonstration without external data requests', async ({ page }) => {
  const externalRequests: string[] = [];
  page.on('request', (request) => {
    if (!request.url().startsWith('http://127.0.0.1:')) externalRequests.push(request.url());
  });
  await page.goto('/');
  await page.getByRole('button', { name: '开始演示分析' }).click();
  await expect(page.getByRole('heading', { name: '产品档案' })).toBeVisible();
  await expect(page.getByText('演示分析已完成')).toBeVisible();
  await expect(page.getByText('内置演示数据').first()).toBeVisible();
  expect(externalRequests).toEqual([]);
});
```

- [ ] **Step 2: 运行 E2E 并确认红灯**

Run: `npx playwright test e2e/workbench.spec.ts`

Expected: FAIL，因为 Playwright 配置和所需交互尚未完整存在。

- [ ] **Step 3: 配置浏览器验收并调整实现到通过**

使用 `playwright.config.ts` 启动 `npm run dev -- --host 127.0.0.1`；设定 baseURL `http://127.0.0.1:5173`。根据测试失败原因只做最小实现修复；不得删除无外部请求断言。

- [ ] **Step 4: 检查视觉、响应式与无障碍状态**

在 1440、1024、768、375 px 打开页面，检查无横向溢出、导航折叠、图片横滑、长标题折行、焦点可见。手动切换 reduced-motion 并确认非必要动画停止。修复发现的实际问题。

- [ ] **Step 5: 跑完整验证并更新 V5 记录**

Run:

```bash
npm run test
npm run typecheck
npm run build
npx playwright test
```

Expected: 全部 PASS。更新 `AGENTS.md` 的实际命令、`tasks.md` 的完成状态和 `task.md` 的 AC-001 至 AC-014 实测结果、剩余风险与下一动作。
