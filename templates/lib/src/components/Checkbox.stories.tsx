import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { label: '약관에 동의합니다' } };
export const Checked: Story = { args: { label: '체크됨', defaultChecked: true } };
export const Disabled: Story = { args: { label: '비활성', disabled: true } };
