'use client';
import React from 'react';

const UserSkeleton = () => {
  // 5ti dummy row-er jonno array
  const rows = Array.from({ length: 5 });

  return (
    <>
      {rows.map((_, i) => (
        <tr key={i} className="border-b border-slate-100 last:border-0">
          
          {/* User Identity Skeleton */}
          <td className="px-6 py-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-200 animate-pulse" />
              <div className="flex flex-col gap-2">
                <div className="h-4 w-28 bg-slate-200 rounded-lg animate-pulse" />
                <div className="flex gap-2">
                  <div className="h-3 w-16 bg-slate-100 rounded-md animate-pulse" />
                  <div className="h-3 w-12 bg-indigo-50 rounded-md animate-pulse" />
                </div>
              </div>
            </div>
          </td>

          {/* Rate Skeleton */}
          <td className="px-6 py-5">
            <div className="flex flex-col gap-1">
              <div className="h-4 w-10 bg-slate-200 rounded animate-pulse" />
              <div className="h-3 w-14 bg-slate-100 rounded animate-pulse" />
            </div>
          </td>

          {/* Status Badge Skeleton */}
          <td className="px-6 py-5">
            <div className="h-7 w-20 bg-slate-200 rounded-xl animate-pulse" />
          </td>

          {/* Date Skeleton */}
          <td className="px-6 py-5">
            <div className="h-4 w-24 bg-slate-100 rounded-md animate-pulse" />
          </td>

          {/* Role Switcher Buttons Skeleton */}
          <td className="px-6 py-5">
            <div className="flex gap-2">
              <div className="h-9 w-20 bg-slate-100 rounded-xl animate-pulse" />
              <div className="h-9 w-20 bg-slate-100 rounded-xl animate-pulse" />
            </div>
          </td>

          {/* Delete Action Skeleton */}
          <td className="px-6 py-5 text-right">
            <div className="ml-auto h-10 w-10 bg-slate-100 rounded-xl animate-pulse" />
          </td>
          
        </tr>
      ))}
    </>
  );
};

export default UserSkeleton;