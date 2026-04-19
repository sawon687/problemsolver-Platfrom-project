"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  IoNotificationsOutline, 
  IoCheckmarkDoneOutline, 
  IoTimeOutline, 
  IoSparklesOutline,
  IoArrowForwardOutline 
} from "react-icons/io5";
import { useSession } from 'next-auth/react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { format } from "timeago.js";

const NotificationDropdown = ({ setNotifOpen }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();

  const email = session?.user?.email;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch(`/api/notifications?email=${email}`);
        const data = await res.json();
        setNotifications(data.data || []);
      } catch (error) {
        console.error("Notification fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (email) fetchNotifications();
  }, [email]);

const handleNotificationClick = (notif) => {

    setNotifOpen(false);

  
    let targetPath = "";

    if (notif.type === 'submission') {
      targetPath = `/Dashboard/Project-list/${notif.projectId}/task-Submition`;
    }
     if (notif.type === 'assigned') {
      targetPath = `/Dashboard/My-Requsts/${notif.projectId}/UploadedProject`;
    }
    if(notif.type==='project_request'){
  
      targetPath = `/Project/${notif.projectId}`;
    }

    
    if (targetPath) {
      router.push(targetPath);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.9, y: 10, filter: "blur(10px)" }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="absolute right-0 mt-5 w-80 md:w-[400px] bg-white/90 backdrop-blur-2xl rounded-[32px] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.15)] border border-white/40 overflow-hidden z-[100] origin-top-right"
    >
      {/* --- Header Section --- */}
      <div className="p-6 border-b border-slate-100/50 flex justify-between items-center bg-gradient-to-r from-slate-50/50 to-white/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <IoSparklesOutline size={16} />
          </div>
          <div>
            <h4 className="text-[15px] font-black text-slate-900 tracking-tight">Recent Updates</h4>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Activity Feed</p>
          </div>
        </div>
        <button className="group p-2.5 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 rounded-2xl transition-all duration-300">
          <IoCheckmarkDoneOutline size={20} className="group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* --- Notification List Area --- */}
      <div className="max-h-[420px] overflow-y-auto custom-scrollbar bg-white/30">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Updating feed...</p>
          </div>
        ) : notifications.length > 0 ? (
          <div className="divide-y divide-slate-50/80">
            {notifications.slice(0, 8).map((notif, idx) => (
            
              <motion.div
           
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => handleNotificationClick(notif)}
                className={`p-5 hover:bg-white transition-all cursor-pointer flex gap-4 group relative ${
                  notif.status === 'unread' ? 'bg-indigo-50/30' : ''
                }`}
              >
                {/* Status Indicator */}
                {notif.status === 'unread' && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-600 rounded-r-full" />
                )}

                {/* Icon */}
                <div className={`w-12 h-12 shrink-0 rounded-[20px] flex items-center justify-center transition-all duration-500 shadow-sm ${
                  notif.status === 'unread' 
                  ? 'bg-indigo-600 text-white rotate-3 shadow-indigo-100' 
                  : 'bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                }`}>
                  <IoNotificationsOutline size={22} className="group-hover:shake" />
                </div>

                {/* Text Content */}
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h5 className="text-[13px] font-bold text-slate-800 leading-none truncate group-hover:text-indigo-600 transition-colors">
                      {notif.title}
                    </h5>
                    <div 
                      className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase whitespace-nowrap pt-0.5 cursor-help bg-slate-100/50 px-2 py-0.5 rounded-full"
                      title={new Date(notif.createdAt).toLocaleDateString() + ' ' + new Date(notif.createdAt).toLocaleTimeString()}
                    >
                      <IoTimeOutline size={10} />
                      {format(notif.createdAt)}
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium line-clamp-2 leading-relaxed">
                    {notif.message}
                  </p>
                </div>
              </motion.div>
              
           
            ))}
          </div>
        ) : (
          <div className="py-24 text-center px-10">
            <div className="w-20 h-20 bg-slate-50 rounded-[32px] flex items-center justify-center mx-auto mb-4 border border-dashed border-slate-200">
               <IoNotificationsOutline size={32} className="text-slate-200" />
            </div>
            <p className="text-xs text-slate-400 font-black uppercase tracking-widest">Everything is read</p>
            <p className="text-[10px] text-slate-300 mt-1">Enjoy your productive day!</p>
          </div>
        )}
      </div>

      {/* --- Footer Section --- */}
      <div className="p-4 bg-slate-50/50">
        <Link 
          href="/notifications" 
          onClick={() => setNotifOpen(false)}
          className="flex items-center justify-center gap-2 w-full py-4 bg-white hover:bg-indigo-600 border border-slate-200 hover:border-indigo-600 rounded-[20px] text-[11px] font-black text-slate-600 hover:text-white uppercase tracking-[0.2em] transition-all duration-500 shadow-sm shadow-slate-100 group"
        >
          View All Notifications
          <IoArrowForwardOutline size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

export default NotificationDropdown;