import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";
import { Typography } from "@/shared/ui/typography";
import { ROUTES } from "@/shared/config";

function Cta() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="bg-sidebar text-primary-foreground dark:text-sidebar-foreground"
    >
      <Container className="grid gap-8 py-10 lg:min-h-70 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16 lg:py-10.5 lg:pr-25">
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
          className="w-full lg:mt-13.5 lg:self-start"
          nativeButton={false}
          render={<Link href={ROUTES.REGISTER} role="link" />}
        >
          Создать пространство
          <ArrowRight data-icon="inline-end" />
        </Button>
      </Container>
    </section>
  );
}

export { Cta };
