'use client'
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import ProjectCard from './ProjectCard';
import ProjectSkeletons from '../LoadinSKelation/ProjectSkeletons';

const ProjectTable = () => {

  const { data: projects = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await fetch('/api/Project', { cache: "no-cache" });
      const result = await res.json();
      return result.result || [];
    },
  });

  

  if (isError) return (
    <div className="text-center p-10 bg-red-50 rounded-2xl border border-red-200 text-red-600">
      Something went wrong while fetching data!
    </div>
  );

  return (
    <div className="p-4 sm:p-8 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto bg-white shadow-xl shadow-slate-200/50 rounded-3xl border border-slate-200 overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-slate-900 px-8 py-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Project Dashboard</h2>
            <p className="text-slate-400 text-sm mt-1">Manage and monitor all active projects</p>
          </div>
          <button 
            onClick={() => refetch()}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-emerald-500/20"
          >
            Refresh Data
          </button>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs uppercase font-bold text-slate-500 tracking-wider">#</th>
                <th className="px-6 py-4 text-xs uppercase font-bold text-slate-500 tracking-wider">Project Details</th>
                <th className="px-6 py-4 text-xs uppercase font-bold text-slate-500 tracking-wider">Budget</th>
                <th className="px-6 py-4 text-xs uppercase font-bold text-slate-500 tracking-wider">Timeline</th>
                <th className="px-6 py-4 text-xs uppercase font-bold text-slate-500 tracking-wider text-center">Status</th>
                <th className="px-6 py-4 text-xs uppercase font-bold text-slate-500 tracking-wider">Task Flow</th>
                <th className="px-6 py-4 text-xs uppercase font-bold text-slate-500 tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {
                isLoading?<ProjectSkeletons/>:<>
                {projects.map((proj, i) => (
                <ProjectCard index={i} project={proj} key={proj?._id} />
              ))}
                
                </>
              }
            </tbody>
          </table>
        </div>
        
        {projects.length === 0 && (
          <div className="text-center py-20 text-slate-400 font-medium">No projects found.</div>
        )}
      </div>
    </div>
  );
};

export default ProjectTable;