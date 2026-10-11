import { useEffect, useState, useMemo } from "react";
import { Grid3X3, List, SlidersHorizontal } from "lucide-react";
import ProductGrid from "../components/product/ProductGrid";
import ProductFilters from "../components/product/ProductFilters";
import Pagination from "../components/ui/Pagination";

import { useApp } from "../hooks/useApp";
import { filterProducts, sortProducts, getUniqueBrands } from "../utils/format";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../api/products";
import { setFeaturedCategories } from "../store/dataSlice";

const ITEMS_PER_PAGE = 12;

const sortOptions = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Highest Rated" },
  { value: "discount-desc", label: "Biggest Discount" },
  { value: "title-asc", label: "Name: A-Z" },
];

export default function Shop({ loading, error, setError }) {
  const [listView, setListView] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { filters, sortBy, setSortBy } = useApp();
  const dispatch = useDispatch();
  const { allProductsSlice, featuredCategories } = useSelector(
    (state) => state.data,
  );
  const allProducts = allProductsSlice;

  useEffect(() => {
    if (featuredCategories.length > 0) return;

    let isCurrent = true;

    getCategories()
      .then((categoriesData) => {
        if (isCurrent) {
          dispatch(setFeaturedCategories(categoriesData));
        }
      })
      .catch(() => {
        if (isCurrent) {
          setError("Failed to load categories. Please try again.");
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [dispatch, featuredCategories.length, setError]);

  const brands = useMemo(() => getUniqueBrands(allProducts), [allProducts]);

  const processedProducts = useMemo(() => {
    let result = [...allProducts];

    result = filterProducts(result, filters);
    result = sortProducts(result, sortBy);
    return result;
  }, [allProducts, filters, sortBy]);

  const totalPages = Math.ceil(processedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = processedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy]);

  return (
    <div className="container-custom py-8 lg:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-900">Shop All Products</h1>
        <p className="mt-2 text-brand-500">
          Browse our complete collection of premium products
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="flex gap-8">
        <ProductFilters
          categories={featuredCategories}
          brands={brands}
          isOpen={filterOpen}
          onClose={() => setFilterOpen(false)}
        />

        <div className="flex-1 min-w-0">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setFilterOpen(true)}
                className="flex items-center gap-2 rounded-lg border border-brand-200 px-4 py-2.5 text-sm font-medium text-brand-700 transition-colors hover:bg-brand-50 lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </button>
              <p className="text-sm text-brand-500">
                {processedProducts.length} product
                {processedProducts.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-brand-200 px-3 py-2.5 text-sm text-brand-700 focus:border-brand-400 focus:outline-none"
                aria-label="Sort products"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              <div className="hidden items-center rounded-lg border border-brand-200 sm:flex">
                <button
                  onClick={() => setListView(false)}
                  className={`flex h-10 w-10 items-center justify-center transition-colors ${
                    !listView
                      ? "bg-brand-100 text-brand-900"
                      : "text-brand-500 hover:bg-brand-50"
                  }`}
                  aria-label="Grid view"
                  aria-pressed={!listView}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setListView(true)}
                  className={`flex h-10 w-10 items-center justify-center transition-colors ${
                    listView
                      ? "bg-brand-100 text-brand-900"
                      : "text-brand-500 hover:bg-brand-50"
                  }`}
                  aria-label="List view"
                  aria-pressed={listView}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <ProductGrid
            products={paginatedProducts}
            loading={loading}
            listView={listView}
          />

          {totalPages > 1 && (
            <div className="mt-10">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
