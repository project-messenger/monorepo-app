import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { AuthStory } from "./auth-story";
import { authStoryContent } from "../config/content";

const meta = {
  title: "Widgets/AuthStory",
  component: AuthStory,
  args: { content: authStoryContent },
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="grid min-h-svh lg:grid-cols-2">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AuthStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
