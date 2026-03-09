import { Metadata } from "next";
import { RegisterForm } from "./components/RegisterForm";
import { registerAction } from "./actions";

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
          <div className="w-24 h-24 bg-primary text-white dark:bg-zinc-800 dark:text-white rounded-xl flex items-center justify-center mb-8 shadow-2xl border border-zinc-700">
            {/* Replace with actual logo or icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-10 w-10"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white mb-4">
            CofiAuth
          </h1>
          <p className="text-slate-300 text-lg max-w-md">
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
