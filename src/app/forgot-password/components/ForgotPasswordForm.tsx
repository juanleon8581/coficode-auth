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

export const ForgotPasswordForm = ({
  onSubmit,
}: {
  onSubmit?: (
    data: ForgotPasswordFormValues,
  ) => Promise<{ error?: string; success?: boolean }> | void;
}) => {
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
        errorToast("Error", result.error);
        return;
      }
      successToast("Instructions sent", "Check your email to reset your password.");
    }
  };

  return (
    <div className="w-full max-w-[400px]">
      <div className="flex flex-col gap-3 mb-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Recuperar contraseña
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
          Introduce tu email y te enviaremos las instrucciones para restablecer
          tu contraseña
        </p>
      </div>


      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2 text-left">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="nombre@empresa.com"
                      className="w-full rounded-lg h-12 border-slate-200 dark:border-slate-700"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full flex items-center justify-center rounded-lg bg-primary dark:bg-white text-white dark:text-primary px-4 h-12 text-sm font-semibold shadow-sm hover:bg-primary/90 dark:hover:bg-slate-100 transition-colors"
          >
            Enviar instrucciones
          </Button>
        </form>
      </Form>
      <div className="mt-12 text-center">
        <a
          href="/login"
          className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors"
        >
          Inicia sesión
        </a>
      </div>
    </div>
  );
};
