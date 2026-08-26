import { Link } from 'react-router-dom';
import { Share2, Globe, Mail, Video, CreditCard } from 'lucide-react';

const shopLinks = [
  { to: '/shop', label: 'All Products' },
  { to: '/shop?deals=true', label: 'Deals' },
  { to: '/category/womens-dresses', label: 'Women\'s Dresses' },
  { to: '/category/mens-shirts', label: 'Men\'s Shirts' },
  { to: '/category/fragrances', label: 'Fragrances' },
];

const serviceLinks = [
  { to: '#', label: 'Contact Us' },
  { to: '#', label: 'Shipping Info' },
  { to: '#', label: 'Returns & Exchanges' },
  { to: '#', label: 'Size Guide' },
  { to: '#', label: 'FAQ' },
];

const aboutLinks = [
  { to: '#', label: 'Our Story' },
  { to: '#', label: 'Careers' },
  { to: '#', label: 'Sustainability' },
  { to: '#', label: 'Press' },
];

export default function Footer() {
  return (
    <footer className="border-t border-brand-100 bg-brand-50">
      <div className="container-custom py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="text-2xl font-bold tracking-tight text-brand-900">
              LUXE
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-500">
              Curated fashion and lifestyle products for the modern consumer.
              Quality, style, and exceptional service — delivered to your door.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Share2, Globe, Mail, Video].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-200 text-brand-500 transition-colors hover:border-brand-400 hover:text-brand-800"
                  aria-label="Social media link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-900">
              Shop
            </h3>
            <ul className="mt-4 space-y-3">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-brand-500 transition-colors hover:text-brand-800"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-900">
              Customer Service
            </h3>
            <ul className="mt-4 space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.to}
                    className="text-sm text-brand-500 transition-colors hover:text-brand-800"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-900">
              About
            </h3>
            <ul className="mt-4 space-y-3">
              {aboutLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.to}
                    className="text-sm text-brand-500 transition-colors hover:text-brand-800"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-brand-200 pt-8 sm:flex-row">
          <p className="text-sm text-brand-400">
            &copy; {new Date().getFullYear()} LUXE. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-brand-400" aria-hidden="true" />
            <div className="flex items-center gap-2">
              {['Visa', 'MC', 'Amex', 'PayPal'].map((method) => (
                <span
                  key={method}
                  className="rounded border border-brand-200 bg-white px-2 py-1 text-xs font-medium text-brand-500"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
