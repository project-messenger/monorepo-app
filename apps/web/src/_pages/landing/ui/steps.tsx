import { Typography } from "@/shared/ui/typography";

import { Section } from "./section";

const steps = [
  {
    title: "Соберите команду",
    description: "Создайте пространство и пригласите коллег.",
  },
  {
    title: "Запустите проект",
    description: "Добавьте каналы, участников и репозитории.",
  },
  {
    title: "Работайте без потерь",
    description: "Обсуждайте, фиксируйте решения, выпускайте.",
  },
];

function Steps() {
  return (
    <Section
      aria-labelledby="steps-heading"
      className="max-w-[1440px] pt-6 pb-10 md:py-12"
    >
      <Typography as="h2" id="steps-heading" variant="heading-auth">
        Три шага — и вы в одном ритме
      </Typography>
      <ol className="mt-8 grid gap-8 md:grid-cols-3 md:gap-6">
        {steps.map(({ title, description }, index) => (
          <li key={title} className="flex items-start gap-4">
            <Typography
              as="span"
              variant="display-auth"
              className="shrink-0 text-primary"
              aria-hidden="true"
            >
              {index + 1}
            </Typography>
            <div className="pt-1">
              <Typography as="h3" variant="heading-section">
                {title}
              </Typography>
              <Typography variant="body" className="mt-2 text-muted-foreground">
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
