import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";

const typographyVariants = cva("", {
  variants: {
    variant: {
      "display-hero": "text-display-hero",
      "display-auth": "text-display-auth",
      "heading-auth": "text-heading-auth",
      "heading-page": "text-heading-page",
      "heading-section": "text-heading-section",
      "heading-panel": "text-heading-panel",
      "heading-subsection": "text-heading-subsection",
      "label-button": "text-label-button",
      "label-field": "text-label-field",
      body: "text-body",
      "body-small": "text-body-small",
      caption: "text-caption",
      "caption-small": "text-caption-small",
    },
  },
});

type TypographyVariant = NonNullable<
  VariantProps<typeof typographyVariants>["variant"]
>;

type TypographyTag =
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div" | "label";

// h5 и h6 в макете нет: h5 — роль подписи кнопки (15 px), h6 — подписи поля (13 px).
const defaultVariantByTag: Record<TypographyTag, TypographyVariant> = {
  h1: "heading-page",
  h2: "heading-section",
  h3: "heading-panel",
  h4: "heading-subsection",
  h5: "label-button",
  h6: "label-field",
  p: "body",
  span: "body",
  div: "body",
  label: "label-field",
};

type TypographyProps = VariantProps<typeof typographyVariants> &
  (
    | ({ as: "label" } & React.LabelHTMLAttributes<HTMLLabelElement>)
    | ({
        as?: Exclude<TypographyTag, "label">;
      } & React.HTMLAttributes<HTMLElement>)
  );

function Typography({
  as: Tag = "p",
  variant,
  className,
  ...props
}: TypographyProps) {
  const Element = Tag as React.ElementType;

  return (
    <Element
      data-slot="typography"
      className={cn(
        typographyVariants({ variant: variant ?? defaultVariantByTag[Tag] }),
        className,
      )}
      {...props}
    />
  );
}

export { Typography, typographyVariants };
