'use client';
import React, { useState, useEffect } from 'react';
import { 
  Zap, Layers, CheckCircle2, Users2, ArrowUpRight, Plus, 
  Briefcase, ChevronRight, TrendingUp, ClipboardList, Send, 
  XCircle, Clock4, BarChart3, BellRing, Search
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import BuyerDashboardSkeleton from '../LoadinSKelation/BuyerDashboardSkeleton';


const BuyerDashboard = () => {
  const { data: session } = useSession();
  const [time, setTime] = useState(new Date());

  const { data: apiResponse, isLoading } = useQuery({
    queryKey: ['buyerStats', session?.email],
    queryFn: async () => {
      const res = await fetch('/api/Buyer/BuyerData');
      return res.json();
    },
    enabled: !!session?.email,
  });

  const { 
    projects = [],
    totalProjects = 0,
    completedProject = 0,
    assignedProject = 0,
    pendingReq = 0,
    inprogressReq = 0,
    acceptReq = 0,
    rejectReq = 0, 
    pendingTask = 0, 
    submittedTask = 0, 
    acceptTask = 0,
    rejectTask = 0
  } = apiResponse?.result || {};

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (isLoading) return <BuyerDashboardSkeleton/>
  return (
    <div className="min-h-screen bg-[#F8FAFF] text-slate-900 p-4 md:p-8">
      
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-8">
        <div className="bg-white/70 backdrop-blur-2xl border border-white shadow-xl shadow-indigo-100/20 rounded-[2rem] p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flx-col md:flex-row items-center gap-4">
            <div className="relative">
              <img
                src={session?.user?.image || "https://ui-avatars.com/api/?name=User"}
                className="w-16 h-16 rounded-2xl object-cover shadow-inner border-2 border-white"
                alt="User"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full"></div>
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">Hi, {session?.user?.name || "Premium User"} 👋</h2>
              <p className="text-sm text-slate-500 font-bold flex items-center gap-2">
                <span className="bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-md text-[10px] uppercase">Pro Member</span>
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </p>
            </div>
          </div>
          <Link href={'/Dashboard/CreateProject'}>
            <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white text-sm font-black rounded-2xl hover:bg-indigo-700 transition-all active:scale-95">
              <Plus size={18} /> New Project
            </button>
          </Link>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="relative overflow-hidden bg-indigo-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left space-y-4">
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                Accelerate your <br /> <span className="text-indigo-400">Digital Workflow.</span>
              </h2>
              <p className="text-indigo-100/70 max-w-md font-medium text-sm">
                Welcome back! You have <span className="text-white font-bold">{inprogressReq} tasks in progress</span> and {pendingReq} new requests waiting.
              </p>
            </div>
            <div className="hidden lg:block bg-white/10 backdrop-blur-md p-8 rounded-[2.5rem] rotate-3 border border-white/20">
               <BarChart3 size={70} className="text-indigo-300 opacity-80" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Level Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Projects" value={totalProjects} color="indigo" icon={<Layers size={22}/>} subText="Total Assets" />
          <StatCard title="In-Progress" value={inprogressReq} color="blue" icon={<Zap size={22}/>} subText="Active Workflows" />
          <StatCard title="Requests" value={pendingReq} color="orange" icon={<Users2 size={22}/>} subText="Awaiting Review" />
          <StatCard title="Completed" value={completedProject} color="emerald" icon={<CheckCircle2 size={22}/>} subText="Successful Drops" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Project Pipeline */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-3 mb-8">
                <Briefcase className="text-indigo-500" size={24} /> Project Pipeline
              </h3>
              <div className="space-y-4">
                {projects.map((p, idx) => (
                  <div key={p._id} className="group flex  flex-col md:flex-row items-center justify-between p-5 bg-slate-50 hover:bg-white border border-indigo-100  hover:border-indigo-400 rounded-3xl transition-all">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 text-indigo-600 font-bold">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">{p.ProjectTitle}</h4>
                        <div className="flex flex-col md:flex-row gap-3 mt-1">
                           <span className="text-[10px] font-black text-slate-400 uppercase">Status: {p.status}</span>
                           <span className="text-[10px] font-black text-indigo-500 uppercase">Budget: ${p.ProjectBudget || '0'}</span>
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight size={20} className="text-slate-300 group-hover:text-indigo-600" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Overview */}
          <div className="space-y-8">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
               <h4 className="text-lg font-black mb-6 flex items-center gap-2">
                  <ClipboardList size={20} className="text-indigo-400" /> Task Overview
               </h4>
               <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                  <TaskBox label="Pending" value={pendingTask} icon={<Clock4 size={14}/>} color="text-orange-400" />
                  <TaskBox label="Submitted" value={submittedTask} icon={<Send size={14}/>} color="text-blue-400" />
                  <TaskBox label="Accepted" value={acceptTask} icon={<CheckCircle2 size={14}/>} color="text-emerald-400" />
                  <TaskBox label="Rejected" value={rejectTask} icon={<XCircle size={14}/>} color="text-rose-400" />
               </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Distribution Matrix</h4>
               <div className="space-y-6">
                  <StatusProgress label="Accepted Requests" value={acceptReq} total={totalProjects} color="bg-emerald-500" />
                  <StatusProgress label="Rejected Requests" value={rejectReq} total={totalProjects} color="bg-rose-500" />
                  <StatusProgress label="Assigned" value={assignedProject} total={totalProjects} color="bg-indigo-500" />
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const StatCard = ({ title, value, color, icon, subText }) => {
  const colors = {
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    orange: "bg-orange-50 text-orange-600 border-orange-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
  };
  return (
    <div className="bg-white border border-slate-200 p-6 rounded-[2rem] hover:shadow-xl transition-all">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border ${colors[color]}`}>
        {icon}
      </div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
      <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{value}</h3>
      <p className="text-[11px] font-bold text-slate-400 mt-1">{subText}</p>
    </div>
  );
};

const TaskBox = ({ label, value, icon, color }) => (
  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
    <div className={`flex  items-center gap-2 mb-1 ${color}`}>
        {icon}
        <span className="text-[10px] font-black uppercase tracking-tighter">{label}</span>
    </div>
    <div className="text-xl font-bold">{value}</div>
  </div>
);

const StatusProgress = ({ label, value, total, color }) => {
  const percentage = total > 0 ? Math.min((value / total) * 100, 100) : 0;
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] font-black uppercase text-slate-500">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-50">
        <div className={`h-full ${color} transition-all duration-1000 ease-out`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
};

export default BuyerDashboard;