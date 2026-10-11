const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteCollectionCartId: String(
    import.meta.env.VITE_APPWRITE_COLLECTION_CART_ID,
  ),
  appwriteCollectionWishlistId: String(
    import.meta.env.VITE_APPWRITE_COLLECTION_WSIHLIST_ID,
  ),
};

export default conf;
