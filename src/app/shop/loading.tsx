export default function ShopLoading() {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero skeleton */}
      <div className="relative h-[60vh] bg-white/[0.03] animate-pulse" />

      {/* Product grid skeleton */}
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20 py-16">
        <div className="h-8 w-48 bg-white/[0.06] rounded mb-10 animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[3/4] bg-white/[0.06] rounded mb-3" />
              <div className="h-4 w-3/4 bg-white/[0.06] rounded mb-2" />
              <div className="h-3 w-1/3 bg-white/[0.06] rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
