import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import App from './App';

test('shows an operations control room rather than a generic dashboard', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: '今日运营控制台' })).toBeInTheDocument();
  expect(screen.getAllByText('内置演示数据').length).toBeGreaterThan(0);
  expect(screen.getByText('Launch · D-12')).toBeInTheDocument();
});

test('switches to the ad strategy view without a page reload', async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole('button', { name: '广告策略' }));

  expect(screen.getByRole('heading', { name: '启动广告前，先确认这三件事' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: '广告策略' })).toHaveAttribute('aria-current', 'page');
});

test('opens the selling-point-driven creative studio instead of a static image gallery', async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole('button', { name: '创意资产' }));

  expect(screen.getByRole('heading', { name: '卖点驱动图片创作台' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: '生成 4 个视觉提案' })).toBeEnabled();
  expect(screen.getByText('不上传卖点 · 不填写 Key · 不调用模型')).toBeInTheDocument();
});

test('keeps an invalid ASIN visible as a recoverable error and prevents submission', async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole('button', { name: '产品研究' }));
  await user.clear(screen.getByLabelText('ASIN'));
  await user.type(screen.getByLabelText('ASIN'), 'B123');

  expect(screen.getByRole('alert')).toHaveTextContent('请输入 10 位 ASIN，例如 B0XXXXXXXX');
  expect(screen.getByRole('button', { name: '启动演示分析' })).toBeDisabled();
});

test('starts the local demo for a valid normalized ASIN', async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole('button', { name: '产品研究' }));
  await user.clear(screen.getByLabelText('ASIN'));
  await user.type(screen.getByLabelText('ASIN'), 'b0cx8n7p4q');
  await user.click(screen.getByRole('button', { name: '启动演示分析' }));

  expect(screen.getByRole('button', { name: '正在准备演示档案' })).toBeDisabled();
  expect(screen.getByText('演示进度：确认研究目标')).toBeInTheDocument();
});

test('marks a selected evidence reference as pressed', async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole('button', { name: '产品研究' }));
  const evidenceButtons = screen.getAllByRole('button', { name: '查看证据 E-003' });
  await user.click(evidenceButtons[0]);

  expect(evidenceButtons[0]).toHaveAttribute('aria-pressed', 'true');
});

test('names unavailable demo data instead of implying that it was collected', async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole('button', { name: '产品研究' }));

  expect(screen.getByText('演示数据未提供')).toBeInTheDocument();
  expect(screen.getByText('真实低分评论主题')).toBeInTheDocument();
  expect(screen.getByText('实际搜索词与广告表现')).toBeInTheDocument();
});

test('lets an operator complete a local today task', async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole('button', { name: '完成任务：复核利润护栏' }));

  expect(screen.getByRole('button', { name: '完成任务：复核利润护栏' })).toHaveAttribute('aria-pressed', 'true');
});

test('resets local task progress when the operator refreshes the demo', async () => {
  const user = userEvent.setup();
  render(<App />);

  const task = screen.getByRole('button', { name: '完成任务：复核利润护栏' });
  await user.click(task);
  await user.click(screen.getByRole('button', { name: '刷新演示内容' }));

  expect(task).toHaveAttribute('aria-pressed', 'false');
  expect(screen.getByText('0/3 已处理')).toBeInTheDocument();
});
