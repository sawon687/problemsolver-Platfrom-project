'use client';
import React from 'react';

const ProjectSkeletons = () => {
  const skeletonRows = Array.from({ length: 6 }); // 6 ti loading row dekhabe

  return (
    <>
      {skeletonRows.map((_, i) => (
        <tr key={i} className="border-b border-slate-100 last:border-0">
          {/* Index Skeleton */}
          <td className="px-6 py-6">
            <div className="h-4 w-4 bg-slate-200 rounded animate-pulse" />
          </td>

          {/* Project Details Skeleton */}
          <td className="px-6 py-6">
            <div className="flex flex-col gap-2">
              <div className="h-5 w-48 bg-slate-200 rounded-lg animate-pulse" />
              <div className="h-3 w-32 bg-slate-100 rounded-md animate-pulse" />
            </div>
          </td>

          {/* Budget Skeleton */}
          <td className="px-6 py-6">
            <div className="h-5 w-16 bg-slate-200 rounded-md animate-pulse" />
          </td>

          {/* Timeline Skeleton */}
          <td className="px-6 py-6">
            <div className="h-4 w-24 bg-slate-100 rounded-md animate-pulse" />
          </td>

          {/* Status Skeleton */}
          <td className="px-6 py-6 text-center">
            <div className="mx-auto h-6 w-20 bg-slate-200 rounded-full animate-pulse" />
          </td>

          {/* Task Flow Skeleton */}
          <td className="px-6 py-6">
            <div className="h-4 w-20 bg-slate-100 rounded-md animate-pulse" />
          </td>

          {/* Action Skeleton */}
          <td className="px-6 py-6 text-right">
            <div className="ml-auto h-9 w-9 bg-slate-100 rounded-xl animate-pulse" />
          </td>
        </tr>
      ))}
    </>
  );
};

export default ProjectSkeletons;