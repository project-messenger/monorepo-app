import { Container } from "@/shared/ui/container";
import { Typography } from "@/shared/ui/typography";

import { securityStatements } from "../config/security";

function Security() {
  return (
    <section
      id="security"
      aria-labelledby="security-heading"
      className="scroll-mt-20 pt-3.5 pb-7"
    >
      <Container>
        <div className="grid gap-6 rounded-2xl bg-surface-trust px-6 py-7 lg:min-h-[11.125rem] lg:grid-cols-[minmax(0,510fr)_minmax(0,646fr)] lg:items-start lg:gap-24 lg:px-[1.875rem]">
          <Typography as="h2" id="security-heading" variant="heading-landing">
            Контекст общий.
            <br /> Доступ — под контролем.
          </Typography>
          <div className="space-y-2 text-muted-foreground lg:space-y-0 lg:pt-[0.4375rem]">
            {securityStatements.map((statement) => (
              <Typography key={statement} variant="body-landing">
                {statement}
              </Typography>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export { Security };
