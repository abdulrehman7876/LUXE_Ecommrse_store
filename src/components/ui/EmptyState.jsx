import { Link } from 'react-router-dom';

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionTo,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {Icon && (
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-50">
          <Icon className="h-8 w-8 text-brand-400" />
        </div>
      )}
      <h2 className="text-xl font-semibold text-brand-900">{title}</h2>
      {description && (
        <p className="mt-2 max-w-md text-sm text-brand-500">{description}</p>
      )}
      {(actionLabel && actionTo) && (
        <Link
          to={actionTo}
          className="mt-6 inline-flex items-center rounded-lg bg-brand-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700"
        >
          {actionLabel}
        </Link>
      )}
      {(actionLabel && onAction) && (
        <button
          onClick={onAction}
          className="mt-6 inline-flex items-center rounded-lg bg-brand-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
