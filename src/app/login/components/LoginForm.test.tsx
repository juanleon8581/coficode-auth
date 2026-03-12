import { render, screen, waitFor, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, afterEach } from "vitest";
import { LoginForm } from "./LoginForm";
import {
  successToast,
  errorToast,
} from "@/presentation/components/Toaster/controller/toast.controller";

vi.mock("@/presentation/components/Toaster/controller/toast.controller", () => ({
  successToast: vi.fn(),
  errorToast: vi.fn(),
}));

describe("LoginForm", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
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

  it("calls onSubmit with correct data when form is valid and shows success toast", async () => {
    const handleSubmit = vi.fn().mockResolvedValue(undefined);
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
      expect(successToast).toHaveBeenCalledWith("Login successful", "Redirecting...");
      expect(errorToast).not.toHaveBeenCalled();
    });
  });

  it("shows error toast when onSubmit returns an error string in the result object", async () => {
    const errorMessage = "Credenciales incorrectas";
    const handleSubmit = vi.fn().mockResolvedValue({ error: errorMessage });
    render(<LoginForm onSubmit={handleSubmit} />);

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole("button", { name: /Entrar/i });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "WrongPassword123");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
      expect(errorToast).toHaveBeenCalledWith("Error logging in", errorMessage);
      expect(successToast).not.toHaveBeenCalled();
    });
  });
});
