import { Divider } from './Divider';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };
export const WithLabel: Story = { args: { label: 'OR' } };
export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', height: 40 }}>
      <span>왼쪽</span>
      <Divider orientation="vertical" />
      <span>오른쪽</span>
    </div>
  ),
};
