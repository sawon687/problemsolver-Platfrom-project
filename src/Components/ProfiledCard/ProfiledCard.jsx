'use client'
import React from 'react';
import { IoLogOutOutline, IoPersonOutline, IoSettingsOutline } from 'react-icons/io5';
import { MdDashboardCustomize } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

const ProfileCard = () => {
  const { data: session } = useSession();

  return (
    <div className="absolute z-[999] right-0 top-14 w-[280px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 rounded-[24px] overflow-hidden p-2 animate-in fade-in zoom-in duration-200">
      
      {/* User Info Section */}
      <div className="p-4 mb-2 bg-slate-50 rounded-[20px] flex flex-col items-center text-center">
        <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold mb-2 shadow-lg shadow-indigo-100">
          {session?.user?.name ? session.user.name[0] : <IoPersonOutline />}
        </div>
        <h4 className="text-[14px] font-bold text-slate-800 truncate w-full px-2">
          {session?.user?.email || "Guest User"}
        </h4>
        <span className="mt-1 px-3 py-0.5 bg-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full">
          {session?.user?.role || "Member"}
        </span>
      </div>

      {/* Menu Items */}
      <div className="space-y-1">
        <Link href="/Dashboard/Profile" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all group">
          <CgProfile size={20} className="group-hover:scale-110 transition-transform" />
          <span className="text-sm font-bold tracking-tight">My Profile</span>
        </Link>

        <Link href="/Dashboard" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all group">
          <MdDashboardCustomize size={20} className="group-hover:scale-110 transition-transform" />
          <span className="text-sm font-bold tracking-tight">Dashboard</span>
        </Link>
        
        <Link href="/settings" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all group">
          <IoSettingsOutline size={20} className="group-hover:scale-110 transition-transform" />
          <span className="text-sm font-bold tracking-tight">Settings</span>
        </Link>

        {/* Divider */}
        <div className="my-2 border-t border-slate-100 mx-2"></div>

        <button 
          onClick={() => signOut()} 
          className="w-full flex items-center gap-3 px-4 py-3 text-rose-500 hover:bg-rose-50 rounded-xl transition-all group"
        >
          <IoLogOutOutline size={20} className="group-hover:translate-x-1 transition-transform" />
          <span className="text-sm font-bold tracking-tight">Log out</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;