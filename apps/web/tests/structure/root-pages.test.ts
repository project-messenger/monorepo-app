// @vitest-environment node
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const webRoot = join(import.meta.dirname, "..", "..");

describe("корневая папка pages/", () => {
  it("существует: без неё Next примет src/pages (слой FSD) за Pages Router", () => {
    expect(() => readdirSync(join(webRoot, "pages"))).not.toThrow();
  });

  it("содержит только README.md: любой другой файл станет маршрутом Pages Router", () => {
    const entries = readdirSync(join(webRoot, "pages"), { recursive: true });

    expect(entries).toEqual(["README.md"]);
  });
});
