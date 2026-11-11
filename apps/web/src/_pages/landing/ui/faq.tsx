import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { Section, SectionHeader } from "./section";

const items = [
  {
    q: "Есть ли бесплатный тариф?",
    a: "Да, тариф «Старт» бесплатный навсегда для команд до 3 человек.",
  },
  {
    q: "Можно ли сменить тариф позже?",
    a: "Конечно. Переход между тарифами в любой момент, разница пересчитывается автоматически.",
  },
  {
    q: "Где хранятся данные?",
    a: "В дата-центрах с сертификацией. Текст-заглушка — уточните у юристов.",
  },
  {
    q: "Есть ли API?",
    a: "Да, открытое REST API и вебхуки на всех платных тарифах.",
  },
];

function Faq() {
  return (
    <Section id="faq" className="max-w-3xl">
      <SectionHeader eyebrow="FAQ" title="Частые вопросы" />
      <Accordion>
        {items.map((item) => (
          <AccordionItem key={item.q} value={item.q}>
            <AccordionTrigger>{item.q}</AccordionTrigger>
            <AccordionContent>{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}

export { Faq };
