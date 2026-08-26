import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../hooks/useApp";
import CartSummary from "../components/cart/CartSummary";
import { formatPrice } from "../utils/format";
import EmptyState from "../components/ui/EmptyState";
import { ShoppingBag } from "lucide-react";

export default function Checkout() {
  const { cart, cartSubtotal, showToast } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast("Order placed successfully! (Demo)", "success");
    navigate("/");
  };

  if (cart.length === 0) {
    return (
      <div className="container-custom py-16">
        <EmptyState
          icon={ShoppingBag}
          title="Nothing to Checkout"
          description="Add some products to your cart before proceeding to checkout."
          actionLabel="Go to Shop"
          actionTo="/shop"
        />
      </div>
    );
  }

  return (
    <div className="container-custom py-8 lg:py-12">
      <h1 className="text-3xl font-bold text-brand-900">Checkout</h1>
      <p className="mt-2 text-brand-500">Complete your order details below</p>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          {/* Contact */}
          <section className="rounded-xl border border-brand-100 bg-white p-6">
            <h2 className="text-lg font-semibold text-brand-900">
              Contact Information
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="text-sm font-medium text-brand-700"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  required
                  className="mt-1 w-full rounded-lg border border-brand-200 px-4 py-2.5 text-sm focus:border-brand-400 focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="text-sm font-medium text-brand-700"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  required
                  className="mt-1 w-full rounded-lg border border-brand-200 px-4 py-2.5 text-sm focus:border-brand-400 focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-brand-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="mt-1 w-full rounded-lg border border-brand-200 px-4 py-2.5 text-sm focus:border-brand-400 focus:outline-none"
                />
              </div>
            </div>
          </section>

          {/* Shipping */}
          <section className="rounded-xl border border-brand-100 bg-white p-6">
            <h2 className="text-lg font-semibold text-brand-900">
              Shipping Address
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="address"
                  className="text-sm font-medium text-brand-700"
                >
                  Street Address
                </label>
                <input
                  id="address"
                  type="text"
                  required
                  className="mt-1 w-full rounded-lg border border-brand-200 px-4 py-2.5 text-sm focus:border-brand-400 focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="text-sm font-medium text-brand-700"
                >
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  required
                  className="mt-1 w-full rounded-lg border border-brand-200 px-4 py-2.5 text-sm focus:border-brand-400 focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="zip"
                  className="text-sm font-medium text-brand-700"
                >
                  ZIP Code
                </label>
                <input
                  id="zip"
                  type="text"
                  required
                  className="mt-1 w-full rounded-lg border border-brand-200 px-4 py-2.5 text-sm focus:border-brand-400 focus:outline-none"
                />
              </div>
            </div>
          </section>

          {/* Payment */}
          <section className="rounded-xl border border-brand-100 bg-white p-6">
            <h2 className="text-lg font-semibold text-brand-900">Payment</h2>
            <p className="mt-2 text-sm text-brand-500">
              This is a demo checkout. No real payment will be processed.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="cardNumber"
                  className="text-sm font-medium text-brand-700"
                >
                  Card Number
                </label>
                <input
                  id="cardNumber"
                  type="text"
                  placeholder="4242 4242 4242 4242"
                  className="mt-1 w-full rounded-lg border border-brand-200 px-4 py-2.5 text-sm focus:border-brand-400 focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="expiry"
                  className="text-sm font-medium text-brand-700"
                >
                  Expiry
                </label>
                <input
                  id="expiry"
                  type="text"
                  placeholder="MM/YY"
                  className="mt-1 w-full rounded-lg border border-brand-200 px-4 py-2.5 text-sm focus:border-brand-400 focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="cvc"
                  className="text-sm font-medium text-brand-700"
                >
                  CVC
                </label>
                <input
                  id="cvc"
                  type="text"
                  placeholder="123"
                  className="mt-1 w-full rounded-lg border border-brand-200 px-4 py-2.5 text-sm focus:border-brand-400 focus:outline-none"
                />
              </div>
            </div>
          </section>
        </div>

        <div>
          <CartSummary showCheckout={false} />

          <div className="mt-4 rounded-xl border border-brand-100 bg-white p-6">
            <h3 className="text-sm font-semibold text-brand-900">
              Order Items
            </h3>
            <ul className="mt-4 space-y-3">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between text-sm">
                  <span className="text-brand-600 truncate mr-4">
                    {item.title} × {item.quantity}
                  </span>
                  <span className="font-medium text-brand-900 shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="submit"
            className="mt-4 flex w-full items-center justify-center rounded-lg bg-brand-900 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-700"
          >
            Place Order —{" "}
            {formatPrice(cartSubtotal * 1.08 + (cartSubtotal > 100 ? 0 : 9.99))}
          </button>

          <Link
            to="/cart"
            className="mt-3 block text-center text-sm text-brand-500 hover:text-brand-800"
          >
            ← Back to Cart
          </Link>
        </div>
      </form>
    </div>
  );
}
