import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Tag } from './Tag';

const meta = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: 'React' } };
export const Removable: Story = {
  args: { children: 'React' },
  render: function Removable() {
    const [tags, setTags] = useState(['React', 'TypeScript', 'Vite']);
    return (
      <div style={{ display: 'flex', gap: 6 }}>
        {tags.map((t) => (
          <Tag key={t} onRemove={() => setTags((prev) => prev.filter((p) => p !== t))}>
            {t}
          </Tag>
        ))}
      </div>
    );
  },
};
