"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/shared/ui/button";

function ThemeToggle() {
  // resolvedTheme — фактическая тема: при выборе «как в системе» это light или dark.
  const { resolvedTheme, setTheme } = useTheme();

  // Иконка переключается через CSS (dark:), а не по resolvedTheme: до гидрации
  // тема на сервере неизвестна, и разметка сервера и клиента совпадает.
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Переключить тему"
    >
      <Sun className="dark:hidden" />
      <Moon className="hidden dark:block" />
    </Button>
  );
}

export { ThemeToggle };
