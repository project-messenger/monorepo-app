import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "./button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

const meta = {
  title: "UI/Card",
  component: Card,
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Задача недели</CardTitle>
          <CardDescription>
            Собрать обратную связь от команды и обновить бэклог.
          </CardDescription>
          <CardAction>
            <Button variant="ghost" size="sm">
              Открыть
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p>Дедлайн — пятница, 18:00.</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm">
            Подробнее
          </Button>
        </CardFooter>
      </>
    ),
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Small: Story = { args: { size: "sm" } };
export const ContentOnly: Story = {
  args: {
    children: (
      <CardContent>
        <p>Карточка без заголовка и подвала.</p>
      </CardContent>
    ),
  },
};
