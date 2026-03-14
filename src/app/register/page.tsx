import { Metadata } from "next";
import { RegisterForm } from "./components/RegisterForm";
import { registerAction } from "./actions";
import { Logo } from "@/presentation/components/Logo/Logo";

export const metadata: Metadata = {
  title: "Registrarse | CofiAuth",
  description: "Crea tu cuenta de CofiAuth para acceder al panel.",
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen bg-background text-slate-900 dark:text-slate-100 antialiased">
      {/* 
        Branding Side 
        - Hidden on mobile/tablet (hidden)
        - Visible on desktop (lg:flex lg:w-1/2) 
      */}
      <div className="relative flex-col bg-zinc-900 p-10 text-white dark:border-r border-zinc-800 hidden lg:flex lg:w-1/2 overflow-hidden items-center justify-center text-center">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="absolute inset-0 bg-primary/5 dark:bg-white/5 backdrop-blur-3xl" />

        <div className="relative z-20 flex flex-col items-center justify-center p-12 text-center">
          <Logo orientation="vertical" />

          <p className="text-slate-300 text-lg max-w-md mt-4">
            La solución moderna y segura para la gestión de accesos de tu
            equipo.
          </p>
        </div>

        <div className="relative z-20 mt-auto text-left w-full">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This boilerplate has saved me countless hours of setup and
              helped my team deliver features faster than ever before. Highly
              recommended for agile projects.&rdquo;
            </p>
            <footer className="text-sm text-zinc-400">
              Sofia Davis, Lead Engineer
            </footer>
          </blockquote>
        </div>
      </div>

      {/* 
        Form Side
        - Full width on mobile/tablet (w-full)
        - Half width on desktop (lg:w-1/2)
      */}
      <div className="flex w-full flex-col items-center justify-center p-8 lg:p-12 lg:w-1/2 bg-white dark:bg-zinc-950">
        <div className="mx-auto flex w-full flex-col justify-center items-center space-y-6 sm:max-w-[600px]">
          <RegisterForm onSubmit={registerAction} />
        </div>
      </div>
    </div>
  );
}
