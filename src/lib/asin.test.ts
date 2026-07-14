import { describe, expect, test } from 'vitest';
import { validateResearchInput } from './asin';

describe('validateResearchInput', () => {
  test('accepts a ten-character ASIN and normalizes it to uppercase', () => {
    expect(validateResearchInput('b0cx8n7p4q', 'competitor_analysis')).toEqual({
      ok: true,
      asin: 'B0CX8N7P4Q',
    });
  });

  test('rejects an invalid ASIN with a Chinese recovery message', () => {
    expect(validateResearchInput('B123', 'competitor_analysis')).toEqual({
      ok: false,
      message: '请输入 10 位 ASIN，例如 B0XXXXXXXX',
    });
  });

  test('rejects a missing research objective', () => {
    expect(validateResearchInput('B0CX8N7P4Q', '')).toEqual({
      ok: false,
      message: '请选择研究目标',
    });
  });

  test('rejects a research objective outside the supported enum', () => {
    expect(validateResearchInput('B0CX8N7P4Q', 'launch_everything')).toEqual({
      ok: false,
      message: '请选择有效的研究目标',
    });
  });
});
