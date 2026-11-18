import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Typography } from "@/shared/ui/typography";
import { ROUTES } from "@/shared/config";

function Cta() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="bg-sidebar text-primary-foreground dark:text-sidebar-foreground"
    >
      <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-4 py-10 sm:px-6 lg:min-h-[280px] lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16 lg:py-[42px] lg:pr-[100px] lg:pl-16">
        <div>
          <Typography as="h2" id="cta-heading" variant="display-cta">
            Пусть разговоры
            <br /> становятся результатом.
          </Typography>
          <Typography
            variant="subtitle-landing"
            className="mt-6 text-inverse-muted-foreground dark:text-sidebar-muted-foreground"
          >
            Ваша команда. Ваш ритм.
          </Typography>
        </div>
        <Button
          size="landing-cta"
          variant="sidebar-accent"
          className="w-full lg:mt-[54px] lg:self-start"
          nativeButton={false}
          render={
            <Link
              href={ROUTES.REGISTER}
              target="_blank"
              rel="noopener noreferrer"
              role="link"
            />
          }
        >
          Создать пространство
          <ArrowRight data-icon="inline-end" />
        </Button>
      </div>
    </section>
  );
}

export { Cta };
