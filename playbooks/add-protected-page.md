# Playbook: add a protected page

Agent prompt template: "Add a protected page at /dashboard/<name> that <does X>."

## Steps
1. Create `app/dashboard/<name>/page.tsx` as a **server component**.
2. First lines of the component: get the user server-side and redirect if absent —
   ```ts
   const supabase = await createClient(); // from "@/lib/supabase/server"
   const { data: { user } } = await supabase.auth.getUser();
   if (!user) redirect("/login");
   ```
   (Middleware already guards /dashboard/*, but per Hard Rule 3 the page checks too.)
3. Fetch data with the same `supabase` instance — RLS applies automatically.
4. Interactive parts go in a separate `"use client"` component file in the same folder.
5. Run `./scripts/verify.sh`.

## Gotchas
- `params`/`searchParams` are Promises — `await` them.
- Never import `lib/supabase/admin.ts` here.
