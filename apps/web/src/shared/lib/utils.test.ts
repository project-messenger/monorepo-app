import { describe, expect, it } from "vitest";

import { cn } from "./utils";

function classes(value: string) {
  return value.split(" ").sort();
}

describe("cn", () => {
  it("сохраняет цвет текста рядом с ролью типографики", () => {
    expect(
      classes(cn("bg-primary text-label-button text-primary-foreground")),
    ).toEqual(classes("bg-primary text-primary-foreground text-label-button"));
    expect(classes(cn("text-body", "text-muted-foreground"))).toEqual(
      classes("text-body text-muted-foreground"),
    );
  });

  it("заменяет одну роль типографики другой", () => {
    expect(cn("text-body", "text-caption")).toBe("text-caption");
  });

  it("заменяет один цвет текста другим", () => {
    expect(cn("text-foreground", "text-destructive")).toBe("text-destructive");
  });

  it("игнорирует ложные значения", () => {
    expect(cn("a", false, undefined, null, "b")).toBe("a b");
  });
});
