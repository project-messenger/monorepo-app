import { Typography } from "@/shared/ui/typography";
import { Container } from "@/shared/ui/container";

function Security() {
  return (
    <section aria-labelledby="security-heading" className="pt-3.5 pb-7">
      <Container>
        <div className="grid gap-6 rounded-2xl bg-surface-trust px-6 py-7 lg:min-h-[11.125rem] lg:grid-cols-[minmax(0,510fr)_minmax(0,646fr)] lg:items-start lg:gap-24 lg:px-[1.875rem]">
          <Typography as="h2" id="security-heading" variant="heading-landing">
            Контекст общий.
            <br /> Доступ — под контролем.
          </Typography>
          <div className="space-y-2 text-muted-foreground lg:space-y-0 lg:pt-[0.4375rem]">
            <Typography variant="body-landing">
              Закрытые каналы и репозитории остаются закрытыми.
            </Typography>
            <Typography variant="body-landing">
              ИИ видит только то, что доступно вам.
            </Typography>
            <Typography variant="body-landing">
              Никаких действий от вашего имени без подтверждения.
            </Typography>
          </div>
        </div>
      </Container>
    </section>
  );
}

export { Security };
