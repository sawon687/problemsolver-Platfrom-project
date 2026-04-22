'use client';
import React, { useState } from 'react';
import { FaRegUser, FaBriefcase, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { IoTrashOutline } from 'react-icons/io5';
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import MessageModal from '../AllModal/MessageModal';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const UserTable = ({ user = {} }) => {
  const [modal, setModal] = useState({ 
    open: false, 
    type: 'success', 
    title: '', 
    msg: '' 
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [actionType, setActionType] = useState(null); 

  const handleChangeRole = async (id, role) => {
    setActionType(`role-${role}`);
    const res = await fetch(`/api/Admin/userInfo/${id}`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role })
    });

    const result = await res.json();
    if (result.ok || result.success) {
      setModal({ 
        open: true, 
        type: 'success', 
        title: 'Role Updated', 
        msg: `Success: User is now an ${role}`,
      });
      router.refresh();
    } else {
      alert(result.message || "Role change failed");
    }
    setActionType(null);
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/Admin/userInfo/${id}`, {
        method: 'DELETE',
      });
      const result = await res.json();

      if (result.success) {
        setModal({ 
          open: true, 
          type: 'success', 
          title: 'User Removed', 
          msg: result.message, 
        });
        router.refresh();
      }
    } catch (error) {
      setModal({ 
        open: true, 
        type: 'error', 
        title: 'Delete Failed', 
        msg: error.message, 
      });
    } finally {
      setLoading(false);
    }
  };
// role staus coler
  const getRoleBadge = (role) => {
    switch (role) {
      case 'Admin': return 'bg-rose-50 text-rose-600 border-rose-100 ring-1 ring-rose-200';
      case 'Worker': return 'bg-indigo-50 text-indigo-600 border-indigo-100 ring-1 ring-indigo-200';
      case 'Buyer': return 'bg-amber-50 text-amber-600 border-amber-100 ring-1 ring-amber-200';
      default: return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  }

  return (
    <tr className="group hover:bg-slate-50/80 transition-all duration-300 border-b border-slate-100 last:border-0 select-none">
      
      {/* --- User Identity --- */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={user.userPhoto || '/avatar.png'}
              className="w-12 h-12 rounded-2xl object-cover ring-4 ring-white shadow-sm group-hover:scale-105 transition-transform duration-300"
              alt="user"
            />
            <div className="absolute -top-1 -left-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full shadow-sm"></div>
          </div>
          <div className="flex flex-col">
            <h4 className="font-black text-slate-800 text-sm tracking-tight">{user.username}</h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                <FaEnvelope size={8}/> {user.userEmail?.split('@')[0]}...
              </span>
              <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
              <span className="flex items-center gap-1 text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-md uppercase">
                {user.Skill || 'General'}
              </span>
            </div>
          </div>
        </div>
      </td>

      {/* --- Rate Section --- */}
      <td className="px-6 py-5">
        <div className="flex flex-col">
            <span className="text-sm font-black text-slate-900">${user.HourlyRate || 0}</span>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">Per Hour</span>
        </div>
      </td>

      {/* --- Current Status --- */}
      <td className="px-6 py-5">
        <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black border uppercase tracking-widest ${getRoleBadge(user.role)}`}>
          {user.role}
        </span>
      </td>

      {/* --- Joined Date --- */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-2 text-slate-500">
           <span className="text-[11px] font-bold">{user.date ? new Date(user.date).toLocaleDateString('en-GB') : 'Recently'}</span>
        </div>
      </td>

      {/* --- Modern Role Switchers with Text --- */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-2">
          {/* Admin Toggle */}
          {user.role !== 'Admin' && (
            <button 
              onClick={() => handleChangeRole(user._id, 'Admin')}
              className="flex items-center gap-1.5 px-3 py-2 bg-white text-rose-500 border border-slate-100 rounded-xl hover:bg-rose-500 hover:text-white hover:shadow-md hover:shadow-rose-100 transition-all active:scale-90"
              title="Make Admin"
            >
              <MdOutlineAdminPanelSettings size={16} />
              <span className="text-[10px] font-bold uppercase">Admin</span>
            </button>
          )}

          {/* Worker Toggle */}
          {user.role !== 'Worker' && (
            <button 
              onClick={() => handleChangeRole(user._id, 'Worker')}
              className="flex items-center gap-1.5 px-3 py-2 bg-white text-indigo-500 border border-slate-100 rounded-xl hover:bg-indigo-500 hover:text-white hover:shadow-md hover:shadow-indigo-100 transition-all active:scale-90"
              title="Make Worker"
            >
              <FaRegUser size={14} />
              <span className="text-[10px] font-bold uppercase">Worker</span>
            </button>
          )}

          {/* Buyer Toggle */}
          {user.role !== 'Buyer' && (
            <button 
              onClick={() => handleChangeRole(user._id, 'Buyer')}
              className="flex items-center gap-1.5 px-3 py-2 bg-white text-amber-500 border border-slate-100 rounded-xl hover:bg-amber-500 hover:text-white hover:shadow-md hover:shadow-amber-100 transition-all active:scale-90"
              title="Make Buyer"
            >
              <FaBriefcase size={14} />
              <span className="text-[10px] font-bold uppercase">Buyer</span>
            </button>
          )}
        </div>
      </td>

      {/* --- Actions --- */}
      <td className="px-6 py-5 text-right">
        <button 
          onClick={() => handleDelete(user._id)}
          disabled={loading}
          className={`p-2.5 rounded-xl transition-all duration-300 ${loading ? 'bg-slate-50' : 'text-slate-400 hover:bg-rose-50 hover:text-rose-500 hover:shadow-sm'}`}
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin text-rose-500" />
          ) : (
            <IoTrashOutline size={20} />
          )}
        </button>
      </td>
{/* message modal */}
      <MessageModal
        isOpen={modal.open} 
        type={modal.type} 
        title={modal.title} 
        message={modal.msg} 
        onClose={() => setModal({ ...modal, open: false })}
      />
    </tr>
  );
};

export default UserTable;