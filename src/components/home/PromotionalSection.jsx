import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function PromotionalSection() {
  return (
    <section className="py-16 lg:py-20">
      <div className="container-custom">
        <div className="relative overflow-hidden rounded-[28px] bg-brand-900">
          <div className="grid lg:grid-cols-2">
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
              <span className="inline-flex w-fit rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
                Limited Time Offer
              </span>
              <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
                Big Deals. Better Choices.
              </h2>
              <p className="mt-4 max-w-md text-base text-white/75">
                Save on essentials, trend picks, and top-rated bestsellers with
                fresh offers curated just for your next cart refresh.
              </p>
              <Link
                to="/shop?deals=true"
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-brand-900 transition-colors hover:bg-[#f08d44]"
              >
                Shop the Sale
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="relative hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1483985988354-763728e1935b?w=700&h=500&fit=crop"
                alt="Shopping sale promotion"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-900/50 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
