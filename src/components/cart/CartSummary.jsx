import { useState } from "react";
import { Link } from "react-router-dom";
import { Tag } from "lucide-react";
import { useApp } from "../../hooks/useApp";
import { formatPrice } from "../../utils/format";

export default function CartSummary({ showCheckout = true }) {
  const { cart, cartSubtotal, showToast } = useApp();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const discount = promoApplied ? cartSubtotal * 0.1 : 0;
  const shipping = cartSubtotal > 100 ? 0 : cart.length > 0 ? 9.99 : 0;
  const tax = cartSubtotal * 0.08;
  const total = cartSubtotal - discount + shipping + tax;

  const handlePromo = (e) => {
    e.preventDefault();
    if (promoCode.toUpperCase() === "LUXE10") {
      setPromoApplied(true);
      showToast("Promo code applied! 10% discount", "success");
    } else if (promoCode) {
      showToast("Invalid promo code", "error");
    }
  };

  return (
    <div className="rounded-xl border border-brand-100 bg-white p-6">
      <h2 className="text-lg font-semibold text-brand-900">Order Summary</h2>

      <div className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between text-brand-600">
          <span>Subtotal ({cart.length} items)</span>
          <span className="font-medium text-brand-900">
            {formatPrice(cartSubtotal)}
          </span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}
        <div className="flex justify-between text-brand-600">
          <span>Shipping</span>
          <span className="font-medium text-brand-900">
            {shipping === 0 && cart.length > 0 ? "Free" : formatPrice(shipping)}
          </span>
        </div>
        <div className="flex justify-between text-brand-600">
          <span>Estimated Tax</span>
          <span className="font-medium text-brand-900">{formatPrice(tax)}</span>
        </div>
        <div className="border-t border-brand-100 pt-3">
          <div className="flex justify-between text-base font-semibold text-brand-900">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handlePromo} className="mt-6">
        <label htmlFor="promo" className="text-sm font-medium text-brand-700">
          Promo Code
        </label>
        <div className="mt-2 flex gap-2">
          <div className="relative flex-1">
            <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-400" />
            <input
              id="promo"
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter code"
              className="w-full rounded-lg border border-brand-200 py-2.5 pl-10 pr-3 text-sm focus:border-brand-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="rounded-lg border border-brand-200 px-4 py-2.5 text-sm font-medium text-brand-700 transition-colors hover:bg-brand-50"
          >
            Apply
          </button>
        </div>
        <p className="mt-1.5 text-xs text-brand-400">Try code: LUXE10</p>
      </form>

      {showCheckout && (
        <Link
          to="/checkout"
          className={`mt-6 flex w-full items-center justify-center rounded-lg py-3 text-sm font-medium transition-colors ${
            cart.length > 0
              ? "bg-brand-900 text-white hover:bg-brand-700"
              : "bg-brand-200 text-brand-400 pointer-events-none"
          }`}
        >
          Proceed to Checkout
        </Link>
      )}

      {cartSubtotal > 0 && cartSubtotal < 100 && (
        <p className="mt-3 text-center text-xs text-brand-500">
          Add {formatPrice(100 - cartSubtotal)} more for free shipping
        </p>
      )}
    </div>
  );
}
