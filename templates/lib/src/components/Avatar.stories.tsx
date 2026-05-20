import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from './Avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] } },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  args: { src: 'https://i.pravatar.cc/100', alt: '프로필', name: 'Jane Doe' },
};
export const Initials: Story = { args: { name: '홍 길동' } };
export const Fallback: Story = { args: {} };
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Avatar size="sm" name="Sm" />
      <Avatar size="md" name="Md" />
      <Avatar size="lg" name="Lg" />
      <Avatar size="xl" name="Xl" />
    </div>
  ),
};
