'use client'

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-slate-200 rounded-xl ${className}`}></div>
);

const HomeSkeleton = () => {
  return (
    <div className="min-h-screen bg-white pt-10 lg:pt-16 overflow-hidden relative">
      
      <div className="max-w-[1440px] mx-auto px-4 lg:px-10">
        
        {/* TOP SECTION: BANNER & ACTION CARDS SKELETON */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[550px] mb-16">
          
          {/* LEFT SIDE - SLIDER SKELETON (8 Columns) */}
          <div className="lg:col-span-8 relative rounded-[32px] overflow-hidden bg-slate-100 border border-slate-200 p-8 md:p-16 flex flex-col justify-center space-y-6">
            <Skeleton className="h-6 w-40 rounded-full" /> {/* Mini Badge */}
            <div className="space-y-4">
              <Skeleton className="h-14 w-3/4 md:w-2/3" /> {/* Big Title Line 1 */}
              <Skeleton className="h-14 w-1/2 md:w-1/3" /> {/* Big Title Line 2 */}
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full md:w-1/2" /> {/* Subtitle Line 1 */}
              <Skeleton className="h-4 w-2/3 md:w-1/3" /> {/* Subtitle Line 2 */}
            </div>
            <Skeleton className="h-14 w-48 rounded-2xl mt-4" /> {/* CTA Button */}
            
            {/* Dots Indicator Skeleton */}
            <div className="absolute bottom-8 left-8 md:left-16 flex gap-3">
               <Skeleton className="h-2 w-12 rounded-full" />
               <Skeleton className="h-2 w-4 rounded-full" />
               <Skeleton className="h-2 w-4 rounded-full" />
            </div>
          </div>

          {/* RIGHT SIDE - ACTION CARDS SKELETON (4 Columns) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Card 1 */}
            <div className="flex-1 rounded-[32px] bg-white border border-slate-200 p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <Skeleton className="w-12 h-12 rounded-2xl" />
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </div>
              <Skeleton className="h-14 w-full rounded-2xl" />
            </div>
            {/* Card 2 */}
            <div className="flex-1 rounded-[32px] bg-indigo-50/50 border border-indigo-100 p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <Skeleton className="w-12 h-12 rounded-2xl bg-indigo-200/50" />
                <Skeleton className="h-8 w-3/4 bg-indigo-200/50" />
                <Skeleton className="h-4 w-full bg-indigo-200/50" />
              </div>
              <Skeleton className="h-14 w-full rounded-2xl bg-indigo-200/50" />
            </div>
          </div>
        </div>

        {/* STATS SECTION SKELETON */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100">
              <Skeleton className="h-8 w-16 mb-3" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>

        {/* CONTENT GRID (Project Cards) SKELETON */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-5 rounded-[2.5rem] bg-white border border-slate-200 space-y-4">
              <Skeleton className="h-52 w-full rounded-[2rem]" />
              <div className="space-y-3 px-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="flex justify-between items-center pt-6 px-2 border-t border-slate-100">
                <div className="flex gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-4 w-20 mt-3" />
                </div>
                <Skeleton className="h-9 w-20 rounded-xl" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default HomeSkeleton;