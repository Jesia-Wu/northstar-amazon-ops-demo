import { describe, expect, test } from 'vitest';
import { actionDrafts, assets, brief, dataGaps, evidence } from './demoResearch';

describe('demo research fixture', () => {
  test('keeps every visible recommendation traceable to a known evidence item', () => {
    const evidenceIds = new Set(evidence.map((item) => item.id));
    const citedItems = [...assets, ...brief, ...actionDrafts];

    expect(citedItems.every((item) => evidenceIds.has(item.evidenceId))).toBe(true);
  });

  test('declares the operating data that the local fixture does not provide', () => {
    expect(dataGaps.map((gap) => gap.label)).toEqual([
      '真实低分评论主题',
      '实际搜索词与广告表现',
    ]);
  });
});
