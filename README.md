# AgentShip Lite

**A free, open-source Next.js 16 + Supabase starter built to be extended by AI coding agents.**
*By [Sortie Labs](https://joshuaquill80.gumroad.com/l/yofswq) — small studio shipping tools for people who build with AI.*

You're going to build your SaaS by prompting Claude Code, Cursor, or another agent anyway.
Generic starters fight that — undocumented conventions, security rules that live in the
founder's head, no way for the agent to check its own work. AgentShip is structured for it.

This is the **free Lite edition**: auth, database, and the full agent-readiness layer.
Stripe billing and the billing playbooks are in **[AgentShip Pro →](https://joshuaquill80.gumroad.com/l/yofswq)**.

## What's inside

| | Lite (free) | Pro |
|---|:---:|:---:|
| Next.js 16 + Tailwind v4 + TypeScript | ✅ | ✅ |
| Supabase magic-link auth + session middleware | ✅ | ✅ |
| RLS-locked `profiles` table + migration | ✅ | ✅ |
| Protected dashboard | ✅ | ✅ |
| `AGENTS.md` / `CLAUDE.md` agent rules | ✅ | ✅ |
| `scripts/verify.sh` typecheck+lint+build gate | ✅ | ✅ |
| "Add a protected page" playbook | ✅ | ✅ |
| **Stripe subscription checkout** | — | ✅ |
| **Signature-verified Stripe webhook + plan gating** | — | ✅ |
| **"Add a paid plan" + "webhook event" playbooks** | — | ✅ |
| **Commercial license (unlimited client projects)** | MIT | ✅ |

**[Get AgentShip Pro — $99 →](https://joshuaquill80.gumroad.com/l/yofswq)**

## Quickstart (~15 min)

1. `npm install && cp .env.example .env.local`
2. Create a free Supabase project → paste URL + anon key into `.env.local` → run
   `supabase/migrations/0001_profiles.sql` in the SQL editor → enable Email (magic link).
3. `npm run dev`, sign in at `/login`, land on the protected `/dashboard`.
4. Ship: `vercel` (add the same env vars in Vercel).

## Why "agent-ready"?

- **`AGENTS.md` / `CLAUDE.md`** — working rules your agent follows: architecture map, security hard rules, async-params gotchas.
- **`playbooks/`** — step-by-step recipes written as agent prompts.
- **`scripts/verify.sh`** — one command the agent rules require after every change, so regressions surface immediately.
- **Security in the structure** — RLS on by default, server-side auth checks, secrets never exposed to the client.

## License

MIT — see [LICENSE](LICENSE). Build anything with it.
The Pro edition ships under a commercial license (unlimited projects; no resale as a starter).
