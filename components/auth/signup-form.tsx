"use client";

import Link from "next/link";
import { useActionState } from "react";

import { signup } from "@/app/(auth)/signup/actions";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const initialState = {
  error: "",
  success: "",
};

export function SignupForm({
  ...props
}: React.ComponentProps<typeof Card>) {
  const [state, formAction, pending] =
    useActionState(
      signup,
      initialState
    );

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>
          Create an account
        </CardTitle>

        <CardDescription>
          Enter your information
          below to create your
          account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form action={formAction}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="firstName">
                First Name
              </FieldLabel>

              <Input
                id="firstName"
                name="firstName"
                type="text"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="lastName">
                Last Name
              </FieldLabel>

              <Input
                id="lastName"
                name="lastName"
                type="text"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">
                Email
              </FieldLabel>

              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="password">
                Password
              </FieldLabel>

              <Input
                id="password"
                name="password"
                type="password"
                required
              />

              <FieldDescription>
                Must be at least 8
                characters long.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="confirmPassword">
                Confirm Password
              </FieldLabel>

              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
              />
            </Field>

            {state?.error && (
              <p className="text-sm text-red-500">
                {state.error}
              </p>
            )}

            {state?.success && (
              <p className="text-sm text-green-600">
                {state.success}
              </p>
            )}

            <Field>
              <Button
                type="submit"
                disabled={pending}
                className="w-full"
              >
                {pending
                  ? "Creating Account..."
                  : "Create Account"}
              </Button>

              <FieldDescription className="px-6 text-center">
                Already have an
                account?{" "}
                <Link href="/login">
                  Sign in
                </Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}