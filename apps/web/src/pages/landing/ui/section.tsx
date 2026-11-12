import { cn } from "cn";

function Section({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "mx-auto w-full max-w-6xl scroll-mt-16 px-4 py-20 sm:px-6 md:py-24",
        className,
      )}
      {...props}
    />
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-3 text-center">
      {eyebrow && (
        <p className="text-sm font-medium text-muted-foreground">{eyebrow}</p>
      )}
      <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="text-balance text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

export { Section, SectionHeader };
