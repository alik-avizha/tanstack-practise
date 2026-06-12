import { createFileRoute, useNavigate } from "@tanstack/react-router";
import * as v from "valibot";

const Category = v.union([
  v.literal("electronics"),
  v.literal("clothing"),
  v.literal("books"),
  v.literal("toys"),
]);

const ItemFilters = v.object({
  query: v.optional(v.string()),
  hasDiscount: v.optional(v.boolean()),
  categories: v.optional(v.array(Category)),
});

type ItemFilters = v.InferOutput<typeof ItemFilters>;

export const Route = createFileRoute("/search")({
  validateSearch: (search) => v.parse(ItemFilters, search),
  component: Search,
  staticData: { breadcrumb: "Search" },
});

function Search() {
  const { query, hasDiscount, categories } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const updateFilters = (name: keyof ItemFilters, value: unknown) => {
    navigate({ search: (prev) => ({ ...prev, [name]: value }) });
  };

  return (
    <div className="min-h-[calc(100vh-200px)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-cyan to-neon-pink bg-clip-text text-transparent mb-2">
            Search Pokemon
          </h1>
          <p className="text-gray-400">Find your perfect Pokemon companion</p>
        </div>

        {/* Search and Filters */}
        <div className="neon-card p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search Input */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Search Query
              </label>
              <div className="relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  value={query || ""}
                  onChange={(e) => {
                    updateFilters("query", e.target.value);
                  }}
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-dark-800 border border-dark-500 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-colors duration-300"
                  placeholder="Search by name..."
                />
              </div>
            </div>

            {/* Filters */}
            <div className="lg:w-64">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Filters
              </label>
              <div className="space-y-3">
                {/* Discount Toggle */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={hasDiscount || false}
                      onChange={(e) => updateFilters("hasDiscount", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-dark-600 rounded-full peer peer-checked:bg-neon-cyan transition-colors duration-300"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
                  </div>
                  <span className="text-sm text-gray-300">Has Discount</span>
                </label>
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Categories
            </label>
            <div className="flex flex-wrap gap-2">
              {(["electronics", "clothing", "books", "toys"] as const).map((cat) => {
                const isSelected = categories?.includes(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      const currentCats = categories || [];
                      const newCats = isSelected
                        ? currentCats.filter((c) => c !== cat)
                        : [...currentCats, cat];
                      updateFilters("categories", newCats);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      isSelected
                        ? "bg-neon-cyan text-dark-900"
                        : "bg-dark-700 text-gray-300 border border-dark-500 hover:border-neon-cyan"
                    }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="neon-card p-6">
          <h2 className="text-xl font-bold text-white mb-4">Results</h2>
          
          {/* Search Query Display */}
          <div className="bg-dark-800/50 rounded-lg p-4 mb-6">
            <div className="text-sm text-gray-400 mb-2">Current Search:</div>
            <div className="flex flex-wrap gap-2">
              {query && (
                <span className="px-3 py-1 rounded-full bg-neon-cyan/20 text-neon-cyan text-sm">
                  Query: "{query}"
                </span>
              )}
              {hasDiscount && (
                <span className="px-3 py-1 rounded-full bg-neon-pink/20 text-neon-pink text-sm">
                  Has Discount
                </span>
              )}
              {categories?.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 rounded-full bg-neon-purple/20 text-neon-purple text-sm"
                >
                  {cat}
                </span>
              ))}
              {!query && !hasDiscount && (!categories || categories.length === 0) && (
                <span className="text-gray-500 text-sm">No filters applied</span>
              )}
            </div>
          </div>

          {/* Placeholder Results */}
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-400">
              {query || hasDiscount || (categories && categories.length > 0)
                ? "No results found. Try adjusting your filters."
                : "Start typing to search for Pokemon"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
