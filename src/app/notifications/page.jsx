"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { IoNotificationsOutline, IoTrashOutline, IoChevronForward, IoTimeOutline, IoCheckmarkDoneCircleOutline } from 'react-icons/io5';
import Link from 'next/link';
import { format } from 'timeago.js';

const page = () => {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      if (session?.user?.email) {
        try {
          const res = await fetch(`/api/notifications?email=${session.user.email}`);
          const data = await res.json();
          setNotifications(data.data || []);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchAll();
  }, [session]);

  return (
    <div className="min-h-screen bg-[#FDFDFF] py-28 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
              Notifications
            </h1>
            <p className="text-slate-500 font-medium flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>
              You have {notifications.filter(n => n.status === 'unread').length} unread messages
            </p>
          </div>
          
          <div className="flex gap-3">
             <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm">
                <IoCheckmarkDoneCircleOutline size={18} />
                Mark All Read
             </button>
             <button className="p-3 bg-white border border-slate-200 rounded-2xl text-rose-500 hover:bg-rose-50 transition-all shadow-sm">
                <IoTrashOutline size={20} />
             </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="grid gap-4">
          {loading ? (
             // Skeleton Loader
             [1,2,3,4].map(i => (
               <div key={i} className="h-28 bg-slate-100 animate-pulse rounded-[2.5rem]" />
             ))
          ) : notifications.length > 0 ? (
            notifications.map((notif) => (
              <Link 
                href={notif.relPath || `/Project/${notif.projectId}`} 
                key={notif._id}
                className={`group relative overflow-hidden bg-white border p-6 md:p-8 rounded-[2.5rem] transition-all duration-500 hover:shadow-[0_20px_50px_-20px_rgba(79,70,229,0.15)] ${
                  notif.status === 'unread' ? 'border-indigo-100 shadow-sm shadow-indigo-50' : 'border-slate-100'
                }`}
              >
                {/* Unread Indicator Side Bar */}
                {notif.status === 'unread' && (
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-indigo-600" />
                )}

                <div className="flex items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    {/* Icon Container */}
                    <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all duration-500 shrink-0 ${
                      notif.status === 'unread' 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                      : 'bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                    }`}>
                      <IoNotificationsOutline size={28} />
                    </div>

                    {/* Text Content */}
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-black text-slate-900 text-xl tracking-tight group-hover:text-indigo-600 transition-colors">
                          {notif.title}
                        </h3>
                        <span className="hidden md:block px-3 py-1 bg-slate-100 text-[9px] font-black uppercase tracking-widest text-slate-500 rounded-full">
                          {notif.type || 'Update'}
                        </span>
                      </div>
                      <p className="text-slate-500 font-medium text-sm md:text-base mb-3 leading-relaxed">
                        {notif.message}
                      </p>
                      
                      {/* Meta Info */}
                      <div className="flex items-center gap-4">
                         <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-tighter cursor-help" title={new Date(notif.createdAt).toLocaleString()}>
                            <IoTimeOutline size={14} className="text-indigo-500" />
                            {format(notif.createdAt)}
                         </div>
                         {notif.status === 'unread' && (
                           <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md uppercase">New</span>
                         )}
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:flex w-12 h-12 items-center justify-center rounded-full border border-slate-100 text-slate-300 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all duration-500 group-hover:translate-x-2">
                    <IoChevronForward size={20} />
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <IoNotificationsOutline size={40} className="text-slate-200" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">Your inbox is clear!</h3>
              <p className="text-slate-400 font-medium">When you receive notifications, they will appear here.</p>
              <Link href="/" className="inline-block mt-8 text-sm font-black text-indigo-600 uppercase tracking-widest border-b-2 border-indigo-600 pb-1">
                Back to Home
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;