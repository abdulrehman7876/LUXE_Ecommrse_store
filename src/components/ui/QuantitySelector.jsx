import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({
  quantity,
  onChange,
  max = 99,
  min = 1,
  disabled = false,
  size = "md",
}) {
  const sizeClasses = {
    sm: "h-8 w-8 text-sm",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  const btnClass = `${sizeClasses[size]} flex items-center justify-center rounded-lg border border-brand-200 text-brand-700 transition-colors hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-40`;

  return (
    <div
      className="inline-flex items-center gap-2"
      role="group"
      aria-label="Quantity selector"
    >
      <button
        type="button"
        className={`cursor-pointer ${btnClass}`}
        onClick={() => onChange(quantity - 1)}
        disabled={disabled || quantity <= min}
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span
        className="min-w-[2.5rem] text-center text-sm font-medium text-brand-800"
        aria-live="polite"
      >
        {quantity}
      </span>
      <button
        type="button"
        className={`${btnClass} cursor-pointer`}
        onClick={() => onChange(quantity + 1)}
        disabled={disabled || quantity >= max}
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
