import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Logo } from "@/shared/ui/logo";
import { ThemeToggle } from "@/features/theme-toggle";

export function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="grid flex-1 lg:grid-cols-2">
      <div className="flex flex-col p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            render={<Link href="/" />}
          >
            <ArrowLeft data-icon="inline-start" />
            На главную
          </Button>
          <ThemeToggle />
        </div>
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </div>

      {/* Декоративная панель — только на широких экранах */}
      <aside className="relative hidden flex-col justify-between bg-primary p-10 text-primary-foreground lg:flex">
        <Logo className="[&>span]:bg-primary-foreground [&>span]:text-primary" />
        <blockquote className="flex max-w-md flex-col gap-3">
          <p className="text-xl font-medium text-balance">
            «С Acme мы сократили время на рутину вдвое и наконец видим всю
            картину по проектам».
          </p>
          <footer className="text-sm text-primary-foreground/70">
            Анна Смирнова, руководитель продукта · текст-заглушка
          </footer>
        </blockquote>
      </aside>
    </div>
  );
}
