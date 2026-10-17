import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
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

  useEffect(() => {
    async function load() {
      dispatch(setCatalogStatus({ loading: true, error: null }));
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProductList({ limit: 0 }),
          getCategories(),
        ]);
        dispatch(setAllProductsSlice(productsData.products));
        dispatch(setFeaturedCategories(categoriesData));
        dispatch(setCatalogStatus({ loading: false, error: null }));
      } catch {
        dispatch(
          setCatalogStatus({
            loading: false,
            error: "Failed to load products. Please try again.",
          }),
        );
      }
    }
    load();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<LoadingSkeleton />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
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
