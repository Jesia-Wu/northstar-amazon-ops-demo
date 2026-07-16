import { useEffect, useMemo, useRef, useState } from 'react';
import { CheckCircle2, CircleAlert, Copy, ImagePlus, LoaderCircle, Sparkles } from 'lucide-react';
import { creativeDirections, initialCreativeBrief } from '../data/demoCreativeStudio';
import { buildCreativeProposals, validateCreativeBrief } from '../lib/creativeStudio';
import type { CreativeBriefDraft, GenerationStatus } from '../types';

const channelOptions = [
  { value: 'listing', label: 'Listing 图片' },
  { value: 'a-plus', label: 'A+ 内容' },
] as const;

const ratioOptions = ['1:1', '4:5', '16:9'] as const;

export default function CreativeStudio() {
  const [draft, setDraft] = useState<CreativeBriefDraft>(initialCreativeBrief);
  const [generationStatus, setGenerationStatus] = useState<GenerationStatus>('idle');
  const [selectedProposalId, setSelectedProposalId] = useState(initialCreativeBrief.directionId);
  const [copyMessage, setCopyMessage] = useState('');
  const timerRef = useRef<number | null>(null);
  const validation = validateCreativeBrief(draft);
  const proposals = useMemo(
    () => (validation.ok ? buildCreativeProposals(draft, creativeDirections) : []),
    [draft, validation.ok],
  );
  const selectedProposal = proposals.find((proposal) => proposal.id === selectedProposalId) ?? proposals[0];
  const isGenerating = generationStatus === 'generating';
  const isReady = generationStatus === 'ready';

  useEffect(() => () => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
  }, []);

  function updateDraft(patch: Partial<CreativeBriefDraft>) {
    setDraft((current) => ({ ...current, ...patch }));
    setGenerationStatus('idle');
    setCopyMessage('');
  }

  function generateProposals() {
    if (!validation.ok || isGenerating) return;

    setGenerationStatus('generating');
    setCopyMessage('');
    timerRef.current = window.setTimeout(() => {
      setSelectedProposalId(draft.directionId);
      setGenerationStatus('ready');
      timerRef.current = null;
    }, 250);
  }

  async function copyPrompt() {
    if (!selectedProposal) return;

    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(selectedProposal.promptSummary);
      setCopyMessage('已复制当前提示词摘要');
    } catch {
      setCopyMessage('浏览器未允许自动复制，请手动复制提示词摘要');
    }
  }

  const statusText = isGenerating
    ? '正在编排视觉方案 · 本地演示，不会调用图像模型'
    : isReady
      ? '4 个视觉提案已就绪 · 可点选继续完善'
      : '等待产品卖点 · 本地创意草稿，不上传信息';

  return (
    <div className="view-content studio-view">
      <section className="glass studio-intro stagger-item">
        <div>
          <p className="eyebrow"><ImagePlus size={14} aria-hidden="true" /> Creative workbench</p>
          <h1>卖点驱动图片创作台</h1>
          <p>先把产品事实翻译成画面任务，再交给设计师或未来的图像模型。每张图都要回答一个购买问题。</p>
        </div>
        <div className="studio-intro-note">
          <span>LOCAL ONLY</span>
          <strong>不上传卖点 · 不填写 Key · 不调用模型</strong>
        </div>
      </section>

      <section className="studio-layout stagger-item delay-1" aria-label="图片创作工作台">
        <article className="glass card studio-brief-card">
          <div className="card-heading compact-heading">
            <div><p className="eyebrow">01 · Product brief</p><h2>把卖点交给画面</h2></div>
            <Sparkles size={20} aria-hidden="true" />
          </div>
          <div className="studio-form">
            <label htmlFor="studio-product-name">产品名称</label>
            <input
              id="studio-product-name"
              value={draft.productName}
              onChange={(event) => updateDraft({ productName: event.target.value })}
              aria-invalid={!validation.ok && !draft.productName.trim()}
              placeholder="例如：4.5QT Hot Air Popper"
            />

            <label htmlFor="studio-selling-points">产品卖点</label>
            <textarea
              id="studio-selling-points"
              value={draft.sellingPoints}
              onChange={(event) => updateDraft({ sellingPoints: event.target.value })}
              aria-invalid={!validation.ok && validation.sellingPoints.length === 0}
              placeholder="每行一条，例如：4.5QT 家庭容量"
              rows={6}
            />
            <p className="field-hint">每行一条 · 自动去重 · 最多取前 4 条</p>

            <label htmlFor="studio-channel">图片用途</label>
            <select id="studio-channel" value={draft.channel} onChange={(event) => updateDraft({ channel: event.target.value as CreativeBriefDraft['channel'] })}>
              {channelOptions.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}
            </select>

            <label htmlFor="studio-avoid">画面限制</label>
            <textarea
              id="studio-avoid"
              value={draft.avoid}
              onChange={(event) => updateDraft({ avoid: event.target.value })}
              rows={3}
              placeholder="例如：不出现竞品商标或夸大文案"
            />
            {!validation.ok && <p className="form-error" role="alert"><CircleAlert size={15} aria-hidden="true" />{validation.message}</p>}
            <button className="primary-button full-button studio-generate" type="button" onClick={generateProposals} disabled={!validation.ok || isGenerating}>
              {isGenerating ? <LoaderCircle className="spin" size={17} aria-hidden="true" /> : <Sparkles size={17} aria-hidden="true" />}
              {isGenerating ? '正在编排视觉方案' : '生成 4 个视觉提案'}
            </button>
          </div>
        </article>

        <article className="glass card studio-preview-card">
          <div className="studio-preview-topline">
            <div><p className="eyebrow">02 · Visual director</p><h2>先决定画面负责什么</h2></div>
            <div className="ratio-control" aria-label="画面比例">
              {ratioOptions.map((ratio) => <button className={draft.aspectRatio === ratio ? 'is-selected' : ''} type="button" key={ratio} aria-pressed={draft.aspectRatio === ratio} disabled={isGenerating} onClick={() => updateDraft({ aspectRatio: ratio })}>{ratio}</button>)}
            </div>
          </div>

          <div className="direction-list" aria-label="视觉方向">
            {creativeDirections.map((direction) => {
              const isSelected = draft.directionId === direction.id;
              return <button className={`direction-row ${isSelected ? 'is-selected' : ''}`} type="button" key={direction.id} aria-pressed={isSelected} disabled={isGenerating} onClick={() => updateDraft({ directionId: direction.id })}>
                <span>{String(creativeDirections.indexOf(direction) + 1).padStart(2, '0')}</span>
                <div><strong>{direction.name}</strong><small>{direction.purpose}</small></div>
              </button>;
            })}
          </div>

          <div className="studio-main-preview">
            {isReady && selectedProposal ? (
              <>
                <img src={selectedProposal.imageSrc} alt={`当前主预览：${selectedProposal.name}`} />
                <div className="preview-overlay"><span>{selectedProposal.name}</span><strong>{selectedProposal.sellingPoint}</strong></div>
              </>
            ) : (
              <div className="preview-placeholder"><ImagePlus size={28} aria-hidden="true" /><strong>等待卖点变成画面</strong><span>生成后在这里审阅主视觉方案</span></div>
            )}
          </div>
        </article>

        <article className="glass card studio-queue-card">
          <div className="card-heading compact-heading">
            <div><p className="eyebrow">03 · Generation queue</p><h2>交付前先审一遍</h2></div>
            {isReady ? <CheckCircle2 className="mint-icon" size={20} aria-hidden="true" /> : <span className="queue-pulse" aria-hidden="true" />}
          </div>
          <p className="studio-status" role="status">{statusText}</p>
          <div className="queue-summary">
            <span>当前用途</span><strong>{draft.channel === 'listing' ? 'Listing 图组' : 'A+ 叙事组'}</strong>
            <span>主尺寸</span><strong>{draft.aspectRatio}</strong>
            <span>已接模型</span><strong>否 · 本地演示</strong>
          </div>
          <div className="studio-rules">
            <p><CheckCircle2 size={15} aria-hidden="true" />一个提案只承担一个购买问题</p>
            <p><CheckCircle2 size={15} aria-hidden="true" />卖点优先于装饰性文案</p>
            <p><CircleAlert size={15} aria-hidden="true" />真实生成前仍需人工复核合规表达</p>
          </div>
        </article>
      </section>

      <section className="glass card studio-output stagger-item delay-2" aria-label="视觉提案输出">
        <div className="card-heading studio-output-heading">
          <div><p className="eyebrow">Proposals · local draft</p><h2>{isReady ? '四张图，一条完整的购买解释路径' : '生成后，这里会出现可编辑的视觉提案'}</h2></div>
          {isReady && <button className="quiet-button" type="button" onClick={copyPrompt}><Copy size={15} aria-hidden="true" />复制当前提示词</button>}
        </div>
        {copyMessage && <p className="copy-message" role="status">{copyMessage}</p>}
        <div className="proposal-grid">
          {isReady ? proposals.map((proposal, index) => {
            const isSelected = selectedProposal?.id === proposal.id;
            return <button className={`proposal-card ${isSelected ? 'is-selected' : ''}`} type="button" key={proposal.id} aria-label={`选择提案：${proposal.name}`} aria-pressed={isSelected} onClick={() => setSelectedProposalId(proposal.id)}>
              <img src={proposal.imageSrc} alt="" />
              <span className="proposal-index">0{index + 1}</span>
              <div><strong>{proposal.name}</strong><small>表达卖点：{proposal.sellingPoint}</small><p>{proposal.promptSummary}</p></div>
            </button>;
          }) : creativeDirections.map((direction, index) => (
            <div className="proposal-skeleton" key={direction.id} aria-hidden="true"><span>0{index + 1}</span><i /><b>等待编排</b></div>
          ))}
        </div>
      </section>
    </div>
  );
}
