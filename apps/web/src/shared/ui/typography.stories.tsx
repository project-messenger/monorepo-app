import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Typography } from "./typography";

const meta = {
  title: "UI/Typography",
  component: Typography,
  argTypes: {
    as: {
      control: "select",
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "p",
        "span",
        "div",
        "label",
      ],
    },
    variant: {
      control: "select",
      options: [
        "display-hero",
        "display-auth",
        "display-cta",
        "heading-landing",
        "subtitle-landing",
        "body-landing",
        "heading-auth",
        "heading-page",
        "heading-section",
        "heading-panel",
        "heading-subsection",
        "label-button",
        "label-field",
        "body",
        "body-small",
        "caption",
        "caption-small",
      ],
    },
  },
  args: {
    as: "p",
    children: "Команда работает над задачами в одном месте.",
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Paragraph: Story = {};
export const LandingRoles: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Typography as="h2" variant="display-cta">
        Landing call to action
      </Typography>
      <Typography as="h2" variant="heading-landing">
        Landing section
      </Typography>
      <Typography variant="subtitle-landing">Supporting subtitle</Typography>
      <Typography variant="body-landing">Section description</Typography>
    </div>
  ),
};

export const Heading: Story = {
  args: { as: "h1", children: "Заголовок страницы" },
};

export const HeadingLevels: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Typography as="h1">Заголовок h1</Typography>
      <Typography as="h2">Заголовок h2</Typography>
      <Typography as="h3">Заголовок h3</Typography>
      <Typography as="h4">Заголовок h4</Typography>
      <Typography as="h5">Заголовок h5</Typography>
      <Typography as="h6">Заголовок h6</Typography>
    </div>
  ),
};

export const VariantOverride: Story = {
  args: { as: "h2", variant: "body", children: "Заголовок в роли body" },
};

export const Inline: Story = {
  render: () => (
    <Typography>
      Задача{" "}
      <Typography
        as="span"
        variant="caption-small"
        className="text-muted-foreground"
      >
        KAN-17
      </Typography>{" "}
      ждёт ревью.
    </Typography>
  ),
};
