import { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  BarChart3,
  Boxes,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  ClipboardCheck,
  Copy,
  FilePenLine,
  ImagePlus,
  Landmark,
  LayoutDashboard,
  LoaderCircle,
  Megaphone,
  PackageSearch,
  PanelTop,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  WalletCards,
} from 'lucide-react';
import { actionDrafts, assets, brief, dataGaps, demoMeta, evidence, sellingPoints } from './data/demoResearch';
import CreativeStudio from './components/CreativeStudio';
import { objectives, validateResearchInput } from './lib/asin';
import { advanceDemoStep, createDemoSteps } from './lib/demoMachine';
import type { DemoStep, ResearchObjective } from './types';
import './App.css';

type ViewId = 'dashboard' | 'research' | 'listing' | 'ads' | 'creative' | 'profit';

const navigation = [
  { id: 'dashboard' as const, label: '今日控制台', icon: LayoutDashboard },
  { id: 'research' as const, label: '产品研究', icon: PackageSearch },
  { id: 'listing' as const, label: 'Listing', icon: FilePenLine },
  { id: 'ads' as const, label: '广告策略', icon: Megaphone },
  { id: 'creative' as const, label: '创意资产', icon: ImagePlus },
  { id: 'profit' as const, label: '利润护栏', icon: WalletCards },
];

const phaseItems = [
  ['产品规划', 'complete'],
  ['上架准备', 'complete'],
  ['启动推广', 'active'],
  ['日常优化', 'pending'],
] as const;

const todayTasks = [
  { id: 'profit', title: '复核利润护栏', note: '确认目标广告占比与保本线', view: 'profit' as ViewId, priority: 'P0' },
  { id: 'listing', title: '补齐尺寸与清洁图', note: '让购买前的两个疑问在图片里结束', view: 'creative' as ViewId, priority: 'P1' },
  { id: 'ads', title: '拆分启动关键词', note: '核心词、场景词、竞品词分层测试', view: 'ads' as ViewId, priority: 'P1' },
];

function EvidenceButton({
  id,
  active,
  onClick,
}: {
  id: string;
  active: boolean;
  onClick: (id: string) => void;
}) {
  return (
    <button
      className={`evidence-tag ${active ? 'is-active' : ''}`}
      type="button"
      aria-label={`查看证据 ${id}`}
      aria-pressed={active}
      onClick={() => onClick(id)}
    >
      <Search size={13} aria-hidden="true" />
      证据 {id}
    </button>
  );
}

function StatusIcon({ status }: { status: DemoStep['status'] }) {
  if (status === 'complete') return <CheckCircle2 size={17} aria-hidden="true" />;
  if (status === 'active') return <LoaderCircle className="spin" size={17} aria-hidden="true" />;
  return <PanelTop size={17} aria-hidden="true" />;
}

export default function App() {
  const [activeView, setActiveView] = useState<ViewId>('dashboard');
  const [asin, setAsin] = useState(demoMeta.asin);
  const [objective, setObjective] = useState<ResearchObjective>('competitor_analysis');
  const [formError, setFormError] = useState('');
  const [steps, setSteps] = useState<DemoStep[]>(createDemoSteps);
  const [isRunning, setIsRunning] = useState(false);
  const [statusMessage, setStatusMessage] = useState('等待开始本地演示分析');
  const [activeEvidence, setActiveEvidence] = useState<string | null>(null);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [copyMessage, setCopyMessage] = useState('');
  const profileHeadingRef = useRef<HTMLHeadingElement>(null);
  const inputValidation = validateResearchInput(asin, objective);
  const visibleFormError = inputValidation.ok ? formError : inputValidation.message;
  const canStartDemo = inputValidation.ok && !isRunning;

  useEffect(() => {
    if (!isRunning) return;

    const activeStep = steps.find((step) => step.status === 'active');
    if (!activeStep) {
      setIsRunning(false);
      setStatusMessage('研究包已就绪：所有内容均为内置演示数据');
      profileHeadingRef.current?.focus();
      return;
    }

    setStatusMessage(`演示进度：${activeStep.label}`);
    const timer = window.setTimeout(() => {
      setSteps((current) => advanceDemoStep(current, activeStep.id));
    }, 480);

    return () => window.clearTimeout(timer);
  }, [isRunning, steps]);

  function changeView(nextView: ViewId) {
    setActiveView(nextView);
    setCopyMessage('');
  }

  function startDemo() {
    if (!inputValidation.ok) {
      setFormError(inputValidation.message);
      setStatusMessage(inputValidation.message);
      return;
    }

    setAsin(inputValidation.asin);
    setFormError('');
    setSteps(createDemoSteps());
    setActiveView('research');
    setIsRunning(true);
  }

  function resetDemo() {
    setIsRunning(false);
    setAsin(demoMeta.asin);
    setObjective('competitor_analysis');
    setFormError('');
    setSteps(createDemoSteps());
    setStatusMessage('演示内容已重置；可重新启动');
    setActiveEvidence(null);
    setCompletedTasks([]);
    setCopyMessage('');
  }

  function toggleTask(taskId: string) {
    setCompletedTasks((current) =>
      current.includes(taskId) ? current.filter((id) => id !== taskId) : [...current, taskId],
    );
  }

  async function copyDraft(text: string) {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(text);
      setCopyMessage('已复制草稿');
    } catch {
      setCopyMessage('浏览器未允许自动复制，请手动复制内容');
    }
  }

  function renderDashboard() {
    const doneCount = completedTasks.length;

    return (
      <div className="view-content dashboard-view">
        <section className="glass hero-panel stagger-item">
          <div className="hero-copy">
            <p className="eyebrow"><Sparkles size={14} aria-hidden="true" /> Launch control · US</p>
            <h1>今日运营控制台</h1>
            <p className="hero-text">不是把报表摊一桌子，而是先把新品下一步推清楚。</p>
            <div className="hero-actions">
              <button className="primary-button" type="button" onClick={() => changeView('research')}>
                <Search size={17} aria-hidden="true" />
                进入产品研究
              </button>
              <button className="quiet-button" type="button" onClick={() => changeView('ads')}>
                查看启动广告
                <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="launch-orb" aria-label="新品推进度 72%">
            <div className="orb-inner">
              <span className="metric-number">72%</span>
              <span>推进完成度</span>
            </div>
          </div>
        </section>

        <section className="dashboard-grid stagger-item delay-1" aria-label="新品推进与今日优先级">
          <article className="glass card phase-card">
            <div className="card-heading">
              <div>
                <p className="eyebrow">Launch path</p>
                <h2>新品推进路径</h2>
              </div>
              <span className="status-chip is-warm">Launch · D-12</span>
            </div>
            <ol className="phase-rail">
              {phaseItems.map(([label, state], index) => (
                <li key={label} className={`phase-step ${state}`}>
                  <span className="phase-index">0{index + 1}</span>
                  <div>
                    <strong>{label}</strong>
                    <small>{state === 'complete' ? '已具备基础材料' : state === 'active' ? '当前推进中' : '等待启动条件'}</small>
                  </div>
                </li>
              ))}
            </ol>
          </article>

          <article className="glass card task-card">
            <div className="card-heading">
              <div>
                <p className="eyebrow">Today first</p>
                <h2>今天只做三件事</h2>
              </div>
              <span className="task-count">{doneCount}/3 已处理</span>
            </div>
            <div className="task-list">
              {todayTasks.map((task) => {
                const isDone = completedTasks.includes(task.id);
                return (
                  <div className={`task-row ${isDone ? 'is-done' : ''}`} key={task.id}>
                    <button
                      type="button"
                      className="task-toggle"
                      aria-label={`完成任务：${task.title}`}
                      aria-pressed={isDone}
                      onClick={() => toggleTask(task.id)}
                    >
                      {isDone ? <Check size={16} aria-hidden="true" /> : <span aria-hidden="true" />}
                    </button>
                    <button className="task-copy" type="button" onClick={() => changeView(task.view)}>
                      <span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span>
                      <strong>{task.title}</strong>
                      <small>{task.note}</small>
                    </button>
                    <ChevronRight size={17} aria-hidden="true" />
                  </div>
                );
              })}
            </div>
          </article>
        </section>

        <section className="dashboard-grid stagger-item delay-2" aria-label="运营风险与今日判断">
          <article className="glass card signal-card">
            <div className="card-heading">
              <div>
                <p className="eyebrow">Decision guardrail</p>
                <h2>启动前的三道护栏</h2>
              </div>
              <ShieldCheck className="mint-icon" size={20} aria-hidden="true" />
            </div>
            <div className="guardrail-list">
              <div><span className="guard-dot mint" />Listing 有清晰的容量与清洁解释 <b>已具备</b></div>
              <div><span className="guard-dot amber" />广告预算与关键词层级已拆分 <b>待确认</b></div>
              <div><span className="guard-dot coral" />真实低分评论痛点已验证 <b>真实数据版</b></div>
            </div>
          </article>
          <article className="glass card decision-card">
            <p className="eyebrow">Next decision</p>
            <h2>先开核心精确词，还是先补创意？</h2>
            <p>当前演示判断：先补尺寸/清洁图，再开 P0 精确词。这样广告带来的第一批流量，才不会白白撞在解释缺口上。</p>
            <button className="link-button" type="button" onClick={() => changeView('creative')}>
              看创意缺口 <ArrowUpRight size={15} aria-hidden="true" />
            </button>
          </article>
        </section>
      </div>
    );
  }

  function renderResearch() {
    return (
      <div className="view-content research-view">
        <section className="research-heading stagger-item">
          <div>
            <p className="eyebrow"><PackageSearch size={14} aria-hidden="true" /> Product research</p>
            <h1>产品研究：从证据到行动</h1>
            <p>输入任意合法 ASIN 会启动本地演示；页面始终使用固定样例，不会访问 Amazon。</p>
          </div>
          <span className="status-chip">内置演示数据</span>
        </section>

        <section className="research-layout stagger-item delay-1">
          <article className="glass card research-form-card">
            <div className="card-heading compact-heading">
              <div><p className="eyebrow">New analysis</p><h2>开始一轮研究</h2></div>
              <Boxes size={20} aria-hidden="true" />
            </div>
            <form onSubmit={(event) => { event.preventDefault(); startDemo(); }} noValidate>
              <label htmlFor="asin">ASIN</label>
              <input
                id="asin"
                value={asin}
                onChange={(event) => { setAsin(event.target.value); setFormError(''); }}
                aria-invalid={Boolean(visibleFormError)}
                aria-describedby={visibleFormError ? 'asin-error' : undefined}
                placeholder="B0XXXXXXXX"
              />
              <label htmlFor="objective">研究目标</label>
              <select id="objective" value={objective} onChange={(event) => { setObjective(event.target.value as ResearchObjective); setFormError(''); }}>
                {objectives.map((item) => <option value={item.value} key={item.value}>{item.label}</option>)}
              </select>
              {visibleFormError && <p id="asin-error" className="form-error" role="alert"><CircleAlert size={15} aria-hidden="true" />{visibleFormError}</p>}
              <button className="primary-button full-button" type="submit" disabled={!canStartDemo}>
                {isRunning ? <LoaderCircle className="spin" size={17} aria-hidden="true" /> : <Sparkles size={17} aria-hidden="true" />}
                {isRunning ? '正在准备演示档案' : '启动演示分析'}
              </button>
            </form>
            <p className="mini-note">仅在本地浏览器运行 · 不接 MCP / Amazon / LLM</p>
          </article>

          <article className="glass card profile-card">
            <div className="profile-topline">
              <span className="source-label">内置演示数据 · {demoMeta.refreshedAt}</span>
              <EvidenceButton id="E-001" active={activeEvidence === 'E-001'} onClick={setActiveEvidence} />
            </div>
            <h2 tabIndex={-1} ref={profileHeadingRef}>{demoMeta.title}</h2>
            <p className="muted-copy">{demoMeta.brand} · {demoMeta.category}</p>
            <div className="profile-metrics">
              <div><span>价格</span><strong>{demoMeta.price}</strong></div>
              <div><span>评分</span><strong>{demoMeta.rating} <small>/ 5</small></strong></div>
              <div><span>评论</span><strong>{demoMeta.reviews}</strong></div>
              <div><span>图片资产</span><strong>{assets.length} <small>张</small></strong></div>
            </div>
            <div className="selling-points">
              {sellingPoints.map((point, index) => <p key={point}><span>{String(index + 1).padStart(2, '0')}</span>{point}</p>)}
            </div>
            <aside className="data-gap-note" aria-label="演示数据缺口">
              <span>演示数据未提供</span>
              <div>
                {dataGaps.map((gap) => <p key={gap.label}><strong>{gap.label}</strong>{gap.detail}</p>)}
              </div>
            </aside>
          </article>
        </section>

        <section className="research-lower stagger-item delay-2">
          <article className="glass card timeline-card">
            <div className="card-heading"><div><p className="eyebrow">Demo progress</p><h2>研究进度</h2></div><span className="status-chip">演示进度</span></div>
            <p className="sr-only" aria-live="polite">{statusMessage}</p>
            <ol className="demo-timeline">
              {steps.map((step) => (
                <li className={`timeline-step ${step.status}`} key={step.id}>
                  <span className="timeline-icon"><StatusIcon status={step.status} /></span>
                  <div><strong>{step.label}</strong><small>{step.description}</small></div>
                </li>
              ))}
            </ol>
          </article>
          <article className="glass card evidence-card" data-evidence-id={activeEvidence ?? undefined}>
            <div className="card-heading"><div><p className="eyebrow">Traceable note</p><h2>当前证据</h2></div><ClipboardCheck size={20} aria-hidden="true" /></div>
            {activeEvidence ? (
              <div className="evidence-detail">
                <span className="status-chip is-mint">{activeEvidence}</span>
                <h3>{evidence.find((item) => item.id === activeEvidence)?.label}</h3>
                <p>{evidence.find((item) => item.id === activeEvidence)?.detail}</p>
              </div>
            ) : <p className="empty-note">点产品档案、图片或 Brief 旁的证据标签，就能追溯当前判断来自哪里。</p>}
          </article>
        </section>

        <section className="glass card asset-card stagger-item delay-3">
          <div className="card-heading"><div><p className="eyebrow">Creative evidence</p><h2>产品资产与解释缺口</h2></div><button className="quiet-button" type="button" onClick={() => changeView('creative')}>进入创意资产 <ArrowUpRight size={15} aria-hidden="true" /></button></div>
          <div className="asset-rail">
            {assets.map((asset) => (
              <article className={`asset-tile ${activeEvidence === asset.evidenceId ? 'is-highlighted' : ''}`} key={asset.id}>
                <img src={asset.src} alt={`内置演示素材：${asset.label}`} />
                <div><strong>{asset.label}</strong><small>{asset.description}</small><EvidenceButton id={asset.evidenceId} active={activeEvidence === asset.evidenceId} onClick={setActiveEvidence} /></div>
              </article>
            ))}
          </div>
        </section>

        <section className="research-lower stagger-item delay-4">
          <article className="glass card brief-card">
            <div className="card-heading"><div><p className="eyebrow">Operator brief</p><h2>把发现翻成决定</h2></div><TrendingUp size={20} aria-hidden="true" /></div>
            <div className="brief-list">
              {brief.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.body}</p><EvidenceButton id={item.evidenceId} active={activeEvidence === item.evidenceId} onClick={setActiveEvidence} /></article>)}
            </div>
          </article>
          <article className="glass card action-card">
            <div className="card-heading"><div><p className="eyebrow">Action pack</p><h2>下一步行动草稿</h2></div><span className="status-chip">draft</span></div>
            <div className="action-list">
              {actionDrafts.map((draft) => <article key={draft.title}><div><h3>{draft.title}</h3><p>{draft.description}</p><EvidenceButton id={draft.evidenceId} active={activeEvidence === draft.evidenceId} onClick={setActiveEvidence} /></div><button type="button" className="icon-button" aria-label={`复制${draft.title}草稿`} onClick={() => copyDraft(draft.copyText)}><Copy size={16} aria-hidden="true" /></button></article>)}
            </div>
            {copyMessage && <p className="copy-message" role="status">{copyMessage}</p>}
          </article>
        </section>
      </div>
    );
  }

  function renderListing() {
    return (
      <div className="view-content module-view">
        <section className="glass module-hero stagger-item">
          <p className="eyebrow"><FilePenLine size={14} aria-hidden="true" /> Listing readiness</p>
          <h1>先把 Listing 的承接能力补齐</h1>
          <p>广告负责带人进门，Listing 负责把问题回答完。当前建议先用“家庭电影夜”的场景，把容量、健康和操作感连成一条线。</p>
          <EvidenceButton id="E-002" active={activeEvidence === 'E-002'} onClick={setActiveEvidence} />
        </section>
        <section className="module-grid stagger-item delay-1">
          <article className="glass card title-draft"><p className="eyebrow">Title direction</p><h2>一句话先回答：谁在什么场景下买它？</h2><p className="draft-copy">Hot Air Popper for Family Movie Nights · 4.5QT Oil-Free Snacks with One-Touch Operation</p><button className="quiet-button" type="button" onClick={() => copyDraft(actionDrafts[0].copyText)}><Copy size={15} aria-hidden="true" />复制标题方向</button></article>
          <article className="glass card story-card"><p className="eyebrow">Five-bullet spine</p><h2>五点不是五次复读</h2><ol><li>电影夜的家庭容量</li><li>零油热风的轻负担</li><li>一键操作的低门槛</li><li>台面尺寸与收纳预期</li><li>清洁步骤的确定感</li></ol></article>
        </section>
        <section className="glass card keyword-card stagger-item delay-2"><div className="card-heading"><div><p className="eyebrow">Keyword map</p><h2>关键词按购买意图分层</h2></div><span className="status-chip">demo only</span></div><div className="keyword-groups"><div><span>核心类目</span><b>popcorn maker · hot air popper</b></div><div><span>场景意图</span><b>movie night snacks · family snacks</b></div><div><span>功能诉求</span><b>oil free popcorn · easy clean</b></div></div></section>
      </div>
    );
  }

  function renderAds() {
    const campaigns = [
      ['P0 · Exact', '35%', 'hot air popper / popcorn maker', '详情页解释已到位'],
      ['P1 · Phrase', '20%', 'oil free snacks / family snacks', '用搜索词收敛意图'],
      ['P2 · Product', '15%', '同价位功能型 ASIN', '只在创意完成后测试'],
      ['Creative scale', '15%', 'movie night / one touch', '视频或场景图就绪'],
    ];
    return (
      <div className="view-content module-view">
        <section className="glass module-hero stagger-item">
          <p className="eyebrow"><Megaphone size={14} aria-hidden="true" /> Launch ads</p>
          <h1>启动广告前，先确认这三件事</h1>
          <p>承接页是否说清、关键词是否分层、预算是否有上限。先确认它们，再让流量进场。</p>
          <EvidenceButton id="E-006" active={activeEvidence === 'E-006'} onClick={setActiveEvidence} />
        </section>
        <section className="module-grid stagger-item delay-1">
          <article className="glass card checklist-card"><p className="eyebrow">Launch conditions</p><h2>三项启动条件</h2><div className="checklist"><p><CheckCircle2 size={17} />详情页已有容量/清洁解释</p><p><CheckCircle2 size={17} />核心词和场景词已拆组</p><p><CircleAlert size={17} />真实 ACoS 目标需接数据后校准</p></div></article>
          <article className="glass card budget-card"><p className="eyebrow">Budget guard</p><h2>先用有限预算学，不用大预算猜</h2><div className="budget-number">$48 <span>/ day</span></div><p>演示预算仅用于说明分配逻辑，不会创建任何 Amazon Campaign。</p><div className="budget-rail"><i style={{ width: '35%' }} /><i style={{ width: '20%' }} /><i style={{ width: '15%' }} /><i style={{ width: '15%' }} /></div></article>
        </section>
        <section className="glass card campaign-card stagger-item delay-2"><div className="card-heading"><div><p className="eyebrow">Campaign architecture</p><h2>启动结构草稿</h2></div><span className="status-chip">draft</span></div><div className="campaign-table" role="table" aria-label="广告结构草稿"><div className="campaign-head" role="row"><span>层级</span><span>预算</span><span>目标</span><span>启动条件</span></div>{campaigns.map(([tier, budget, target, condition]) => <div className="campaign-row" role="row" key={tier}><strong>{tier}</strong><b>{budget}</b><span>{target}</span><span>{condition}</span></div>)}</div></section>
      </div>
    );
  }

  function renderCreative() {
    return <CreativeStudio />;
  }

  function renderProfit() {
    return (
      <div className="view-content module-view">
        <section className="glass module-hero stagger-item"><p className="eyebrow"><WalletCards size={14} aria-hidden="true" /> Profit guardrail</p><h1>广告烧得动，才叫推广</h1><p>不是先问“能跑多少预算”，而是先问“在什么成本和转化条件下，还能留下利润”。</p><EvidenceButton id="E-007" active={activeEvidence === 'E-007'} onClick={setActiveEvidence} /></section>
        <section className="profit-grid stagger-item delay-1"><article className="glass card profit-summary"><p className="eyebrow">Demo unit economics</p><div className="profit-metrics"><div><span>售价</span><strong>$49.99</strong></div><div><span>广告容忍度</span><strong>18%</strong></div><div><span>目标净利</span><strong>14%</strong></div></div><p>这些数字是本地演示假设；真实版本必须来自成本、FBA 费用和广告数据。</p></article><article className="glass card waterfall-card"><p className="eyebrow">Guardrail waterfall</p><h2>每卖出一件，钱要先过这四道门</h2><div className="waterfall"><div><span>售价</span><b>$49.99</b></div><div><span>货品与头程</span><b>− $15.60</b></div><div><span>履约与平台</span><b>− $13.40</b></div><div><span>广告护栏</span><b>− $9.00</b></div><div className="waterfall-total"><span>目标净利</span><b>$7.00</b></div></div></article></section>
        <section className="glass card decision-card stagger-item delay-2"><p className="eyebrow">Operating rule</p><h2>如果广告实际占比连续高于 18%，先检查承接与词路，不是先加预算。</h2><p>这个规则会在真实数据版变成可配置阈值；现在它只是一个不让演示站突然变成烧钱模拟器的护栏。</p></section>
      </div>
    );
  }

  function renderView() {
    if (activeView === 'research') return renderResearch();
    if (activeView === 'listing') return renderListing();
    if (activeView === 'ads') return renderAds();
    if (activeView === 'creative') return renderCreative();
    if (activeView === 'profit') return renderProfit();
    return renderDashboard();
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-lockup"><div className="brand-mark"><Boxes size={19} aria-hidden="true" /></div><div><strong>Northstar</strong><span>Amazon operations</span></div></div>
        <div className="sidebar-product"><span>当前产品</span><strong>Popmori Air Popper</strong><small>{demoMeta.asin} · US</small></div>
        <nav aria-label="运营模块">
          <p className="nav-label">OPERATE</p>
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return <button key={item.id} className={`nav-item ${isActive ? 'is-active' : ''}`} type="button" aria-label={item.label} aria-current={isActive ? 'page' : undefined} onClick={() => changeView(item.id)}><Icon size={18} aria-hidden="true" /><span>{item.label}</span>{item.id === 'ads' && <i aria-hidden="true">3</i>}</button>;
          })}
        </nav>
        <div className="sidebar-foot"><span className="pulse-dot" />本地演示模式<p>没有 MCP、没有账号连接、没有暗门。</p></div>
      </aside>
      <main className="main-panel">
        <header className="topbar"><div><p className="crumb">US / {navigation.find((item) => item.id === activeView)?.label}</p><strong>Popmori · 4.5QT Hot Air Popper</strong></div><div className="topbar-actions"><span className="demo-badge"><span />内置演示数据</span><button className="icon-button" type="button" aria-label="刷新演示内容" onClick={resetDemo}><TrendingUp size={16} aria-hidden="true" /></button></div></header>
        <div className="main-scroll" key={activeView}>{renderView()}</div>
        <footer className="app-footer"><span>Northstar local prototype · 不读取、不写入、不上传任何 Amazon 数据</span><button type="button" disabled title="真实数据版开放" aria-describedby="export-note"><Landmark size={15} aria-hidden="true" />导出研究</button><span id="export-note" className="sr-only">真实数据版开放</span></footer>
      </main>
    </div>
  );
}
