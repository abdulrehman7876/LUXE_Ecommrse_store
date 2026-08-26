import { useState } from "react";
import { X, SlidersHorizontal } from "lucide-react";
import { useApp } from "../../hooks/useApp";
import { formatCategoryName } from "../../utils/format";
import { useNavigate } from "react-router-dom";

export default function ProductFilters({
  categories = [],
  brands = [],
  isOpen,
  onClose,
  maxPrice = 2000,
}) {
  const navigate = useNavigate();
  const { filters, setFilters, resetFilters } = useApp();

  const handleChange = (key, value) => {
    setFilters({ [key]: value });
  };

  const activeFilterCount = [
    filters.category,
    filters.minPrice !== undefined,
    filters.maxPrice !== undefined,
    filters.minRating,
    filters.inStockOnly,
    filters.brand,
  ].filter(Boolean).length;

  const filterContent = (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-700">
          Category
        </h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm text-brand-600 cursor-pointer">
            <input
              type="radio"
              name="category"
              checked={!filters.category}
              onChange={() => handleChange("category", "")}
              className="accent-brand-900"
            />
            All Categories
          </label>
          {categories.map((cat) => {
            const slug = cat.slug || cat;
            const name = cat.name || formatCategoryName(slug);
            return (
              <label
                key={slug}
                className="flex items-center gap-2 text-sm text-brand-600 cursor-pointer"
              >
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === slug}
                  onChange={() => {
                    handleChange("category", slug);
                    navigate(`/shop/${slug}`);
                    // console.log("pp:", slug);
                  }}
                  className="accent-brand-900"
                />
                {name}
              </label>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-700">
          Price Range
        </h3>
        <div className="flex items-center gap-3">
          <input
            type="number"
            placeholder="Min"
            min="0"
            value={filters.minPrice ?? ""}
            onChange={(e) =>
              handleChange(
                "minPrice",
                e.target.value ? Number(e.target.value) : undefined,
              )
            }
            className="w-full rounded-lg border border-brand-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none"
          />
          <span className="text-brand-400">—</span>
          <input
            type="number"
            placeholder="Max"
            min="0"
            max={maxPrice}
            value={filters.maxPrice ?? ""}
            onChange={(e) =>
              handleChange(
                "maxPrice",
                e.target.value ? Number(e.target.value) : undefined,
              )
            }
            className="w-full rounded-lg border border-brand-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-700">
          Rating
        </h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label
              key={rating}
              className="flex items-center gap-2 text-sm text-brand-600 cursor-pointer"
            >
              <input
                type="radio"
                name="rating"
                checked={filters.minRating === rating}
                onChange={() => handleChange("minRating", rating)}
                className="accent-brand-900"
              />
              {rating}+ Stars
            </label>
          ))}
          <label className="flex items-center gap-2 text-sm text-brand-600 cursor-pointer">
            <input
              type="radio"
              name="rating"
              checked={!filters.minRating}
              onChange={() => handleChange("minRating", undefined)}
              className="accent-brand-900"
            />
            Any Rating
          </label>
        </div>
      </div>

      {brands.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-700">
            Brand
          </h3>
          <select
            value={filters.brand}
            onChange={(e) => handleChange("brand", e.target.value)}
            className="w-full rounded-lg border border-brand-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none"
          >
            <option value="">All Brands</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-700">
          Availability
        </h3>
        <label className="flex items-center gap-2 text-sm text-brand-600 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => handleChange("inStockOnly", e.target.checked)}
            className="accent-brand-900 rounded"
          />
          In Stock Only
        </label>
      </div>

      {activeFilterCount > 0 && (
        <button
          onClick={resetFilters}
          className="w-full rounded-lg border border-brand-200 py-2.5 text-sm font-medium text-brand-600 transition-colors hover:bg-brand-50"
        >
          Clear All Filters ({activeFilterCount})
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24 rounded-xl border border-brand-100 bg-white p-6">
          <div className="mb-6 flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-brand-600" />
            <h2 className="text-base font-semibold text-brand-900">Filters</h2>
          </div>
          {filterContent}
        </div>
      </aside>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={onClose}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 left-0 w-full max-w-sm bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-brand-100 px-6 py-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-brand-600" />
                <h2 className="text-base font-semibold text-brand-900">
                  Filters
                </h2>
              </div>
              <button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-brand-500 hover:bg-brand-50"
                aria-label="Close filters"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div
              className="overflow-y-auto p-6"
              style={{ maxHeight: "calc(100vh - 65px)" }}
            >
              {filterContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
