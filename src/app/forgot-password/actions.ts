"use server";

import { createClient } from "@/infrastructure/services/supabase/server";
import { SupabaseAuthAdapter } from "@/infrastructure/services/supabase/SupabaseAuthAdapter";
import { ForgotPasswordFormValues } from "@/infrastructure/validations/authSchemas";

export async function forgotPasswordAction(data: ForgotPasswordFormValues): Promise<{ error?: string, success?: true }> {
  const supabase = await createClient();
  const authAdapter = new SupabaseAuthAdapter(supabase);

  try {
    await authAdapter.resetPassword(data.email);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "Failed to request password reset" };
  }

  // Return logic, the client will show the success banner
  return { success: true };
}
