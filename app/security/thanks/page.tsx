import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Security Acknowledgments",
  description: "Public acknowledgments for responsible security disclosures on nitishkr.fun.",
  alternates: {
    canonical: "https://nitishkr.fun/security/thanks",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function SecurityThanksPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-6 py-16 sm:px-10">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Security Acknowledgments</h1>

      <p className="mt-4 text-base text-[var(--color-muted-foreground)]">
        Thank you to everyone who practices responsible disclosure and helps keep this site safer.
      </p>

      <section className="mt-10 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
        <h2 className="text-xl font-semibold">Current Status</h2>
        <p className="mt-3 text-[var(--color-muted-foreground)]">
          There are no public security acknowledgments yet. Valid reports will be reviewed and credited here with
          permission.
        </p>
      </section>

      <section className="mt-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
        <h2 className="text-xl font-semibold">Report a Vulnerability</h2>
        <p className="mt-3 text-[var(--color-muted-foreground)]">
          Please use the contact channels listed in the security policy.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/.well-known/security.txt"
            className="rounded-md border border-[var(--color-border)] px-4 py-2 text-sm hover:bg-[var(--color-muted)]"
          >
            View security.txt
          </Link>
          <Link
            href="/#contact"
            className="rounded-md border border-[var(--color-border)] px-4 py-2 text-sm hover:bg-[var(--color-muted)]"
          >
            Contact
          </Link>
        </div>
      </section>
    </main>
  )
}
