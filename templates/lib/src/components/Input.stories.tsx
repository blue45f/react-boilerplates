import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: '입력하세요' },
};

export const WithLabel: Story = {
  args: { label: '이메일', type: 'email', placeholder: 'example@mail.com' },
};

export const WithError: Story = {
  args: { label: '비밀번호', type: 'password', error: '8자 이상 입력하세요' },
};

export const WithHelperText: Story = {
  args: { label: '닉네임', helperText: '2~20자 이내' },
};

export const Disabled: Story = {
  args: { label: '비활성', disabled: true, value: '수정 불가' },
};
