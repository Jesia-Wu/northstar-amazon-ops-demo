import type { DemoStep } from '../types';

const stepBlueprint: Array<Pick<DemoStep, 'id' | 'label' | 'description'>> = [
  { id: 'validate_input', label: '确认研究目标', description: '本地校验 ASIN、站点和研究目标' },
  { id: 'prepare_profile', label: '整理产品档案', description: '载入内置产品资料、类目和卖点' },
  { id: 'prepare_assets', label: '映射创意资产', description: '关联主图、功能图和证据编号' },
  { id: 'prepare_brief', label: '生成运营 Brief', description: '从演示证据归纳机会、风险和待验证项' },
  { id: 'prepare_action_pack', label: '准备行动草稿', description: '组装 Listing、广告和图片建议' },
  { id: 'complete', label: '研究包就绪', description: '所有内容均为内置演示数据，未写入 Amazon' },
];

export function createDemoSteps(): DemoStep[] {
  return stepBlueprint.map((step, index) => ({
    ...step,
    status: index === 0 ? 'active' : 'pending',
  }));
}

export function advanceDemoStep(steps: DemoStep[], completedId: DemoStep['id']): DemoStep[] {
  const completedIndex = steps.findIndex((step) => step.id === completedId);

  if (completedIndex === -1 || steps[completedIndex]?.status !== 'active') return steps;

  return steps.map((step, index) => {
    if (index === completedIndex) return { ...step, status: 'complete' };
    if (index === completedIndex + 1) return { ...step, status: 'active' };
    return step;
  });
}
