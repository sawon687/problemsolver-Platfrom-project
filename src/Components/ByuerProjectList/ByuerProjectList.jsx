'use client'
import React from 'react';
import ListCard from '../ProjectlistCard/ListCard';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { LayoutGrid, Plus, FolderOpen, AlertCircle } from 'lucide-react';

const ByuerProjectList = () => {
  const { data: session } = useSession();

  // React Query implementation
  const { data: projects = [], isLoading, isError, error } = useQuery({
    queryKey: ['projects', session?._id],
    queryFn: async () => {
      const id = session?._id;
      if (!id) return [];
      
      const res = await fetch(`/api/Project/${id}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
      });
      
      if (!res.ok) throw new Error('Failed to fetch data');
      const result = await res.json();
      return result?.data || [];
    },
    enabled: !!session?._id,
  });
console.log('projects',projects)
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen selection:bg-indigo-100">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg text-white">
              <LayoutGrid size={24} />
            </div>
            Manage Projects
          </h1>
          <p className="text-slate-500 mt-2 text-sm md:text-base">
            Overview of your project submissions, budgets, and status tracking.
          </p>
        </div>
        
        <button className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-200 active:scale-95">
          <Plus size={20} />
          Post New Project
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden outline outline-4 outline-slate-50/50">
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-slate-50/80">
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">#</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">Project Title</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">Deadline</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">Budget</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">Status</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                // Modern Skeleton Loader
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={6} className="px-6 py-8">
                      <div className="h-5 bg-slate-100 rounded-md w-full"></div>
                    </td>
                  </tr>
                ))
              ) : isError ? (
                // Error State
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <div className="inline-flex items-center gap-2 text-red-500 bg-red-50 px-4 py-2 rounded-full border border-red-100">
                      <AlertCircle size={18} />
                      <span className="font-medium">{error.message}</span>
                    </div>
                  </td>
                </tr>
              ) : projects.length > 0 ? (
                projects.map((item, index) => (
                  <ListCard key={item._id} item={item} index={index} />
                ))
              ) : (
                // Empty State with Indigo Touch
                <tr>
                  <td colSpan={6} className="px-6 py-32 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-4 text-indigo-300">
                        <FolderOpen size={40} strokeWidth={1.5} />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-800">No projects found</h3>
                      <p className="text-slate-500 mt-1 max-w-sm mx-auto">You haven't listed any projects yet. Click the button above to get started.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ByuerProjectList;