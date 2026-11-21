import { Container } from "@/shared/ui/container";
import { Link } from "@/shared/ui/link";
import { LogoLink } from "@/shared/ui/logo-link";
import { Typography } from "@/shared/ui/typography";
import { legalLinks } from "../config/legal-links";

function SiteFooter() {
  return (
    <footer>
      <Container className="grid gap-6 py-8 lg:min-h-[8.75rem] lg:grid-cols-[12.5rem_minmax(0,1fr)_21rem] lg:items-center lg:gap-9 lg:pt-[2.625rem] lg:pb-14">
        <LogoLink className="w-fit" />
        <Typography variant="body-footer" className="text-muted-foreground">
          Общение и работа в одном контексте
        </Typography>
        <nav aria-label="Юридическая информация">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-muted-foreground">
            {legalLinks.map(({ label, href }) => (
              <li key={label}>
                <Link href={href}>
                  <Typography as="span" variant="body-small">
                    {label}
                  </Typography>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </footer>
  );
}

export { SiteFooter };
