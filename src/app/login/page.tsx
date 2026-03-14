import { Metadata } from "next";
import { LoginForm } from "./components/LoginForm";
import { loginAction } from "./actions";
import { Logo } from "@/presentation/components/Logo/Logo";

export const metadata: Metadata = {
  title: "Login | CofiAuth",
  description: "Login to your CofiAuth account",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex-col bg-foreground p-10 text-background dark:border-r border-accent-foreground hidden lg:flex lg:w-1/2">
        <Logo />
      </div>

      <div className="flex w-full flex-col items-center justify-center p-8 lg:p-12 lg:w-1/2">
        <div className="flex w-full flex-col justify-center items-center gap-16 sm:max-w-md">
          <div className="lg:hidden">
            <Logo orientation="vertical" />
          </div>
          <LoginForm onSubmit={loginAction} />
        </div>
      </div>
    </div>
  );
}
