import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import ProductListing from "../components/product/ProductListing";
import { useApp } from "../hooks/useApp";

export default function Deals() {
  const { resetFilters } = useApp();
  const { allProductsSlice, catalogLoading, catalogError } = useSelector(
    (state) => state.data,
  );

  useEffect(() => {
    resetFilters();
  }, [resetFilters]);

  const dealProducts = useMemo(
    () => allProductsSlice.filter((p) => p.discountPercentage > 10),
    [allProductsSlice],
  );

  return (
    <ProductListing
      title="Deals & Offers"
      subtitle="Discover our best discounts and special offers"
      products={dealProducts}
      loading={catalogLoading}
      error={catalogError}
    />
  );
}
