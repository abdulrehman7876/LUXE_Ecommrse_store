import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import { saveCart, saveWishlist } from "../utils/storage";
import dataReducer from "./dataSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    data: dataReducer,
    auth: authReducer,
  },
});

store.subscribe(() => {
  const { cart, wishlist } = store.getState().app;
  saveCart(cart);
  saveWishlist(wishlist);
});
