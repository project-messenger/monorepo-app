import type { AuthStoryContent } from "../model/types";

export const authStoryContent = {
  heading: "Хорошая работа начинается с разговора.",
  description:
    "Обсуждайте, создавайте задачи и выпускайте продукт в одном месте.",
  card: {
    overline: "ИЗ ОБСУЖДЕНИЯ В РЕЗУЛЬТАТ",
    channel: "# разработка",
    message: "«Нужно исправить сессию до релиза»",
    outcome: "↳ Задача WEB-128 → В работе → Связанный PR #84",
  },
  footer: "Меньше переключений. Больше результата.",
} satisfies AuthStoryContent;
