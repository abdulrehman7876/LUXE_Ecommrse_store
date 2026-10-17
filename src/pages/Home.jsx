import { useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import HeroSection from "../components/home/HeroSection";
import FeaturedCategories from "../components/home/FeaturedCategories";
import PromotionalSection from "../components/home/PromotionalSection";
import NewsletterSection from "../components/home/NewsletterSection";
import ProductGrid from "../components/product/ProductGrid";
import ProductCard from "../components/product/ProductCard";
import { useSelector } from "react-redux";

function ProductScroller({ title, subtitle, products, loading }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-16 lg:py-20">
      <div className="container-custom">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-brand-900 sm:text-3xl">
              {title}
            </h2>
            {subtitle && <p className="mt-2 text-brand-500">{subtitle}</p>}
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <button
              onClick={() => scroll("left")}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-300 text-brand-600 transition-colors hover:bg-brand-50 cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-300 text-brand-600 transition-colors hover:bg-brand-50 cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-8">
          {loading ? (
            <ProductGrid loading />
          ) : (
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide sm:gap-6"
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="w-[260px] shrink-0 sm:w-[280px]"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { allProductsSlice, catalogLoading } = useSelector(
    (state) => state.data,
  );

  const featured = useMemo(
    () => allProductsSlice.slice(0, 8),
    [allProductsSlice],
  );

  const bestSellers = useMemo(
    () =>
      [...allProductsSlice]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 12),
    [allProductsSlice],
  );

  return (
    <>
      <HeroSection />
      <FeaturedCategories />

      <section className="bg-brand-50 py-16 lg:py-20">
        <div className="container-custom">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-brand-900 sm:text-3xl">
                Featured Products
              </h2>
              <p className="mt-2 text-brand-500">
                Handpicked items just for you
              </p>
            </div>
            <Link
              to="/shop"
              className="text-sm font-medium text-brand-700 hover:text-brand-900"
            >
              View All →
            </Link>
          </div>
          <div className="mt-8">
            <ProductGrid products={featured} loading={catalogLoading} />
          </div>
        </div>
      </section>

      <PromotionalSection />

      <ProductScroller
        title="Best Sellers"
        subtitle="Our most popular products this season"
        products={bestSellers}
        loading={catalogLoading}
      />

      <NewsletterSection />
    </>
  );
}
