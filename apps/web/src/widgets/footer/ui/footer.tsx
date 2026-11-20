import Link from "next/link";

import { Logo } from "@/shared/ui/logo";
import { Typography } from "@/shared/ui/typography";

function SiteFooter() {
  return (
    <footer>
      <div className="mx-auto grid w-full max-w-[1440px] gap-6 px-4 py-8 sm:px-6 lg:min-h-[140px] lg:grid-cols-[200px_minmax(0,1fr)_336px] lg:items-center lg:gap-9 lg:px-16 lg:pt-[42px] lg:pb-14">
        <Logo className="w-fit" />
        <Typography
          variant="label-button"
          className="font-normal text-muted-foreground"
        >
          Общение и работа в одном контексте
        </Typography>
        <nav aria-label="Юридическая информация">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-muted-foreground">
            <li>
              <Link
                href="#"
                className="rounded-sm transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                <Typography as="span" variant="body-small">
                  Конфиденциальность
                </Typography>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="rounded-sm transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                <Typography as="span" variant="body-small">
                  Условия
                </Typography>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export { SiteFooter };
