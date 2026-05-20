import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';
import { ToastProvider, useToast } from './Toast';

const meta = {
  title: 'Components/Toast',
  component: ToastProvider,
  tags: ['autodocs'],
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

function Trigger() {
  const { toast } = useToast();
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Button onClick={() => toast({ title: '안내', description: '일반 알림' })}>info</Button>
      <Button
        variant="outline"
        onClick={() => toast({ title: '성공', description: '저장됨', variant: 'success' })}
      >
        success
      </Button>
      <Button
        variant="destructive"
        onClick={() => toast({ title: '오류', description: '실패함', variant: 'error' })}
      >
        error
      </Button>
    </div>
  );
}

export const Default: Story = {
  args: { children: null },
  render: () => (
    <ToastProvider>
      <Trigger />
    </ToastProvider>
  ),
};
