import type { Meta, StoryObj } from '@storybook/react';

import { Radio, RadioGroup } from './Radio';

const meta = {
  title: 'Components/Radio',
  component: RadioGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'fruit',
    defaultValue: 'apple',
    children: (
      <>
        <Radio value="apple" label="사과" />
        <Radio value="banana" label="바나나" />
        <Radio value="cherry" label="체리" />
      </>
    ),
  },
};

export const Vertical: Story = {
  args: {
    name: 'food',
    defaultValue: 'pizza',
    orientation: 'vertical',
    children: (
      <>
        <Radio value="pizza" label="피자" />
        <Radio value="burger" label="버거" />
      </>
    ),
  },
};
