import { Progress } from './Progress';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { value: 50, max: 100 } };
export const Full: Story = { args: { value: 100, max: 100 } };
export const Indeterminate: Story = { args: { indeterminate: true } };
