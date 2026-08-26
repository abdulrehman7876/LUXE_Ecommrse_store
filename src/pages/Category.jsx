import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { SlidersHorizontal, Grid3X3, List } from "lucide-react";
import ProductGrid from "../components/product/ProductGrid";
import ProductFilters from "../components/product/ProductFilters";
import Pagination from "../components/ui/Pagination";
import { getProductsByCategory, getCategories } from "../api/products";
import { useApp } from "../hooks/useApp";
import {
  filterProducts,
  sortProducts,
  getUniqueBrands,
  formatCategoryName,
} from "../utils/format";

const ITEMS_PER_PAGE = 12;

export default function Category() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [listView, setListView] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { setFilters, filters, sortBy, setSortBy } = useApp();

  useEffect(() => {
    if (category) {
      setFilters({ category });
    }
    console.log("category", category);
  }, [category, setFilters]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProductsByCategory(category, { limit: 100 }),
          getCategories(),
        ]);
        setProducts(productsData.products);
        setCategories(categoriesData);
      } catch {
        setError("Category not found or failed to load.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [category]);

  const brands = useMemo(() => getUniqueBrands(products), [products]);

  const processedProducts = useMemo(() => {
    let result = filterProducts(products, { ...filters, category: "" });
    result = sortProducts(result, sortBy);
    return result;
  }, [products, filters, sortBy]);

  const totalPages = Math.ceil(processedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = processedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy, category]);

  const categoryName = formatCategoryName(category);

  return (
    <div className="container-custom py-8 lg:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-900">{categoryName}</h1>
        <p className="mt-2 text-brand-500">
          Explore our {categoryName.toLowerCase()} collection
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="flex gap-8">
        <ProductFilters
          categories={categories}
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
                <option value="default">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Highest Rated</option>
                <option value="discount-desc">Biggest Discount</option>
              </select>

              <div className="hidden items-center rounded-lg border border-brand-200 sm:flex">
                <button
                  onClick={() => setListView(false)}
                  className={`flex h-10 w-10 items-center justify-center ${
                    !listView ? "bg-brand-100 text-brand-900" : "text-brand-500"
                  }`}
                  aria-label="Grid view"
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setListView(true)}
                  className={`flex h-10 w-10 items-center justify-center ${
                    listView ? "bg-brand-100 text-brand-900" : "text-brand-500"
                  }`}
                  aria-label="List view"
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
            emptyTitle={`No products in ${categoryName}`}
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
