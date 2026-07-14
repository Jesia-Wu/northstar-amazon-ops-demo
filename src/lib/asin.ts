import type { ResearchObjective } from '../types';

type ValidationResult =
  | { ok: true; asin: string }
  | { ok: false; message: string };

const asinPattern = /^[A-Z0-9]{10}$/;

export const objectives: Array<{ value: ResearchObjective; label: string }> = [
  { value: 'competitor_analysis', label: '竞品拆解' },
  { value: 'listing_draft', label: 'Listing 准备' },
  { value: 'ad_draft', label: '广告启动' },
];

const objectiveValues = new Set(objectives.map((objective) => objective.value));

export function validateResearchInput(asin: string, objective: string): ValidationResult {
  const normalized = asin.trim().toUpperCase();

  if (!asinPattern.test(normalized)) {
    return { ok: false, message: '请输入 10 位 ASIN，例如 B0XXXXXXXX' };
  }

  if (!objective) {
    return { ok: false, message: '请选择研究目标' };
  }

  if (!objectiveValues.has(objective as ResearchObjective)) {
    return { ok: false, message: '请选择有效的研究目标' };
  }

  return { ok: true, asin: normalized };
}
