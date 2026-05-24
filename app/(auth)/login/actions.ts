"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function login(
  prevState: any,
  formData: FormData
) {
  const supabase =
    await createClient();

  const email =
    formData.get(
      "email"
    ) as string;

  const password =
    formData.get(
      "password"
    ) as string;

  const { error } =
    await supabase.auth.signInWithPassword(
      {
        email,
        password,
      }
    );

  if (error) {
    return {
      error:
        "Invalid email or password.",
    };
  }

  redirect("/dashboard");
}