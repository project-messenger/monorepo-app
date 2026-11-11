import {
  ChartColumn,
  Plug,
  ShieldCheck,
  Users,
  Workflow,
  Zap,
} from "lucide-react";

import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Section, SectionHeader } from "./section";

const features = [
  {
    icon: Zap,
    title: "Быстрый старт",
    text: "Подключите команду за пару минут — без настройки серверов.",
  },
  {
    icon: Workflow,
    title: "Автоматизации",
    text: "Стройте сценарии из готовых блоков и экономьте часы работы.",
  },
  {
    icon: ChartColumn,
    title: "Аналитика",
    text: "Дашборды и отчёты в реальном времени по всем проектам.",
  },
  {
    icon: Users,
    title: "Совместная работа",
    text: "Комментарии, упоминания и общие пространства для команд.",
  },
  {
    icon: Plug,
    title: "Интеграции",
    text: "Более 100 готовых интеграций и открытое API.",
  },
  {
    icon: ShieldCheck,
    title: "Безопасность",
    text: "SSO, роли и аудит действий для компаний любого размера.",
  },
];

function Features() {
  return (
    <Section id="features">
      <SectionHeader
        eyebrow="Возможности"
        title="Всё необходимое для работы команды"
        description="Текст-заглушка: кратко о том, какую проблему решает продукт."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, text }) => (
          <Card key={title}>
            <CardHeader>
              <span className="mb-2 flex size-9 items-center justify-center rounded-lg bg-muted">
                <Icon className="size-4" />
              </span>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{text}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </Section>
  );
}

export { Features };
