import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Checkbox } from "./checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "./field";
import { Input } from "./input";

const meta = {
  title: "UI/Field",
  component: Field,
  render: (args) => (
    <FieldGroup className="max-w-sm">
      <Field {...args}>
        <FieldLabel htmlFor="field-email">Email</FieldLabel>
        <Input id="field-email" type="email" placeholder="you@example.com" />
        <FieldDescription>На этот адрес придёт приглашение.</FieldDescription>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="field-remember" />
        <FieldLabel htmlFor="field-remember">Запомнить меня</FieldLabel>
      </Field>
    </FieldGroup>
  ),
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Horizontal: Story = { args: { orientation: "horizontal" } };

export const WithError: Story = {
  render: () => (
    <Field className="max-w-sm" data-invalid="true">
      <FieldLabel htmlFor="field-login">Логин</FieldLabel>
      <Input id="field-login" aria-invalid defaultValue="ab" />
      <FieldError>Логин должен быть не короче 3 символов.</FieldError>
    </Field>
  ),
};

export const FieldSetExample: Story = {
  render: () => (
    <FieldSet className="max-w-sm">
      <FieldLegend>Аккаунт</FieldLegend>
      <Field>
        <FieldLabel htmlFor="field-name">Имя</FieldLabel>
        <Input id="field-name" placeholder="Иван" />
      </Field>
      <FieldSeparator>или</FieldSeparator>
      <Field>
        <FieldLabel htmlFor="field-login-2">Логин</FieldLabel>
        <Input id="field-login-2" placeholder="ivan" />
      </Field>
    </FieldSet>
  ),
};
