"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";

const faqs = [
  {
    q: "How long does shipping take?",
    a: "Orders ship within 1–2 business days. Standard delivery is 3–5 business days Australia-wide. Express (1–2 days) is available at checkout.",
  },
  {
    q: "Do you ship internationally?",
    a: "Not yet — we're currently shipping within Australia only. International shipping is coming soon.",
  },
  {
    q: "What's your return policy?",
    a: "If you're not happy, send it back within 30 days for a full refund. The product must be unused and in original packaging.",
  },
  {
    q: "Which speargun size should I get?",
    a: "Start with the 75cm if you're new or dive tight reef. The 90cm is the all-rounder. The 110cm is for experienced divers who want maximum range.",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-background">
      <PageHeader
        tagline="Get in touch"
        title="Contact Us"
        description="Got a question about our spearguns, need help choosing the right size, or just want to chat? We'd love to hear from you."
      />

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-border bg-surface p-6 lg:p-8">
                <h2 className="font-heading text-2xl font-bold text-charcoal">
                  Send us a message
                </h2>
                <p className="mt-2 text-sm text-slate">
                  We'll get back to you within 24 hours.
                </p>

                {submitted ? (
                  <div className="mt-8 rounded-xl bg-ocean/5 p-6 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ocean/10 text-ocean">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="mt-3 font-heading text-lg font-bold text-charcoal">
                      Message sent
                    </h3>
                    <p className="mt-1 text-sm text-slate">
                      Thanks for reaching out — we'll be in touch soon.
                    </p>
                  </div>
                ) : (
                  <form
                    className="mt-6 space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSubmitted(true);
                    }}
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-charcoal">
                          Name
                        </label>
                        <input
                          type="text"
                          required
                          className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-charcoal placeholder:text-slate-light focus:border-ocean focus:outline-none"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-charcoal placeholder:text-slate-light focus:border-ocean focus:outline-none"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal">
                        Subject
                      </label>
                      <select className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-charcoal focus:border-ocean focus:outline-none">
                        <option>Product question</option>
                        <option>Order enquiry</option>
                        <option>Return / Exchange</option>
                        <option>Tutorial feedback</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal">
                        Message
                      </label>
                      <textarea
                        required
                        rows={5}
                        className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-charcoal placeholder:text-slate-light focus:border-ocean focus:outline-none"
                        placeholder="How can we help?"
                      />
                    </div>
                    <button
                      type="submit"
                      className="rounded-lg bg-ocean px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ocean-light"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2">
              {/* Contact Info */}
              <div className="rounded-2xl border border-border bg-surface p-6">
                <h3 className="font-heading text-lg font-bold text-charcoal">
                  Other ways to reach us
                </h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate">
                      Email
                    </p>
                    <p className="mt-1 text-sm text-charcoal">
                      hello@camperdive.com.au
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate">
                      Response Time
                    </p>
                    <p className="mt-1 text-sm text-charcoal">
                      Within 24 hours
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate">
                      Based In
                    </p>
                    <p className="mt-1 text-sm text-charcoal">
                      Gold Coast, Queensland
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
                <h3 className="font-heading text-lg font-bold text-charcoal">
                  Common questions
                </h3>
                <div className="mt-4 space-y-4">
                  {faqs.map((faq) => (
                    <div key={faq.q}>
                      <h4 className="text-sm font-semibold text-charcoal">
                        {faq.q}
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-slate">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
