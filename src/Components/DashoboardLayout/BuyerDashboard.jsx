import React, { useState, useEffect } from 'react';
import { 
  Zap, Layers, CheckCircle2, Users2, ArrowUpRight, Plus, 
  Calendar, Clock, Briefcase, ChevronRight, 
  TrendingUp, ClipboardList, Send, XCircle, Clock4, BarChart3, BellRing, Search
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const BuyerDashboard = ({ apiData }) => {
  const { data: session } = useSession();
  const { 
    projects = [],
    totalProjects = 0,
    completedProject = 0,
    assignedProject = 0,
    pendingReq = 0,
    inprogressReq = 0,
    acceptReq = 0,
    RejectReq = 0,
    pendignTask = 0,
    submitedTask = 0,
    acceptTask = 0,
    rejectTask = 0
  } = apiData?.result || {};

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFF] text-slate-900 p-4 md:p-8">
      
     
      <header className="max-w-7xl mx-auto mb-8">
        <div className="bg-white/70 backdrop-blur-2xl border border-white shadow-xl shadow-indigo-100/20 rounded-[2rem] p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* User Profile Section */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative">
              <img
                src={session?.userPhoto || "https://ui-avatars.com/api/?name=User&background=6366f1&color=fff"}
                className="w-16 h-16 rounded-2xl object-cover shadow-inner border-2 border-white"
                alt="User"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full"></div>
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 leading-tight">
                Hi, {session?.user?.name || "Premium User"} 👋
              </h2>
              <p className="text-sm text-slate-500 font-bold flex items-center gap-2">
                <span className="bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-md text-[10px] uppercase">Pro Member</span>
                {time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit',second:'2-digit' })}
              </p>
            </div>
          </div>

         
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <div className="hidden sm:flex items-center bg-slate-100/50 rounded-2xl px-4 py-2 border border-slate-200">
               <Search size={18} className="text-slate-400" />
               <input type="text" placeholder="Search projects..." className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-32" />
            </div>
            
            <button className="relative p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all text-slate-600">
               <BellRing size={20} />
               <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
              <Link href={'/Dashboard/CreateProject'}>
            <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white text-sm font-black rounded-2xl hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 transition-all active:scale-95">
              <Plus size={18} /> <span className="hidden sm:inline">New Project</span>
            </button>
            </Link>
          </div>
        </div>
      </header>

      {/* ---  Hero Banner --- */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="relative overflow-hidden bg-indigo-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-indigo-200">
          <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-[-20%] left-[10%] w-40 h-40 bg-blue-400/20 rounded-full blur-2xl"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 border border-indigo-400/30 rounded-full text-indigo-200 text-[10px] font-black uppercase tracking-widest">
                <Zap size={14} className="fill-indigo-400 text-indigo-400" /> Control Console Active
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tighter">
                Accelerate your <br /> 
                <span className="text-indigo-400">Digital Workflow.</span>
              </h2>
              <p className="text-indigo-100/70 max-w-md font-medium text-sm md:text-base leading-relaxed">
                Welcome back! You have <span className="text-white font-bold">{inprogressReq} tasks in progress</span> and {pendingReq} new requests waiting for your approval.
              </p>
     <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
  {/* Niche Stats/Analytics section-e niye jabe */}
  <button 
    onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
    className="bg-white text-indigo-900 px-6 py-3 rounded-2xl font-bold text-sm hover:bg-indigo-50 transition-all flex items-center gap-2 shadow-lg"
  >
    Analytics Details <ChevronRight size={18} />
  </button>

  {/* Niche Project Pipeline-e niye jabe */}
  <button 
    onClick={() => document.getElementById('project-list')?.scrollIntoView({ behavior: 'smooth' })}
    className="bg-indigo-800/40 border border-indigo-700/50 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-indigo-800/60 transition-all"
  >
    Project Pipeline
  </button>
</div>
            </div>

            <div className="hidden lg:flex items-center justify-center w-1/3">
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-[2.5rem] rotate-3 shadow-2xl">
                  <BarChart3 size={70} className="text-indigo-300 opacity-80" />
                </div>
                <div className="absolute -top-6 -right-6 bg-emerald-500 p-4 rounded-2xl -rotate-6 shadow-xl border-4 border-white/10">
                  <CheckCircle2 size={32} className="text-white" />
                </div>
                <div className="absolute -bottom-4 -left-8 bg-orange-500 p-4 rounded-2xl rotate-12 shadow-xl border-4 border-white/10">
                   <TrendingUp size={28} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* --- Top Level Stats Matrix --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Projects" value={totalProjects} color="indigo" icon={<Layers size={22}/>} subText="Total Assets" />
          <StatCard title="In-Progress" value={inprogressReq} color="blue" icon={<Zap size={22}/>} subText="Active Workflows" />
          <StatCard title="Requests" value={pendingReq} color="orange" icon={<Users2 size={22}/>} subText="Awaiting Review" />
          <StatCard title="Completed" value={completedProject} color="emerald" icon={<CheckCircle2 size={22}/>} subText="Successful Drops" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                  <Briefcase className="text-indigo-500" size={24} /> Project Pipeline
                </h3>
                <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-3 py-1 rounded-full uppercase">Live Update</span>
              </div>

              <div className="space-y-4">
                {projects.length > 0 ? projects.map((p, idx) => (
                  <div key={p._id || idx} className="group flex items-center justify-between p-5 bg-slate-50 hover:bg-white border border-transparent hover:border-indigo-100 rounded-3xl transition-all hover:shadow-lg hover:shadow-indigo-500/5">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 text-indigo-600 font-bold group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{p.title}</h4>
                        <div className="flex gap-3 mt-1">
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Status: {p.status}</span>
                           <span className="text-[10px] font-black text-indigo-500 uppercase tracking-tighter">Budget: ${p.ProjectBudget || '0'}</span>
                        </div>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-indigo-50 rounded-lg text-slate-300 hover:text-indigo-600 transition-all">
                       <ArrowUpRight size={20} />
                    </button>
                  </div>
                )) : <p className="text-center py-10 text-slate-400 font-medium">No projects deployed yet.</p>}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-slate-200 overflow-hidden relative group">
               <TrendingUp className="absolute -right-6 -bottom-6 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform duration-700" />
               <h4 className="text-lg font-black mb-6 flex items-center gap-2">
                  <ClipboardList size={20} className="text-indigo-400" /> Task Overview
               </h4>
               <div className="grid grid-cols-2 gap-4">
                  <TaskBox label="Pending" value={pendignTask} icon={<Clock4 size={14}/>} color="text-orange-400" />
                  <TaskBox label="Submitted" value={submitedTask} icon={<Send size={14}/>} color="text-blue-400" />
                  <TaskBox label="Accepted" value={acceptTask} icon={<CheckCircle2 size={14}/>} color="text-emerald-400" />
                  <TaskBox label="Rejected" value={rejectTask} icon={<XCircle size={14}/>} color="text-rose-400" />
               </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Distribution Matrix</h4>
               <div className="space-y-6">
                  <StatusProgress label="Accepted Requests" value={acceptReq} total={totalProjects || 1} color="bg-emerald-500" />
                  <StatusProgress label="Rejected Requests" value={RejectReq} total={totalProjects || 1} color="bg-rose-500" />
                  <StatusProgress label="Assigned" value={assignedProject} total={totalProjects || 1} color="bg-indigo-500" />
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



const StatCard = ({ title, value, color, icon, subText }) => {
  const colors = {
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    orange: "bg-orange-50 text-orange-600 border-orange-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
  };
  return (
    <div className="bg-white border border-slate-200 p-6 rounded-[2rem] hover:shadow-xl hover:shadow-indigo-500/5 transition-all group cursor-default">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all group-hover:scale-110 group-hover:rotate-3 border ${colors[color]}`}>
        {icon}
      </div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
      <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{value}</h3>
      <p className="text-[11px] font-bold text-slate-400 mt-1">{subText}</p>
    </div>
  );
};

const TaskBox = ({ label, value, icon, color }) => (
  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md hover:bg-white/10 transition-colors">
    <div className={`flex items-center gap-2 mb-1 ${color}`}>
        {icon}
        <span className="text-[10px] font-black uppercase tracking-tighter">{label}</span>
    </div>
    <div className="text-xl font-bold">{value}</div>
  </div>
);

const StatusProgress = ({ label, value, total, color }) => {
  const percentage = Math.min((value / (total || 1)) * 100, 100);
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter text-slate-500">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-50">
        <div className={`h-full ${color} transition-all duration-1000 ease-out shadow-sm`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
};

export default BuyerDashboard;