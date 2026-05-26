import { Select } from './Select';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg'] } },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { value: 'apple', label: '사과' },
  { value: 'banana', label: '바나나' },
  { value: 'cherry', label: '체리' },
];

export const Default: Story = { args: { label: '과일', options, placeholder: '선택하세요' } };
export const WithError: Story = { args: { label: '과일', options, error: '필수 항목입니다.' } };
export const Disabled: Story = { args: { label: '과일', options, disabled: true } };
