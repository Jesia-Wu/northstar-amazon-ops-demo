import type { CreativeBriefDraft, CreativeDirection } from '../types';

export const initialCreativeBrief: CreativeBriefDraft = {
  productName: 'Popmori 4.5QT Hot Air Popper',
  sellingPoints: '4.5QT 家庭容量，适合电影夜\n零油热风，轻负担零食\n一键操作，第一次用也不费脑\n易清洁结构，收尾不麻烦',
  channel: 'listing',
  directionId: 'hero',
  aspectRatio: '1:1',
  avoid: '不要竞品商标，不用夸张的油炸效果，不堆满营销文字',
};

export const creativeDirections: CreativeDirection[] = [
  {
    id: 'hero',
    name: '核心卖点图',
    purpose: '在第一眼讲清产品是什么、为什么更值得买',
    frame: '产品居中，爆米花与一句核心利益点形成清爽的三角构图',
    imageSrc: '/assets/popcorn-main.svg',
  },
  {
    id: 'capacity',
    name: '容量解释图',
    purpose: '降低用户对家庭使用规模的想象成本',
    frame: '产品、满碗爆米花与 4.5QT 信息在同一层级出现',
    imageSrc: '/assets/popcorn-capacity.svg',
  },
  {
    id: 'scene',
    name: '夏夜场景图',
    purpose: '把功能放进家庭电影夜的共享时刻',
    frame: '柔和夜灯、沙发和零食桌，产品是场景的一部分而非硬摆拍',
    imageSrc: '/assets/popcorn-scene.svg',
  },
  {
    id: 'clean',
    name: '清洁路径图',
    purpose: '让购买前的“用完难不难收拾”得到直观回答',
    frame: '三步拆解结构与干净台面，信息简洁而有顺序',
    imageSrc: '/assets/popcorn-clean.svg',
  },
];
