import { Button } from './Button';
import { Tooltip } from './Tooltip';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { content: '도움말 내용', placement: 'top', children: <Button>호버해 보세요</Button> },
};

export const Placements: Story = {
  args: { content: '', children: null },
  render: () => (
    <div style={{ display: 'flex', gap: 24, padding: 64 }}>
      {(['top', 'bottom', 'left', 'right'] as const).map((p) => (
        <Tooltip key={p} content={p} placement={p}>
          <Button variant="outline">{p}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};
