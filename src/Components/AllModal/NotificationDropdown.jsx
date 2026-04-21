"use client";
import React, { useEffect, useRef, useState } from "react";
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

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notifOpen,setNotifOpen]=useState(false)
  const { data: session } = useSession();
  const router = useRouter();

  const notifRef = useRef(null);
  const email = session?.user?.email;
const notificationCount=notifications.length
 
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch(`/api/notifications?email=${email}&status=${'unread'}`);
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


   useEffect(() => {
       const handleClick = (e) => {
         if (notifRef .current && !notifRef .current.contains(e.target)) {
           setNotifOpen(false);
         }
       };
       document.addEventListener("mousedown", handleClick);
       return () => document.removeEventListener("mousedown", handleClick);
     }, []);


const handleNotificationClick = async (notif) => {
  
    setNotifOpen(false);

    try {
      await fetch(`/api/notifications/${notif._id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: 'read' })
      });
    } catch (err) {
      console.error("Status update failed", err);
    }

   
    let targetPath = "";

    switch (notif.type) {
      case 'submission':
        targetPath = `/Dashboard/Project-list/${notif.projectId}/task-Submition`;
        break;
      case 'assigned':
        targetPath = `/Dashboard/My-Requsts/${notif.projectId}/UploadedProject`;
        break;
      case 'accept':
      case 'reject':
        targetPath = "/Dashboard/My-Requsts";
        break;
      case 'project_request':
        targetPath = `/Project/${notif.projectId}`;
        break;
      default:
        targetPath = "/notifications"; 
    }

   
    if (targetPath) {
      router.push(targetPath);
    }
};

  return (

    <div ref={notifRef}>
    <button 
      onClick={() => setNotifOpen(!notifOpen)}
      className={`w-10 h-10 flex items-center justify-center shadow-lg  rounded-xl transition-all relative ${
        notifOpen 
          ? "bg-indigo-600 text-white " 
          : "text-white hover:bg-indigo-300 bg-gray-900"
      }`}
    >
      <IoNotificationsOutline size={20} />
    
      {/* Notification Badge */}
      {notificationCount > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-bold text-white bg-rose-500 rounded-full border-2 border-white">
          {notificationCount}
        </span>
      )}
    </button>
   <div className="absolute right-0 mt-3 z-[100]">
                    <AnimatePresence>
  {notifOpen &&  (<motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.9, y: 10, filter: "blur(10px)" }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="absolute z-[9999] right-0 mt-5 w-80 md:w-[400px] bg-white rounded-[32px] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden origin-top-right"
    >
      {/* Header */}
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
            <IoSparklesOutline size={16} />
          </div>
          <div>
            <h4 className="text-[15px] font-black text-slate-900 tracking-tight">Recent Updates</h4>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Activity Feed</p>
          </div>
        </div>
        <button className="p-2.5 hover:bg-white text-slate-400 hover:text-indigo-600 rounded-2xl transition-all shadow-sm">
          <IoCheckmarkDoneOutline size={20} />
        </button>
      </div>

      {/* Notification List */}
      <div className="max-h-[420px] overflow-y-auto custom-scrollbar">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Updating...</p>
          </div>
        ) : notifications.length > 0 ? (
          <div className="divide-y divide-slate-50">
            {notifications.map((notif, idx) => (
              <motion.div
                key={notif._id || idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={(e) => {
                  e.stopPropagation(); 
                  handleNotificationClick(notif);
                }}
                className={`p-5 hover:bg-slate-50 transition-all cursor-pointer flex gap-4 group relative ${
                  notif.status === 'unread' ? 'bg-indigo-50/40' : 'bg-white'
                }`}
              >
                {/* Status dot for unread */}
                {notif.status === 'unread' && (
                  <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-indigo-600 rounded-full" />
                )}

                {/* Icon Container */}
                <div className={`w-11 h-11 shrink-0 rounded-2xl flex items-center justify-center transition-all ${
                  notif.status === 'unread' 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                  : 'bg-slate-100 text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600'
                }`}>
                  <IoNotificationsOutline size={20} />
                </div>

                {/* Content */}
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h5 className="text-[13px] font-bold text-slate-800 truncate group-hover:text-indigo-600 transition-colors">
                      {notif.title}
                    </h5>
                    <span className="text-[9px] font-bold text-slate-400 uppercase whitespace-nowrap bg-white px-2 py-0.5 rounded-full border border-slate-100">
                      {format(notif.createdAt)}
                    </span>
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
            <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-4">
               <IoNotificationsOutline size={28} className="text-slate-200" />
            </div>
            <p className="text-xs text-slate-400 font-black uppercase tracking-widest">No new updates</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 bg-slate-50/50 border-t border-slate-100">
        <Link 
          href="/notifications" 
          onClick={() => setNotifOpen(false)}
          className="flex items-center justify-center gap-2 w-full py-3.5 bg-white hover:bg-slate-900 border border-slate-200 rounded-2xl text-[10px] font-black text-slate-600 hover:text-white uppercase tracking-widest transition-all shadow-sm"
        >
          View All Notifications
          <IoArrowForwardOutline size={14} />
        </Link>
      </div>
    </motion.div>)}
    </AnimatePresence>
    </div>
    </div>
  );
};

export default NotificationDropdown;