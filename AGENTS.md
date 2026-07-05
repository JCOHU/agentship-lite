<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AgentShip Lite — agent working rules

You are working in AgentShip Lite, a Next.js 16 + Supabase SaaS starter designed for
AI-agent development. (Stripe billing, the billing playbooks, and the service-role webhook
live in AgentShip Pro — https://sortielabs.gumroad.com/l/yofswq.) Follow these rules exactly.

## After EVERY change
Run `./scripts/verify.sh`. It typechecks, lints, and builds. Do not report a task as done
if verify fails. No exceptions.

## Architecture (do not restructure)
- `app/` — routes. Marketing pages are public; everything under `app/dashboard` is auth-protected by `middleware.ts`.
- `lib/supabase/` — `client.ts` (browser) and `server.ts` (server components/route handlers).
- `supabase/migrations/` — SQL migrations, numbered. New tables ALWAYS get RLS enabled with explicit policies in the same migration.

## Hard rules
1. Never expose `SUPABASE_SERVICE_ROLE_KEY` to the client. Anything prefixed `NEXT_PUBLIC_` is public.
2. Every new table: enable RLS + write policies before writing app code against it.
3. Auth checks happen server-side (`supabase.auth.getUser()` in the page/route), even for routes middleware already guards.
4. `params` and `cookies()` are async in this Next.js — `await` them.

## Common tasks → playbooks
- Add a protected page → `playbooks/add-protected-page.md`
