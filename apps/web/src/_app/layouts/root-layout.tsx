import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "../styles/globals.css";
import { cn } from "@/shared/lib/utils";
import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { Toaster } from "@/shared/ui/sonner";
import { QueryProvider } from "../api/query-provider";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Acme — SaaS-платформа",
    template: "%s · Acme",
  },
  description: "Демо-лендинг SaaS на shadcn/ui и Next.js",
};

export function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      // next-themes ставит класс .dark на <html> до гидрации — разметка
      // сервера и клиента в этом атрибуте расходится намеренно.
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="flex min-h-full flex-col">
        {/* Тема: класс .dark на <html>, выбор в localStorage["theme"],
            по умолчанию — как в системе. */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NuqsAdapter>
            <QueryProvider>{children}</QueryProvider>
          </NuqsAdapter>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
