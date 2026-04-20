'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import SolverInfo from '../SolverInfo/SolverInfo';
import { IoCalendarOutline, IoWalletOutline, IoShieldCheckmarkOutline } from "react-icons/io5";
import SubmittedTaskView from '../Task-Submition/SubmittedTaskView';

const ProjectDetailPage = ({ id }) => {
  
  const { data: project, isLoading, error } = useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      const res = await fetch(`/api/user-project/${id}`);
      const data = await res.json();
      return data.data;
    },
    enabled: !!id,
  });
console.log('project solver',project)
  if (isLoading) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );

  if (error) return <div className="text-center text-red-500 py-10">Error loading project.</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-500">
      {/* ---------------- Project Info Header ----------------*/}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8 md:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
           <IoShieldCheckmarkOutline size={120} className="text-indigo-600" />
        </div>
        
        <div className="relative z-10">
          <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black uppercase tracking-widest mb-4 inline-block">
            Project Overview
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-6">
            {project?.ProjectTitle}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                <IoWalletOutline size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Budget</p>
                <p className="text-lg font-black text-slate-800">${project?.ProjectBudget}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600">
                <IoCalendarOutline size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Deadline</p>
                <p className="text-lg font-black text-slate-800">{project?.ProjectDeadline}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
                <div className="w-3 h-3 bg-current rounded-full animate-pulse" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</p>
                <p className="text-lg font-black text-slate-800 capitalize">{project?.status}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
        <div className="lg:col-span-1">
          <SolverInfo solverId={project?.assignedSolverId
} />
        </div>

     
        <div className="lg:col-span-2">
       
            <SubmittedTaskView projectId={project._id } projectTitle={project.projectTitle} />
        
          
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;