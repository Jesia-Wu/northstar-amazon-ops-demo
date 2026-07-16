import type { CreativeBriefDraft, CreativeDirection, CreativeProposal } from '../types';

export type CreativeBriefValidation =
  | { ok: true; sellingPoints: string[] }
  | { ok: false; message: string; sellingPoints: string[] };

export function parseSellingPoints(value: string): string[] {
  const seen = new Set<string>();

  return value
    .split(/\r?\n/)
    .map((point) => point.trim().replace(/\s+/g, ' '))
    .filter((point) => {
      if (!point || seen.has(point.toLocaleLowerCase())) return false;
      seen.add(point.toLocaleLowerCase());
      return true;
    })
    .slice(0, 4);
}

export function validateCreativeBrief(brief: CreativeBriefDraft): CreativeBriefValidation {
  const sellingPoints = parseSellingPoints(brief.sellingPoints);

  if (!brief.productName.trim()) {
    return { ok: false, message: '请先填写产品名称，再开始编排图片方案', sellingPoints };
  }

  if (sellingPoints.length === 0) {
    return { ok: false, message: '至少写一条可被图片表达的产品卖点', sellingPoints };
  }

  return { ok: true, sellingPoints };
}

export function buildCreativeProposals(
  brief: CreativeBriefDraft,
  directions: CreativeDirection[],
): CreativeProposal[] {
  const sellingPoints = parseSellingPoints(brief.sellingPoints);
  const channelLabel = brief.channel === 'listing' ? 'Amazon Listing' : 'Amazon A+ 内容';
  const avoid = brief.avoid.trim() || '避免无法证明的效果、竞品商标与误导性文案';
  const productName = brief.productName.trim();

  return directions.map((direction, index) => {
    const sellingPoint = sellingPoints[index % sellingPoints.length] ?? '待补充卖点';

    return {
      ...direction,
      sellingPoint,
      promptSummary: [
        `${channelLabel} ${brief.aspectRatio} 产品图：${productName}。`,
        `画面任务：${direction.purpose}；构图：${direction.frame}。`,
        `必须让用户一眼理解：${sellingPoint}。`,
        `画面限制：${avoid}。`,
      ].join(' '),
    };
  });
}
