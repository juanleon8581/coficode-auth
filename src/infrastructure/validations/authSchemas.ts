import { ValidationAdapter, InferValidationType } from "../adapters/ZodAdapter";

export const emailSchema = ValidationAdapter.email(
  "Email inválido",
  "El email es requerido",
);

export const passwordSchema = ValidationAdapter.string(
  "La contraseña es requerida",
);

export const loginSchema = ValidationAdapter.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginFormValues = InferValidationType<typeof loginSchema>;
