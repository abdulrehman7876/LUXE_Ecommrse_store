import service from "../appwrite/config";
import { setCart, setWishlist, clearCart, clearWishlist } from "./appSlice";

let activeUserId = null; // saving is on only when this is set
let timer = null;
let lastCart = null;
let lastWishlist = null;

async function flush(store) {
  const userId = activeUserId;
  if (!userId) return;

  const { cart, wishlist } = store.getState().app;
  const saves = [];
  if (cart !== lastCart) saves.push(service.saveCart(userId, cart));
  if (wishlist !== lastWishlist) {
    saves.push(service.saveWishlist(userId, wishlist));
  }
  lastCart = cart;
  lastWishlist = wishlist;

  try {
    await Promise.all(saves);
  } catch (error) {
    console.error("Cart sync failed:", error);
    lastCart = null; // forces a retry on the next change
    lastWishlist = null;
  }
}

// Called on every store change (see store.js)
export function syncOnChange(store) {
  if (!activeUserId) return;
  const { cart, wishlist } = store.getState().app;
  if (cart === lastCart && wishlist === lastWishlist) return;
  clearTimeout(timer);
  timer = setTimeout(() => flush(store), 600);
}

// LOGIN (and page refresh with a session): database -> app. Nothing is uploaded.
export async function syncAfterLogin(user, store) {
  activeUserId = null; // do not save while loading
  try {
    const [dbCart, dbWishlist] = await Promise.all([
      service.getCart(user.$id),
      service.getWishlist(user.$id),
    ]);
    store.dispatch(setCart(dbCart));
    store.dispatch(setWishlist(dbWishlist));
  } catch (error) {
    // If loading failed, stay off. Saving now could overwrite the database.
    console.error("Could not load cart/wishlist:", error);
    return;
  }
  const { cart, wishlist } = store.getState().app;
  lastCart = cart;
  lastWishlist = wishlist;
  activeUserId = user.$id;
}

// REGISTER: guest items -> database
export async function syncAfterRegister(user, store) {
  const { cart, wishlist } = store.getState().app;
  try {
    await Promise.all([
      service.saveCart(user.$id, cart),
      service.saveWishlist(user.$id, wishlist),
    ]);
    lastCart = cart;
    lastWishlist = wishlist;
  } catch (error) {
    console.error("Could not move guest items:", error);
    lastCart = null; // retry on the next change
    lastWishlist = null;
  }
  activeUserId = user.$id;
}

// LOGOUT: save last changes, stop saving, clear local data
export async function stopSync(store) {
  clearTimeout(timer);
  await flush(store); // must run before the session is deleted
  activeUserId = null;
  lastCart = null;
  lastWishlist = null;
  store.dispatch(clearCart());
  store.dispatch(clearWishlist());
}
