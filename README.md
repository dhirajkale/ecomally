
# Ecomally SaaS Platform

A full-stack SaaS for D2C brands focusing on analytics, attribution, content optimization, and audience building. Built with Next.js 15, TypeScript, Tailwind CSS, Prisma, and NextAuth.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **Database**: PostgreSQL (via Prisma ORM)
- **Auth**: NextAuth.js (v5 Beta)
- **Payments**: Stripe (Ready for integration)
- **Charts**: Recharts / Tremor

## Features Implemented

1.  **Authentication**: Google OAuth & Email via NextAuth.
2.  **Shopify Integration**:
    - OAuth flow for connecting stores (`/api/shopify/auth`)
    - Webhook handler for server-side events (`/api/shopify/webhooks`)
    - Helper library (`lib/shopify.ts`)
3.  **Tracking Module**:
    - First-party pixel script (`public/pixel.js`)
    - Event ingestion API (`/api/track/event`)
    - Attribution logic via Prisma schema
4.  **Dashboard**:
    - Creative Analysis (`/dashboard/creatives`)
    - Audience Segments (`/dashboard/audiences`)
    - Basic Settings (`/dashboard/settings`)

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install --legacy-peer-deps
    ```
    *(Note: `--legacy-peer-deps` is required due to React 19 vs Tremor React 18 conflicts)*

2.  **Environment Variables**:
    Create `.env` based on `.env.example`:
    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/ecomally"
    NEXTAUTH_SECRET="your-secret"
    GOOGLE_CLIENT_ID="..."
    GOOGLE_CLIENT_SECRET="..."
    SHOPIFY_API_KEY="..."
    SHOPIFY_API_SECRET="..."
    APP_URL="http://localhost:3000"
    ```

3.  **Database Setup**:
    ```bash
    npx prisma db push
    ```

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```

## Project Structure

- `/app`: App Router pages and API routes
- `/components`: UI components (Sidebar, Charts, Table)
- `/lib`: Utilities (Prisma, Shopify, Auth)
- `/prisma`: Database schema
- `/public`: Static assets (pixel.js)

## Deployment

Deploy to Vercel:
1.  Push to GitHub.
2.  Import project in Vercel.
3.  Set Environment Variables.
4.  Deploy.
