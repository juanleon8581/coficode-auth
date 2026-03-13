"use server";

import { createClient } from "@/infrastructure/services/supabase/server";
import { SupabaseAuthAdapter } from "@/infrastructure/services/supabase/SupabaseAuthAdapter";
import { RegisterFormValues } from "@/infrastructure/validations/authSchemas";
import { AuthMessages } from "@/domain/messages/auth.messages";
import { redirect } from "next/navigation";

export async function registerAction(data: RegisterFormValues): Promise<{ error?: string } | void> {
  const supabase = await createClient();
  const authAdapter = new SupabaseAuthAdapter(supabase);

  try {
    await authAdapter.signUp({
      email: data.email,
      password: data.password,
      fullName: data.fullName,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: AuthMessages.ACTION_REGISTER_FAILED };
  }

  // If the registration is successful, we redirect to login or dashboard
  // Depending on whether Supabase requires email confirmation
  redirect("/login?registered=true");
}
