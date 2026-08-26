import { useState } from "react";
import { useApp } from "../../hooks/useApp";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const { showToast } = useApp();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    showToast("Thank you for subscribing!", "success");
    setEmail("");
  };

  return (
    <section className="border-t border-brand-100 bg-brand-50 py-16 lg:py-20">
      <div className="container-custom">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-bold text-brand-900 sm:text-3xl">
            Stay in the Loop
          </h2>
          <p className="mt-3 text-brand-500">
            Subscribe to our newsletter for exclusive offers, new arrivals, and
            style inspiration.
          </p>
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 rounded-lg border border-brand-200 bg-white px-4 py-3 text-sm focus:border-brand-400 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-lg bg-brand-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-700"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-3 text-xs text-brand-400">
            By subscribing, you agree to our Privacy Policy. Unsubscribe
            anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
