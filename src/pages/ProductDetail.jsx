import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Heart,
  ShoppingBag,
  Truck,
  Shield,
  RotateCcw,
  Star,
} from "lucide-react";
import { getProduct, getProductsByCategory } from "../api/products";
import { useApp } from "../hooks/useApp";
import ProductGallery from "../components/product/ProductGallery";
import ProductGrid from "../components/product/ProductGrid";
import Rating from "../components/ui/Rating";
import PriceDisplay from "../components/ui/PriceDisplay";
import QuantitySelector from "../components/ui/QuantitySelector";
import { ProductDetailSkeleton } from "../components/ui/LoadingSkeleton";
import { getStockStatus, formatCategoryName } from "../utils/format";
import { useSelector } from "react-redux";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const allProducts = useSelector((state) => state.data.allProductsSlice);
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { addToCart, toggleWishlist, isInWishlist } = useApp();
  const inWishlist = product ? isInWishlist(product.id) : false;

  useEffect(() => {
    setQuantity(1);
  }, [id]);

  useEffect(() => {
    let current = true;
    const numericId = Number(id);
    const fromStore = allProducts.find((item) => item.id === numericId);

    if (fromStore) {
      setProduct(fromStore);
      setRelated(
        allProducts
          .filter(
            (item) =>
              item.category === fromStore.category && item.id !== fromStore.id,
          )
          .slice(0, 4),
      );
      setLoading(false);
      setError(null);
      return () => {
        current = false;
      };
    }

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await getProduct(id);
        if (!current) return;
        setProduct(data);

        const relatedFromStore = allProducts.filter(
          (item) => item.category === data.category && item.id !== data.id,
        );
        if (relatedFromStore.length > 0) {
          setRelated(relatedFromStore.slice(0, 4));
        } else {
          const relatedData = await getProductsByCategory(data.category, {
            limit: 5,
          });
          if (!current) return;
          setRelated(
            relatedData.products.filter((p) => p.id !== data.id).slice(0, 4),
          );
        }
      } catch (err) {
        if (!current) return;
        if (err.status === 404) {
          setError("not-found");
        } else {
          setError("Failed to load product. Please try again.");
        }
      } finally {
        if (current) {
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      current = false;
    };
  }, [id, allProducts]);

  if (loading) {
    return (
      <div className="container-custom py-8 lg:py-12">
        <ProductDetailSkeleton />
      </div>
    );
  }

  if (error === "not-found") {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-2xl font-bold text-brand-900">Product Not Found</h1>
        <p className="mt-2 text-brand-500">
          The product you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-flex rounded-lg bg-brand-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container-custom py-16 text-center">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 text-sm font-medium text-brand-700 underline"
        >
          Try Again
        </button>
      </div>
    );
  }

  const stock = getStockStatus(product.stock);
  const stockColors = {
    success: "text-green-600 bg-green-50",
    warning: "text-amber-600 bg-amber-50",
    danger: "text-red-600 bg-red-50",
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/checkout");
  };

  return (
    <div className="container-custom py-8 lg:py-12">
      <nav className="mb-8 text-sm text-brand-500" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link to="/" className="hover:text-brand-800">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link to="/shop" className="hover:text-brand-800">
              Shop
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link
              to={`/shop/${product.category}`}
              className="hover:text-brand-800"
            >
              {formatCategoryName(product.category)}
            </Link>
          </li>
          <li>/</li>
          <li className="text-brand-800 font-medium truncate max-w-[200px]">
            {product.title}
          </li>
        </ol>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images} title={product.title} />

        <div>
          {product.brand && (
            <p className="text-sm font-medium uppercase tracking-wider text-brand-400">
              {product.brand}
            </p>
          )}
          <h1 className="mt-2 text-2xl font-bold text-brand-900 sm:text-3xl">
            {product.title}
          </h1>

          <div className="mt-4">
            <Rating
              rating={product.rating}
              reviewCount={product.reviews?.length}
              size="md"
            />
          </div>

          <div className="mt-6">
            <PriceDisplay
              price={product.price}
              discountPercentage={product.discountPercentage}
              size="lg"
            />
          </div>

          <span
            className={`mt-3 inline-block rounded-full px-3 py-1 text-sm font-medium ${stockColors[stock.variant]}`}
          >
            {stock.label} {product.stock > 0 && `(${product.stock} available)`}
          </span>

          <p className="mt-6 text-sm leading-relaxed text-brand-600">
            {product.description}
          </p>

          <div className="mt-8 flex items-center gap-4">
            <QuantitySelector
              quantity={quantity}
              onChange={setQuantity}
              max={product.stock}
              disabled={product.stock <= 0}
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none sm:px-8"
            >
              <ShoppingBag className="h-4 w-4" />
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              disabled={product.stock <= 0}
              className="inline-flex flex-1 items-center justify-center rounded-lg border border-brand-900 px-6 py-3 text-sm font-medium text-brand-900 transition-colors hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none sm:px-8"
            >
              Buy Now
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className={`flex h-12 w-12 items-center justify-center rounded-lg border transition-colors ${
                inWishlist
                  ? "border-red-200 bg-red-50 text-red-500"
                  : "border-brand-200 text-brand-600 hover:bg-brand-50"
              }`}
              aria-label={
                inWishlist ? "Remove from wishlist" : "Add to wishlist"
              }
            >
              <Heart
                className={`h-5 w-5 ${inWishlist ? "fill-current" : ""}`}
              />
            </button>
          </div>

          <div className="mt-8 space-y-3 border-t border-brand-100 pt-8">
            <div className="flex items-center gap-3 text-sm text-brand-600">
              <Truck className="h-5 w-5 text-brand-400 shrink-0" />
              <span>
                {product.shippingInformation ||
                  "Free shipping on orders over $100"}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm text-brand-600">
              <RotateCcw className="h-5 w-5 text-brand-400 shrink-0" />
              <span>
                {product.returnPolicy || "30-day hassle-free returns"}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm text-brand-600">
              <Shield className="h-5 w-5 text-brand-400 shrink-0" />
              <span>
                {product.warrantyInformation || "1-year manufacturer warranty"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 border-t border-brand-100 pt-12">
        <h2 className="text-xl font-bold text-brand-900">
          Product Information
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["SKU", product.sku],
            ["Brand", product.brand],
            ["Category", formatCategoryName(product.category)],
            ["Weight", product.weight ? `${product.weight} kg` : null],
            ["Min. Order", product.minimumOrderQuantity],
            ["Availability", product.availabilityStatus],
          ]
            .filter(([, val]) => val)
            .map(([label, value]) => (
              <div
                key={label}
                className="rounded-lg border border-brand-100 p-4"
              >
                <p className="text-xs font-medium uppercase tracking-wider text-brand-400">
                  {label}
                </p>
                <p className="mt-1 text-sm font-medium text-brand-800">
                  {value}
                </p>
              </div>
            ))}
        </div>
      </div>

      {product.reviews?.length > 0 && (
        <div className="mt-16 border-t border-brand-100 pt-12">
          <h2 className="text-xl font-bold text-brand-900">
            Customer Reviews ({product.reviews.length})
          </h2>
          <div className="mt-6 space-y-6">
            {product.reviews.map((review, i) => (
              <div key={i} className="rounded-xl border border-brand-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-brand-900">
                      {review.reviewerName || "Customer"}
                    </p>
                    <p className="text-xs text-brand-400">{review.date}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className={`h-4 w-4 ${
                          j < review.rating
                            ? "fill-amber-400 text-amber-400"
                            : "fill-brand-200 text-brand-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-brand-600">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {related.length > 0 && (
        <div className="mt-16 border-t border-brand-100 pt-12">
          <h2 className="text-xl font-bold text-brand-900">Related Products</h2>
          <p className="mt-1 text-brand-500">You might also like</p>
          <div className="mt-8">
            <ProductGrid products={related} />
          </div>
        </div>
      )}
    </div>
  );
}
