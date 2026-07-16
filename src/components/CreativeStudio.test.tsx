import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import CreativeStudio from './CreativeStudio';

test('collects product selling points before preparing visual proposals', async () => {
  const user = userEvent.setup();
  render(<CreativeStudio />);

  expect(screen.getByRole('heading', { name: '卖点驱动图片创作台' })).toBeInTheDocument();
  expect(screen.getByLabelText('产品名称')).toBeInTheDocument();
  expect(screen.getByLabelText('产品卖点')).toBeInTheDocument();

  await user.clear(screen.getByLabelText('产品名称'));
  expect(screen.getByRole('alert')).toHaveTextContent('请先填写产品名称');
  expect(screen.getByRole('button', { name: '生成 4 个视觉提案' })).toBeDisabled();
});

test('moves from local generation status to four editable proposals', async () => {
  const user = userEvent.setup();
  render(<CreativeStudio />);

  await user.click(screen.getByRole('button', { name: '生成 4 个视觉提案' }));
  expect(screen.getByRole('status')).toHaveTextContent('正在编排视觉方案');

  expect(await screen.findByText('4 个视觉提案已就绪 · 可点选继续完善')).toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: /选择提案：/ })).toHaveLength(4);

  await user.click(screen.getByRole('button', { name: '选择提案：夏夜场景图' }));
  expect(screen.getByRole('button', { name: '选择提案：夏夜场景图' })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByAltText('当前主预览：夏夜场景图')).toBeInTheDocument();
});
