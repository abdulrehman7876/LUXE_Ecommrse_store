import { useEffect } from "react";
import { useSelector } from "react-redux";
import ProductListing from "../components/product/ProductListing";
import { useApp } from "../hooks/useApp";

export default function Shop() {
  const { resetFilters } = useApp();
  const { allProductsSlice, catalogLoading, catalogError } = useSelector(
    (state) => state.data,
  );

  useEffect(() => {
    resetFilters();
  }, [resetFilters]);

  return (
    <ProductListing
      title="Shop All Products"
      subtitle="Browse our complete collection of premium products"
      products={allProductsSlice}
      loading={catalogLoading}
      error={catalogError}
    />
  );
}
