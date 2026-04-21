'use client';
import React from 'react';

const BuyerDashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFF] p-4 md:p-8 animate-pulse">
      
      {/* 1. Header Skeleton */}
      <header className="max-w-7xl mx-auto mb-8">
        <div className="bg-white border border-slate-100 rounded-[2rem] p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-slate-200 rounded-2xl shadow-inner" />
            <div className="space-y-2">
              <div className="h-6 w-40 bg-slate-200 rounded-lg" />
              <div className="h-4 w-24 bg-slate-100 rounded-md" />
            </div>
          </div>
          <div className="h-12 w-40 bg-slate-200 rounded-2xl" />
        </div>
      </header>

      {/* 2. Hero Banner Skeleton */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="bg-indigo-950 rounded-[2.5rem] p-8 md:p-12 h-64 flex justify-between items-center relative overflow-hidden">
          <div className="space-y-4 z-10 w-full md:w-1/2">
            <div className="h-10 w-3/4 bg-indigo-900 rounded-xl" />
            <div className="h-10 w-1/2 bg-indigo-900 rounded-xl" />
            <div className="h-4 w-2/3 bg-indigo-800/50 rounded mt-4" />
          </div>
          <div className="hidden lg:block w-40 h-40 bg-indigo-800/30 rounded-[2.5rem] rotate-3" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* 3. Stat Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white border border-slate-200 p-6 rounded-[2rem]">
              <div className="w-12 h-12 bg-slate-100 rounded-2xl mb-4" />
              <div className="h-3 w-16 bg-slate-100 rounded mb-2" />
              <div className="h-8 w-12 bg-slate-200 rounded-lg mb-2" />
              <div className="h-3 w-20 bg-slate-50 rounded" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 4. Project Pipeline Skeleton */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8">
              <div className="h-7 w-48 bg-slate-200 rounded-lg mb-8" />
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-3xl">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-white border border-slate-100 rounded-2xl" />
                      <div className="space-y-2">
                        <div className="h-5 w-48 bg-slate-200 rounded" />
                        <div className="h-3 w-24 bg-slate-100 rounded" />
                      </div>
                    </div>
                    <div className="w-6 h-6 bg-slate-200 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 5. Sidebar Skeleton */}
          <div className="space-y-8">
            {/* Dark Task Box */}
            <div className="bg-slate-900 rounded-[2.5rem] p-8">
              <div className="h-6 w-32 bg-slate-800 rounded mb-6" />
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                    <div className="h-3 w-12 bg-slate-800 rounded mb-2" />
                    <div className="h-6 w-8 bg-slate-700 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Distribution Matrix */}
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8">
              <div className="h-4 w-32 bg-slate-100 rounded mb-6" />
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between">
                      <div className="h-3 w-20 bg-slate-100 rounded" />
                      <div className="h-3 w-6 bg-slate-100 rounded" />
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboardSkeleton;