import Link from "next/link";
import { stripe } from "@/lib/stripe";

export const metadata = {
  title: "Order Confirmed",
  description: "Thank you for your purchase from CamperDive.",
};

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  let customerEmail: string | null = null;

  if (session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      customerEmail = session.customer_details?.email ?? null;
    } catch {
      // Invalid or expired session — still show success page
    }
  }

  return (
    <div className="bg-background">
      <section className="py-24">
        <div className="mx-auto max-w-xl px-6 text-center">
          {/* Checkmark Icon */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ocean/10">
            <svg
              className="h-8 w-8 text-ocean"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="mt-6 font-heading text-3xl font-bold tracking-tight text-charcoal">
            Order confirmed
          </h1>
          <p className="mt-3 text-base leading-relaxed text-slate">
            Thanks for your purchase! Your order is being processed and you'll
            receive a confirmation email
            {customerEmail ? (
              <>
                {" "}
                at{" "}
                <span className="font-semibold text-charcoal">
                  {customerEmail}
                </span>
              </>
            ) : null}{" "}
            shortly.
          </p>

          {/* Order Details Card */}
          <div className="mt-8 rounded-2xl border border-border bg-surface p-6 text-left">
            <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-slate">
              What happens next
            </h2>
            <ul className="mt-4 space-y-3">
              {[
                "You'll receive an email confirmation with your order details.",
                "We'll pack and ship your gear within 1–2 business days.",
                "Standard delivery takes 3–5 business days Australia-wide.",
              ].map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ocean text-[10px] font-bold text-white">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/products"
              className="rounded-lg bg-ocean px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ocean-light"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="rounded-lg border border-border px-6 py-3 text-sm font-semibold text-charcoal transition-colors hover:bg-surface"
            >
              Back to Home
            </Link>
          </div>

          {/* Support link */}
          <p className="mt-8 text-xs text-slate-light">
            Have a question about your order?{" "}
            <Link
              href="/contact"
              className="font-medium text-ocean underline-offset-2 hover:underline"
            >
              Contact us
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
