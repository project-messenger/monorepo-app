import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { LogoLink } from "@/shared/ui/logo-link";
import { ThemeToggle } from "@/features/theme-toggle";
import { AuthStory } from "@/widgets/auth-story";

export function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="grid flex-1 lg:grid-cols-[minmax(0,35.5rem)_minmax(0,1fr)]">
      <AuthStory />
      <div className="flex min-w-0 flex-col p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <LogoLink className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring lg:hidden" />
          <Button
            variant="ghost"
            size="sm"
            className="hidden lg:inline-flex"
            nativeButton={false}
            render={<Link href="/" />}
          >
            <ArrowLeft data-icon="inline-start" />
            На главную
          </Button>
          <ThemeToggle />
        </div>
        <main className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-sm">{children}</div>
        </main>
      </div>
    </div>
  );
}
