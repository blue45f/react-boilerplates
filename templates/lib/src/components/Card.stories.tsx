import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';
import { Card, CardBody, CardFooter, CardHeader } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <strong>카드 제목</strong>
        </CardHeader>
        <CardBody>본문 영역입니다.</CardBody>
        <CardFooter>
          <Button size="sm">확인</Button>
        </CardFooter>
      </>
    ),
  },
};

export const Interactive: Story = {
  args: {
    interactive: true,
    onClick: () => alert('카드 클릭'),
    children: (
      <>
        <CardHeader>
          <strong>클릭 가능한 카드</strong>
        </CardHeader>
        <CardBody>호버/포커스 시 하이라이트됩니다.</CardBody>
      </>
    ),
  },
};

export const BodyOnly: Story = {
  args: {
    children: <CardBody>최소 구성: Body만</CardBody>,
  },
};
