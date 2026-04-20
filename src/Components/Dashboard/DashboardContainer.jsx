"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Search, LogOut, User, ExternalLink, Mail } from "lucide-react";
import { IoNotificationsOutline, IoRocket, IoChevronUp } from 'react-icons/io5';
import SidebarItem from './SidebarItem';
import NotificationDropdown from '../AllModal/NotificationDropdown';

export default function DashboardContainer({ children, session, menuItems }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F8FAFC] -mt-20 overflow-hidden text-slate-800 font-sans">
      
      {/* --- sidbar --- */}
      <motion.aside
        animate={{ width: isCollapsed ? 90 : 280 }}
        className="bg-white border-r border-slate-200 flex flex-col relative z-[60] shadow-sm"
      >
      
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-12 bg-indigo-600 text-white p-1.5 rounded-full shadow-lg z-[70] hover:scale-110 transition-transform"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {/* Logo */}
        <div className="p-6 h-20 flex items-center overflow-hidden">
          <div className="min-w-[45px] h-11 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-indigo-200 shadow-xl">
            <IoRocket size={22} />
          </div>
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="ml-3 text-2xl font-black tracking-tighter text-slate-900"
            >
              Raco<span className="text-indigo-600">AI</span>
            </motion.span>
          )}
        </div>

   
        <nav className="flex-1 px-4 mt-6 space-y-2 overflow-y-auto no-scrollbar relative z-10">
          {menuItems.map((item) => (
            <SidebarItem key={item.to} {...item} isCollapsed={isCollapsed} />
          ))}
        </nav>

 
        <div className='relative mt-auto mx-3 mb-4 pt-12 pb-6 px-4 rounded-[2.5rem] bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#1E1B4B] border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] group'>
          
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-indigo-500/20 blur-[40px] rounded-full group-hover:bg-indigo-500/40 transition-all duration-700"></div>
          
          <div className="relative z-10">
            <AnimatePresence>
              {userMenuOpen && !isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 15 }}
                  
                  className="absolute bottom-[110%] left-0 right-0 bg-[#0F172A]/95 backdrop-blur-2xl rounded-[2rem] p-5 shadow-[0_25px_60px_rgba(0,0,0,0.5)] border border-white/10 z-[100]"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                        <Mail size={18} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.15em] mb-0.5">Verified Identity</p>
                        <p className="text-xs text-slate-300 truncate font-medium">{session?.user?.email || "sawon@racoai.dev"}</p>
                      </div>
                    </div>
                    
                    <div className="grid gap-1.5">
                      <button className="flex items-center justify-between w-full px-4 py-3 text-[11px] font-bold text-slate-300 transition-all rounded-xl hover:bg-white/5 hover:text-white group/btn">
                        <div className="flex items-center gap-3">
                          <User size={16} className="text-indigo-400 group-hover/btn:scale-110 transition-transform" /> 
                          Manage Profile
                        </div>
                        <ExternalLink size={14} className="text-slate-600 group-hover/btn:text-white transition-colors" />
                      </button>

                      <button className="flex items-center gap-3 w-full px-4 py-3 text-[11px] font-black text-rose-400 uppercase tracking-widest transition-all rounded-xl bg-rose-500/5 hover:bg-rose-500 hover:text-white mt-1 shadow-inner">
                        <LogOut size={16} /> Secure Logout
                      </button>
                    </div>
                  </div>
                  
                 
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0F172A] rotate-45 border-r border-b border-white/10"></div>
                </motion.div>
              )}
            </AnimatePresence>

          
            <button 
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className={`w-full flex items-center gap-3 p-3 rounded-[1.8rem] bg-white/5 hover:bg-white/10 border border-white/5 transition-all duration-300 relative group shadow-2xl ${isCollapsed ? 'justify-center px-2' : ''}`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500 blur-[8px] opacity-20 group-hover:opacity-40 transition-opacity rounded-xl"></div>
                <img 
                  src={session?.userPhoto || "/avatar.png"} 
                  className="relative z-10 object-cover w-10 h-10 rounded-xl border border-white/10" 
                  alt="user" 
                />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#1E293B] z-20"></span>
              </div>
              
              {!isCollapsed && (
                <div className="relative z-10 flex-1 text-left overflow-hidden">
                  <p className="text-[13px] font-black text-white tracking-tight truncate leading-none mb-1">
                    {session?.username || "Sawon"}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                      {session?.role || "Core Dev"}
                    </p>
                  </div>
                </div>
              )}
              
              {!isCollapsed && (
                <motion.div
                  animate={{ rotate: userMenuOpen ? 180 : 0 }}
                  className="text-slate-500 group-hover:text-white transition-colors"
                >
                  <IoChevronUp size={16} />
                </motion.div>
              )}
            </button>
          </div>
        </div>
      </motion.aside>

      {/* --- Main Content --- */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 relative z-[50]">
           <div className="relative max-w-md w-full hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input type="text" placeholder="Search tasks..." className="h-10 w-full bg-slate-100 rounded-xl pl-10 pr-4 text-sm border-none focus:ring-2 focus:ring-indigo-500/20 outline-none" />
           </div>
           
           <div className="flex items-center gap-4">
              <div className="relative">
                 
                 
                       <NotificationDropdown  />
                   
             
              </div>
              <div className="h-8 w-[1px] bg-slate-200"></div>
              <p className="text-sm font-bold text-slate-700 hidden sm:block italic">Operational Control</p>
           </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-10 relative z-10 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}