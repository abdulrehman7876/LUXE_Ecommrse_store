export function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(price);
}

export function calculateOriginalPrice(price, discountPercentage) {
  if (!discountPercentage || discountPercentage <= 0) return price;
  return price / (1 - discountPercentage / 100);
}

export function formatCategoryName(slug) {
  if (!slug) return '';
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, '-');
}

export function getStockStatus(stock) {
  if (stock <= 0) return { label: 'Out of Stock', variant: 'danger' };
  if (stock <= 10) return { label: 'Low Stock', variant: 'warning' };
  return { label: 'In Stock', variant: 'success' };
}

export function sortProducts(products, sortBy) {
  const sorted = [...products];

  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating-desc':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'title-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'discount-desc':
      return sorted.sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
    default:
      return sorted;
  }
}

export function filterProducts(products, filters) {
  return products.filter((product) => {
    if (filters.category && product.category !== filters.category) return false;

    if (filters.minPrice !== undefined && product.price < filters.minPrice) return false;
    if (filters.maxPrice !== undefined && product.price > filters.maxPrice) return false;

    if (filters.minRating && product.rating < filters.minRating) return false;

    if (filters.inStockOnly && product.stock <= 0) return false;

    if (filters.brand && product.brand !== filters.brand) return false;

    return true;
  });
}

export function getUniqueBrands(products) {
  const brands = products
    .map((p) => p.brand)
    .filter(Boolean);
  return [...new Set(brands)].sort();
}
