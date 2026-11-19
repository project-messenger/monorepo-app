import { Typography } from "@/shared/ui/typography";

import { steps } from "../config/steps";
import { Section } from "./section";

function Steps() {
  return (
    <Section
      aria-labelledby="steps-heading"
      className="max-w-[1440px] px-4 pt-6 pb-10 sm:px-6 md:py-12 lg:px-16 lg:pb-24"
    >
      <Typography as="h2" id="steps-heading" variant="heading-steps">
        Три шага — и вы в одном ритме
      </Typography>
      <ol className="mt-8 mb-2 grid gap-8 md:grid-cols-3 md:gap-6">
        {steps.map(({ title, description }, index) => (
          <li key={title} className="flex items-start gap-4">
            <Typography
              as="span"
              variant="steps-number"
              className="shrink-0 text-primary"
              aria-hidden="true"
            >
              {index + 1}
            </Typography>
            <div className="pt-1 pl-4.5">
              <Typography as="h3" variant="heading-panel">
                {title}
              </Typography>
              <Typography variant="body" className="mt-3 text-muted-foreground">
                {description}
              </Typography>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export { Steps };
