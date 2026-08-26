import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import { saveCart, saveWishlist } from "../utils/storage";
import dataReducer from "./dataSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    data: dataReducer,
  },
});

store.subscribe(() => {
  const { cart, wishlist } = store.getState().app;
  saveCart(cart);
  saveWishlist(wishlist);
});
