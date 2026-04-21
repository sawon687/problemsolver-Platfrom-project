"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Edit3, Mail, MapPin, Link as LinkIcon, Github, ExternalLink,
  Award, Cpu, Layers, ShieldCheck, Calendar, ArrowUpRight, Phone, Briefcase, DollarSign
} from "lucide-react";
import { useSession } from "next-auth/react";
import EditProfileModal from "@/Components/EditProfileModal/EditProfileModal";
import { useQuery } from '@tanstack/react-query';

const ProfilePage = () => {
  const { data: session } = useSession();
  const [openEdit, setOpenEdit] = useState(false);

  const { data } = useQuery({
    queryKey: ["profile", session?.email],
    enabled: !!session?.email,
    queryFn: async () => {
      const res = await fetch(`/api/sign-up/${session?.email}`);
      const result = await res.json();
      return result.data;
    },
  });

  const joinedDate = data?.updateDate
    ? new Date(data.updateDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : "Joined Recently";

  const techStack = data?.Skill 
    ? data.Skill.split(',').map(s => s.trim()) 
    : ["Next.js", "React", "Tailwind CSS", "MongoDB", "Framer Motion"];

  return (
    <div className="min-h-screen bg-[#fdfdfd] dark:bg-gray-950 px-4 sm:px-6 md:px-12 py-6 md:py-10 font-sans transition-colors duration-300">
      
      {/* --- TOP PROFILE HEADER --- */}
      <section className="max-w-6xl mx-auto mb-8 md:mb-12">
        <div className="relative group">
          {/* Responsive Banner Height */}
          <div className="h-40 sm:h-52 md:h-64 lg:h-72 w-full bg-gradient-to-r from-indigo-400 via-teal-500 to-blue-600 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl shadow-emerald-200/50 dark:shadow-none relative overflow-hidden">
             <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          </div>

          {/* Profile Image & Name Adjustment */}
          <div className="flex flex-col md:flex-row items-center md:items-end px-4 sm:px-8 -mt-16 sm:-mt-20 gap-4 md:gap-6 relative z-10 text-center md:text-left">
            <div className="relative">
              <img
                src={data?.userPhoto || "https://i.pravatar.cc/150?img=12"}
                alt="Profile"
                className="w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-[2rem] md:rounded-[2.5rem] object-cover border-4 md:border-8 border-white dark:border-gray-950 shadow-xl"
              />
              <div className="absolute bottom-2 right-2 bg-indigo-500 p-1.5 sm:p-2.5 rounded-xl md:rounded-2xl text-white border-2 md:border-4 border-white dark:border-gray-950">
                <ShieldCheck size={18} className="sm:w-5 sm:h-5" />
              </div>
            </div>

            <div className="flex-1 pb-2 w-full">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight flex flex-col sm:flex-row items-center gap-2 md:gap-3">
                    {data?.username || "Creative Mind"}
                    <span className="text-[9px] sm:text-[10px] bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full uppercase tracking-widest font-black w-fit">
                      {data?.role || "Member"}
                    </span>
                  </h1>
                  <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4 mt-2 text-gray-500 dark:text-gray-400 font-medium text-xs sm:text-sm">
                    <span className="flex items-center gap-1.5"><MapPin size={14} /> {data?.location || "Remote"}</span>
                    <span className="flex items-center gap-1.5"><Phone size={14} /> {data?.phoneno || "No Contact"}</span>
                    <span className="flex items-center gap-1.5"><Calendar size={14} /> {joinedDate}</span>
                  </div>
                </div>
                
                <button
                  onClick={() => setOpenEdit(true)}
                  className="w-full md:w-auto bg-gray-900 dark:bg-white dark:text-gray-900 text-white px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-lg active:scale-95 text-sm sm:text-base"
                >
                  <Edit3 size={18} /> Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* LEFT COLUMN - Sidebar Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm">
            <h3 className="text-lg font-black mb-4 dark:text-white">Service Profile</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="flex items-center gap-2 text-gray-400"><Briefcase size={16}/> <span className="text-[10px] font-bold uppercase tracking-wider">Role</span></div>
                <span className="font-bold dark:text-white text-xs sm:text-sm">{data?.role || "Contributor"}</span>
              </div>

              <div className="p-4 sm:p-5 bg-indigo-50/30 dark:bg-indigo-900/10 rounded-2xl border border-indigo-100/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                    <DollarSign size={18} strokeWidth={3}/> 
                    <span className="text-[10px] font-black uppercase tracking-wider">Hourly Rate</span>
                  </div>
                  <span className="text-lg sm:text-xl font-black text-indigo-700 dark:text-indigo-300">
                    ${data?.hourlyRate || "0"}
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                  Professional {data?.role || "expert"} services are available at <b>${data?.hourlyRate || "0"}/hr</b>.
                </p>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              <a href={data?.github || "#"} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3 dark:text-white"><Github size={18}/> <span className="font-bold text-sm">GitHub</span></div>
                <ExternalLink size={14} className="text-gray-400"/>
              </a>
              <a href={data?.portfolio || "#"} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3 dark:text-white"><LinkIcon size={18}/> <span className="font-bold text-sm">Portfolio</span></div>
                <ExternalLink size={14} className="text-gray-400"/>
              </a>
            </div>
          </div>

          <div className="bg-indigo-600 relative p-6 sm:p-8 rounded-[2rem] text-white overflow-hidden shadow-xl shadow-indigo-200 dark:shadow-none group">
            <div className="relative z-10">
              <div className="bg-white/20 backdrop-blur-md w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-6 border border-white/30 shadow-inner">
                <Award className="text-white" size={24} />
              </div>
              <h3 className="text-xl sm:text-2xl font-black mb-2 tracking-tight text-white">Top Contributor</h3>
              <p className="text-indigo-100/90 text-xs sm:text-sm leading-relaxed font-medium">
                Consistently delivering high-performance solutions and maintaining a 5-star rating.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Main Stats & Tech */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Grid - Fixed 2 columns on mobile, 3 on tablet/desktop */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-900 p-5 sm:p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm text-center">
              <p className="text-gray-400 text-[9px] sm:text-[10px] font-black uppercase tracking-widest mb-1">Projects</p>
              <h2 className="text-2xl sm:text-3xl font-black dark:text-white">48</h2>
            </div>
            <div className="bg-white dark:bg-gray-900 p-5 sm:p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm text-center">
              <p className="text-gray-400 text-[9px] sm:text-[10px] font-black uppercase tracking-widest mb-1">Completed</p>
              <h2 className="text-2xl sm:text-3xl font-black text-emerald-500">24</h2>
            </div>
            <div className="bg-white dark:bg-gray-900 p-5 sm:p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm text-center col-span-2 md:col-span-1">
              <p className="text-gray-400 text-[9px] sm:text-[10px] font-black uppercase tracking-widest mb-1">Success Rate</p>
              <h2 className="text-2xl sm:text-3xl font-black text-blue-500">99%</h2>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm">
            <h3 className="text-lg sm:text-xl font-black mb-6 flex items-center gap-3 dark:text-white text-gray-900">
               <Cpu className="text-purple-500" /> Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {techStack.map((tech, i) => (
                <span key={i} className="px-4 sm:px-5 py-2 sm:py-2.5 bg-gray-50 dark:bg-gray-800 dark:text-gray-300 rounded-xl font-bold text-xs sm:text-sm border border-gray-100 dark:border-gray-700">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Recent Accomplishments */}
          <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm">
            <h3 className="text-lg sm:text-xl font-black mb-6 md:mb-8 flex items-center gap-3 dark:text-white text-gray-900">
               <Layers className="text-blue-500" /> Recent Accomplishments
            </h3>
            <div className="space-y-4">
              {[
                { title: "Platform Security Sync", date: "2 days ago", type: "Security" },
                { title: "Database Architecture Optimization", date: "1 week ago", type: "Logic" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 sm:p-5 bg-gray-50 dark:bg-gray-800/30 rounded-[1.5rem] border border-transparent hover:border-emerald-500/10 transition-all">
                  <div className="flex-1">
                    <h4 className="font-bold dark:text-white text-xs sm:text-sm text-gray-900">{item.title}</h4>
                    <p className="text-[9px] sm:text-[10px] text-gray-500 font-bold uppercase mt-1">{item.type} • {item.date}</p>
                  </div>
                  <div className="bg-white dark:bg-gray-700 p-2 rounded-lg shadow-sm ml-2">
                    <ExternalLink size={14} className="text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {openEdit && (
          <EditProfileModal
            openEdit={openEdit}
            close={() => setOpenEdit(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfilePage;