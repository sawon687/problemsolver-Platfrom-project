"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Search, Bell, LogOut } from "lucide-react";
import { IoRocket } from 'react-icons/io5';
import SidebarItem from './SidebarItem';
import { useSession } from 'next-auth/react';


export default function DashboardContainer({ children, session, menuItems }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
 

     console.log('user session',session)
  return (
    <div className="flex -mt-20 h-screen bg-[#f8fafc] overflow-hidden">
      {/* --- SIDEBAR --- */}
      <motion.aside
        animate={{ width: isCollapsed ? 90 : 280 }}
        className="bg-white border-r border-slate-200 flex flex-col relative z-40 shadow-sm"
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-12 bg-indigo-600 text-white p-1.5 rounded-full shadow-lg z-50 hover:scale-110 transition-transform"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {/* Logo Area */}
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

        {/* Menu Items */}
        <nav className="flex-1 px-4 mt-6 space-y-2 overflow-y-auto no-scrollbar">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.to} 
              {...item} 
              isCollapsed={isCollapsed} 
            />
          ))}
        </nav>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-slate-100">
          <div className={`flex items-center gap-3 p-3 mb-2 rounded-2xl bg-slate-900 text-white ${isCollapsed ? 'justify-center' : ''}`}>
             <img src={session?.userPhoto || "/avatar.png"} className="w-8 h-8 rounded-lg object-cover" alt="user" />
             {!isCollapsed && (
               <div className="overflow-hidden">
                 <p className="text-xs font-bold truncate">{session?.username}</p>
                 <p className="text-[10px] text-slate-400 uppercase tracking-widest">{session?.role}</p>
               </div>
             )}
          </div>
          <button className={`flex items-center gap-3 w-full px-4 py-3 text-slate-400 font-bold text-sm hover:text-rose-600 transition-colors ${isCollapsed ? 'justify-center' : ''}`}>
            <LogOut size={20} />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8">
           <div className="relative max-w-md w-full hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input type="text" placeholder="Search tasks..." className="h-10 w-full bg-slate-100 rounded-xl pl-10 pr-4 text-sm border-none focus:ring-2 focus:ring-indigo-500/20" />
           </div>
           
           <div className="flex items-center gap-4">
              <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="h-8 w-[1px] bg-slate-200"></div>
              <p className="text-sm font-bold text-slate-700 hidden sm:block">Welcome back!</p>
           </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}