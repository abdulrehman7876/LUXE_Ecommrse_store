import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart as addToCartAction,
  removeFromCart as removeFromCartAction,
  updateCartQuantity as updateCartQuantityAction,
  clearCart as clearCartAction,
  toggleWishlist as toggleWishlistAction,
  removeFromWishlist as removeFromWishlistAction,
  setSearchQuery as setSearchQueryAction,
  setFilters as setFiltersAction,
  resetFilters as resetFiltersAction,
  setSortBy as setSortByAction,
  addToast,
  removeToast,
} from "../store/appSlice";

export function useApp() {
  const state = useSelector((rootState) => rootState.app);
  const dispatch = useDispatch();

  const addToCart = useCallback((product, quantity = 1) => {
    if (product.stock <= 0) return;
    dispatch(addToCartAction({ product, quantity }));
    dispatch(
      addToast({ message: `${product.title} added to cart`, type: "success" }),
    );
  }, [dispatch]);

  const toggleWishlist = useCallback((product) => {
    const exists = state.wishlist.some((item) => item.id === product.id);
    dispatch(toggleWishlistAction(product));
    dispatch(
      addToast({
        message: `${product.title} ${exists ? "removed from" : "added to"} wishlist`,
        type: "info",
      }),
    );
  }, [dispatch, state.wishlist]);

  const removeFromCart = useCallback(
    (id) => dispatch(removeFromCartAction(id)),
    [dispatch],
  );
  const updateCartQuantity = useCallback(
    (id, quantity) => dispatch(updateCartQuantityAction({ id, quantity })),
    [dispatch],
  );
  const clearCart = useCallback(() => dispatch(clearCartAction()), [dispatch]);
  const removeFromWishlist = useCallback(
    (id) => dispatch(removeFromWishlistAction(id)),
    [dispatch],
  );
  const isInWishlist = useCallback(
    (id) => state.wishlist.some((item) => item.id === id),
    [state.wishlist],
  );
  const isInCart = useCallback(
    (id) => state.cart.some((item) => item.id === id),
    [state.cart],
  );
  const showToast = useCallback(
    (message, type = "success") => dispatch(addToast({ message, type })),
    [dispatch],
  );
  const dismissToast = useCallback(
    (id) => dispatch(removeToast(id)),
    [dispatch],
  );
  const setSearchQuery = useCallback(
    (query) => dispatch(setSearchQueryAction(query)),
    [dispatch],
  );
  const setFilters = useCallback(
    (filters) => dispatch(setFiltersAction(filters)),
    [dispatch],
  );
  const resetFilters = useCallback(
    () => dispatch(resetFiltersAction()),
    [dispatch],
  );
  const setSortBy = useCallback(
    (sort) => dispatch(setSortByAction(sort)),
    [dispatch],
  );

  return {
    ...state,
    cartCount: state.cart.reduce((sum, item) => sum + item.quantity, 0),
    cartSubtotal: state.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    ),
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    toggleWishlist,
    removeFromWishlist,
    isInWishlist,
    isInCart,
    showToast,
    removeToast: dismissToast,
    setSearchQuery,
    setFilters,
    resetFilters,
    setSortBy,
  };
}
