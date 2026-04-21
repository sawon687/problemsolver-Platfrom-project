'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { 
  IoBriefcaseOutline, IoCheckmarkDoneCircleOutline, IoLayersOutline, 
  IoSendOutline, IoArrowForwardOutline, IoFlashOutline, IoCalendarOutline
} from 'react-icons/io5';
import Link from 'next/link';
import { WorkerDashboardSkeleton } from '../LoadinSKelation/WorkerDashboardSkeleton';


const SolverDashboard = () => {
  const { data: session } = useSession();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const { data: apiResponse, isLoading } = useQuery({
    queryKey: ['solverSummary', session?.user?.email],
    queryFn: async () => {
      const res = await fetch(`/api/Worker/worker-dashboard`);
      return res.json();
    },
    enabled: !!session?.user?.email,
  });

  const summary = apiResponse?.result;
  console.log('summary',summary)

  const stats = [
    { title: 'Total Requests', value: summary?.totalRequests || 0, icon: <IoSendOutline />, color: 'from-indigo-600 to-indigo-400' },
    { title: 'In Progress', value: summary?.assignedTasks || 0, icon: <IoFlashOutline />, color: 'from-blue-600 to-cyan-400' },
    { title: 'Submitted', value: summary?.totalSubmissions || 0, icon: <IoLayersOutline />, color: 'from-violet-600 to-purple-400' },
    { title: 'Finished', value: summary?.completedTasks || 0, icon: <IoCheckmarkDoneCircleOutline />, color: 'from-emerald-600 to-teal-400' },
  ];

  if (isLoading) return <WorkerDashboardSkeleton></WorkerDashboardSkeleton>
  return (
    <div className="min-h-screen bg-[#F8FAFF] font-sans pb-10">
      
       <header className="w-full mb-6">
      <div className="bg-gradient-to-br from-white/70 to-slate-50 backdrop-blur-xl border border-slate-100 rounded-3xl p-5 md:p-7 shadow-sm flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        {/* Left */}
        <div className="flex items-center gap-4">
          <img
            src={session?.userPhoto || "/default-user.png"}
            className="w-14 h-14 rounded-2xl object-cover shadow-md ring-2 ring-white"
            alt="User"
          />

          <div>
            <h2 className="text-xl font-black text-slate-900">
              Welcome back 👋
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              {session?.username || "User"} • Let’s solve something today
            </p>
          </div>
        </div>

        {/* Middle Info */}
        <div className="flex flex-wrap items-center gap-3">

          <div className="bg-indigo-50 px-4 py-2 rounded-xl">
            <p className="text-xs text-indigo-500 font-bold uppercase">Status</p>
            <p className="text-sm font-black text-indigo-700">Active Solver</p>
          </div>

          <div className="bg-slate-50 px-4 py-2 rounded-xl">
            <p className="text-xs text-slate-400 font-bold uppercase">Time</p>
            <p className="text-sm font-black text-slate-700 tabular-nums">
              {currentTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </p>
          </div>

          <div className="bg-emerald-50 px-4 py-2 rounded-xl">
            <p className="text-xs text-emerald-500 font-bold uppercase">Focus</p>
            <p className="text-sm font-black text-emerald-700">High</p>
          </div>

        </div>

        {/* Right Actions */}
       

      </div>
    </header>
   

      <main className="max-w-[1600px] mx-auto p-6 md:p-10">
        
        {/* Banner */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full bg-gradient-to-r from-indigo-700 to-indigo-900 rounded-[3rem] p-8 md:p-12 mb-12 relative overflow-hidden text-white">
          <div className="relative z-10 md:w-2/3">
            <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">Boost your productivity <br/> with TaskFlow.</h1>
            <p className="mb-6 text-indigo-100">You have {summary?.activeAssignments?.length || 0} active assignments waiting for submission.</p>
            <button className="bg-white text-indigo-700 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-50 transition-all flex items-center gap-3 shadow-xl">
              Browse New Projects <IoArrowForwardOutline size={16}/>
            </button>
          </div>
          <IoBriefcaseOutline className="absolute -bottom-10 -right-10 text-white/10" size={300} />
        </motion.div>

        {/* Dynamic Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-6 shadow-lg shadow-indigo-100`}>
                {stat.icon}
              </div>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.title}</p>
              <h3 className="text-3xl font-black text-slate-800">{stat.value}</h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
       {/* Active Assignments List */}
<div className="xl:col-span-2 space-y-8">
  <div className="bg-white rounded-[3.5rem] p-8 md:p-12 border border-slate-100 shadow-sm">
    <h2 className="text-2xl font-black text-slate-900 mb-10 flex items-center gap-4">
      <span className="w-3 h-8 bg-indigo-600 rounded-full"></span>
      Active Assignments
    </h2>
    
    <div className="grid gap-5">
      {summary?.activeAssignments?.length > 0 ? (
        summary.activeAssignments.map((task, i) => (
          <motion.div 
            key={i} 
            whileHover={{ x: 10 }} 
            className="p-7 bg-[#FBFBFF] rounded-[2.5rem] border border-transparent hover:border-indigo-100 transition-all flex flex-col md:flex-row justify-between items-center gap-6"
          >
            <div className="flex items-center gap-6 w-full">
            
              <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-2xl shadow-sm border border-slate-50">
                🚀
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-black text-slate-800">
                    {task.name || 'Project Application'}
                  </h4>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-600 text-[9px] font-bold rounded-full uppercase">
                    {task.status}
                  </span>
                </div>
               
                <div className="flex flex-wrap gap-4 mt-2">
                  <p className="text-[11px] text-slate-500 font-bold flex items-center gap-1">
                    <span className="text-indigo-500">💰 Budget:</span> ${task.userBitBudget}
                  </p>
                  <p className="text-[11px] text-slate-500 font-bold flex items-center gap-1">
                    <span className="text-indigo-500">⏳ Timeline:</span> {task.expectedTimeline}
                  </p>
                </div>
                
                <p className="text-[10px] text-slate-400 font-medium mt-2 italic">
                  "{task.message?.slice(0, 60)}..."
                </p>
              </div>
            </div>

          <div className="flex flex-col gap-2 w-full md:w-auto">
 <Link href={`/Dashboard/My-Requsts/${task.projectId}/UploadedProject`}> <button className="w-full md:w-48 px-6 py-4 bg-indigo-600 text-white rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest shadow-lg hover:bg-slate-900 transition-all whitespace-nowrap">
    Submit Work
  </button></Link>
  <p className="text-[9px] text-center text-slate-400 font-bold">
    ID: {task.projectId?.slice(-8)}
  </p>
</div>
          </motion.div>
        ))
      ) : (
        <div className="text-center py-16 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-100">
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">
            No active assignments found
          </p>
        </div>
      )}
    </div>
  </div>
</div>

          {/* Recent Requests List */}
          <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 mb-10">My Recent Requests</h2>
            <div className="space-y-8">
              {summary?.recentRequests?.length > 0 ? (
                summary.recentRequests.map((req, i) => (
                  <div key={i} className="flex items-start justify-between group">
                    <div className="flex gap-4">
                      <div className={`w-2 h-2 mt-2 rounded-full ring-4 ${req.status === 'pending' ? 'bg-amber-500 ring-amber-50' : 'bg-indigo-600 ring-indigo-50'}`}></div>
                      <div>
                        <p className="text-sm font-black text-slate-800 line-clamp-1">{req.ProjectTitle || 'Project Application'}</p>
                        <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">ID: ...{req._id?.slice(-6)}</p>
                      </div>
                    </div>
                    <span className={`px-4 py-1.5 rounded-2xl text-[9px] font-black uppercase tracking-widest ${
                      req.status === 'pending' ? 'bg-amber-100 text-amber-600' : 'bg-indigo-100 text-indigo-600'
                    }`}>
                      {req.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center text-slate-300 py-5">No requests found</div>
              )}
            </div>
    <Link href='/Dashboard/My-Requsts'>
        <button className="w-full mt-12 py-5 bg-gray-900 text-white hover:bg-indigo-600 hover:text-white rounded-[1.5rem] text-[10px] font-black text-slate-500 uppercase tracking-widest transition-all">
              View All History
            </button>    </Link>
          </div>

        </div>
      </main>
    </div>
  );
};

export default SolverDashboard;