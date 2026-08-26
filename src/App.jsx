import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Category from "./pages/Category";
import ProductDetail from "./pages/ProductDetail";
import Search from "./pages/Search";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import { Categories } from "./pages/Categories";
import Deals from "./pages/Deals";
import { useEffect, useState } from "react";
import { setAllProductsSlice } from "./store/dataSlice";
import { getProductList } from "./api/products";
import { useDispatch } from "react-redux";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function load() {
      setError(null);
      try {
        const productsData = await getProductList({ limit: 100 });
        dispatch(setAllProductsSlice(productsData.products));
      } catch {
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="shop"
            element={
              <Shop
                loading={loading}
                error={error}
                setLoading={setLoading}
                setError={setError}
              />
            }
          />
          <Route
            path="deals"
            element={
              <Deals
                loading={loading}
                error={error}
                setLoading={setLoading}
                setError={setError}
              />
            }
          />
          <Route path="category/" element={<Categories />} />
          <Route path="shop/:category" element={<Category />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="search" element={<Search />} />
          <Route path="cart" element={<Cart />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
