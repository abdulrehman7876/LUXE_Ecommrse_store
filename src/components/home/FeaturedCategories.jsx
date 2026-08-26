import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories, getProductsByCategory } from "../../api/products";
import CategoryCard from "../category/CategoryCard";
import LoadingSkeleton from "../ui/LoadingSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { setFeaturedCategories, setCountMap } from "../../store/dataSlice";
export default function FeaturedCategories({ limit = 8 }) {
  const [categories, setCategories] = useState([]);
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const { featuredCategories, countMap } = useSelector((state) => state.data);

  useEffect(() => {
    setLoading(true);
    if (featuredCategories.length > 0) {
      limit === 8
        ? setCategories(featuredCategories.slice(0, limit))
        : setCategories(featuredCategories);
      setCounts(countMap);
      setLoading(false);
      return;
    }

    async function load() {
      try {
        const cats = await getCategories();
        const featured = cats.slice(0, limit);
        // limit === 8 ? setCategories(featured) : setCategories(cats);
        dispatch(setFeaturedCategories(cats));

        const countPromises = cats.map(async (cat) => {
          const data = await getProductsByCategory(cat.slug, { limit: 1 });
          return { slug: cat.slug, total: data.total };
        });
        const countResults = await Promise.all(countPromises);
        const countMap = {};
        countResults.forEach(({ slug, total }) => {
          countMap[slug] = total;
        });
        setCounts(countMap);
        dispatch(setCountMap(countMap));
      } catch {
        setCategories([]);
      } finally {
        setLoading(false);
      }
    }
    load();
    if (categories.length === 0) {
      setLoading(true);
    }
  }, [featuredCategories]);

  return (
    <section id="categories" className="py-16 lg:py-20">
      <div className="container-custom">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-brand-900 sm:text-3xl">
              Shop by Category
            </h2>
            <p className="mt-2 text-brand-500">
              Browse our curated collections
            </p>
          </div>
          {limit === 8 && (
            <Link
              to="/category"
              className="hidden text-sm font-medium text-brand-700 hover:text-brand-900 sm:block"
            >
              View All →
            </Link>
          )}
        </div>

        <div className="mt-8">
          {loading ? (
            <LoadingSkeleton variant="category" count={8} />
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {categories.map((cat) => (
                <CategoryCard
                  key={cat.slug}
                  category={cat}
                  productCount={counts[cat.slug]}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
