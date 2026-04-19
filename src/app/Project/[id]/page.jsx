import React from 'react';
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
  Briefcase,
  ShieldCheck,
  TrendingUp
} from "lucide-react";
import Link from 'next/link';
import UserRequestModal from '../../../Components/AllModal/UserRequestModal';



const getProject = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user-project/${id}`, { cache: "no-store" })
  const data = await res.json()
  return data.data
}

const ProjectPage = async ({ params }) => {
  const { id } = await params;
  const project = await getProject(id);
  const isAssigned = project?.status === "assigned";
  const isAvailable = project?.status === "unAssigned";
  const requestCount = project?.requests?.length || 0;

  console.log('project',project)

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* Top Banner Decoration */}
      <div className="h-64 bg-slate-950 w-full  absolute top-0 left-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 opacity-50" />
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-10 relative z-10 space-y-8 mt-4">
        
        {/* Navigation */}
        <Link href="/Project" className="inline-flex items-center text-sm font-bold text-white/80 hover:text-white transition-all gap-2 group mb-4">
          <div className="bg-white/10 p-2 rounded-full backdrop-blur-md group-hover:bg-white/20">
            <ArrowLeft size={16} />
          </div>
          Back to Projects
        </Link>

        {/* Main Header Card */}
        <div className="bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-50/50 rounded-full -mr-40 -mt-40 blur-3xl" />
          
          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="flex-1 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm border ${
                  isAssigned ? "bg-indigo-50 text-indigo-600 border-indigo-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"
                }`}>
                  ● {project?.status}
                </span>
                <span className="flex items-center gap-1.5 text-slate-500 bg-slate-50 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-100">
                  <Tag size={12} className="text-indigo-500" /> {project?.ProjectCategory}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight tracking-tight">
                {project?.ProjectTitle}
              </h1>

              <div className="flex flex-wrap gap-6 text-slate-500 font-bold text-sm">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Calendar size={16} /></div>
                  Posted on {new Date(project?.createdAt).toLocaleDateString('en-GB')}
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><TrendingUp size={16} /></div>
                  {requestCount} Applications
                </div>
              </div>
            </div>

            <div className="w-full lg:w-auto">
              <div className="bg-slate-950 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Total Budget</p>
                <div className="flex items-baseline gap-1 text-white">
                  <span className="text-2xl font-bold">৳</span>
                  <h2 className="text-5xl font-black">{project?.ProjectBudget}</h2>
                </div>
                <div className="mt-4 flex items-center gap-2 text-indigo-300/60 text-[10px] font-bold uppercase tracking-widest">
                  <ShieldCheck size={14} /> Secure Payment
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Project Description */}
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
               <div className="flex items-center gap-4 mb-8">
                  <div className="h-12 w-1.5 bg-indigo-600 rounded-full" />
                  <h3 className="text-2xl font-black text-slate-900">Project Overview</h3>
               </div>
               <div className="prose prose-slate max-w-none text-slate-600">
                  <p className="text-lg leading-relaxed font-medium whitespace-pre-wrap">
                    {project?.ProjectDescription}
                  </p>
               </div>
            </div>

            {/* Applications List */}
            <div className="space-y-6">
              <div className="flex items-center justify-between px-4">
                <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                  Interested Experts
                  <span className="bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">{requestCount}</span>
                </h3>
              </div>

              <div className="grid gap-6">
                {project?.requests?.length > 0 ? (
                  project.requests.map((req, i) => (
                    <div key={i} className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                      <div className="flex flex-col md:flex-row justify-between gap-8">
                        <div className="flex items-start gap-6">
                          <div className="w-16 h-16 bg-gradient-to-tr from-slate-900 to-indigo-900 text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-xl ring-4 ring-indigo-50">
                            {req.name?.[0].toUpperCase()}
                          </div>
                          <div>
                            <h4 className="text-2xl font-black text-slate-900 mb-2">{req.name}</h4>
                            <div className="flex flex-wrap gap-4">
                              <span className="bg-slate-50 text-slate-500 px-3 py-1 rounded-lg text-xs font-bold border border-slate-100 flex items-center gap-2">
                                <Mail size={12} /> {req.contactEmail}
                              </span>
                              <span className="bg-amber-50 text-amber-600 px-3 py-1 rounded-lg text-xs font-bold border border-amber-100 flex items-center gap-2">
                                <Clock size={12} /> {req.expectedTimeline}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-indigo-600 p-6 rounded-[1.5rem] text-center min-w-[160px] shadow-lg shadow-indigo-100">
                          <p className="text-indigo-100 text-[9px] font-black uppercase tracking-widest mb-1">Proposed Bid</p>
                          <p className="text-2xl font-black text-white italic">৳{req.userBitBudget}</p>
                        </div>
                      </div>
                      <div className="mt-8 p-6 bg-slate-50 rounded-[1.5rem] border border-slate-100 relative italic text-slate-600 font-medium">
                        <Zap size={20} className="absolute -top-3 -left-3 text-amber-400 bg-white rounded-full p-1 border shadow-sm" />
                        "{req.message}"
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200">
                      <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                        <Users size={32} />
                      </div>
                      <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No proposals submitted yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Project Details</h4>
              <div className="space-y-8">
                <InfoItem icon={<Clock />} label="Deadline" value={project?.ProjectDeadline} color="text-amber-500" bg="bg-amber-50" />
                <InfoItem icon={<Briefcase />} label="Niche" value={project?.ProjectCategory} color="text-indigo-500" bg="bg-indigo-50" />
                <InfoItem icon={<User />} label="Client Hash" value={project?.buyerId?.substring(0, 12) + '...'} color="text-blue-500" bg="bg-blue-50" />
              </div>
            </div>

            {/* Premium Action Card */}
            <div className="bg-slate-950 p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden sticky top-8">
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/30 rounded-full blur-[80px]" />
               <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-600/20 rounded-full blur-[60px]" />
               
               <div className="relative z-10">
                 <h3 className="text-2xl font-black mb-4">Submission</h3>
                 <p className="text-slate-400 text-sm mb-10 font-medium leading-relaxed">
                   {isAvailable 
                    ? "Present your best proposal to win this project. Focus on quality and timeline." 
                    : "This project is no longer accepting new proposals."}
                 </p>
                 
                 {isAvailable ? (
                    <div className="transform transition-transform active:scale-95">
                      <UserRequestModal id={id}></UserRequestModal>
                    </div>
                 ) : (
                   <button disabled className="w-full bg-slate-900 text-slate-500 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] border border-slate-800 cursor-not-allowed">
                     {isAssigned ? "Project Assigned" : "Project Closed"}
                   </button>
                 )}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value, color, bg }) => (
  <div className="flex items-center gap-5 group">
    <div className={`w-12 h-12 ${bg} ${color} rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm`}>
      {React.cloneElement(icon, { size: 20 })}
    </div>
    <div>
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">{label}</p>
      <p className="font-extrabold text-slate-800 text-sm tracking-tight">{value}</p>
    </div>
  </div>
);

export default ProjectPage;