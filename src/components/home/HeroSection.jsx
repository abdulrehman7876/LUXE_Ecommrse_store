import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-brand-50">
      <div className="container-custom">
        <div className="grid items-center gap-8 py-8 lg:grid-cols-2 lg:gap-12 lg:py-12">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
              Meloza Marketplace
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-[-0.05em] text-brand-900 sm:text-5xl lg:text-6xl">
              Discover More. Shop Better.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-brand-600 sm:text-lg">
              Explore thousands of products across your favorite categories,
              from everyday essentials to standout finds that match your style.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-900/10 transition-colors hover:bg-brand-800"
              >
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/category"
                className="inline-flex items-center gap-2 rounded-xl border border-brand-200 bg-white px-6 py-3 text-sm font-semibold text-brand-900 transition-colors hover:border-brand-300 hover:bg-brand-50"
              >
                Explore Categories
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-[28px] bg-brand-200 shadow-[0_25px_60px_rgba(36,36,91,0.12)]">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop"
                alt="Premium shopping collection"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 hidden rounded-2xl border border-brand-100 bg-white p-4 shadow-md sm:block">
              <p className="text-2xl font-bold text-brand-900">18K+</p>
              <p className="text-sm text-brand-500">Curated Finds</p>
            </div>
            <div className="absolute -right-4 -top-4 hidden rounded-2xl border border-brand-100 bg-white p-4 shadow-md sm:block">
              <p className="text-2xl font-bold text-brand-900">4.8★</p>
              <p className="text-sm text-brand-500">Customer Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
