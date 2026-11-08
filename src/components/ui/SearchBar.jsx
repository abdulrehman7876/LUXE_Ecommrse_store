import { Search, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../hooks/useApp";

export default function SearchBar({
  className = "",
  placeholder = "Search for products, brands and more...",
  onSearch,
}) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { setSearchQuery } = useApp();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    setSearchQuery(trimmed);
    if (onSearch) {
      onSearch(trimmed);
    } else {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  };

  const handleClear = () => {
    setQuery("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center gap-2 ${className}`}
      role="search"
    >
      <label htmlFor="search-input" className="sr-only">
        Search products
      </label>

      <div className="relative flex-1">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-400"
          aria-hidden="true"
        />
        <input
          id="search-input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="[&::-webkit-search-cancel-button]:appearance-none [&::-ms-clear]:hidden w-full rounded-xl border border-brand-200 bg-white py-2.5 pl-10 pr-10 text-sm text-brand-900 shadow-sm placeholder:text-brand-400 transition-colors focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-400 hover:text-brand-600"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <button
        type="submit"
        className="inline-flex shrink-0 items-center cursor-pointer justify-center gap-2 rounded-xl bg-brand-900 px-3 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-brand-800 sm:px-4"
      >
        <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
        <span className="hidden sm:inline">Search</span>
      </button>
    </form>
  );
}
