'use client'
import React from 'react';
import { useQuery } from '@tanstack/react-query';

const SolverInfo = ({ solverId }) => {
  console.log('solverid',solverId)
const { data: solver, isLoading } = useQuery({
  queryKey: ['solver', solverId],
  queryFn: async () => {
    if (!solverId) return null;

    const res = await fetch(`/api/Admin/userInfo/${solverId}`);
    const data = await res.json();
    return data.data;
  },
  enabled: !!solverId,
});

  console.log('solver',solver)

  if (isLoading) return <div className="h-40 bg-slate-100 animate-pulse rounded-[2rem]"></div>;

  return (
    <div className="bg-white border border-slate-100 shadow-sm rounded-[2.5rem] p-8 group hover:border-indigo-200 transition-all">
      <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 text-center">Assigned Solver</h2>
      
      <div className="flex flex-col items-center">
        <div className="relative mb-4">
          <img
            src={solver?.userPhoto || 'https://via.placeholder.com/150'}
            alt="solver"
            className="w-24 h-24 rounded-[2rem] object-cover ring-4 ring-indigo-50 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
        </div>
        
        <h3 className="text-xl font-black text-slate-800">{solver?.username}</h3>
          <h3 className="text-xl font-black text-slate-800">{solver?.userEmail}</h3>
        <p className="text-sm text-indigo-600 font-bold mb-4">Professional Developer</p>
        
        <div className="w-full space-y-3 mt-4 pt-4 border-t border-slate-50">
          <div className="flex justify-between text-xs font-bold uppercase">
            <span className="text-slate-400">Skills:</span>
            <span className="text-slate-700">{solver?.skill || 'N/A'}</span>
          </div>
          <div className="flex justify-between text-xs font-bold uppercase">
            <span className="text-slate-400">Contact:</span>
            <span className="text-slate-700">{solver?.phoneno
 || 'Private'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolverInfo;