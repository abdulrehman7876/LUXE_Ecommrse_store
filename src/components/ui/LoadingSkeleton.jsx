export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-brand-100 bg-white p-4">
      <div className="aspect-square rounded-lg bg-brand-100" />
      <div className="mt-4 space-y-2">
        <div className="h-3 w-1/3 rounded bg-brand-100" />
        <div className="h-4 w-full rounded bg-brand-100" />
        <div className="h-4 w-2/3 rounded bg-brand-100" />
        <div className="h-5 w-1/2 rounded bg-brand-100" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="aspect-square rounded-xl bg-brand-100" />
        <div className="space-y-4">
          <div className="h-4 w-1/4 rounded bg-brand-100" />
          <div className="h-8 w-3/4 rounded bg-brand-100" />
          <div className="h-5 w-1/3 rounded bg-brand-100" />
          <div className="h-6 w-1/2 rounded bg-brand-100" />
          <div className="h-24 w-full rounded bg-brand-100" />
        </div>
      </div>
    </div>
  );
}

export function CategoryCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-brand-100 bg-white overflow-hidden">
      <div className="aspect-[4/3] bg-brand-100" />
      <div className="p-4 space-y-2">
        <div className="h-5 w-2/3 rounded bg-brand-100" />
        <div className="h-3 w-1/3 rounded bg-brand-100" />
      </div>
    </div>
  );
}

export default function LoadingSkeleton({ variant = 'grid', count = 8 }) {
  if (variant === 'detail') return <ProductDetailSkeleton />;
  if (variant === 'category') {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: count }).map((_, i) => (
          <CategoryCardSkeleton key={i} />
        ))}
      </div>
    );
  }
  return <ProductGridSkeleton count={count} />;
}
