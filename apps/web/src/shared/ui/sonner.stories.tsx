import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { toast } from "sonner";

import { Button } from "./button";
import { Toaster } from "./sonner";

const meta = {
  title: "UI/Sonner",
  component: Toaster,
  render: (args) => (
    <div className="flex flex-col items-start gap-2">
      <Toaster {...args} />
      <Button onClick={() => toast.success("Задача создана")}>Success</Button>
      <Button onClick={() => toast.error("Не удалось сохранить")}>Error</Button>
      <Button onClick={() => toast.warning("Дедлайн близко")}>Warning</Button>
      <Button onClick={() => toast.info("Обновление доступно")}>Info</Button>
    </div>
  ),
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const TopCenter: Story = { args: { position: "top-center" } };
