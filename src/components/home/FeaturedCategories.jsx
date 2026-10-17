import { useMemo } from "react";
import { Link } from "react-router-dom";
import CategoryCard from "../category/CategoryCard";
import LoadingSkeleton from "../ui/LoadingSkeleton";
import { useSelector } from "react-redux";

export default function FeaturedCategories({ limit = 8 }) {
  const { featuredCategories, allProductsSlice, catalogLoading } = useSelector(
    (state) => state.data,
  );

  const categories = useMemo(
    () =>
      limit === 8
        ? featuredCategories.slice(0, limit)
        : featuredCategories,
    [featuredCategories, limit],
  );

  const counts = useMemo(
    () =>
      allProductsSlice.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
      }, {}),
    [allProductsSlice],
  );

  const loading = catalogLoading && featuredCategories.length === 0;

  return (
    <section id="categories" className="py-16 lg:py-20">
      <div className="container-custom">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-brand-900 sm:text-3xl">
              Shop by Category
            </h2>
            <p className="mt-2 text-brand-500">
              Browse our curated collections
            </p>
          </div>
          {limit === 8 && (
            <Link
              to="/category"
              className="hidden text-sm font-medium text-brand-700 hover:text-brand-900 sm:block"
            >
              View All →
            </Link>
          )}
        </div>

        <div className="mt-8">
          {loading ? (
            <LoadingSkeleton variant="category" count={limit} />
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {categories.map((cat) => (
                <CategoryCard
                  key={cat.slug}
                  category={cat}
                  productCount={counts[cat.slug]}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
