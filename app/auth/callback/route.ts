import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { EmailOtpType } from "@supabase/supabase-js";

// Magic-link / OTP callback. Handles two link formats:
//
//  1. `?token_hash=…&type=…` — preferred, stateless. `verifyOtp` needs no PKCE
//     code-verifier cookie, so the link still works when opened in a DIFFERENT
//     browser or device than the one that requested it (mail apps, phones).
//     Requires the Supabase email template to link to
//     `{{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=email`
//     (see README, "Fix the magic-link email template").
//  2. `?code=…` — legacy PKCE fallback (`exchangeCodeForSession`). Only works
//     in the same browser that requested the link; kept so default-template
//     links keep working.
//
// Session cookies must be written onto the SAME response object we return.
// That's why this route builds its own Supabase client instead of using
// lib/supabase/server: setting cookies via next/headers and returning a
// separately constructed redirect drops them — the user "signs in" but the
// browser never stores the session.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = (searchParams.get("type") ?? "email") as EmailOtpType;
  const next = searchParams.get("next") ?? "/dashboard";

  // Only allow same-origin relative redirects (open-redirect protection).
  // Reject protocol-relative ("//evil.com") and backslash ("/\evil.com") tricks.
  const safeNext =
    next.startsWith("/") && !next.startsWith("//") && !next.startsWith("/\\")
      ? next
      : "/dashboard";

  const response = NextResponse.redirect(`${origin}${safeNext}`);

  if (tokenHash || code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const { error } = tokenHash
      ? await supabase.auth.verifyOtp({ type, token_hash: tokenHash })
      : await supabase.auth.exchangeCodeForSession(code!);

    if (!error) {
      return response;
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`);
}
