import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  MetricCard,
  MetricCardBody,
  MetricCardContext,
  MetricCardLabel,
  MetricCardValue,
} from "./metric-card";

const meta = {
  title: "UI/MetricCard",
  component: MetricCard,
  argTypes: {
    variant: { control: "select", options: ["accent", "surface"] },
  },
  args: {
    className: "w-[364px]",
    children: (
      <>
        <MetricCardValue>12</MetricCardValue>
        <MetricCardBody>
          <MetricCardLabel>Задач в работе</MetricCardLabel>
          <MetricCardContext>+3 за неделю</MetricCardContext>
        </MetricCardBody>
      </>
    ),
  },
} satisfies Meta<typeof MetricCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Surface: Story = { args: { variant: "surface" } };
export const Accent: Story = { args: { variant: "accent" } };
