import { createCn } from "cn/config";

// Роли типографики из globals.css (`--text-<role>`). tailwind-merge внутри `cn`
// не знает про них и считает `text-body`, `text-label-button` и т.п. цветом
// текста. Из-за этого `cn("bg-primary text-primary-foreground text-label-button")`
// выкидывал `text-primary-foreground`, и текст кнопки становился тёмным на
// тёмном фоне. Регистрируем роли как font-size — тогда цвет и размер текста
// живут в разных группах и не конфликтуют.
const typographyRoles = [
  "display-hero",
  "display-hero-mobile",
  "display-hero-tablet",
  "display-auth",
  "display-cta",
  "display-cta-mobile",
  "heading-landing",
  "heading-landing-mobile",
  "heading-steps",
  "heading-steps-mobile",
  "steps-number",
  "subtitle-landing",
  "subtitle-hero",
  "hero-card-text",
  "body-landing",
  "body-footer",
  "heading-auth",
  "heading-page",
  "heading-section",
  "heading-panel",
  "heading-subsection",
  "body",
  "body-small",
  "label-button",
  "label-field",
  "label-sidebar-section",
  "caption",
  "caption-small",
  "caption-task-id",
  "brand-app",
  "brand-auth",
] as const;

const cn = createCn({
  extend: {
    classGroups: {
      "font-size": [{ text: [...typographyRoles] }],
    },
  },
});

export { cn };
