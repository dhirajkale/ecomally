
# Deployment Guide: Vercel + GitHub + Supabase

This guide walks you through deploying Ecomally to production.

## 1. GitHub Setup
1.  Create a new repository on [GitHub](https://github.com/new) named `ecomally`.
2.  Push your local code to GitHub:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/ecomally.git
    git push -u origin master
    ```

## 2. Supabase Setup (Database)
1.  Go to [Supabase](https://supabase.com/) and create a new project.
2.  In **Project Settings** -> **Database** -> **Connection String**, copy two values:
    *   **Transaction Mode (Pool)**: Use this for `DATABASE_URL`.
        *   Example: `postgres://[user]:[password]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true`
    *   **Session Mode (Direct)**: Use this for `DIRECT_URL`.
        *   Example: `postgres://[user]:[password]@aws-0-us-east-1.pooler.supabase.com:5432/postgres`

## 3. Vercel Setup (Hosting)
1.  Go to [Vercel](https://vercel.com/) and click **Add New** -> **Project**.
2.  Import your `ecomally` GitHub repository.
3.  In **Environment Variables**, add the following:

    | Key | Value Description |
    | --- | --- |
    | `DATABASE_URL` | Supabase Transaction (Pool) URL |
    | `DIRECT_URL` | Supabase Session (Direct) URL |
    | `NEXTAUTH_SECRET` | Generate with `openssl rand -base64 32` |
    | `NEXTAUTH_URL` | `https://your-project.vercel.app` (Add this after deployment is created) |
    | `GOOGLE_CLIENT_ID` | Your Google OAuth Client ID |
    | `GOOGLE_CLIENT_SECRET` | Your Google OAuth Client Secret |
    | `SHOPIFY_API_KEY` | Your Shopify App API Key |
    | `SHOPIFY_API_SECRET` | Your Shopify App API Secret |
    | `APP_URL` | `https://your-project.vercel.app` |

4.  Click **Deploy**.

## 4. Final Database Sync
Once deployed, Vercel will build your app, but the database might be empty. You need to push the schema.

From your local terminal (ensure `.env` has the correct Supabase URLs):
```bash
npx prisma db push
```

## 5. Post-Deployment Config
1.  **Update Google OAuth**: Add your new Vercel domain to "Authorized redirect URIs" in Google Cloud Console.
    *   `https://your-project.vercel.app/api/auth/callback/google`
2.  **Update Shopify App**: Update "App URL" and "Allowed redirection URL(s)" in Shopify Partner Dashboard.
    *   `https://your-project.vercel.app/api/shopify/callback`
