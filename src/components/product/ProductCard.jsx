import { memo } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../ui/Rating";
import PriceDisplay from "../ui/PriceDisplay";
import { getStockStatus } from "../../utils/format";
import { addToCart, toggleWishlist, addToast } from "../../store/appSlice";

function ProductCard({ product, listView = false }) {
  const dispatch = useDispatch();
  const inWishlist = useSelector((s) =>
    s.app.wishlist.some((i) => i.id === product.id),
  );
  const stock = getStockStatus(product.stock);
  const reviewCount = product.reviews?.length;

  const stockColors = {
    success: "text-green-600 bg-green-50",
    warning: "text-amber-600 bg-amber-50",
    danger: "text-red-600 bg-red-50",
  };

  const handleAddToCart = () => {
    if (product.stock <= 0) return;
    dispatch(addToCart({ product, quantity: 1 }));
    dispatch(
      addToast({ message: `${product.title} added to cart`, type: "success" }),
    );
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(product));
    dispatch(
      addToast({
        message: `${product.title} ${inWishlist ? "removed from" : "added to"} wishlist`,
        type: "info",
      }),
    );
  };

  if (listView) {
    return (
      <article className="group flex gap-4 rounded-xl border border-brand-100 bg-white p-4 transition-shadow hover:shadow-md sm:gap-6">
        <Link to={`/product/${product.id}`} className="shrink-0">
          <div className="h-32 w-32 overflow-hidden rounded-lg bg-brand-50 sm:h-40 sm:w-40">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </Link>
        <div className="flex flex-1 flex-col justify-between">
          <div>
            {product.brand && (
              <p className="text-xs font-medium uppercase tracking-wider text-brand-400">
                {product.brand}
              </p>
            )}
            <Link to={`/product/${product.id}`}>
              <h3 className="mt-1 text-base font-medium text-brand-900 transition-colors hover:text-brand-600 line-clamp-2">
                {product.title}
              </h3>
            </Link>
            <div className="mt-2">
              <Rating rating={product.rating} reviewCount={reviewCount} />
            </div>
            <p className="mt-2 line-clamp-2 text-sm text-brand-500">
              {product.description}
            </p>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <PriceDisplay
                price={product.price}
                discountPercentage={product.discountPercentage}
              />
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${stockColors[stock.variant]}`}
              >
                {stock.label}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleWishlist}
                className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-colors ${
                  inWishlist
                    ? "border-red-200 bg-red-50 text-red-500"
                    : "border-brand-200 text-brand-500 hover:bg-brand-50"
                }`}
                aria-label={
                  inWishlist ? "Remove from wishlist" : "Add to wishlist"
                }
              >
                <Heart
                  className={`h-4 w-4 ${inWishlist ? "fill-current" : ""}`}
                />
              </button>
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              >
                <ShoppingBag className="h-4 w-4" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group relative flex flex-col rounded-xl border border-brand-100 bg-white transition-shadow hover:shadow-md">
      <div className="relative aspect-square overflow-hidden rounded-t-xl bg-brand-50">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {product.discountPercentage > 0 && (
          <span className="absolute left-3 top-3 rounded-md bg-red-600 px-2 py-1 text-xs font-semibold text-white">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}

        <div className="absolute right-3 top-3 flex flex-col gap-2 md:opacity-0 opacity-100 transition-opacity duration-300 group-hover:opacity-100">
          <button
            onClick={handleToggleWishlist}
            className={`flex h-9 w-9 items-center justify-center rounded-full shadow-md transition-colors ${
              inWishlist
                ? "bg-red-500 text-white"
                : "bg-white text-brand-600 hover:bg-brand-50"
            }`}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`h-4 w-4 ${inWishlist ? "fill-current" : ""}`} />
          </button>
        </div>

        <div className="absolute inset-x-0 bottom-0 md:translate-y-full opacity-85 md:opacity-100 translate-y-0 p-3 transition-transform duration-300 group-hover:translate-y-0">
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-900 py-1.5 sm:py-2.5 sm:text-sm text-xs sm:font-medium text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            <ShoppingBag className="h-3 sm:h-4 w-4" />
            {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        {product.brand && (
          <p className="text-xs font-medium uppercase tracking-wider text-brand-400">
            {product.brand}
          </p>
        )}
        <Link to={`/product/${product.id}`}>
          <h3 className="mt-1 text-sm font-medium text-brand-900 transition-colors hover:text-brand-600 line-clamp-2">
            {product.title}
          </h3>
        </Link>
        <div className="mt-2">
          <Rating rating={product.rating} reviewCount={reviewCount} size="sm" />
        </div>
        <div className="mt-auto pt-3">
          <PriceDisplay
            price={product.price}
            discountPercentage={product.discountPercentage}
            size="sm"
          />
          <span
            className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${stockColors[stock.variant]}`}
          >
            {stock.label}
          </span>
        </div>
      </div>
    </article>
  );
}

export default memo(ProductCard);
