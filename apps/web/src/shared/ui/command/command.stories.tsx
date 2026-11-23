import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./command";

const meta = {
  title: "UI/Command",
  component: Command,
  render: (args) => (
    <Command {...args} className="w-96 border border-border">
      <CommandInput placeholder="Поиск команды..." />
      <CommandList>
        <CommandEmpty>Ничего не найдено</CommandEmpty>
        <CommandGroup heading="Действия">
          <CommandItem>
            Создать задачу
            <CommandShortcut>⌘ N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Открыть чат
            <CommandShortcut>⌘ K</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Настройки">
          <CommandItem>Профиль</CommandItem>
          <CommandItem>Уведомления</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
} satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const InDialog: Story = {
  render: () => (
    <CommandDialog defaultOpen>
      <Command>
        <CommandInput placeholder="Поиск команды..." />
        <CommandList>
          <CommandEmpty>Ничего не найдено</CommandEmpty>
          <CommandGroup heading="Действия">
            <CommandItem>Создать задачу</CommandItem>
            <CommandItem>Открыть чат</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  ),
};
