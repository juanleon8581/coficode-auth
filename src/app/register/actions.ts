"use server";

import { createClient } from "@/infrastructure/services/supabase/server";
import { SupabaseAuthAdapter } from "@/infrastructure/services/supabase/SupabaseAuthAdapter";
import { RegisterFormValues } from "@/infrastructure/validations/authSchemas";
import { redirect } from "next/navigation";

export async function registerAction(data: RegisterFormValues) {
  const supabase = await createClient();
  const authAdapter = new SupabaseAuthAdapter(supabase);

  await authAdapter.signUp({
    email: data.email,
    password: data.password,
    fullName: data.fullName,
  });

  // If the registration is successful, we redirect to login or dashboard
  // Depending on whether Supabase requires email confirmation
  redirect("/login?registered=true");
}
