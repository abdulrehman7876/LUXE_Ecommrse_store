import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductListing from "../components/product/ProductListing";
import { useApp } from "../hooks/useApp";
import { formatCategoryName } from "../utils/format";

export default function Category() {
  const { category } = useParams();
  const { setFilters, resetFilters } = useApp();
  const { allProductsSlice, catalogLoading, catalogError } = useSelector(
    (state) => state.data,
  );

  useEffect(() => {
    if (category) {
      setFilters({ category });
    }
    return () => {
      resetFilters();
    };
  }, [category, setFilters, resetFilters]);

  const products = useMemo(
    () => allProductsSlice.filter((p) => p.category === category),
    [allProductsSlice, category],
  );

  const categoryName = formatCategoryName(category);

  return (
    <ProductListing
      title={categoryName}
      subtitle={`Explore our ${categoryName.toLowerCase()} collection`}
      products={products}
      loading={catalogLoading}
      error={catalogError}
      emptyTitle={`No products in ${categoryName}`}
      ignoreCategory
      resetPageKey={category}
    />
  );
}
