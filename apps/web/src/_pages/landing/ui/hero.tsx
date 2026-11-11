import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Section } from "./section";

function Hero() {
  return (
    <Section className="flex flex-col items-center gap-8 pt-24 text-center md:pt-32">
      <Badge variant="outline" className="gap-1.5">
        <Sparkles />
        Новое: автоматизации на ИИ
      </Badge>
      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
        Все процессы команды — в одной платформе
      </h1>
      <p className="max-w-xl text-lg text-balance text-muted-foreground">
        Задачи, аналитика и интеграции без лишних инструментов. Текст-заглушка
        для демонстрации лейаута.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          size="lg"
          nativeButton={false}
          render={<Link href="/register" />}
        >
          Попробовать бесплатно
          <ArrowRight data-icon="inline-end" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          nativeButton={false}
          render={<Link href="/#features" />}
        >
          Узнать больше
        </Button>
      </div>

      {/* Плейсхолдер скриншота продукта */}
      <div className="mt-8 w-full rounded-xl border bg-card p-2 shadow-sm">
        <div className="grid aspect-video w-full grid-cols-[180px_1fr] gap-2 overflow-hidden rounded-lg bg-muted/50 p-2 max-sm:grid-cols-1">
          <div className="flex flex-col gap-2 rounded-md bg-background p-3 max-sm:hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-3 rounded bg-muted"
                style={{ width: `${90 - i * 8}%` }}
              />
            ))}
          </div>
          <div className="grid grid-cols-3 grid-rows-[auto_1fr] gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col gap-2 rounded-md bg-background p-3 text-left"
              >
                <div className="h-2.5 w-1/2 rounded bg-muted" />
                <div className="h-5 w-3/4 rounded bg-primary/15" />
              </div>
            ))}
            <div className="col-span-3 flex items-end gap-2 rounded-md bg-background p-4">
              {[40, 65, 50, 80, 60, 90, 70, 85, 55, 75].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-chart-2"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export { Hero };
