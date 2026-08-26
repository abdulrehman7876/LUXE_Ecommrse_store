import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container-custom flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <p className="text-8xl font-bold text-brand-200">404</p>
      <h1 className="mt-4 text-2xl font-bold text-brand-900">Page Not Found</h1>
      <p className="mt-2 max-w-md text-brand-500">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back on track.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          to="/"
          className="rounded-lg bg-brand-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-700"
        >
          Go Home
        </Link>
        <Link
          to="/shop"
          className="rounded-lg border border-brand-200 px-6 py-3 text-sm font-medium text-brand-700 transition-colors hover:bg-brand-50"
        >
          Browse Shop
        </Link>
      </div>
    </div>
  );
}
