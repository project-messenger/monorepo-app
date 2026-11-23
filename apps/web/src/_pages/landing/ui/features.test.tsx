import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Features } from "./features";

describe("Features", () => {
  it("shows the three numbered feature cards in order", () => {
    render(<Features />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Не ещё один чат\./,
      }),
    ).toBeInTheDocument();

    const cards = within(screen.getByRole("list")).getAllByRole("listitem");

    expect(cards).toHaveLength(3);
    expect(
      within(cards[0]).getByRole("heading", { level: 3 }),
    ).toHaveTextContent("01 / Обсуждайте");
    expect(
      within(cards[0]).getByText(
        "Каналы, ветки и личные сообщения. Важное не тонет в общем потоке.",
      ),
    ).toBeInTheDocument();
    expect(
      within(cards[1]).getByRole("heading", { level: 3 }),
    ).toHaveTextContent("02 / Доводите до результата");
    expect(
      within(cards[1]).getByText(
        "Превращайте сообщение в задачу. Следите за ней до merge.",
      ),
    ).toBeInTheDocument();
    expect(
      within(cards[2]).getByRole("heading", { level: 3 }),
    ).toHaveTextContent("03 / Оставайтесь в контексте");
    expect(
      within(cards[2]).getByText(
        "Стендапы, решения и ИИ-сводки с проверяемыми источниками.",
      ),
    ).toBeInTheDocument();
  });
});
