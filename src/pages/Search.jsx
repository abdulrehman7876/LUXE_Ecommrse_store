import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";
import ProductGrid from "../components/product/ProductGrid";
import EmptyState from "../components/ui/EmptyState";
import { searchProducts } from "../api/products";
import { useApp } from "../hooks/useApp";
import { sortProducts, filterProducts } from "../utils/format";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { sortBy, setSortBy, filters, resetFilters } = useApp();

  useEffect(() => {
    resetFilters();
  }, [resetFilters]);

  useEffect(() => {
    if (!query.trim()) return;

    let current = true;

    async function search() {
      setLoading(true);
      setError(null);
      try {
        const data = await searchProducts(query, { limit: 50 });
        if (!current) return;
        setProducts(data.products);
      } catch {
        if (!current) return;
        setError("Search failed. Please try again.");
        setProducts([]);
      } finally {
        if (current) {
          setLoading(false);
        }
      }
    }
    search();

    return () => {
      current = false;
    };
  }, [query]);

  const processedProducts = useMemo(() => {
    let result = filterProducts(products, filters);
    result = sortProducts(result, sortBy);
    return result;
  }, [products, filters, sortBy]);

  if (!query.trim()) {
    return (
      <div className="container-custom py-16">
        <EmptyState
          icon={SearchIcon}
          title="Search Products"
          description="Enter a search term to find products across our catalog."
          actionLabel="Browse All Products"
          actionTo="/shop"
        />
      </div>
    );
  }

  return (
    <div className="container-custom py-8 lg:py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-brand-900 sm:text-3xl">
          Search Results
        </h1>
        <p className="mt-2 text-brand-500">
          {loading
            ? `Searching for "${query}"...`
            : `${processedProducts.length} result${processedProducts.length !== 1 ? "s" : ""} for "${query}"`}
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="mb-6 flex justify-end">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-lg border border-brand-200 px-3 py-2.5 text-sm text-brand-700 focus:border-brand-400 focus:outline-none"
          aria-label="Sort results"
        >
          <option value="default">Relevance</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Highest Rated</option>
        </select>
      </div>

      {!loading && processedProducts.length === 0 ? (
        <EmptyState
          icon={SearchIcon}
          title="No Results Found"
          description={`We couldn't find any products matching "${query}". Try different keywords or browse our catalog.`}
          actionLabel="Browse All Products"
          actionTo="/shop"
        />
      ) : (
        <ProductGrid products={processedProducts} loading={loading} />
      )}
    </div>
  );
}
