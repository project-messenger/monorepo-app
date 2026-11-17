import { Typography } from "@/shared/ui/typography";

function Security() {
  return (
    <section
      aria-labelledby="security-heading"
      className="mx-auto w-full max-w-[1440px] px-4 pt-3.5 pb-7 sm:px-6 lg:px-16"
    >
      <div className="grid gap-6 rounded-2xl bg-surface-trust px-6 py-7 lg:min-h-[178px] lg:grid-cols-[minmax(0,510fr)_minmax(0,646fr)] lg:items-start lg:gap-24 lg:px-[30px]">
        <Typography
          as="h2"
          id="security-heading"
          className="text-[26px] leading-[1.4] font-semibold lg:text-[30px]"
        >
          Контекст общий.
          <br /> Доступ — под контролем.
        </Typography>
        <div className="space-y-2 text-muted-foreground lg:space-y-0 lg:pt-[7px]">
          <Typography className="text-base leading-[1.4]">
            Закрытые каналы и репозитории остаются закрытыми.
          </Typography>
          <Typography className="text-base leading-[1.4]">
            ИИ видит только то, что доступно вам.
          </Typography>
          <Typography className="text-base leading-[1.4]">
            Никаких действий от вашего имени без подтверждения.
          </Typography>
        </div>
      </div>
    </section>
  );
}

export { Security };
