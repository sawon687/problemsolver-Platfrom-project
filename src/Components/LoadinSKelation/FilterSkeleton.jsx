export default function FilterSkeleton() {
  return (
    <div className="sticky top-20 z-40 w-full bg-white/70 backdrop-blur-xl border-b border-slate-200/60 py-4 shadow-sm animate-pulse">
      
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 flex items-center justify-between">

        {/* LEFT TITLE SKELETON */}
        <div className="hidden md:flex items-center gap-2">
          <div className="w-5 h-5 bg-slate-200 rounded"></div>
          <div className="w-24 h-4 bg-slate-200 rounded"></div>
        </div>

        {/* BUTTON SKELETONS */}
        <div className="flex items-center gap-3 overflow-x-auto px-5 py-2">
          {[1,2,3,4,5].map((i) => (
            <div
              key={i}
              className="w-28 h-10 bg-slate-200 rounded-2xl"
            ></div>
          ))}
        </div>

        {/* RIGHT RESULT SKELETON */}
        <div className="hidden lg:flex items-center gap-2">
          <div className="w-16 h-4 bg-slate-200 rounded"></div>
          <div className="w-5 h-5 bg-slate-200 rounded"></div>
        </div>

      </div>
    </div>
  );
}