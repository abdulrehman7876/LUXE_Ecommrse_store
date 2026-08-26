import { Star } from "lucide-react";

export default function Rating({
  rating = 0,
  reviewCount,
  size = "sm",
  showValue = true,
}) {
  const sizeClasses = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i < Math.floor(rating);
    const partial = i === Math.floor(rating) && rating % 1 >= 0.3;

    return (
      <Star
        key={i}
        className={`${sizeClasses[size]} ${
          filled || partial
            ? "fill-amber-400 text-amber-400"
            : "fill-brand-200 text-brand-200"
        } `}
        aria-hidden="true"
      />
    );
  });

  return (
    <div
      className="flex items-center gap-1.5"
      aria-label={`Rating: ${rating} out of 5`}
    >
      <div className="flex items-center gap-0.5">{stars}</div>
      {showValue && (
        <span className="text-sm text-brand-600">
          {rating.toFixed(1)}
          {reviewCount !== undefined && (
            <span className="text-brand-400"> ({reviewCount})</span>
          )}
        </span>
      )}
    </div>
  );
}
