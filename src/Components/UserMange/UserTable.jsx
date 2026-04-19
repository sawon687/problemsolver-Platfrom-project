'use client'
import React from 'react';
import { FaRegUser, FaBriefcase, FaPhoneAlt } from 'react-icons/fa';
import { IoTrashOutline } from 'react-icons/io5';
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const UserTable = ({ user = {} }) => {

  const handleChangeRole = async (id, role) => {
    const res = await fetch(`/api/userInfo/${id}`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role })
    });

    const result = await res.json();
    if (result.data?.success || result.success) {
      alert(`Success: Role updated to ${role}`);
    } else {
      alert(result.data?.message || "Role change failed");
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'Admin': return 'bg-rose-100/50 text-rose-700 border-rose-200';
      case 'problem_solver': return 'bg-indigo-100/50 text-indigo-700 border-indigo-200';
      case 'Buyer': return 'bg-amber-100/50 text-amber-700 border-amber-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  }

  return (
    <tr className="hover:bg-slate-50/50 transition-all duration-300 border-b border-slate-100 last:border-0">
      
      {/* User Identity + Profile Details */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <img
              src={user.userPhoto || 'https://via.placeholder.com/150'}
              alt="user"
              className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-100 group-hover:ring-indigo-200 transition-all"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div className="flex flex-col">
            <h4 className="font-bold text-slate-800 tracking-tight">{user.username}</h4>
             <span className="flex items-center gap-1 text-[10px] font-semibold text-gray-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                {user.userEmail || 'General'}
              </span>
            <div className="flex items-center gap-3 mt-1.5">
               <span className="flex items-center gap-1 text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                <FaPhoneAlt size={8}/> {user.phoneno || 'N/A'}
              </span>
              <span className="flex items-center gap-1 text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                {user.Skill || 'General'}
              </span>
            </div>
          </div>
        </div>
      </td>

      {/* Rate */}
      <td className="px-6 py-5">
        <div className="flex flex-col">
           <span className="text-sm font-bold text-slate-700">${user.HourlyRate}</span>
           <span className="text-[10px] text-slate-400 font-medium italic">Per Hour</span>
        </div>
      </td>

      {/* Role Badge */}
      <td className="px-6 py-5">
        <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold border uppercase tracking-widest shadow-sm ${getRoleBadge(user.role)}`}>
          {user.role === 'problem_solver' ? 'Solver' : user.role}
        </span>
      </td>

      {/* Date */}
      <td className="px-6 py-5">
        <p className="text-xs font-semibold text-slate-500">
          {user.date ? new Date(user.date).toLocaleDateString('en-GB') : 'N/A'}
        </p>
      </td>

     {/* Role Switch Buttons - Ultra Modern Design */}
<td className="px-6 py-5">
  <div className="flex items-center justify-center gap-3">
    

    {(user.role === 'problem_solver' || user.role === 'Buyer') && (
      <button 
        onClick={() => handleChangeRole(user._id, 'Admin')}
        className="group flex items-center gap-2 px-3 py-2 bg-rose-50 text-rose-600 rounded-xl transition-all duration-300 hover:bg-rose-600 hover:text-white hover:shadow-lg hover:shadow-rose-200 border border-rose-100"
        title="Promote to Admin"
      >
        <MdOutlineAdminPanelSettings className="text-lg group-hover:scale-110 transition-transform" />
        <span className="text-[11px] font-bold uppercase tracking-tight">Admin</span>
      </button>
    )}

   
    {(user.role === 'Admin' || user.role === 'Buyer') && (
      <button 
        onClick={() => handleChangeRole(user._id, 'problem_solver')}
        className="group flex items-center gap-2 px-3 py-2 bg-indigo-50 text-indigo-600 rounded-xl transition-all duration-300 hover:bg-indigo-600 hover:text-white hover:shadow-lg hover:shadow-indigo-200 border border-indigo-100"
        title="Promote to Solver"
      >
        <FaRegUser className="text-base group-hover:scale-110 transition-transform" />
        <span className="text-[11px] font-bold uppercase tracking-tight">Solver</span>
      </button>
    )}

    
    {(user.role === 'Admin' || user.role === 'problem_solver') && (
      <button 
        onClick={() => handleChangeRole(user._id, 'Buyer')}
        className="group flex items-center gap-2 px-3 py-2 bg-amber-50 text-amber-600 rounded-xl transition-all duration-300 hover:bg-amber-600 hover:text-white hover:shadow-lg hover:shadow-amber-200 border border-amber-100"
        title="Promote to Buyer"
      >
        <FaBriefcase className="text-base group-hover:scale-110 transition-transform" />
        <span className="text-[11px] font-bold uppercase tracking-tight">Buyer</span>
      </button>
    )}
    
  </div>
</td>

      {/* Remove Button */}
      <td className="px-6 py-5 text-right">
        <button 
          className="p-2.5 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all duration-300 group"
          title="Remove User"
        >
          <IoTrashOutline size={22} className="group-hover:rotate-12 transition-transform" />
        </button>
      </td>

    </tr>
  );
};

export default UserTable;