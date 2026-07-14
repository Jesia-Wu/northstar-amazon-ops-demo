import type { ActionDraft, Asset, DataGap, Evidence } from '../types';

export const demoMeta = {
  asin: 'B0CX8N7P4Q',
  brand: 'Popmori',
  title: 'Popmori 4.5QT Hot Air Popper · Oil-Free Movie Night Maker',
  category: 'Home & Kitchen / Small Appliances / Popcorn Poppers',
  price: '$49.99',
  rating: '4.2',
  reviews: '1,286',
  marketplace: 'US',
  refreshedAt: '2026-07-13 12:40',
};

export const evidence: Evidence[] = [
  { id: 'E-001', label: '价格锚点', detail: '$49.99 处于同类热风爆米花机的中段价位。' },
  { id: 'E-002', label: '类目语义', detail: '类目和标题共同指向健康零油、家庭电影夜与礼物场景。' },
  { id: 'E-003', label: '核心卖点', detail: '4.5QT 容量、1200W 加热、one-touch 操作是当前可见的功能主张。' },
  { id: 'E-004', label: '视觉资产', detail: '现有素材偏食物氛围与功能说明，缺少台面尺度与清洁路径解释。' },
  { id: 'E-005', label: '评价信号', detail: '4.2 分说明产品基础成立，但低分评论值得在真实数据版进一步拆解。' },
  { id: 'E-006', label: '广告假设', detail: '核心类目词可先承接，场景词与竞品词应分层验证而非混投。' },
  { id: 'E-007', label: '利润护栏', detail: '本地模型以 $49.99 售价、目标广告占比 18% 作为演示假设。' },
  { id: 'E-008', label: '创意缺口', detail: '图片需要更直观地说明容量、清洁和家庭使用规模。' },
];

export const dataGaps: DataGap[] = [
  { label: '真实低分评论主题', detail: '当前没有评价文本，不能断言差评来自容量、清洁、噪音或耐用性。' },
  { label: '实际搜索词与广告表现', detail: '当前没有搜索词、点击或转化数据，关键词与预算仅为启动假设。' },
];

export const assets: Asset[] = [
  { id: 'asset-main', label: '主图定位', description: '干净产品轮廓 + 爆米花成品', evidenceId: 'E-003', src: '/assets/popcorn-main.svg' },
  { id: 'asset-capacity', label: '容量说明', description: '4.5QT 对应的家庭使用场景', evidenceId: 'E-003', src: '/assets/popcorn-capacity.svg' },
  { id: 'asset-clean', label: '清洁路径', description: '将易清洁说清楚，不只写在文案里', evidenceId: 'E-004', src: '/assets/popcorn-clean.svg' },
  { id: 'asset-scene', label: '电影夜场景', description: '把功能放进真实的共享时刻', evidenceId: 'E-002', src: '/assets/popcorn-scene.svg' },
  { id: 'asset-scale', label: '尺寸与台面', description: '降低用户对尺寸的想象成本', evidenceId: 'E-008', src: '/assets/popcorn-scale.svg' },
];

export const sellingPoints = [
  '4.5QT 容量适合家庭电影夜与小型聚会。',
  '1200W 热风爆米花路径，突出零油轻负担。',
  '一键操作和可见的结构说明，减少第一次使用的犹豫。',
];

export const brief = [
  { title: '定位机会', body: '不要只卖“爆米花机”，而是卖一场更轻松的家庭电影夜。', evidenceId: 'E-002' },
  { title: '首要风险', body: '容量和清洁是否真的好理解，决定用户会不会在详情页就流失。', evidenceId: 'E-004' },
  { title: '需要验证', body: '低分评论的真实痛点目前只是演示占位，不能据此做确定性产品判断。', evidenceId: 'E-005' },
];

export const actionDrafts: ActionDraft[] = [
  {
    title: 'Listing 承接',
    description: '先把“健康零油 + 家庭电影夜 + 4.5QT 容量”写成一条连贯叙事。',
    evidenceId: 'E-003',
    copyText: 'Hot Air Popper for Family Movie Nights · 4.5QT oil-free snacks with one-touch operation.',
  },
  {
    title: '广告启动',
    description: '核心词先精确承接，场景词与竞品词分组试探，避免把学习预算烧成烟花。',
    evidenceId: 'E-006',
    copyText: 'P0 Exact: hot air popper / popcorn maker · P1 Phrase: oil free snacks / movie night snacks',
  },
  {
    title: '图片补位',
    description: '补一张台面尺寸图和一张清洁流程图，让购买前的疑问在图里结束。',
    evidenceId: 'E-008',
    copyText: 'Creative brief: countertop scale + clean-up in three visual beats.',
  },
];
