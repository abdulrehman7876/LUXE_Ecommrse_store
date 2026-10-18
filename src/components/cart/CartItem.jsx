import { Link } from "react-router-dom";
import { Heart, Trash2 } from "lucide-react";
import { useApp } from "../../hooks/useApp";
import PriceDisplay from "../ui/PriceDisplay";
import QuantitySelector from "../ui/QuantitySelector";
import { formatPrice } from "../../utils/format";

export default function CartItem({ item }) {
  const { updateCartQuantity, removeFromCart, toggleWishlist, isInWishlist } =
    useApp();
  const inWishlist = isInWishlist(item.id);
  const subtotal = item.price * item.quantity;

  return (
    <div className="flex gap-4 border-b border-brand-100 py-6 last:border-0">
      <Link to={`/product/${item.id}`} className="shrink-0">
        <div className="h-24 w-24 overflow-hidden rounded-lg bg-brand-50 sm:h-28 sm:w-28">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="h-full w-full object-cover"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col justify-between min-w-0">
        <div>
          {item.brand && (
            <p className="text-xs font-medium uppercase tracking-wider text-brand-400">
              {item.brand}
            </p>
          )}
          <Link to={`/product/${item.id}`}>
            <h3 className="mt-0.5 text-sm font-medium text-brand-900 hover:text-brand-600 line-clamp-2">
              {item.title}
            </h3>
          </Link>
          <div className="mt-2">
            <PriceDisplay
              price={item.price}
              discountPercentage={item.discountPercentage}
              size="sm"
            />
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <QuantitySelector
            quantity={item.quantity}
            onChange={(qty) => updateCartQuantity(item.id, qty)}
            max={item.stock}
            size="sm"
          />
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleWishlist(item)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors cursor-pointer ${
                inWishlist
                  ? "border-red-200 bg-red-50 text-red-500"
                  : "border-brand-200 text-brand-500 hover:bg-brand-50"
              }`}
              aria-label={
                inWishlist ? "Remove from wishlist" : "Move to wishlist"
              }
            >
              <Heart
                className={`h-4 w-4 ${inWishlist ? "fill-current" : ""}`}
              />
            </button>
            <button
              onClick={() => removeFromCart(item.id)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-200 text-brand-500 transition-colors hover:bg-red-50 hover:text-red-500 hover:border-red-200 cursor-pointer"
              aria-label="Remove item"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="block text-right shrink-0 w-20">
        <p className="text-sm font-semibold text-brand-900">
          {formatPrice(subtotal)}
        </p>
      </div>
    </div>
  );
}
