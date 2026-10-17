const BASE_URL = "https://dummyjson.com";

async function fetchJSON(url) {
  const response = await fetch(url);
  if (!response.ok) {
    const error = new Error(`Request failed: ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return response.json();
}

export async function getProduct(id) {
  return fetchJSON(`${BASE_URL}/products/${id}`);
}

export async function getCategories() {
  return fetchJSON(`${BASE_URL}/products/categories`);
}

export async function getProductsByCategory(category, params = {}) {
  const { limit = 30, skip = 0 } = params;
  return fetchJSON(
    `${BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}`,
  );
}

export async function searchProducts(query, params = {}) {
  const { limit = 30, skip = 0 } = params;
  const encoded = encodeURIComponent(query);
  return fetchJSON(
    `${BASE_URL}/products/search?q=${encoded}&limit=${limit}&skip=${skip}`,
  );
}

export async function getProductList(params = {}) {
  const { limit = 0, skip = 0 } = params;
  return fetchJSON(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
}

export const CATEGORY_IMAGES = {
  beauty:
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop",
  fragrances:
    "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=400&fit=crop",
  furniture:
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop",
  groceries:
    "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop",
  "home-decoration":
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=400&fit=crop",
  "kitchen-accessories":
    "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&h=400&fit=crop",
  laptops:
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop",
  "mens-shirts":
    "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&h=400&fit=crop",
  "mens-shoes":
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=400&fit=crop",
  "mens-watches":
    "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=400&fit=crop",
  "mobile-accessories":
    "https://images.unsplash.com/photo-1515940175183-6798529cb860?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9iaWxlJTIwYWNjZXNzb3JpZXN8ZW58MHx8MHx8fDA%3D",
  motorcycle:
    "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&h=400&fit=crop",
  "skin-care":
    "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  smartphones:
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop",
  "sports-accessories":
    "https://plus.unsplash.com/premium_photo-1756120110009-b972a874648c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  sunglasses:
    "https://images.unsplash.com/photo-1608539733292-190446b22b83?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHN1bmdsYXNzZXN8ZW58MHx8MHx8fDA%3D",
  tablets:
    "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=400&fit=crop",
  tops: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=400&fit=crop",
  vehicle:
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop",
  "womens-bags":
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=400&fit=crop",
  "womens-dresses":
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=400&fit=crop",
  "womens-jewellery":
    "https://plus.unsplash.com/premium_photo-1661645433820-24c8604e4db5?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "womens-shoes":
    "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=400&fit=crop",
  "womens-watches":
    "https://images.unsplash.com/photo-1451290337906-ac938fc89bce?q=80&w=1018&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  default:
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
};

export function getCategoryImage(slug) {
  return CATEGORY_IMAGES[slug] || CATEGORY_IMAGES.default;
}
