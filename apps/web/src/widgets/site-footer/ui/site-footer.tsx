import Link from "next/link";
import { cacheLife } from "next/cache";

import { Separator } from "@/shared/ui/separator";
import { Logo } from "@/shared/ui/logo";

const columns = [
  {
    title: "Продукт",
    links: [
      { href: "/#features", label: "Возможности" },
      { href: "/#pricing", label: "Тарифы" },
      { href: "/#faq", label: "FAQ" },
    ],
  },
  {
    title: "Компания",
    links: [
      { href: "#", label: "О нас" },
      { href: "#", label: "Блог" },
      { href: "#", label: "Вакансии" },
    ],
  },
  {
    title: "Документы",
    links: [
      { href: "#", label: "Политика конфиденциальности" },
      { href: "#", label: "Условия использования" },
    ],
  },
];

// Год вычисляется при пререндере и кэшируется (Cache Components запрещают
// синхронный new Date() в статической оболочке). Профиль "days" — раз в сутки
// год пересчитывается, так что 1 января он сменится без нового деплоя.
async function Copyright() {
  "use cache";
  cacheLife("days");
  return <p>© {new Date().getFullYear()} Acme. Все права защищены.</p>;
}

function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div className="flex flex-col gap-3">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            Платформа, которая помогает командам работать быстрее.
            Текст-заглушка.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title} className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">{col.title}</h3>
            <ul className="flex flex-col gap-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Separator />
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:justify-between sm:px-6">
        <Copyright />
        <p>Сделано на shadcn/ui</p>
      </div>
    </footer>
  );
}

export { SiteFooter };
