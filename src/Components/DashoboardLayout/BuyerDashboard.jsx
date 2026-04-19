import React, { useState, useEffect } from 'react';
import { 
  Zap, Layers, CheckCircle2, Users2, ArrowUpRight, Plus, 
  Calendar, Clock, Briefcase, ChevronRight, 
  TrendingUp, ClipboardList, Send, XCircle, Clock4, BarChart3
} from 'lucide-react';

const BuyerAdvancedDashboard = ({ apiData }) => {
  // Destructuring all dynamic status from your backend structure
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
    <div className="min-h-screen bg-[#F8FAFF] text-slate-900 p-6 md:p-10">
      
      {/* --- Header Section --- */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Control <span className="text-indigo-600 font-medium">Console</span>
          </h1>
          <p className="text-slate-400 font-bold text-xs mt-1 uppercase tracking-widest flex items-center gap-2">
            <Calendar size={14} className="text-indigo-400" /> 
            {time.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* System Time */}
        <div className="bg-white border border-slate-200 shadow-sm px-6 py-3 rounded-2xl flex items-center gap-4">
           <Clock size={20} className="text-indigo-600" />
           <p className="text-xl font-mono font-bold text-slate-800 tabular-nums">
              {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
           </p>
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
          
          {/* --- Left Column: Project Operational Flow --- */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                  <BarChart3 className="text-indigo-500" size={24} /> Project Pipeline
                </h3>
                <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-indigo-700 transition flex items-center gap-2">
                  <Plus size={16} /> Create New
                </button>
              </div>

              <div className="space-y-4">
                {projects.length > 0 ? projects.map((p, idx) => (
                  <div key={p._id || idx} className="group flex items-center justify-between p-5 bg-slate-50 hover:bg-white border border-transparent hover:border-indigo-100 rounded-3xl transition-all">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 text-indigo-600 font-bold">
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
                )) : <p className="text-center py-10 text-slate-400">No projects deployed yet.</p>}
              </div>
            </div>
          </div>

          {/* --- Right Column: Task & Request Monitoring --- */}
          <div className="space-y-8">
            
            {/* Task Management Monitoring */}
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-slate-200 overflow-hidden relative">
               <TrendingUp className="absolute -right-6 -bottom-6 w-32 h-32 opacity-10" />
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

            {/* Request Status Breakdown */}
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
               <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Request Distribution</h4>
               <div className="space-y-5">
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

// --- Reusable Sub-components ---

const StatCard = ({ title, value, color, icon, subText }) => {
  const colors = {
    indigo: "bg-indigo-50 text-indigo-600",
    blue: "bg-blue-50 text-blue-600",
    orange: "bg-orange-50 text-orange-600",
    emerald: "bg-emerald-50 text-emerald-600",
  };
  return (
    <div className="bg-white border border-slate-200 p-6 rounded-3xl hover:shadow-xl hover:shadow-indigo-500/5 transition-all group">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${colors[color]}`}>
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
    <div className={`flex items-center gap-2 mb-1 ${color}`}>
       {icon}
       <span className="text-[10px] font-black uppercase tracking-tighter">{label}</span>
    </div>
    <div className="text-xl font-bold">{value}</div>
  </div>
);

const StatusProgress = ({ label, value, total, color }) => {
  const percentage = Math.min((value / total) * 100, 100);
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[11px] font-black uppercase tracking-tighter text-slate-500">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
        <div className={`h-full ${color} transition-all duration-700`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
};

export default BuyerAdvancedDashboard;