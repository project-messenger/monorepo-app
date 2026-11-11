import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Section } from "./section";

function Cta() {
  return (
    <Section className="pt-0">
      <div className="flex flex-col items-center gap-6 rounded-2xl bg-primary px-6 py-16 text-center text-primary-foreground">
        <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-balance md:text-4xl">
          Готовы ускорить работу команды?
        </h2>
        <p className="max-w-md text-balance text-primary-foreground/70">
          Зарегистрируйтесь за минуту. Карта не нужна.
        </p>
        <Button
          size="lg"
          variant="secondary"
          nativeButton={false}
          render={<Link href="/register" />}
        >
          Создать аккаунт
          <ArrowRight data-icon="inline-end" />
        </Button>
      </div>
    </Section>
  );
}

export { Cta };
