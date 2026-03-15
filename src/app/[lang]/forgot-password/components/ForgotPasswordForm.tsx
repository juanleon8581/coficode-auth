"use client";

import { useForm } from "react-hook-form";
import {
  successToast,
  errorToast,
} from "@/presentation/components/Toaster/controller/toast.controller";
import { Button } from "@/presentation/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/presentation/components/ui/form";
import { Input } from "@/presentation/components/ui/input";
import { ValidationAdapter } from "@/infrastructure/adapters/ZodAdapter";
import {
  forgotPasswordSchema,
  ForgotPasswordFormValues,
} from "@/infrastructure/validations/authSchemas";
import { type Locale } from "@/infrastructure/i18n/config";
import Link from "next/link";

type ForgotPasswordTranslations = {
  title: string;
  subtitle: string;
  submitButton: string;
  login: string;
  successTitle: string;
  successMessage: string;
  errorTitle: string;
  email: string;
  placeholders: {
    email: string;
  };
};

interface Props {
  onSubmit?: (
    data: ForgotPasswordFormValues,
  ) => Promise<{ error?: string; success?: boolean }> | void;
  translations: ForgotPasswordTranslations;
  lang: Locale;
}

export const ForgotPasswordForm = ({ onSubmit, translations, lang }: Props) => {
  const form = useForm<ForgotPasswordFormValues>({
    resolver:
      ValidationAdapter.getResolver<ForgotPasswordFormValues>(
        forgotPasswordSchema,
      ),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (data: ForgotPasswordFormValues) => {
    if (onSubmit) {
      const result = await onSubmit(data);
      if (result?.error) {
        errorToast(translations.errorTitle, result.error);
        return;
      }
      successToast(translations.successTitle, translations.successMessage);
    }
  };

  return (
    <div className="w-full max-w-[400px]">
      <div className="flex flex-col gap-3 mb-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight">{translations.title}</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {translations.subtitle}
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{translations.email}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={translations.placeholders.email}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            {translations.submitButton}
          </Button>
        </form>
      </Form>

      <div className="mt-8 text-center text-sm">
        <Link
          href={`/${lang}/login`}
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          {translations.login}
        </Link>
      </div>
    </div>
  );
};
