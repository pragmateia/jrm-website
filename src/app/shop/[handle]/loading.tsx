export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-background pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image skeleton */}
          <div className="aspect-square bg-white/[0.06] rounded animate-pulse" />

          {/* Details skeleton */}
          <div className="space-y-6 animate-pulse">
            <div className="h-4 w-24 bg-white/[0.06] rounded" />
            <div className="h-8 w-3/4 bg-white/[0.06] rounded" />
            <div className="h-6 w-20 bg-white/[0.06] rounded" />
            <div className="h-px bg-white/10 my-6" />
            <div className="h-4 w-16 bg-white/[0.06] rounded" />
            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-12 h-10 bg-white/[0.06] rounded" />
              ))}
            </div>
            <div className="h-12 bg-white/[0.06] rounded mt-8" />
          </div>
        </div>
      </div>
    </div>
  );
}
