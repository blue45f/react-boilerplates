import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { Tabs } from './Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 'overview',
    children: (
      <>
        <Tabs.List>
          <Tabs.Trigger value="overview">개요</Tabs.Trigger>
          <Tabs.Trigger value="settings">설정</Tabs.Trigger>
          <Tabs.Trigger value="logs">로그</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="overview">개요 패널 내용입니다.</Tabs.Content>
        <Tabs.Content value="settings">설정 패널 내용입니다.</Tabs.Content>
        <Tabs.Content value="logs">로그 패널 내용입니다.</Tabs.Content>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('tab', { name: '설정' }));
    await expect(canvas.getByText('설정 패널 내용입니다.')).toBeInTheDocument();
  },
};
