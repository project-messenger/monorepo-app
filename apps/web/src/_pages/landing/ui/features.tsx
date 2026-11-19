import { Card, CardHeader } from "@/shared/ui/card";
import { Typography } from "@/shared/ui/typography";

import { featureCards } from "../config/feature-cards";
import { Section } from "./section";

function Features() {
  return (
    <Section
      id="features"
      aria-labelledby="features-heading"
      className="max-w-[1440px] px-4 pt-6 pb-4 sm:px-6 md:py-8 lg:px-16 lg:pb-4"
    >
      <Typography as="h2" id="features-heading" variant="heading-steps">
        Не ещё один чат.
        <br />
        Место, где работа складывается.
      </Typography>
      <ol className="mt-8 grid gap-4 md:grid-cols-3 md:gap-6">
        {featureCards.map(({ number, title, description }) => (
          <li key={number} className="h-full">
            <Card className="h-full">
              <CardHeader className="gap-3 p-5 sm:p-6">
                <Typography as="h3" variant="heading-panel">
                  {number} / {title}
                </Typography>
                <Typography
                  variant="body-landing"
                  className="text-muted-foreground"
                >
                  {description}
                </Typography>
              </CardHeader>
            </Card>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export { Features };
