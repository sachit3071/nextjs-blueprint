"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Profile } from "@/types";

export async function signup(
  prevState: {
    error?: string;
    success?: string;
  },
  formData: FormData
): Promise<{ error?: string; success?: string }> {
  const supabase =
    await createClient();

  const firstName =
    formData.get(
      "firstName"
    ) as string;

  const lastName =
    formData.get(
      "lastName"
    ) as string;

  const email =
    formData.get(
      "email"
    ) as string;

  const password =
    formData.get(
      "password"
    ) as string;

  const confirmPassword =
    formData.get(
      "confirmPassword"
    ) as string;

  // Validation
  if (!firstName?.trim()) {
    return {
      error:
        "First name is required.",
    };
  }
  if (!lastName?.trim()) {
    return {
      error:
        "Last name is required.",
    };
  }

  if (!email?.trim()) {
    return {
      error:
        "Email is required.",
    };
  }

  if (password.length < 8) {
    return {
      error:
        "Password must be at least 8 characters long.",
    };
  }

  if (
    password !==
    confirmPassword
  ) {
    return {
      error:
        "Passwords do not match.",
    };
  }

  const { data, error } =
    await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    }
    );

  if (error) {
    return {
      error:
        error.message,
    };
  }

  if (!data.user) {
    return { error: "Failed to create user account." };
  }

  const profile: Profile = {
    user_id: data.user.id,
    first_name: firstName,
    last_name: lastName,
    email,
    created_at: new Date(),
  }

  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .insert(profile)
    .select()
    .single();

  if (profileError) {
    console.error("Profile creation error:", profileError.message);
  }

  // Redirect after signup
  redirect("/dashboard");
}