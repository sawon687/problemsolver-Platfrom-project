import React from 'react';

const ProjectSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#FDFEFF] pb-20 animate-pulse">
      {/* Background Header Skeleton */}
      <div className="h-[450px] bg-slate-200 w-full absolute top-0 left-0" />

      <div className="max-w-7xl mx-auto p-6 md:p-12 relative z-10">
        
        {/* Navigation Skeleton */}
        <div className="h-10 w-40 bg-white/20 rounded-xl mb-10" />

        {/* Hero Section Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex gap-3">
              <div className="h-6 w-24 bg-white/10 rounded-full" />
              <div className="h-6 w-32 bg-white/10 rounded-full" />
            </div>

            <div className="space-y-3">
              <div className="h-16 w-full bg-white/10 rounded-2xl" />
              <div className="h-16 w-3/4 bg-white/10 rounded-2xl" />
            </div>

            <div className="flex gap-8 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10" />
                <div className="h-4 w-24 bg-white/10 rounded-md" />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10" />
                <div className="h-4 w-24 bg-white/10 rounded-md" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-slate-800 h-64 rounded-[2.5rem] w-full" />
          </div>
        </div>

        {/* Content Body Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16">
          <div className="lg:col-span-8 space-y-12">
            
            {/* Description Skeleton */}
            <div className="bg-white p-12 rounded-[2.5rem] border border-slate-100 space-y-4">
              <div className="h-8 w-48 bg-slate-100 rounded-lg mb-6" />
              <div className="h-4 w-full bg-slate-50 rounded-md" />
              <div className="h-4 w-full bg-slate-50 rounded-md" />
              <div className="h-4 w-2/3 bg-slate-50 rounded-md" />
            </div>

            {/* Proposals Skeleton */}
            <div className="space-y-6">
              <div className="h-8 w-32 bg-slate-200 rounded-lg ml-2" />
              {[1, 2].map((i) => (
                <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 space-y-6">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl" />
                    <div className="space-y-2">
                      <div className="h-6 w-40 bg-slate-100 rounded-md" />
                      <div className="h-4 w-32 bg-slate-100 rounded-md" />
                    </div>
                  </div>
                  <div className="h-24 w-full bg-slate-50 rounded-2xl" />
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 h-96" />
            <div className="bg-slate-200 h-64 rounded-[3rem]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSkeleton;