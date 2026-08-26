import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { useApp } from "../hooks/useApp";
import ProductGrid from "../components/product/ProductGrid";
import EmptyState from "../components/ui/EmptyState";

export default function Wishlist() {
  const { wishlist, addToCart } = useApp();

  if (wishlist.length === 0) {
    return (
      <div className="container-custom py-16">
        <EmptyState
          icon={Heart}
          title="Your Wishlist is Empty"
          description="Save items you love by clicking the heart icon on any product."
          actionLabel="Discover Products"
          actionTo="/shop"
        />
      </div>
    );
  }

  return (
    <div className="container-custom py-8 lg:py-12">
      <h1 className="text-3xl font-bold text-brand-900">My Wishlist</h1>
      <p className="mt-2 text-brand-500">
        {wishlist.length} item{wishlist.length !== 1 ? "s" : ""} saved
      </p>

      <div className="mt-8">
        <ProductGrid products={wishlist} />
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          onClick={() => {
            wishlist.forEach((item) => {
              if (item.stock > 0) addToCart(item);
            });
          }}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-700"
        >
          <ShoppingBag className="h-4 w-4" />
          Add All to Cart
        </button>
        <Link
          to="/shop"
          className="inline-flex items-center rounded-lg border border-brand-200 px-6 py-3 text-sm font-medium text-brand-700 transition-colors hover:bg-brand-50"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
