import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { AuthStory } from "./auth-story";

const meta = {
  title: "Widgets/AuthStory",
  component: AuthStory,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="max-w-[35.5rem]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AuthStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
