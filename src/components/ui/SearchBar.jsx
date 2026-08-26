import { Search, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../hooks/useApp";

export default function SearchBar({
  className = "",
  placeholder = "Search products...",
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
      className={`relative ${className}`}
      role="search"
    >
      <label htmlFor="search-input" className="sr-only">
        Search products
      </label>
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
        className="w-full rounded-lg border border-brand-200 bg-brand-50 py-2.5 pl-10 pr-10 text-sm text-brand-800 placeholder:text-brand-400 transition-colors focus:border-brand-400 focus:bg-white focus:outline-none"
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
    </form>
  );
}
