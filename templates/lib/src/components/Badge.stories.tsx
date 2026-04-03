import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'success', 'warning', 'error', 'info'] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: 'Default' } };
export const Success: Story = { args: { children: '활성', variant: 'success' } };
export const Warning: Story = { args: { children: '주의', variant: 'warning' } };
export const Error: Story = { args: { children: '오류', variant: 'error' } };
export const Info: Story = { args: { children: '정보', variant: 'info' } };
