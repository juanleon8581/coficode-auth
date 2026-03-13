"use server";

import { createClient } from "@/infrastructure/services/supabase/server";
import { SupabaseAuthAdapter } from "@/infrastructure/services/supabase/SupabaseAuthAdapter";
import { LoginFormValues } from "@/infrastructure/validations/authSchemas";
import { AuthMessages } from "@/domain/messages/auth.messages";
import { redirect } from "next/navigation";

export async function loginAction(
  data: LoginFormValues,
): Promise<{ error?: string } | void> {
  const supabase = await createClient();
  const authAdapter = new SupabaseAuthAdapter(supabase);

  try {
    await authAdapter.signIn({
      email: data.email,
      password: data.password,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: AuthMessages.ACTION_LOGIN_FAILED };
  }

  // If the login is successful, we redirect to the main list or dashboard
  redirect("/dashboard");
}
