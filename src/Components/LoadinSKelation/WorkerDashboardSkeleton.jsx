export const WorkerDashboardSkeleton = () => (
  <div className="min-h-screen bg-[#F8FAFF] p-6 md:p-10 animate-pulse">
    {/* Header Skeleton */}
    <div className="w-full mb-6 bg-white rounded-3xl p-7 flex justify-between items-center border border-slate-100">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-slate-200 rounded-2xl"></div>
        <div className="space-y-2">
          <div className="h-5 w-32 bg-slate-200 rounded"></div>
          <div className="h-4 w-48 bg-slate-100 rounded"></div>
        </div>
      </div>
      <div className="hidden md:flex gap-3">
        <div className="h-10 w-24 bg-slate-100 rounded-xl"></div>
        <div className="h-10 w-24 bg-slate-100 rounded-xl"></div>
      </div>
    </div>

    {/* Banner Skeleton */}
    <div className="w-full h-64 bg-slate-200 rounded-[3rem] mb-12"></div>

    {/* Stats Skeleton */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="w-14 h-14 bg-slate-200 rounded-2xl mb-6"></div>
          <div className="h-3 w-20 bg-slate-100 rounded mb-2"></div>
          <div className="h-8 w-12 bg-slate-200 rounded"></div>
        </div>
      ))}
    </div>

    {/* Content Skeleton */}
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
      <div className="xl:col-span-2 bg-white rounded-[3.5rem] p-8 border border-slate-100">
        <div className="h-8 w-48 bg-slate-200 rounded-full mb-10"></div>
        <div className="space-y-5">
          {[1, 2].map((i) => (
            <div key={i} className="h-32 bg-slate-50 rounded-[2.5rem] border border-slate-100"></div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-3xl p-10 border border-slate-100">
        <div className="h-7 w-40 bg-slate-200 rounded mb-10"></div>
        <div className="space-y-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="flex gap-4">
                <div className="w-2 h-2 mt-2 bg-slate-200 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-slate-100 rounded"></div>
                  <div className="h-3 w-16 bg-slate-50 rounded"></div>
                </div>
              </div>
              <div className="h-6 w-16 bg-slate-100 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);