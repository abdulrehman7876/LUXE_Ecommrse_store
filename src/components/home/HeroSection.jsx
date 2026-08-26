import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-brand-50">
      <div className="container-custom">
        <div className="grid items-center gap-8 py-6 lg:grid-cols-2 lg:gap-12 lg:py-10">
          <div className="max-w-xl">
            <p className="text-sm font-medium uppercase tracking-widest text-brand-500">
              New Collection 2026
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-brand-900 sm:text-5xl lg:text-6xl">
              Discover Products You&apos;ll Love
            </h1>
            <p className="mt-6 text-base leading-relaxed text-brand-500 sm:text-lg">
              Explore our curated selection of premium fashion, beauty, and
              lifestyle products. Quality craftsmanship meets modern design.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-700"
              >
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/shop#categories"
                className="inline-flex items-center gap-2 rounded-lg border border-brand-300 px-6 py-3 text-sm font-medium text-brand-700 transition-colors hover:bg-white"
              >
                Explore Categories
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-brand-200 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop"
                alt="Premium fashion collection"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 hidden rounded-xl border border-brand-100 bg-white p-4 shadow-md sm:block">
              <p className="text-2xl font-bold text-brand-900">150+</p>
              <p className="text-sm text-brand-500">Premium Products</p>
            </div>
            <div className="absolute -right-4 -top-4 hidden rounded-xl border border-brand-100 bg-white p-4 shadow-md sm:block">
              <p className="text-2xl font-bold text-brand-900">4.8★</p>
              <p className="text-sm text-brand-500">Customer Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
