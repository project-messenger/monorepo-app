import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Container } from "./container";
import { Typography } from "./typography";

const meta = {
  title: "UI/Container",
  component: Container,
  parameters: { layout: "fullscreen" },
  args: {
    children: (
      <Typography>
        Centered content with responsive horizontal padding.
      </Typography>
    ),
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const SectionLayout: Story = {
  render: () => (
    <section className="bg-surface-trust py-8">
      <Container>
        <Typography as="h2">
          Section owns its background and vertical spacing
        </Typography>
      </Container>
    </section>
  ),
};
