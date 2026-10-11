import { createSlice } from "@reduxjs/toolkit";
import { loadCart, loadWishlist } from "../utils/storage";
import { useSelector } from "react-redux";
import service from "../appwrite/config";
export const initialFilters = {
  category: "",
  minPrice: undefined,
  maxPrice: undefined,
  minRating: undefined,
  inStockOnly: false,
  brand: "",
};

const initialState = {
  cart: loadCart(),
  wishlist: loadWishlist(),
  searchQuery: "",
  filters: initialFilters,
  sortBy: "default",
  toasts: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { product, quantity = 1 } = action.payload;
      const existing = state.cart.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity = Math.min(
          existing.quantity + quantity,
          product.stock,
        );
      } else {
        state.cart.push({ ...product, quantity });
      }
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    updateCartQuantity(state, action) {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        state.cart = state.cart.filter((item) => item.id !== id);
        return;
      }
      const item = state.cart.find((cartItem) => cartItem.id === id);
      if (item) item.quantity = quantity;
    },
    clearCart(state) {
      state.cart = [];
    },
    toggleWishlist(state, action) {
      const product = action.payload;
      const exists = state.wishlist.some((item) => item.id === product.id);
      state.wishlist = exists
        ? state.wishlist.filter((item) => item.id !== product.id)
        : [...state.wishlist, product];
    },
    removeFromWishlist(state, action) {
      state.wishlist = state.wishlist.filter(
        (item) => item.id !== action.payload,
      );
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters(state) {
      state.filters = { ...initialFilters };
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    addToast(state, action) {
      state.toasts.push({ id: Date.now(), ...action.payload });
    },
    removeToast(state, action) {
      state.toasts = state.toasts.filter(
        (toast) => toast.id !== action.payload,
      );
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
  toggleWishlist,
  removeFromWishlist,
  setSearchQuery,
  setFilters,
  resetFilters,
  setSortBy,
  addToast,
  removeToast,
  setFeaturedCategories,
  setCountMap,
} = appSlice.actions;

export default appSlice.reducer;
