import type { Meta, StoryObj } from '@storybook/react';

import { Alert } from './Alert';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['info', 'success', 'warning', 'error'] },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: { children: '정보 메시지입니다.', variant: 'info' },
};

export const Success: Story = {
  args: { children: '작업이 완료되었습니다.', variant: 'success' },
};

export const Warning: Story = {
  args: { children: '이 작업은 되돌릴 수 없습니다.', variant: 'warning', title: '주의' },
};

export const Error: Story = {
  args: { children: '오류가 발생했습니다.', variant: 'error', title: '오류' },
};

export const Closable: Story = {
  args: { children: '닫기 버튼이 있는 Alert', variant: 'info', onClose: () => {} },
};
