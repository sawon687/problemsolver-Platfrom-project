"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Edit3,
  Mail,
  MapPin,
  Link as LinkIcon,
  Github,
  Twitter,
  ExternalLink,
  Award,
  Cpu,
  Layers,
  ShieldCheck,
  Calendar,
  ArrowUpRight
} from "lucide-react";
import { useSession } from "next-auth/react";
import EditProfileModal from "@/Components/EditProfileModal/EditProfileModal";

const ProfilePage = () => {
  const { data: session } = useSession();
  const [openEdit, setOpenEdit] = useState(false);

 
  const techStack = ["Next.js", "React", "Tailwind CSS", "MongoDB", "Framer Motion"];

  return (
    <div className="min-h-screen bg-[#fdfdfd] dark:bg-gray-950 px-4 md:px-12 py-10 font-sans transition-colors duration-300">
      
      {/* --- Top Profile Header --- */}
      <section className="max-w-6xl mx-auto mb-10">
        <div className="relative group">
          {/* Banner/Cover Image */}
          <div className="h-48 md:h-64 w-full bg-gradient-to-r from-indigo-400 via-teal-500 to-blue-600 rounded-[2.5rem] shadow-2xl shadow-emerald-200/50 dark:shadow-none relative overflow-hidden">
             <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          </div>

          {/* Profile Information */}
          <div className="flex flex-col md:flex-row items-end px-8 -mt-16 md:-mt-20 gap-6 relative z-10">
            <div className="relative">
              <img
                src={session?.userPhoto || "https://i.pravatar.cc/150?img=12"}
                alt="Profile"
                className="w-32 h-32 md:w-44 md:h-44 rounded-[2.5rem] object-cover border-8 border-white dark:border-gray-950 shadow-xl"
              />
              <div className="absolute bottom-2 right-2 bg-indigo-500 p-2.5 rounded-2xl text-white border-4 border-white dark:border-gray-950">
                <ShieldCheck size={20} />
              </div>
            </div>

            <div className="flex-1 pb-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                    {session?.username || "Creative Mind"}
                  </h1>
                  <div className="flex flex-wrap gap-4 mt-2 text-gray-500 dark:text-gray-400 font-medium">
                    <span className="flex items-center gap-1.5"><MapPin size={16} /> Dhaka, BD</span>
                    <span className="flex items-center gap-1.5"><Mail size={16} /> {session?.email}</span>
                    <span className="flex items-center gap-1.5"><Calendar size={16} /> Joined April 2024</span>
                  </div>
                </div>
                
                <button
                  onClick={() => setOpenEdit(true)}
                  className="bg-gray-900 dark:bg-white dark:text-gray-900 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-lg active:scale-95"
                >
                  <Edit3 size={18} /> Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

 
      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
    
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm">
            <h3 className="text-lg font-black mb-4 dark:text-white">About Me</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Full-stack developer focused on building modern, high-performance web applications. 
              Passionate about UI/UX and clean architecture. 🚀
            </p>
            
            <div className="mt-8 space-y-3">
              <a href="#" className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3 dark:text-white"><Github size={18}/> <span className="font-bold">GitHub</span></div>
                <ExternalLink size={14} className="text-gray-400"/>
              </a>
              <a href="#" className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3 dark:text-white"><LinkIcon size={18}/> <span className="font-bold">Portfolio</span></div>
                <ExternalLink size={14} className="text-gray-400"/>
              </a>
            </div>
          </div>

       <div className="bg-indigo-600 relative p-8 rounded-[2rem] text-white overflow-hidden shadow-xl shadow-indigo-200 dark:shadow-none group">

  <div className="absolute -top-10 right-10 bg-white/10 w-32 h-32 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500"></div>
  <div className="absolute -bottom-10 -left-10 bg-indigo-400/20 w-24 h-24 rounded-full blur-xl"></div>

  {/* Content */}
  <div className="relative z-10">
    <div className="bg-white/20 backdrop-blur-md w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-white/30 shadow-inner">
      <Award className="text-white" size={28} />
    </div>
    
    <h3 className="text-2xl font-black mb-2 tracking-tight">
      Top Performer
    </h3>
    
    <p className="text-indigo-100/90 text-sm leading-relaxed font-medium">
      Ranked in the <span className="text-white font-bold underline decoration-indigo-400 underline-offset-4">top 5%</span> of contributors this month for system optimization.
    </p>


    <div className="mt-6 flex items-center gap-2 text-xs font-black uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
       View Badge <ArrowUpRight size={14} />
    </div>
  </div>
</div>
        </div>


        <div className="lg:col-span-2 space-y-6">
          
   
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm text-center">
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Projects</p>
              <h2 className="text-3xl font-black dark:text-white">50</h2>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm text-center">
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Completed</p>
              <h2 className="text-3xl font-black text-emerald-500">25</h2>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm text-center col-span-2 md:col-span-1">
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Success Rate</p>
              <h2 className="text-3xl font-black text-blue-500">98%</h2>
            </div>
          </div>

     
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm">
            <h3 className="text-xl font-black mb-6 flex items-center gap-3 dark:text-white">
               <Cpu className="text-purple-500" /> Technology Stack
            </h3>
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech, i) => (
                <span key={i} className="px-5 py-2.5 bg-gray-50 dark:bg-gray-800 dark:text-gray-300 rounded-xl font-bold text-sm border border-gray-100 dark:border-gray-700">
                  {tech}
                </span>
              ))}
            </div>
          </div>


          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm">
            <h3 className="text-xl font-black mb-8 flex items-center gap-3 dark:text-white">
               <Layers className="text-blue-500" /> Recent Accomplishments
            </h3>
            <div className="space-y-6">
              {[
                { title: "TaskFlow System Architecture", date: "2 days ago", type: "Logic Design" },
                { title: "Payment Gateway Integration", date: "1 week ago", type: "Backend" },
                { title: "UI Components Library", date: "2 weeks ago", type: "Frontend" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-5 bg-gray-50 dark:bg-gray-800/30 rounded-[1.5rem] border border-transparent hover:border-emerald-500/20 transition-all cursor-default">
                  <div>
                    <h4 className="font-bold dark:text-white">{item.title}</h4>
                    <p className="text-xs text-gray-500 font-medium mt-1">{item.type} • {item.date}</p>
                  </div>
                  <div className="bg-white dark:bg-gray-700 p-2 rounded-lg shadow-sm">
                    <ExternalLink size={16} className="text-gray-400" />
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
            openEdit={() => setOpenEdit(true)}
            close={() => setOpenEdit(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfilePage;