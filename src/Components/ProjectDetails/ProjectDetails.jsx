'use client';
import React from "react";
import Link from "next/link";
import { 
  Calendar, 
  DollarSign, 
  Tag, 
  Clock, 
  User, 
  FileText, 
  ArrowLeft,
  ChevronRight,
  Users,
  Mail,
  Zap,
  Briefcase
} from "lucide-react";

const ProjectDetails = ({ project = {} }) => {
  const isAssigned = project?.status === "assigned";
  const isAvailable = project?.status === "unAssigned";
  const requestCount = project?.requests?.length || 0;
console.log('project details',project)
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-10 space-y-8 min-h-screen bg-[#fcfdff]">
      
      {/* Navigation */}
      <Link href="/Project" className="inline-flex items-center text-sm font-bold text-indigo-600 hover:gap-2 transition-all gap-1 group">
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </Link>

      {/* Main Header Card */}
      <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.15em] border ${
                isAssigned ? "bg-indigo-50 text-indigo-600 border-indigo-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"
              }`}>
                {project?.status}
              </span>
              <span className="flex items-center gap-1.5 text-slate-400 bg-slate-50 px-3 py-1 rounded-full text-xs font-bold border border-slate-100">
                <Tag size={12} /> {project?.ProjectCategory}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] mb-4">{project?.ProjectTitle}</h1>
            <p className="text-slate-500 font-medium flex items-center gap-2">
              <Calendar size={16} /> Created: {new Date(project?.createdAt).toLocaleDateString('en-GB')}
            </p>
          </div>
          <div className="bg-indigo-600 text-white p-8 rounded-[2rem] shadow-xl shadow-indigo-100 min-w-[240px] text-center">
            <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-1">Fixed Budget</p>
            <h2 className="text-4xl font-black">৳{project?.ProjectBudget}</h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Project Description */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><FileText size={20} /></div>
              Project Description
            </h3>
            <p className="text-slate-600 leading-relaxed text-lg font-medium">{project?.ProjectDescription}</p>
          </div>

          {/* Applications List */}
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3 px-2">
              <Users size={28} className="text-indigo-600" />
              Applications ({requestCount})
            </h3>

            <div className="grid gap-6">
              {project?.requests?.length > 0 ? (
                project.requests.map((req, i) => (
                  <div key={i} className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
                    <div className="absolute top-0 right-0 px-6 py-1 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-bl-2xl">
                      {req.status || "Pending"}
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl flex items-center justify-center text-xl font-black shadow-lg">
                          {req.name?.[0].toUpperCase()}
                        </div>
                        <div>
                          <h4 className="text-xl font-black text-slate-800 mb-1">{req.name}</h4>
                          <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-500">
                            <span className="flex items-center gap-1.5"><Mail size={14} className="text-indigo-500" /> {req.contactEmail}</span>
                            <span className="flex items-center gap-1.5"><Clock size={14} className="text-amber-500" /> {req.expectedTimeline}</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 min-w-[140px]">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Bid Amount</p>
                        <p className="text-xl font-black text-indigo-600">৳{req.userBitBudget}</p>
                      </div>
                    </div>
                    <div className="mt-6 p-4 bg-indigo-50/30 rounded-2xl border border-indigo-50 italic text-slate-600 text-sm">
                      "{req.message}"
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-slate-200 text-slate-400 font-bold">
                   No applications yet.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Action design ager moto */}
        <div className="lg:col-span-4  space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Quick Overview</h4>
            <div className="space-y-6">
              <InfoItem icon={<Clock />} label="Timeline" value={project?.ProjectDeadline} />
              <InfoItem icon={<User />} label="Buyer ID" value={project?.buyerId?.substring(0, 10) + '...'} />
              <InfoItem icon={<Briefcase />} label="Category" value={project?.ProjectCategory} />
            </div>
          </div>

          {/* Action Button Card (Ager Bold Design) */}
          <div className="bg-slate-950 fixed inset-0 top-0 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-100 group relative overflow-hidden">
             {/* Background decoration */}
             <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-indigo-600/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
             
             <h3 className="text-xl font-bold mb-2 relative z-10">Project Action</h3>
             <p className="text-slate-400 text-sm mb-8 font-medium leading-relaxed relative z-10">
               {isAvailable ? "This project is open for proposals. Submit yours now!" : "The project is currently locked or assigned."}
             </p>
             
             {isAvailable ? (
               <Link href={`/Project/${project?._id}/Request`} className="relative z-10 block">
                 <button className="w-full bg-indigo-600 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-indigo-500 transition-all flex items-center justify-center gap-2 group-hover:gap-4 active:scale-95 shadow-lg shadow-indigo-600/20">
                   Apply Now <ChevronRight size={18} />
                 </button>
               </Link>
             ) : (
               <button disabled className="w-full bg-slate-800 text-slate-500 py-4 rounded-2xl font-black uppercase tracking-widest text-sm border border-slate-700 cursor-not-allowed relative z-10">
                 {isAssigned ? "Assigned" : "Closed"}
               </button>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 group">
    <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
      {React.cloneElement(icon, { size: 18 })}
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{label}</p>
      <p className="font-bold text-slate-700">{value}</p>
    </div>
  </div>
);

export default ProjectDetails;