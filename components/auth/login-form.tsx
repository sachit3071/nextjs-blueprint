"use client";

import Link from "next/link";
import { useActionState } from "react";

import { login } from "@/app/(auth)/signin/actions";
import { cn } from "@/lib/utils";

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
};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [state, formAction, pending] =
    useActionState(
      login,
      initialState
    );

  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        className
      )}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle>
            Login to your account
          </CardTitle>

          <CardDescription>
            Enter your email below
            to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form action={formAction}>
            <FieldGroup>
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
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">
                    Password
                  </FieldLabel>

                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your
                    password?
                  </Link>
                </div>

                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                />
              </Field>

              {state?.error && (
                <p className="text-sm text-red-500">
                  {state.error}
                </p>
              )}

              <Field>
                <Button
                  type="submit"
                  disabled={pending}
                  className="w-full"
                >
                  {pending
                    ? "Logging in..."
                    : "Login"}
                </Button>

                <FieldDescription className="text-center">
                  Don&apos;t have
                  an account?{" "}
                  <Link href="/signup">
                    Sign up
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}