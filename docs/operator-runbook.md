# Northstar 发布与运维手册

## 当前架构

- 源码、提交历史和回滚点：GitHub `Jesia-Wu/northstar-amazon-ops-demo` 的 `main`。
- 持续检查：GitHub Actions 运行测试、类型检查和普通生产构建。
- 正式网站：InsForge `northstar`，地址为 <https://9kjrnynx.insforge.site/>。
- GitHub Pages、早期私有 Sites、InsForge 数据库/认证/存储/模型网关均未启用。

## 标准发布流程

1. 确认只包含本次改动，且 `.insforge/`、本地输出和工具缓存没有进入暂存区。
2. 在本地运行：

   ```bash
   npm ci
   npm test
   npm run typecheck
   npm run build
   ```

3. 提交并推送 GitHub `main`，等待 `Verify application` 工作流成功。
4. 若提交改变会进入 InsForge 包的应用源代码、构建配置或静态资源，记录通过验证的完整 SHA，并从该提交所在的干净工作树部署；只修改被 `.vercelignore` 排除的文档时，无需制造空部署：

   ```bash
   npx --yes @insforge/cli@latest deployments deploy . --meta '{"gitCommitSha":"<完整提交 SHA>","gitBranch":"main","sourceRepository":"Jesia-Wu/northstar-amazon-ops-demo"}'
   ```

5. 使用部署命令返回的 ID 查询状态：

   ```bash
   npx --yes @insforge/cli@latest deployments status <deployment-id>
   ```

6. 只有状态为 `READY` 后，才检查正式网址、JS、CSS、背景图和创意资产主路径。

## 凭据与输出红线

- `.insforge/project.json` 只供本机 CLI 使用，已被 Git 忽略。
- 禁止回显 `current --json` 或整段凭据配置；JSON 状态可能包含管理员 API Key。
- 只读取普通状态输出或本地白名单筛选后的项目名、区域、guard 和“Key 是否存在”。
- 若凭据意外出现在工具输出中，立即轮换，并检查源码、暂存区和 Git 历史是否收录。

## 冒烟检查

```bash
curl -fsS -o /dev/null -w 'HTTP %{http_code}\n' https://9kjrnynx.insforge.site/
```

浏览器检查：打开首页 → 进入“创意资产” → 生成四个视觉提案 → 切换“清洁路径图” → 复制提示词；同时确认没有第三方数据请求和控制台错误。

## 回滚

不要重写或删除 GitHub 历史。选择指定的已验证提交，在独立临时工作树中重新执行上述本地验证和 InsForge 部署；部署成功并验收后，再记录新的 deployment ID、目标提交和回滚原因。

## 当前可用回滚点

- 应用发布提交：`68d7766e18340a0d08c6db92cd6dc7478d4adfa9`
- 已验证部署：`49769ca6-0e57-480d-8e5a-1152ff88d5e6`
