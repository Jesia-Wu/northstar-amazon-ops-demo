# Northstar · Amazon 运营控制台

面向中文亚马逊运营的桌面端本地原型。它把产品研究、Listing 准备、广告启动、创意缺口和利润护栏放进同一条运营链路，重点是让每个建议都能追溯到演示证据，并明确哪些数据仍然未知。

## 代码仓库与网站发布

[正式网站（InsForge）](https://9kjrnynx.insforge.site/)

[GitHub 仓库](https://github.com/Jesia-Wu/northstar-amazon-ops-demo) 只负责保存源码、版本历史、回滚点和持续检查；正式网站由 InsForge 托管。发布顺序固定为：本地验证、推送 GitHub 留档、GitHub Actions 通过、再部署同一提交到 InsForge。

## 本地启动

```bash
npm install
npm run dev
```

浏览器打开终端显示的本地地址（通常是 `http://localhost:5173`）。本期按桌面端（宽度至少 1024px）设计和验收。

## 可做什么

- 在本地输入合法 ASIN，运行六步演示研究流程。
- 查看固定演示产品档案、图片资产、证据编号与显式数据缺口。
- 切换 Listing、广告、创意和利润视图，复制运营草稿。
- 在本地“创意资产”页填写产品名称与卖点，生成四个可编辑的图片方案和提示词摘要；这是本地模拟，不会上传信息或调用图像模型。
- 勾选今日任务，或通过顶部刷新按钮重置所有本地演示状态。

## 明确边界

- 不连接 MCP、Amazon、SP-API、LLM 或任何第三方服务。
- 不登录 Seller Central，不读取真实店铺数据，不创建广告或修改 Listing。
- 所有产品资料、建议和数字均为内置演示数据；输入 ASIN 不会触发外部查询。

## 验证命令

```bash
npm test
npm run typecheck
npm run build
npm run preview
```

背景使用项目方在当前工作区提供的冰水照片，仅作为低对比视觉氛围；已按项目方明确授权用于公开网站。日后替换为第三方或真实商品素材时，请重新确认公开使用权。
