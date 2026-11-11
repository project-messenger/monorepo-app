import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "cn";

import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Section, SectionHeader } from "./section";

const plans = [
  {
    name: "Старт",
    price: "0 ₽",
    description: "Для небольших команд и знакомства с продуктом.",
    features: ["До 3 участников", "5 проектов", "Базовая аналитика"],
    cta: "Начать бесплатно",
  },
  {
    name: "Команда",
    price: "990 ₽",
    description: "Для растущих команд, которым нужно больше.",
    features: [
      "До 25 участников",
      "Безлимит проектов",
      "Автоматизации",
      "Интеграции",
    ],
    cta: "Попробовать 14 дней",
    popular: true,
  },
  {
    name: "Бизнес",
    price: "2 490 ₽",
    description: "Для компаний с требованиями к безопасности.",
    features: [
      "Безлимит участников",
      "SSO и аудит",
      "Приоритетная поддержка",
      "SLA 99,9%",
    ],
    cta: "Связаться с нами",
  },
];

function Pricing() {
  return (
    <Section id="pricing">
      <SectionHeader
        eyebrow="Тарифы"
        title="Простые и прозрачные цены"
        description="Цена за участника в месяц. Значения — заглушки."
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={cn(plan.popular && "ring-2 ring-primary")}
          >
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              {plan.popular && (
                <CardAction>
                  <Badge>Популярный</Badge>
                </CardAction>
              )}
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-6">
              <p className="flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight">
                  {plan.price}
                </span>
                <span className="text-sm text-muted-foreground">/ мес</span>
              </p>
              <ul className="flex flex-col gap-2 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="size-4 text-muted-foreground" />
                    {f}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
                nativeButton={false}
                render={<Link href="/register" />}
              >
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Section>
  );
}

export { Pricing };
