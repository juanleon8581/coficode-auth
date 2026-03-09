import { render, screen, waitFor, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, afterEach } from "vitest";
import { LoginForm } from "./LoginForm";

describe("LoginForm", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders all form elements correctly", () => {
    render(<LoginForm />);

    expect(
      screen.getByRole("heading", { name: /Bienvenido de nuevo/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Entrar/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /¿Olvidaste tu contraseña\?/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/¿No tienes una cuenta\?/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Regístrate/i }),
    ).toBeInTheDocument();
  });

  it("shows validation errors for empty fields", async () => {
    render(<LoginForm />);

    const submitButton = screen.getByRole("button", { name: /Entrar/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/El email es requerido/i)).toBeInTheDocument();
      expect(
        screen.getByText(/La contraseña es requerida/i),
      ).toBeInTheDocument();
    });
  });

  it("shows validation error for invalid email", async () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/Email/i);
    await userEvent.type(emailInput, "invalid-email");

    const submitButton = screen.getByRole("button", { name: /Entrar/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Email inválido/i)).toBeInTheDocument();
    });
  });

  it("calls onSubmit with correct data when form is valid", async () => {
    const handleSubmit = vi.fn();
    render(<LoginForm onSubmit={handleSubmit} />);

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole("button", { name: /Entrar/i });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "ValidPassword123");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
      expect(handleSubmit).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "ValidPassword123",
      });
    });
  });
});
