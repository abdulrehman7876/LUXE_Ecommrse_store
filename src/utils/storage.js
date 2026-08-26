const STORAGE_KEYS = {
  cart: 'luxe_cart',
  wishlist: 'luxe_wishlist',
};

export function loadFromStorage(key, fallback = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage unavailable
  }
}

export function loadCart() {
  return loadFromStorage(STORAGE_KEYS.cart, []);
}

export function saveCart(cart) {
  saveToStorage(STORAGE_KEYS.cart, cart);
}

export function loadWishlist() {
  return loadFromStorage(STORAGE_KEYS.wishlist, []);
}

export function saveWishlist(wishlist) {
  saveToStorage(STORAGE_KEYS.wishlist, wishlist);
}

export { STORAGE_KEYS };
