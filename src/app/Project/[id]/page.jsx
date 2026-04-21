import React from 'react';
import { 
  Calendar, Tag, Clock, User, ArrowLeft, Users, Mail, Zap, 
  Briefcase, ShieldCheck, TrendingUp, MapPin, ExternalLink, 
  FileText
} from "lucide-react";
import Link from 'next/link';
import UserRequestModal from '../../../Components/AllModal/UserRequestModal';

const getProject = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user-project/${id}`, { cache: "no-store" })
  const data = await res.json()
  return data.result;
}

const ProjectPage = async ({ params }) => {
  const { id } = await params;
  const data = await getProject(id);
  const project = data?.project;
  const requests = data?.request;
  const isAssigned = project?.status === "assigned";
  const isAvailable = project?.status === "unAssigned";
  const requestCount = requests?.length || 0;

  return (
    <div className="min-h-screen bg-[#FDFEFF] pb-20 font-sans">
      {/* Dynamic Background Header */}
      <div className="h-[450px] bg-[#0F172A] w-full absolute top-0 left-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FDFEFF] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto p-6 md:p-12 relative z-10">
        
        {/* Navigation */}
        <Link href="/Project" className="inline-flex items-center text-sm font-semibold text-slate-300 hover:text-white transition-all gap-3 mb-10 group">
          <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-md border border-white/10 group-hover:bg-white/20 transition-colors">
            <ArrowLeft size={18} />
          </div>
          <span>Return to Marketplace</span>
        </Link>

        {/* Hero Section Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider border shadow-sm ${
                isAssigned ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              }`}>
                {project?.status}
              </span>
              <span className="flex items-center gap-2 bg-white/5 border border-white/10 text-slate-300 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider backdrop-blur-md">
                <Tag size={14} className="text-indigo-400" /> {project?.ProjectCategory}
              </span>
            </div>

            <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
              {project?.ProjectTitle}
            </h1>

            <div className="flex flex-wrap gap-8 pt-4">
              <div className="flex items-center gap-3 text-slate-400">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <Calendar size={18} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-500">Posted On</p>
                  <p className="text-sm font-semibold text-slate-200">{new Date(project?.createdAt).toLocaleDateString('en-GB')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <Users size={18} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-500">Total Bids</p>
                  <p className="text-sm font-semibold text-slate-200">{requestCount} Candidates</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-[2px] rounded-[2.5rem] shadow-2xl shadow-indigo-500/20">
              <div className="bg-[#0F172A] rounded-[2.45rem] p-8 md:p-10 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
                <p className="text-indigo-300 text-xs font-black uppercase tracking-[0.2em] mb-3">Project Budget</p>
                <div className="flex items-baseline gap-2 text-white mb-6">
                  <span className="text-3xl font-light opacity-50">৳</span>
                  <h2 className="text-6xl font-black">{project?.ProjectBudget}</h2>
                </div>
                <div className="space-y-4 pt-6 border-t border-white/10">
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span className="text-slate-400">Payment Security</span>
                    <span className="text-emerald-400 flex items-center gap-1.5 italic"><ShieldCheck size={16}/> Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16">
          <div className="lg:col-span-8 space-y-12">
            
            {/* Detailed Overview */}
            <section className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.03)] border border-slate-100">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                  <FileText size={24} />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 tracking-tight">Project Description</h3>
              </div>
              <p className="text-xl leading-relaxed text-slate-600 font-medium whitespace-pre-wrap">
                {project?.ProjectDescription}
              </p>
            </section>

            {/* Applications Section */}
            <div className="space-y-8">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-3xl font-bold text-slate-900 tracking-tight">Proposals</h3>
                <div className="px-4 py-2 bg-slate-100 rounded-full text-slate-600 text-sm font-black uppercase tracking-widest">
                  {requestCount} Total
                </div>
              </div>

              <div className="space-y-6">
                {requests?.length > 0 ? (
                  requests.map((req, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group">
                      <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-1">
                          <div className="flex items-center gap-5 mb-6">
                            <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg">
                              {req.name?.[0].toUpperCase()}
                            </div>
                            <div>
                              <h4 className="text-2xl font-bold text-slate-900">{req.name}</h4>
                              <p className="text-indigo-600 font-semibold text-sm">{req.contactEmail}</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                              <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Proposed Budget</p>
                              <p className="text-lg font-black text-slate-900">৳{req.userBitBudget}</p>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                              <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Timeline</p>
                              <p className="text-lg font-black text-slate-900">{req.expectedTimeline}</p>
                            </div>
                          </div>

                          <div className="p-6 bg-indigo-50/50 rounded-2xl border border-indigo-50 italic text-slate-700 font-medium leading-relaxed">
                            "{req.message}"
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
                    <Users size={48} className="mx-auto text-slate-200 mb-4" />
                    <p className="text-slate-400 font-bold tracking-widest text-sm uppercase">Waiting for first proposal...</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sticky Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-12 space-y-8">
              <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-10 pb-4 border-b">Project Highlights</h4>
                <div className="space-y-10">
                  <SidebarItem icon={<Clock />} label="Expected Deadline" value={project?.ProjectDeadline} color="text-amber-500" />
                  <SidebarItem icon={<Briefcase />} label="Project Category" value={project?.ProjectCategory} color="text-indigo-600" />
                  <SidebarItem icon={<User />} label="Client Identifier" value={`#${project?.buyerId?.substring(0, 8)}`} color="text-slate-600" />
                  <SidebarItem icon={<MapPin />} label="Job Location" value="Remote / Online" color="text-emerald-600" />
                </div>
              </div>

              {/* Final Action CTA */}
              <div className="bg-[#0F172A] p-10 rounded-[3rem] text-white relative overflow-hidden group shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-xl border border-white/10 group-hover:scale-110 transition-transform">
                    <Zap className="text-indigo-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Ready to Start?</h3>
                  <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                    {isAvailable 
                      ? "Submit your application now and stand out from the crowd." 
                      : "Submission period for this project has ended."}
                  </p>
                  
                  {isAvailable ? (
                    <div className="w-full   py-5 rounded-2xl font-black uppercase tracking-widest text-xs  transition-colors cursor-pointer flex items-center justify-center gap-2">
                      <UserRequestModal id={id}></UserRequestModal>
                    </div>
                  ) : (
                    <button disabled className="w-full bg-slate-800 text-slate-500 py-5 rounded-2xl font-black uppercase tracking-widest text-xs border border-slate-700 cursor-not-allowed">
                      Closed
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sidebar Helper Component
const SidebarItem = ({ icon, label, value, color }) => (
  <div className="flex items-start gap-5 group">
    <div className={`w-12 h-12 rounded-2xl bg-slate-50 ${color} flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-all shadow-sm`}>
      {React.cloneElement(icon, { size: 20 })}
    </div>
    <div className="pt-1">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="font-bold text-slate-900 text-sm">{value}</p>
    </div>
  </div>
);

export default ProjectPage;