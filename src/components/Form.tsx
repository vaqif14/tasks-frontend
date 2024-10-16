import type { DetailedHTMLProps, FormHTMLAttributes } from "react";
import * as React from "react";
import type { FieldValues, SubmitErrorHandler, SubmitHandler, UseFormReturn } from "react-hook-form";
import { FormProvider } from "react-hook-form";
import RadioButton from "./RadioButton";

interface FormProps<TFormValues extends FieldValues = FieldValues>
  extends Omit<DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, "onSubmit" | "onError"> {
  onSubmit?: SubmitHandler<TFormValues>;
  onError?: SubmitErrorHandler<TFormValues>;
  methods: UseFormReturn<TFormValues>;
  children: React.ReactNode;
}

const Form = <TFormValues extends FieldValues = FieldValues>({
  onSubmit = () => {},
  onError,
  children,
  methods,
  ...props
}: FormProps<TFormValues>) => (
  <FormProvider {...methods}>
    <form onSubmit={methods.handleSubmit(onSubmit!, onError)} {...props}>
      {children}
    </form>
  </FormProvider>
);

Form.RadioButton = RadioButton;

export { Form };
