import { useEffect } from "react";
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

// Показывает все четыре типа сразу — для сверки цветов success/error/warning/info.
function ToastsOnMount() {
  useEffect(() => {
    toast.success("Задача создана");
    toast.error("Не удалось сохранить");
    toast.warning("Дедлайн близко");
    toast.info("Обновление доступно");
  }, []);

  return null;
}

export const AllTypes: Story = {
  render: (args) => (
    <>
      <Toaster {...args} visibleToasts={4} expand />
      <ToastsOnMount />
    </>
  ),
};
