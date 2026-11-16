import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "./button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";

const meta = {
  title: "UI/Sheet",
  component: Sheet,
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger render={<Button variant="outline" />}>
        Открыть панель
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Настройки проекта</SheetTitle>
          <SheetDescription>
            Изменения сохраняются автоматически.
          </SheetDescription>
        </SheetHeader>
        <div className="px-4 text-body">Содержимое панели.</div>
        <SheetFooter>
          <Button variant="outline">Отмена</Button>
          <Button>Сохранить</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Right: Story = {};
export const Open: Story = { args: { defaultOpen: true } };
export const Left: Story = {
  render: () => (
    <Sheet defaultOpen>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Меню</SheetTitle>
          <SheetDescription>Навигация по проекту.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};
export const Bottom: Story = {
  render: () => (
    <Sheet defaultOpen>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Быстрые действия</SheetTitle>
          <SheetDescription>
            Создать задачу или пригласить коллегу.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};
