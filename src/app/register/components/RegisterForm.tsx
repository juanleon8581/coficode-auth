"use client";

import { useForm } from "react-hook-form";

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
import { Checkbox } from "@/presentation/components/ui/checkbox";
import { ValidationAdapter } from "@/infrastructure/adapters/ZodAdapter";
import {
  registerSchema,
  RegisterFormValues,
} from "@/infrastructure/validations/authSchemas";

export const RegisterForm = ({
  onSubmit,
}: {
  onSubmit?: (data: RegisterFormValues) => void | Promise<void>;
}) => {
  const form = useForm<RegisterFormValues>({
    resolver: ValidationAdapter.getResolver<RegisterFormValues>(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const handleSubmit = async (data: RegisterFormValues) => {
    if (onSubmit) {
      await onSubmit(data);
    }
  };

  return (
    <div className="w-full max-w-[600px] flex flex-col relative">
      <div className="flex flex-col gap-2 mb-8">
        <h2 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-tight">
          Crear una cuenta
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">
          Ingresa tus datos para registrarte en CofiAuth
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col sm:flex-row gap-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Nombre completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingresa tu nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="nombre@ejemplo.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Confirmar Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-x-3 space-y-0 pt-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="font-normal text-slate-600 dark:text-slate-300">
                    Acepto los términos y condiciones
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-4">
            <Button
              type="submit"
              className="w-full h-12 bg-black hover:bg-black/90 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-50 text-white font-medium"
            >
              Registrarse
            </Button>
          </div>
        </form>
      </Form>
      <div className="mt-8 text-center">
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          ¿Ya tienes cuenta?{" "}
          <a
            href="/login"
            className="text-primary dark:text-white font-semibold hover:underline underline-offset-4 transition-all"
          >
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
};
