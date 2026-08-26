import { formatPrice, calculateOriginalPrice } from '../../utils/format';

export default function PriceDisplay({ price, discountPercentage, size = 'md' }) {
  const originalPrice = calculateOriginalPrice(price, discountPercentage);
  const hasDiscount = discountPercentage > 0;

  const sizeClasses = {
    sm: { current: 'text-sm font-semibold', original: 'text-xs', badge: 'text-xs px-1.5 py-0.5' },
    md: { current: 'text-lg font-semibold', original: 'text-sm', badge: 'text-xs px-2 py-0.5' },
    lg: { current: 'text-2xl font-bold', original: 'text-base', badge: 'text-sm px-2.5 py-1' },
  };

  const styles = sizeClasses[size];

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className={`${styles.current} text-brand-900`}>
        {formatPrice(price)}
      </span>
      {hasDiscount && (
        <>
          <span className={`${styles.original} text-brand-400 line-through`}>
            {formatPrice(originalPrice)}
          </span>
          <span className={`${styles.badge} rounded-md bg-red-50 font-medium text-red-600`}>
            -{Math.round(discountPercentage)}%
          </span>
        </>
      )}
    </div>
  );
}
