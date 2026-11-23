import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { LandingHeaderMobile } from "./landing-header-mobile";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("LandingHeaderMobile", () => {
  it("closes the open sheet when the viewport reaches desktop width", async () => {
    const user = userEvent.setup();
    let onMediaChange: ((event: MediaQueryListEvent) => void) | undefined;
    const mediaQueryList = {
      matches: false,
      media: "(min-width: 72rem)",
      addEventListener: vi.fn(
        (_event: string, listener: (event: MediaQueryListEvent) => void) => {
          onMediaChange = listener;
        },
      ),
      removeEventListener: vi.fn(),
    } as unknown as MediaQueryList;

    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => mediaQueryList),
    );
    render(<LandingHeaderMobile />);

    await user.click(screen.getByRole("button", { name: "Открыть меню" }));
    expect(await screen.findByRole("dialog")).toBeInTheDocument();

    act(() => {
      onMediaChange?.({ matches: true } as MediaQueryListEvent);
    });

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});
