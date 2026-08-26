import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useApp } from "../hooks/useApp";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import EmptyState from "../components/ui/EmptyState";

export default function Cart() {
  const { cart } = useApp();

  if (cart.length === 0) {
    return (
      <div className="container-custom py-16">
        <EmptyState
          icon={ShoppingBag}
          title="Your Cart is Empty"
          description="Looks like you haven't added anything to your cart yet. Start shopping to fill it up!"
          actionLabel="Start Shopping"
          actionTo="/shop"
        />
      </div>
    );
  }

  return (
    <div className="container-custom py-8 lg:py-12">
      <h1 className="text-3xl font-bold text-brand-900">Shopping Cart</h1>
      <p className="mt-2 text-brand-500">
        {cart.length} item{cart.length !== 1 ? "s" : ""} in your cart
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-brand-100 bg-white px-6">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <Link
            to="/shop"
            className="mt-6 inline-flex text-sm font-medium text-brand-600 hover:text-brand-900"
          >
            ← Continue Shopping
          </Link>
        </div>

        <div>
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
