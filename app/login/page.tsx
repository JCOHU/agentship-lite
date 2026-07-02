"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function sendMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setState(error ? "error" : "sent");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
        <p className="mt-2 text-sm text-zinc-500">
          We&apos;ll email you a magic link — no password needed.
        </p>
        {state === "sent" ? (
          <div className="mt-6 rounded-lg bg-emerald-50 p-4 text-sm text-emerald-800">
            Check your inbox — your sign-in link is on its way.
          </div>
        ) : (
          <form onSubmit={sendMagicLink} className="mt-6 space-y-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-zinc-400"
            />
            <button
              type="submit"
              disabled={state === "sending"}
              className="w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50 transition-colors"
            >
              {state === "sending" ? "Sending…" : "Send magic link"}
            </button>
            {state === "error" && (
              <p className="text-sm text-red-600">Something went wrong — try again.</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
