import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SignOutButton } from "./actions-ui";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", user.id)
    .single();

  const plan = profile?.plan ?? "free";

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <SignOutButton />
      </div>
      <div className="mt-8 rounded-xl border border-zinc-200 p-6">
        <p className="text-sm text-zinc-500">Signed in as</p>
        <p className="font-medium">{user.email}</p>
        <p className="mt-4 text-sm text-zinc-500">Current plan</p>
        <p className="font-medium capitalize">{plan}</p>
      </div>
      <p className="mt-6 text-sm text-zinc-500">
        This is your protected app area. Build features here — see{" "}
        <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs">playbooks/</code> for
        agent-ready recipes.
      </p>
      <div className="mt-6 rounded-xl border border-dashed border-zinc-300 p-6">
        <p className="font-medium">Want Stripe billing wired in?</p>
        <p className="mt-1 text-sm text-zinc-500">
          AgentShip Pro adds subscription checkout, a signature-verified webhook, plan gating,
          and the full set of agent playbooks.{" "}
          <a
            href="https://sortielabs.gumroad.com/l/yofswq"
            className="text-zinc-900 underline underline-offset-2"
            target="_blank"
            rel="noopener"
          >
            Get AgentShip Pro →
          </a>
        </p>
      </div>
    </div>
  );
}
