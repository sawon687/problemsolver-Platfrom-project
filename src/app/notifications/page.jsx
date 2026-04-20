"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { 
  IoNotificationsOutline, IoTrashOutline, IoChevronForward, 
  IoTimeOutline, IoCheckmarkDoneCircleOutline, IoSparklesOutline, IoFilterOutline
} from 'react-icons/io5';
import { format } from 'timeago.js';
import ConfrimMessageModal from '../../Components/AllModal/ConfrimMessageModal';
import MessageModal from '../../Components/AllModal/MessageModal';
import { useRouter } from 'next/navigation';



const NotificationPage = () => {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
   const [modal, setModal] = useState({ 
      open: false, 
      type: 'success', 
      title: '', 
      msg: '' 
    });
  // Modal states
  const [conFrModalOpen, setConFramModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null); // ID track korar jonno
  const [isDeleting, setIsDeleting] = useState(false);
  const router=useRouter()
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

  useEffect(() => {
    fetchAll();
  }, [session]);

  const handleMarkAllRead = async () => {
    try {
      const res = await fetch(`/api/notifications/mark-read`, {
        method: 'PUT',
        body: JSON.stringify({ email: session?.user?.email }),
      });
      if (res.ok) {
     
        toast.success('All marked as read');
      }
    } catch (err) {
      toast.error('Failed to update');
    }
  };

  // --- Dynamic Delete Function (Single & All) ---
  const handleDelete = async (id = null) => {
    const email = session?.user?.email;
    if (!email) return;

    setIsDeleting(true);
    try {
  
      let uri = `/api/notifications?email=${email}${id ? `&id=${id}` : ''}`;
      
      const res = await fetch(uri, { method: 'DELETE' });
      const result=await res.json()
      if (res.ok) {
                  setModal({ 
          open: true, 
          type: 'success', 
          title: 'Notifiacation Delete', 
          msg:result.message, 
        });

        if (id) {
             
        } else {
          setNotifications([]);
        }
        setConFramModal(false);
      }
    } catch (err) {
    
              setModal({ 
          open: true, 
          type: 'Error', 
          title: 'Notifiacation Delete', 
          msg:err.message, 
        });

    } finally {
      setIsDeleting(false);
      setSelectedId(null);
    }
  };

  const openDeleteModal = (id = null) => {
    setSelectedId(id); 
    setConFramModal(true);
  };

  const unreadCount = notifications.filter(n => n.status === 'unread').length;

  //  status cahnge and rotuer page 
const handleNotificationClick = async (notif) => {
  

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
    <div className="min-h-screen bg-[#F8FAFF] pb-20 pt-32 px-4 md:px-6">
   
      <div className="max-w-5xl mx-auto">
        
     
        <div className="relative overflow-hidden bg-indigo-900 rounded-[3rem] p-8 md:p-12 mb-12 shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-indigo-100 text-[10px] font-black uppercase mb-4">
                <IoSparklesOutline /> Interaction Center
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                Activity <span className="text-indigo-400">Stream.</span>
              </h1>
              <p className="text-indigo-100/70 font-medium max-w-md">
                You have <span className="text-white font-black">{unreadCount} unread</span> messages.
              </p>
            </div>
            
            <div className="flex gap-3">
               <button onClick={handleMarkAllRead} className="flex items-center gap-2 px-6 py-3 bg-white text-indigo-900 rounded-2xl text-xs font-black uppercase shadow-lg transition-all active:scale-95">
                 <IoCheckmarkDoneCircleOutline size={20} /> Mark Read
               </button>
               <button onClick={() => openDeleteModal(null)} className="p-3 bg-rose-500/20 border border-rose-500/30 text-rose-200 rounded-2xl hover:bg-rose-500 hover:text-white transition-all active:scale-95 flex items-center gap-2">
                 <span className="text-xs font-bold uppercase ml-1">Clear All</span>
                 <IoTrashOutline size={22} />
               </button>
            </div>
          </div>
        </div>

 
        <div className="grid gap-5">
          {loading ? (
             [1,2,3].map(i => <div key={i} className="h-32 bg-white animate-pulse rounded-[2.5rem]" />)
          ) : notifications.length > 0 ? (
            notifications.map((notif) => (
              <div key={notif._id} className="group relative bg-white border border-slate-100 p-6 md:p-8 rounded-[2.5rem] transition-all hover:shadow-xl hover:shadow-indigo-500/5">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${notif.status === 'unread' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200' : 'bg-slate-100 text-slate-400'}`}>
                    <IoNotificationsOutline size={28} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-black text-xl mb-1 ${notif.status === 'unread' ? 'text-slate-900' : 'text-slate-600'}`}>{notif.title}</h3>
                    <p className="text-slate-500 text-sm mb-3">{notif.message}</p>
                    <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase">
                      <IoTimeOutline size={14} className="text-indigo-500" /> {format(notif.createdAt)}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 self-end md:self-center">
                    <button 
                      onClick={(e) => { e.preventDefault(); openDeleteModal(notif._id); }}
                      className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all md:opacity-0 group-hover:opacity-100"
                    >
                      <IoTrashOutline size={20} />
                    </button>
                    <div onClick={()=>handleNotificationClick(notif)}  className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-100 text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <IoChevronForward size={18} />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
              <IoNotificationsOutline size={40} className="text-slate-200 mx-auto mb-4" />
              <h3 className="text-xl font-black text-slate-900">Inbox is empty</h3>
            </div>
          )}
        </div>

      </div>
{/* Confiramtion Mesage */}
    
      <ConfrimMessageModal 
        isOpen={conFrModalOpen}
        onclose={() => setConFramModal(false)}
        handleDelete={() => handleDelete(selectedId)}
        isDeleting={isDeleting}
        id={selectedId}
      />
         {/* message  */}
       <MessageModal
            isOpen={modal.open} 
            type={modal.type} 
            title={modal.title} 
            message={modal.msg} 
            onClose={() => setModal({ ...modal, open: false })}
          />
    </div>
  );
};

export default NotificationPage;