import { Switch } from './Switch';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };
export const Checked: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };
