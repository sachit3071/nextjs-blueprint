# NextJS-Blueprint

A Next.js starter template with **Supabase authentication**, **Row Level Security (RLS)**, and **Role-Based Access Control (RBAC)**.

## Features

- **Next.js 16** with App Router and Turbopack
- **Supabase Auth** — email/password authentication via `@supabase/ssr`
- **RBAC** — `admin`, `staff`, `user` roles with RLS policies
- **Server & Client Supabase clients** — pre-configured for Server Components, Client Components, and Middleware
- **Auth Guard** — `useAuthGuard()` hook for protected client pages
- **Theme support** — light/dark/system with `next-themes`
- **Tailwind CSS v4** — utility-first styling
- **shadcn/ui** — component library ready

## Prerequisites

- Node.js 18+
- A Supabase project ([create one here](https://supabase.com))

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.local` and fill in your Supabase project credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-id>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

You can find these in your Supabase dashboard under **Settings → API**.

### 3. Run the SQL in Supabase SQL Editor

First, create the `user_role` enum type:

```sql
CREATE TYPE user_role AS ENUM ('admin', 'staff', 'user');
```

Then create the `users` table:

```sql
CREATE TABLE public.users (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name TEXT NOT NULL DEFAULT '',
    last_name TEXT NOT NULL DEFAULT '',
    email TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    password TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'user'
);
```

### 4. Start the dev server

```bash
npm run dev
```

## Database Schema

The `public.users` table is the core of the RBAC system.

| Column       | Type        | Description                                |
| ------------ | ----------- | ------------------------------------------ |
| `user_id`    | `UUID`      | Primary key, references `auth.users.id`    |
| `first_name` | `TEXT`      | User's first name (default `''`)           |
| `last_name`  | `TEXT`      | User's last name (default `''`)            |
| `email`      | `TEXT`      | User's email address                       |
| `created_at` | `TIMESTAMPTZ` | Account creation timestamp               |
| `password`   | `TEXT`      | User's password                            |
| `role`       | `user_role` | Role: `admin`, `staff`, or `user` (default `user`) |

## Auth Flow

### Sign Up

```ts
import { createClient } from "@/lib/supabase/client"

const supabase = createClient()
const { data, error } = await supabase.auth.signUp({
  email: "user@example.com",
  password: "secure-password",
})
```

On successful signup, the trigger `on_auth_user_created` automatically inserts a row into `public.users`.

### Sign In

```ts
const { data, error } = await supabase.auth.signInWithPassword({
  email: "user@example.com",
  password: "secure-password",
})
```

### Sign Out

```ts
await supabase.auth.signOut()
```

## Protected Routes

### Client-side

Use the `useAuthGuard` hook in any client component to redirect unauthenticated users:

```tsx
"use client"

import { useAuthGuard } from "@/lib/auth-guard"

export default function DashboardPage() {
  const authenticated = useAuthGuard()
  if (!authenticated) return null

  return <div>Protected content</div>
}
```

### Server-side

Use the server Supabase client in Server Components or Route Handlers:

```ts
import { createClient } from "@/lib/supabase/server"

const supabase = await createClient()
const { data: { user } } = await supabase.auth.getUser()
```

### Middleware

The middleware at `middleware.ts` (or `lib/supabase/middleware.ts`) refreshes the auth session on every request. The `matcher` is configured to skip static assets.

## RBAC

To check a user's role:

```ts
import { createClient } from "@/lib/supabase/server"

const supabase = await createClient()
const { data: { user } } = await supabase.auth.getUser()

if (user) {
  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("user_id", user.id)
    .single()

  // profile.role => "admin" | "staff" | "user"
}
```

RLS policies on `public.users` ensure users can only read/update their own row. To grant admin access, update a user's role directly in the Supabase dashboard.

## Project Structure

```
.
├── app/                     # Next.js App Router pages
│   ├── (auth)/              # Auth route group
│   │   ├── signin/
│   │   └── signup/
│   └── layout.tsx
├── components/              # Reusable UI components
├── lib/
│   ├── supabase/
│   │   ├── client.ts        # Browser Supabase client
│   │   ├── server.ts        # Server Supabase client
│   │   └── middleware.ts    # Middleware client
│   ├── auth-guard.ts        # useAuthGuard hook
│   └── utils.ts             # cn() utility
├── types/
│   └── index.ts             # TypeScript interfaces
├── supabase/migrations/     # SQL migrations
├── middleware.ts            # Session refresh middleware
└── .env.local               # Environment variables
```
