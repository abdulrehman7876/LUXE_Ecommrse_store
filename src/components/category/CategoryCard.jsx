import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getCategoryImage } from "../../api/products";
import { formatCategoryName } from "../../utils/format";

export default function CategoryCard({ category, productCount }) {
  const slug = category.slug || category;
  const name = category.name || formatCategoryName(slug);
  const image = getCategoryImage(slug);

  return (
    <Link
      to={`/shop/${slug}`}
      className="group relative overflow-hidden rounded-xl border border-brand-100 bg-white transition-shadow hover:shadow-md"
    >
      <div className="aspect-[4/3] overflow-hidden bg-brand-50">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
        <h3 className="sm:text-lg text-xs font-semibold">{name}</h3>
        {productCount !== undefined && (
          <p className="mt-0.5 text-sm text-white/80">
            {productCount} products
          </p>
        )}
        <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100">
          Shop Now <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
