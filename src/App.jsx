import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Category from "./pages/Category";
import Search from "./pages/Search";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import { Categories } from "./pages/Categories";
import Deals from "./pages/Deals";
import {
  setAllProductsSlice,
  setCatalogStatus,
  setFeaturedCategories,
} from "./store/dataSlice";
import { getCategories, getProductList } from "./api/products";
import LoadingSkeleton from "./components/ui/LoadingSkeleton";

const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Login = lazy(() => import("./pages/Login"));
const ManageAccount = lazy(() => import("./pages/Account"));
const AccountOverview = lazy(() =>
  import("./pages/Account").then((m) => ({ default: m.AccountOverview })),
);
const Order = lazy(() =>
  import("./pages/Account").then((m) => ({ default: m.Order })),
);
const Addresses = lazy(() =>
  import("./pages/Account").then((m) => ({ default: m.Addresses })),
);
const PaymentMethods = lazy(() =>
  import("./pages/Account").then((m) => ({ default: m.PaymentMethods })),
);
const Security = lazy(() =>
  import("./pages/Account").then((m) => ({ default: m.Security })),
);

export default function App() {
  const dispatch = useDispatch();

  const loadCatalog = useCallback(async () => {
    dispatch(setCatalogStatus({ loading: true, error: null }));

    const [productsResult, categoriesResult] = await Promise.allSettled([
      getProductList({ limit: 0 }),
      getCategories(),
    ]);

    const products =
      productsResult.status === "fulfilled"
        ? productsResult.value.products
        : null;
    const categories =
      categoriesResult.status === "fulfilled"
        ? categoriesResult.value
        : null;

    if (products) {
      dispatch(setAllProductsSlice(products));
    }

    if (categories) {
      dispatch(setFeaturedCategories(categories));
    } else if (products) {
      dispatch(
        setFeaturedCategories(
          [...new Set(products.map((product) => product.category))].map(
            (slug) => ({ slug }),
          ),
        ),
      );
    }

    const failed =
      productsResult.status === "rejected" ||
      categoriesResult.status === "rejected";
    dispatch(
      setCatalogStatus({
        loading: false,
        error: failed
          ? "Some catalog data could not be loaded. Please try again."
          : null,
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    loadCatalog();
  }, [loadCatalog]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<LoadingSkeleton />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home onRetry={loadCatalog} />} />
            <Route path="shop" element={<Shop />} />
            <Route path="deals" element={<Deals />} />
            <Route path="category" element={<Categories />} />
            <Route path="shop/:category" element={<Category />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="search" element={<Search />} />
            <Route path="cart" element={<Cart />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="login" element={<Login />} />
            <Route path="account" element={<ManageAccount />}>
              <Route index element={<AccountOverview />} />
              <Route path="my-orders" element={<Order />} />
              <Route path="addresses" element={<Addresses />} />
              <Route path="payment-methods" element={<PaymentMethods />} />
              <Route path="security" element={<Security />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
