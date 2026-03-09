import { describe, it, expect } from "vitest";
import { loginSchema, emailSchema, passwordSchema } from "./authSchemas";

describe("authSchemas", () => {
  describe("emailSchema", () => {
    it("valida exitosamente un email correcto", () => {
      const result = emailSchema.safeParse("test@example.com");
      expect(result.success).toBe(true);
    });

    it("falla para un string vacío", () => {
      const result = emailSchema.safeParse("");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("El email es requerido");
      }
    });

    it("falla para un email inválido", () => {
      const result = emailSchema.safeParse("invalid-email");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Email inválido");
      }
    });
  });

  describe("passwordSchema", () => {
    it("valida exitosamente una contraseña dada", () => {
      const result = passwordSchema.safeParse("Secret123!");
      expect(result.success).toBe(true);
    });

    it("falla para un string vacío dado", () => {
      const result = passwordSchema.safeParse("");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "La contraseña es requerida",
        );
      }
    });
  });

  describe("loginSchema", () => {
    it("valida exitosamente un set de credenciales válidas", () => {
      const result = loginSchema.safeParse({
        email: "test@example.com",
        password: "SecretPassword",
      });
      expect(result.success).toBe(true);
    });

    it("falla cuando falta el password", () => {
      const result = loginSchema.safeParse({
        email: "test@example.com",
        password: "",
      });
      expect(result.success).toBe(false);
    });

    it("falla cuando el email es inválido", () => {
      const result = loginSchema.safeParse({
        email: "invalid",
        password: "SecretPassword",
      });
      expect(result.success).toBe(false);
    });
  });
});
