import ProjectUpoladed from '@/Components/ProjectUpoladed/ProjectUpoladed';
import { cookies } from 'next/headers';
import React from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  FileText, 
  ArrowLeft,
  Briefcase,
  Zap,
  ChevronRight,
  Target
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
  return project.result;
}

const Page = async ({ params }) => {
  const { id } = await params;
  const reqProject = await getReqProject(id) || {};
  const project = reqProject.project || {};

  return (
    <div className="min-h-screen  py-8 px-4 sm:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Navigation & ID Badge */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Link href="/Dashboard/My-Requsts" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-all font-black text-xs uppercase tracking-widest group">
            <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm group-hover:shadow-md group-hover:-translate-x-1 transition-all">
               <ArrowLeft size={16} />
            </div>
            Back to Requests
          </Link>
          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">
              Node: {id.slice(-8)}
            </span>
          </div>
        </div>

        {/* Hero Card - The Core Design Upgrade */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900 rounded-[3rem] border border-white dark:border-slate-800 shadow-[0_30px_100px_rgba(0,0,0,0.02)] dark:shadow-none">
          {/* Decorative Glows */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-500/5 rounded-full blur-[80px]" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/5 rounded-full blur-[60px]" />

          <div className="relative z-10 p-8 md:p-14">
            <div className="flex flex-col lg:flex-row justify-between gap-10">
              <div className="space-y-6 flex-1">
                <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                  project.status === 'completed' 
                  ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' 
                  : 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20'
                }`}>
                  <Zap size={12} fill="currentColor" />
                  {project.status}
                </div>
                
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
                  {project.ProjectTitle || "Project Brief"}
                </h1>

                {/* Horizontal Stat Items */}
                <div className="flex flex-wrap gap-6 pt-4">
                  <StatPill icon={<Briefcase size={14}/>} label="Category" value={project.ProjectCategory} />
                  <StatPill icon={<Calendar size={14}/>} label="Timeline" value={project.ProjectDeadline} />
                  <StatPill icon={<Target size={14}/>} label="Token" value={`W-${id.slice(0, 5)}`} />
                </div>
              </div>

              {/* Budget Display - Vertical Glass Card */}
              <div className="lg:w-72">
                <div className="bg-slate-900 dark:bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-200 dark:shadow-indigo-900/20 transform hover:scale-[1.02] transition-all duration-500">
                   <p className="text-indigo-300 dark:text-indigo-100 text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-center opacity-70">Payout Amount</p>
                   <div className="flex items-center justify-center gap-2">
                     <span className="text-2xl font-bold opacity-40">৳</span>
                     <span className="text-6xl font-black tabular-nums">{project.ProjectBudget}</span>
                   </div>
                   <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-60">
                     <CheckCircle2 size={12} /> Secure Transaction
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Descroption */}
        <div className=" mb-10">
          {/* Main Content Area */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white  backdrop-blur-md rounded-[2.5rem] p-10 border border-slate-200  shadow-sm group">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3.5 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-200 dark:shadow-none transition-transform group-hover:rotate-12">
                  <FileText size={24} />
                </div>
                <h3 className="text-2xl font-black text-slate-900  tracking-tight">Requirement Details</h3>
              </div>
              <div className="relative">
                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-transparent rounded-full opacity-20" />
                 <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium italic pl-8">
                    "{project.ProjectDescription}"
                 </p>
              </div>
            </div>
          </div>
              {/* Submission Form */}
          <div className="mt-10">
            <div className="sticky top-10 space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-2 shadow-xl">
                 <ProjectUpoladed id={id} />
              </div>
              
              {/* Quick Info Tip */}
              <div className="p-6 bg-indigo-50 dark:bg-indigo-500/5 rounded-[2rem] border border-indigo-100 dark:border-indigo-500/10 flex items-start gap-4">
                <div className="p-2 bg-white dark:bg-slate-800 rounded-lg text-indigo-600 shadow-sm">
                  <Zap size={16} fill="currentColor" />
                </div>
                <p className="text-[11px] text-slate-600 dark:text-indigo-300 font-bold leading-relaxed uppercase tracking-wider">
                  Finish your task before the deadline to maintain a 100% completion rate on your profile.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// Sub-component for Mini Stats
const StatPill = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 bg-slate-50 dark:bg-white/5 px-4 py-2.5 rounded-2xl border border-slate-100 dark:border-white/5 transition-colors hover:bg-white dark:hover:bg-white/10">
    <div className="text-indigo-500">{icon}</div>
    <div>
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{label}</p>
      <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{value}</p>
    </div>
  </div>
);

export default Page;