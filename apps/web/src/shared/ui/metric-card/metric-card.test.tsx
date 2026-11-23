import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  MetricCard,
  MetricCardBody,
  MetricCardContext,
  MetricCardLabel,
  MetricCardValue,
} from "./metric-card";

function renderCard(variant?: "accent" | "surface") {
  return render(
    <MetricCard variant={variant} data-testid="card">
      <MetricCardValue>12</MetricCardValue>
      <MetricCardBody>
        <MetricCardLabel>Задач в работе</MetricCardLabel>
        <MetricCardContext>+3 за неделю</MetricCardContext>
      </MetricCardBody>
    </MetricCard>,
  );
}

describe("MetricCard", () => {
  it("отображает значение, подпись и контекст", () => {
    renderCard();

    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("Задач в работе")).toBeInTheDocument();
    expect(screen.getByText("+3 за неделю")).toBeInTheDocument();
  });

  it("по умолчанию использует вариант surface", () => {
    renderCard();

    const card = screen.getByTestId("card");
    expect(card).toHaveClass("bg-surface");
    expect(card).toHaveClass("border");
    expect(card).toHaveClass("rounded-metric");
  });

  it("вариант accent использует фон из токена", () => {
    renderCard("accent");

    expect(screen.getByTestId("card")).toHaveClass("bg-surface-linked");
  });

  it("слоты получают data-slot", () => {
    renderCard();

    expect(screen.getByText("12")).toHaveAttribute(
      "data-slot",
      "metric-card-value",
    );
    expect(screen.getByText("Задач в работе")).toHaveAttribute(
      "data-slot",
      "metric-card-label",
    );
  });
});
