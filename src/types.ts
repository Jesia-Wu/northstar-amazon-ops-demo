export type ResearchObjective = 'competitor_analysis' | 'listing_draft' | 'ad_draft';

export type DemoStepStatus = 'pending' | 'active' | 'complete';

export interface DemoStep {
  id: 'validate_input' | 'prepare_profile' | 'prepare_assets' | 'prepare_brief' | 'prepare_action_pack' | 'complete';
  label: string;
  description: string;
  status: DemoStepStatus;
}

export interface Evidence {
  id: string;
  label: string;
  detail: string;
}

export interface DataGap {
  label: string;
  detail: string;
}

export interface Asset {
  id: string;
  label: string;
  description: string;
  evidenceId: string;
  src: string;
}

export interface ActionDraft {
  title: string;
  description: string;
  evidenceId: string;
  copyText: string;
}

export type CreativeChannel = 'listing' | 'a-plus';

export type CreativeAspectRatio = '1:1' | '4:5' | '16:9';

export type GenerationStatus = 'idle' | 'generating' | 'ready';

export interface CreativeBriefDraft {
  productName: string;
  sellingPoints: string;
  channel: CreativeChannel;
  directionId: string;
  aspectRatio: CreativeAspectRatio;
  avoid: string;
}

export interface CreativeDirection {
  id: string;
  name: string;
  purpose: string;
  frame: string;
  imageSrc: string;
}

export interface CreativeProposal extends CreativeDirection {
  sellingPoint: string;
  promptSummary: string;
}
