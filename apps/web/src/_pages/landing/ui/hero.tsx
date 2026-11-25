import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Section } from "./section";
import { Typography } from "@/shared/ui/typography";
import { ROUTES } from "@/shared/config";

function Hero() {
  return (
    <>
      <Section className="min-h-105 max-w-page py-0 not-last:mb-8 md:py-0 lg:pr-27.5 lg:pl-16 xl:not-last:mb-0">
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_18.75rem]">
          <div className="pt-8.75">
            <Typography
              as="p"
              variant="caption"
              className="text-primary uppercase not-last:mb-6.25"
            >
              Общение, которое двигает работу
            </Typography>
            <Typography
              as="h1"
              variant="display-hero"
              className="max-w-225 not-last:mb-3.25"
            >
              <span className="lg:block">От «обсудим»</span>{" "}
              <span className="lg:block">до «готово». Вместе.</span>
            </Typography>
            <Typography
              as="p"
              variant="subtitle-hero"
              className="max-w-180 text-muted-foreground"
            >
              <span className="lg:block">
                Чаты, задачи и GitHub в одном контексте.
              </span>{" "}
              <span className="lg:block">
                Меньше переключений. Больше общего результата.
              </span>
            </Typography>
          </div>
          <div className="flex flex-col pt-0 sm:ml-auto sm:w-75 xl:pt-10.5">
            <div className="relative mr-2.5 ml-auto h-45 w-52.5 rounded-4xl bg-accent not-last:mb-14">
              <ArrowUpRight
                size={80}
                strokeWidth={1.5}
                className="absolute top-1 right-4 text-primary"
                aria-hidden="true"
              />
              <Typography
                as="p"
                variant="hero-card-text"
                className="absolute bottom-5 left-5 w-45 text-accent-foreground"
              >
                В одном ритме, даже асинхронно.
              </Typography>
            </div>
            <Button
              size="landing-cta"
              className="w-full not-last:mb-3.5"
              nativeButton={false}
              render={<Link href={ROUTES.REGISTER} />}
            >
              Начать с командой
              <ArrowRight data-icon="inline-end" />
            </Button>
            <Typography
              as="p"
              variant="body-small"
              className="ml-1 text-muted-foreground"
            >
              Без карты · Настройка за пару минут
            </Typography>
          </div>
        </div>
      </Section>
      <figure className="mx-auto w-full max-w-page px-4 sm:px-6 lg:px-16">
        <Image
          src="/images/landing/kan21-demo.png"
          alt="Пример интерфейса командного мессенджера"
          width={1312}
          height={414}
          loading="eager"
          className="block h-auto w-full not-last:mb-3.75"
        />
        <figcaption>
          <Typography
            as="p"
            variant="caption"
            className="text-muted-foreground uppercase"
          >
            Один контекст для всей команды
          </Typography>
        </figcaption>
      </figure>
    </>
  );
}

export { Hero };
