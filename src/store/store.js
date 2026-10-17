import { configureStore } from "@reduxjs/toolkit";
import { syncOnChange } from "./cartSync";
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

let prev = store.getState().app;
store.subscribe(() => {
  const cur = store.getState().app;
  if (cur.cart !== prev.cart) saveCart(cur.cart);
  if (cur.wishlist !== prev.wishlist) saveWishlist(cur.wishlist);
  prev = cur;
});

store.subscribe(() => syncOnChange(store));
