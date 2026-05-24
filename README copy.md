# Restaurant Analytics App

A comprehensive analytics dashboard for restaurants built with Next.js, Supabase, and shadcn/ui.

## Features

- **Authentication** – Login and signup powered by Supabase SSR
- **Executive Dashboard** – High-level business overview
- **Sales Analytics** – Track revenue, orders, and sales trends
- **Financial Performance** – Monitor profitability and financial metrics
- **Menu Intelligence** – Analyze menu item performance
- **Operations** – Operational efficiency metrics
- **Marketing** – Campaign and customer engagement analytics
- **Marketplace** – Integration insights
- **Quality Metrics** – Food quality and customer satisfaction tracking
- **Dark/Light Mode** – Theme toggle with next-themes

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Database/Auth:** Supabase
- **UI:** shadcn/ui + Radix UI
- **Styling:** Tailwind CSS v4
- **Charts:** Recharts
- **Icons:** Lucide React
- **Linting:** ESLint
- **Formatting:** Prettier

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase project

### Installation

1. Clone the repository

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```
   Add your Supabase credentials to `.env.local`.

4. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
app/
  (auth)/          # Authentication routes (login, signup)
  (dashboard)/     # Protected dashboard routes
    dashboard/     # Main dashboard
    sales/         # Sales analytics
    financial-performance/
    menu-intelligence/
    operations/
    marketing/
    marketplace/
    quality/
    dashboard/
components/        # Reusable UI components
hooks/             # Custom React hooks
lib/               # Utilities, Supabase client, auth guard
types/             # TypeScript type definitions
```

## Environment Variables

| Variable              | Description              |
| --------------------- | ------------------------ |
| `NEXT_PUBLIC_SUPABASE_URL`       | Supabase project URL     |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`  | Supabase anonymous key   |
