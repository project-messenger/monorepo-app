import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Steps } from "./steps";

describe("Steps", () => {
  it("shows the three onboarding steps in order", () => {
    render(<Steps />);

    const section = screen.getByRole("region", {
      name: "Три шага — и вы в одном ритме",
    });
    const items = within(section).getAllByRole("listitem");

    expect(items).toHaveLength(3);
    expect(
      within(items[0]).getByRole("heading", { level: 3 }),
    ).toHaveTextContent("Соберите команду");
    expect(
      within(items[0]).getByText("Создайте пространство и пригласите коллег."),
    ).toBeInTheDocument();
    expect(
      within(items[1]).getByRole("heading", { level: 3 }),
    ).toHaveTextContent("Запустите проект");
    expect(
      within(items[1]).getByText("Добавьте каналы, участников и репозитории."),
    ).toBeInTheDocument();
    expect(
      within(items[2]).getByRole("heading", { level: 3 }),
    ).toHaveTextContent("Работайте без потерь");
    expect(
      within(items[2]).getByText("Обсуждайте, фиксируйте решения, выпускайте."),
    ).toBeInTheDocument();
  });
});
