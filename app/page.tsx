import Link from "next/link";

const features = [
  {
    t: "Auth that just works",
    d: "Supabase magic-link sign-in, session middleware, protected routes, and an RLS-locked profiles table — wired end to end.",
  },
  {
    t: "Billing when you need it",
    d: "AgentShip Pro adds Stripe subscriptions with checkout, signature-verified webhooks, and plan gating — plumbed straight through to your database.",
  },
  {
    t: "Built for AI-agent development",
    d: "CLAUDE.md conventions, task playbooks, and a verify script your coding agent runs after every change. Ship features by prompting, safely.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <header className="mx-auto max-w-5xl px-5 h-16 flex items-center justify-between">
        <span className="font-semibold tracking-tight text-lg">AgentShip</span>
        <nav className="flex items-center gap-5 text-sm">
          <a href="#features" className="text-zinc-600 hover:text-zinc-900">Features</a>
          <Link
            href="/login"
            className="rounded-lg bg-zinc-900 px-4 py-2 text-white font-medium hover:bg-zinc-700 transition-colors"
          >
            Sign in
          </Link>
        </nav>
      </header>

      <section className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
          The SaaS starter built to be
          <br className="hidden sm:block" /> extended by AI agents
        </h1>
        <p className="mt-5 text-lg text-zinc-600 max-w-xl mx-auto">
          Next.js 16 and Supabase auth — pre-wired and documented so your coding agent can add
          features without breaking things. (Stripe billing ships in Pro.)
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/login"
            className="rounded-lg bg-zinc-900 px-5 py-3 text-white font-medium hover:bg-zinc-700 transition-colors"
          >
            Try the demo →
          </Link>
          <a
            href="#features"
            className="rounded-lg border border-zinc-200 px-5 py-3 font-medium hover:border-zinc-400 transition-colors"
          >
            What&apos;s inside
          </a>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-5xl px-5 pb-24 grid gap-6 md:grid-cols-3">
        {features.map((f) => (
          <div key={f.t} className="rounded-xl border border-zinc-200 p-6">
            <h2 className="font-semibold">{f.t}</h2>
            <p className="mt-2 text-sm text-zinc-600">{f.d}</p>
          </div>
        ))}
      </section>

      <footer className="border-t border-zinc-100 py-8 text-center text-sm text-zinc-500">
        AgentShip — replace this landing page with your product. See playbooks/customise-landing.md
      </footer>
    </div>
  );
}
