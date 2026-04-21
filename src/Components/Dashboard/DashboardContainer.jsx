"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, ChevronRight, Search, LogOut, User, 
  Mail, Menu, Maximize, Command, Calendar 
} from "lucide-react";
import { IoRocket, IoChevronUp } from 'react-icons/io5';
import SidebarItem from './SidebarItem';
import NotificationDropdown from '../AllModal/NotificationDropdown';
import Logo from '../Logo/Logo';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export default function DashboardContainer({ children, session, menuItems }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] -mt-20 overflow-hidden text-slate-800 font-sans">
      
{/* sidbar */}
      <motion.aside
        animate={{ width: isCollapsed ? 90 : 280 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-gray-950 border-r border-white/5 flex flex-col relative z-[60] shadow-2xl  h-full shrink-0"
      >
           {/* Toggle button sidbar  */}
        <button
          onClick={(e) =>{ e.stopPropagation(); setIsCollapsed(!isCollapsed)}}
          className="absolute -right-3 top-12 bg-indigo-600 text-white p-1.5 rounded-full shadow-lg z-[70] hover:scale-110 transition-transform hidden lg:flex items-center justify-center border border-white/10"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {/* Logo Section */}
        <div className="p-6 h-24 flex items-center overflow-hidden">
          {isCollapsed ? (
            <div className="mx-auto w-12 h-12 bg-indigo-600/10 rounded-2xl flex items-center justify-center text-white border border-indigo-500/20 shadow-inner">
              <IoRocket size={24} className="text-indigo-500" />
            </div>
          ) : (
            <Logo colorName={'text-white'} />
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 mt-4 space-y-2 overflow-y-auto no-scrollbar relative z-10">
          <p className={`text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 px-4 ${isCollapsed ? 'hidden' : 'block'}`}>
            Main Dashboard
          </p>
          {menuItems.map((item) => (
            <SidebarItem key={item.to} {...item} isCollapsed={isCollapsed} />
          ))}
        </nav>

        {/* Profile Section (With Tail/Arrow) */}
        <div className="p-4 mt-auto border-t border-white/5 bg-black/20">
          <div className="relative">
            <AnimatePresence>
              {userMenuOpen && !isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.95 }}
                  className="absolute bottom-[115%] left-0 right-0 bg-[#161B26] border border-white/10 rounded-[1.8rem] p-4 shadow-[0_25px_60px_rgba(0,0,0,0.5)] z-[120] mb-2"
                >
                  <div className="space-y-3 text-white">
                    <div className="flex items-center gap-3 pb-3 border-b border-white/5">
                      <div className="w-8 h-8 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/10">
                        <Mail size={14} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-tighter leading-none mb-1">Email Identity</p>
                        <p className="text-[11px] text-slate-400 truncate font-medium">{session?.user?.email || "sawon@racoai.dev"}</p>
                      </div>
                    </div>
                    
                    <div className="grid gap-1">
                          <Link href='/Dashboard/Profile'>
                           <button className="flex items-center gap-3 w-full px-3 py-2.5 text-[11px] font-bold text-slate-300 hover:bg-white/5 rounded-xl transition-all">
                        <User size={15} className="text-indigo-500" /> Account Settings
                      </button>
                          </Link>
                            
                            <button onClick={()=>  signOut()} className="flex items-center gap-3 w-full px-3 py-2.5 text-[11px] font-black text-rose-400 uppercase tracking-widest bg-rose-500/5 hover:bg-rose-500 hover:text-white rounded-xl transition-all">
                        <LogOut size={15} /> Logout Account
                      </button>
                    </div>
                      
                  </div>
                
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#161B26] rotate-45 border-r border-b border-white/10"></div>
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className={`w-full flex items-center gap-3 p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all duration-300 group ${isCollapsed ? 'justify-center px-2' : ''}`}
            >
              <div className="relative shrink-0">
                <img 
                  src={session?.userPhoto || "/avatar.png"} 
                  className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-500/20 group-hover:ring-indigo-500/40 transition-all" 
                  alt="user" 
                />
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#0B0F1A] rounded-full shadow-lg"></span>
              </div>
              
              {!isCollapsed && (
                <div className="flex-1 text-left overflow-hidden">
                  <p className="text-[13px] font-black text-white truncate leading-none mb-1">{session?.username || "Sawon"}</p>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.15em]">{session?.role || "Core Dev"}</p>
                </div>
              )}
              
              {!isCollapsed && (
                <motion.div animate={{ rotate: userMenuOpen ? 180 : 0 }}>
                  <IoChevronUp size={14} className="text-slate-500 group-hover:text-white transition-colors" />
                </motion.div>
              )}
            </button>
          </div>
        </div>
      </motion.aside>

      {/* --- Main Content --- */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-[50]">
           <div className="flex items-center gap-4 flex-1">
             <button onClick={()=> setIsCollapsed(!isCollapsed)} className="lg:hidden p-2.5 bg-slate-100 rounded-xl text-slate-600">
               <Menu size={20} />
             </button>

             <div className="relative max-w-md w-full group hidden lg:block">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <Search size={18} />
                </div>
                <input 
                  type="text" 
                  placeholder="Quick search anything..." 
                  className="h-11 w-full bg-slate-100/50 rounded-2xl pl-12 pr-12 text-[13px] border border-transparent focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all shadow-sm"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-1 bg-white border border-slate-200 rounded-md shadow-sm">
                  <Command size={10} className="text-slate-400" />
                  <span className="text-[9px] font-bold text-slate-400">K</span>
                </div>
             </div>
           </div>
           
           <div className="flex items-center gap-3">
             <div className="hidden xl:flex items-center gap-2 mr-4 text-slate-400">
                <Calendar size={14} />
                <span className="text-[11px] font-bold uppercase tracking-wider">{currentTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
             </div>

             <button onClick={toggleFullscreen} className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all hidden sm:block">
                <Maximize size={18} />
             </button>
             
             <NotificationDropdown />
             
             <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
             
             <button className="bg-[#0B0F1A] text-white px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl active:scale-95">
                New Task
             </button>
           </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar bg-[#F8FAFC]">
          {children}
        </main>
      </div>
    </div>
  );
}