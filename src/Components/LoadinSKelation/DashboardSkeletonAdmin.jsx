
import React from 'react';


const DashboardSkeletonAdmin = () => {
  return (
    <div className="p-6 space-y-8 bg-slate-50 min-h-screen">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-10">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-slate-200 rounded-lg animate-pulse" />
          <div className="h-4 w-32 bg-slate-100 rounded-md animate-pulse" />
        </div>
        <div className="h-12 w-12 bg-slate-200 rounded-full animate-pulse" />
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm space-y-4">
            <div className="flex justify-between">
              <div className="h-10 w-10 bg-slate-100 rounded-xl animate-pulse" />
              <div className="h-4 w-12 bg-slate-50 rounded-full animate-pulse" />
            </div>
            <div className="h-6 w-24 bg-slate-200 rounded-md animate-pulse" />
            <div className="h-4 w-full bg-slate-50 rounded-md animate-pulse" />
          </div>
        ))}
      </div>

      {/* Main Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Large Chart Area */}
        <div className="lg:col-span-2 h-[400px] bg-white rounded-[32px] border border-slate-100 p-8">
          <div className="flex justify-between mb-8">
             <div className="h-6 w-40 bg-slate-200 rounded-md animate-pulse" />
             <div className="h-6 w-20 bg-slate-100 rounded-md animate-pulse" />
          </div>
          <div className="w-full h-full bg-slate-50 rounded-2xl animate-pulse" />
        </div>

        {/* Recent Activity Sidebar */}
        <div className="bg-white rounded-[32px] border border-slate-100 p-6 space-y-6">
           <div className="h-6 w-32 bg-slate-200 rounded-md animate-pulse mb-4" />
           {[...Array(5)].map((_, i) => (
             <div key={i} className="flex gap-4">
                <div className="h-10 w-10 bg-slate-100 rounded-full flex-shrink-0 animate-pulse" />
                <div className="space-y-2 w-full">
                   <div className="h-4 w-3/4 bg-slate-100 rounded animate-pulse" />
                   <div className="h-3 w-1/2 bg-slate-50 rounded animate-pulse" />
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeletonAdmin;