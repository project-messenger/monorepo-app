import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

function VerticalTabs() {
  return (
    <Tabs orientation="vertical" defaultValue="chats">
      <TabsList>
        <TabsTrigger value="chats">Чаты</TabsTrigger>
        <TabsTrigger value="tasks">Задачи</TabsTrigger>
      </TabsList>
      <TabsContent value="chats">Список чатов</TabsContent>
      <TabsContent value="tasks">Список задач</TabsContent>
    </Tabs>
  );
}

describe("Tabs", () => {
  it("passes orientation to Base UI", () => {
    render(<VerticalTabs />);

    expect(screen.getByRole("tablist")).toHaveAttribute(
      "aria-orientation",
      "vertical",
    );
  });

  it("in vertical mode, switch with the down arrow", async () => {
    render(<VerticalTabs />);

    await userEvent.click(screen.getByRole("tab", { name: "Чаты" }));
    await userEvent.keyboard("{ArrowDown}");

    expect(screen.getByRole("tab", { name: "Задачи" })).toHaveFocus();
  });
});
