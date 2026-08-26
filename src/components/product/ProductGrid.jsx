import ProductCard from './ProductCard';
import { ProductGridSkeleton } from '../ui/LoadingSkeleton';
import EmptyState from '../ui/EmptyState';
import { PackageOpen } from 'lucide-react';

export default function ProductGrid({
  products = [],
  loading = false,
  listView = false,
  emptyTitle = 'No products found',
  emptyDescription = 'Try adjusting your filters or search terms.',
}) {
  if (loading) {
    return <ProductGridSkeleton count={8} />;
  }

  if (!products.length) {
    return (
      <EmptyState
        icon={PackageOpen}
        title={emptyTitle}
        description={emptyDescription}
        actionLabel="Browse All Products"
        actionTo="/shop"
      />
    );
  }

  if (listView) {
    return (
      <div className="flex flex-col gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} listView />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
