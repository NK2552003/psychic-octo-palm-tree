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
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28 md:px-8 md:pt-32 lg:px-10">
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">Security Acknowledgments</h1>

      <p className="mt-4 max-w-prose text-sm leading-7 text-[var(--color-muted-foreground)] sm:text-base">
        Thank you to everyone who practices responsible disclosure and helps keep this site safer.
      </p>

      <section className="mt-8 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 sm:mt-10 sm:p-6">
        <h2 className="text-lg font-semibold sm:text-xl">Current Status</h2>
        <p className="mt-3 text-sm leading-7 text-[var(--color-muted-foreground)] sm:text-base">
          There are no public security acknowledgments yet. Valid reports will be reviewed and credited here with
          permission.
        </p>
      </section>

      <section className="mt-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 sm:mt-6 sm:p-6">
        <h2 className="text-lg font-semibold sm:text-xl">Report a Vulnerability</h2>
        <p className="mt-3 text-sm leading-7 text-[var(--color-muted-foreground)] sm:text-base">
          Please use the contact channels listed in the security policy.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/.well-known/security.txt"
            className="w-full rounded-md border border-[var(--color-border)] px-4 py-2 text-center text-sm hover:bg-[var(--color-muted)] sm:w-auto"
          >
            View security.txt
          </Link>
          <Link
            href="/#contact"
            className="w-full rounded-md border border-[var(--color-border)] px-4 py-2 text-center text-sm hover:bg-[var(--color-muted)] sm:w-auto"
          >
            Contact
          </Link>
        </div>
      </section>
    </main>
  )
}
