import { describe, expect, test } from 'vitest';
import type { CreativeBriefDraft, CreativeDirection } from '../types';
import { buildCreativeProposals, parseSellingPoints, validateCreativeBrief } from './creativeStudio';

const directions: CreativeDirection[] = [
  {
    id: 'hero',
    name: '核心卖点图',
    purpose: '先让用户理解核心价值',
    frame: '产品与关键信息同框',
    imageSrc: '/assets/popcorn-popcorn-maker-1.jpg',
  },
  {
    id: 'scene',
    name: '夏夜场景图',
    purpose: '把产品放进使用时刻',
    frame: '人物与产品在家庭电影夜场景',
    imageSrc: '/assets/popcorn-popcorn-maker-2.jpg',
  },
];

const brief: CreativeBriefDraft = {
  productName: 'Popmori Hot Air Popper',
  sellingPoints: '4.5QT 家庭容量\n零油热风\n一键操作',
  channel: 'listing',
  directionId: 'hero',
  aspectRatio: '1:1',
  avoid: '不要出现夸大油炸效果',
};

describe('creative studio brief rules', () => {
  test('requires a product name and at least one useful selling point', () => {
    expect(validateCreativeBrief({ ...brief, productName: '   ' }).ok).toBe(false);
    expect(validateCreativeBrief({ ...brief, sellingPoints: '\n  \n' }).ok).toBe(false);
  });

  test('normalizes selling points by trimming, de-duplicating, and keeping four', () => {
    expect(parseSellingPoints(' 家庭容量 \n零油热风\n家庭容量\n一键操作\n易清洁\n多余卖点')).toEqual([
      '家庭容量',
      '零油热风',
      '一键操作',
      '易清洁',
    ]);
  });

  test('builds one proposal per direction with product, selling point, ratio, and guardrail', () => {
    const proposals = buildCreativeProposals(brief, directions);

    expect(proposals).toHaveLength(2);
    expect(proposals[0]).toMatchObject({
      id: 'hero',
      sellingPoint: '4.5QT 家庭容量',
    });
    expect(proposals[0].promptSummary).toContain('Popmori Hot Air Popper');
    expect(proposals[0].promptSummary).toContain('1:1');
    expect(proposals[0].promptSummary).toContain('不要出现夸大油炸效果');
  });
});
