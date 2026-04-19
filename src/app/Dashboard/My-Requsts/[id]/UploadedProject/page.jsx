import ProjectUpoladed from '@/Components/ProjectUpoladed/ProjectUpoladed';
import { cookies } from 'next/headers';
import React from 'react';
import { 
  Layout, 
  Calendar, 
  Tag, 
  DollarSign, 
  CheckCircle2, 
  FileText, 
  ArrowLeft,
  Briefcase
} from 'lucide-react';
import Link from 'next/link';

const getReqProject = async (id) => {
  const Cookes = cookies();
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user-project/${id}`, {
    method: 'GET',
    headers: {
      Cookie: (await Cookes).toString(),
    },
    cache: "no-store",
  });
  const project = await res.json();
  return project.data;
}

const Page = async ({ params }) => {
  const { id } = await params;
  const reqProject = await getReqProject(id) || {};

  return (
    <div className="min-h-screen bg-[#F1F5F9] dark:bg-slate-950 py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Top Navigation */}
        <div className="flex items-center justify-between">
          <Link href="/Dashboard/My-Requsts" className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-bold text-sm group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Requests
          </Link>
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-200/50 dark:bg-slate-800 px-3 py-1 rounded-full">
            Project Node: #{id.slice(-6)}
          </div>
        </div>

        {/* Hero Section Card */}
        <div className="relative bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white dark:border-slate-800 overflow-hidden">
          {/* Animated Background Blob */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 animate-pulse" />
          
          <div className="relative z-10 p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4">
                <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl text-[11px] font-black uppercase tracking-wider border shadow-sm ${
                  reqProject.status === 'completed' 
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                  : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                }`}>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
                  </span>
                  {reqProject.status}
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                  {reqProject.ProjectTitle || "Project Brief"}
                </h1>
              </div>

              {/* Budget Badge */}
              <div className="bg-slate-900 dark:bg-indigo-600 p-6 rounded-[2rem] text-white min-w-[200px] text-center shadow-xl shadow-indigo-200 dark:shadow-none transition-transform hover:scale-105">
                <p className="text-indigo-300 dark:text-indigo-100 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Fixed Budget</p>
                <div className="text-3xl font-black flex items-center justify-center gap-1">
                  <span className="text-lg opacity-60">$</span>
                  {reqProject.ProjectBudget}
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
              <StatItem 
                icon={<Briefcase size={18} />} 
                label="Category" 
                value={reqProject.ProjectCategory} 
                color="blue"
              />
              <StatItem 
                icon={<Calendar size={18} />} 
                label="Timeline" 
                value={reqProject.ProjectDeadline} 
                color="orange"
              />
              <StatItem 
                icon={<CheckCircle2 size={18} />} 
                label="Assigned ID" 
                value={`W-${id.slice(0, 5)}`} 
                color="emerald"
              />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Side: Description */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 rounded-2xl">
                  <FileText size={22} />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Requirement Details</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-lg italic">
                "{reqProject.ProjectDescription}"
              </p>
            </div>
          </div>

          {/* Right Side: Upload Box */}
          <div className="lg:col-span-20">
            <div className="sticky top-10">
               <ProjectUpoladed id={id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const StatItem = ({ icon, label, value, color }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-500/5 dark:border-blue-500/10",
    orange: "bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-500/5 dark:border-orange-500/10",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/5 dark:border-emerald-500/10"
  };

  return (
    <div className={`p-4 rounded-[1.5rem] border ${colors[color]} flex items-center gap-4`}>
      <div className="hidden sm:block opacity-80">{icon}</div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-0.5">{label}</p>
        <p className="text-sm font-bold truncate max-w-[120px]">{value}</p>
      </div>
    </div>
  );
};

export default Page;