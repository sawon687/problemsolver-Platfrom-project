'use client';
import React, { useState } from "react";
import { FaDownload, FaCheck, FaTimes, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import MessageModal from '../AllModal/MessageModal';
import { useSession } from 'next-auth/react';

const SubmittedTaskView = ({ projectId ,projectTitle}) => {
  const queryClient = useQueryClient();
  const {data:session}=useSession()
  
console.log('projectid',projectId)
  const [modal, setModal] = useState({ 
    open: false, 
    type: 'success', 
    title: '', 
    msg: '' 
  });

  // ২. projectId 
  const { data: task, isLoading, isError } = useQuery({
    queryKey: ['submittedTask', projectId],
    queryFn: async () => {
      const res = await fetch(`/api/Buyer/tasks?projectId=${projectId}`); 
      const data = await res.json();
      return data.data; 
    },
    enabled: !!projectId, 
  });
// Task Accepted and rejected function

console.log('task',task)
  const mutation = useMutation({
    mutationFn: async ({ action, solverId }) => {
      const res = await fetch(`/api/Project/${projectId}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, solverId,buyerEmail:session?.email,projectTitle })
      });
 
      return res.json();
    },
    onSuccess: (result, variables) => {
      if (result.success) {
     
        setModal({ 
          open: true, 
          type: 'success', 
          title: `Task ${variables.action === 'Accept' ? 'Accepted' : 'Rejected'}`, 
          msg: `The task has been successfully ${variables.action.toLowerCase()}ed.`, 
        });
        
       
        queryClient.invalidateQueries(['submittedTask', projectId]);
        queryClient.invalidateQueries(['project', projectId]); 
      }
    },
    onError: () => {
        setModal({ 
            open: true, 
            type: 'error', 
            title: 'Update Failed', 
            msg: 'Something went wrong while updating the task status.', 
          });
    }
  });

  const handleAction = (action, solverId) => {
    if (window.confirm(`Are you sure you want to ${action} this task?`)) {
       mutation.mutate({ action, solverId });
    }
  };

            
  if (isLoading) return <div className="p-10 text-center animate-pulse text-slate-400 font-bold uppercase tracking-widest text-xs">Loading Task Details...</div>;
  if (isError || !task) return (<div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] p-12 text-center">
               <p className="text-rose-500  font-bold uppercase tracking-widest text-xs">No task submitted yet</p>
            </div>)
  return (
    <div className="bg-white border z-0 border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-black text-slate-800 tracking-tight">📂 Submitted Task</h2>
          <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
            task?.status === "submited" ? "bg-amber-100 text-amber-600" :
            task?.status === "Accept" ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
          }`}>
            {task?.status}
          </span>
        </div>

        {/* Project ID Display */}
        <div className="mb-6">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Target Project ID</p>
          <p className="font-mono text-[11px] text-indigo-600 bg-indigo-50/50 px-3 py-2 rounded-xl inline-block border border-indigo-100">
            {projectId}
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <a href={task?.gitRepositoryLink} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl hover:bg-slate-900 hover:text-white transition-all group">
            <FaGithub size={20} />
            <div className="overflow-hidden">
              <p className="text-[10px] font-black uppercase opacity-50">GitHub Repository</p>
              <p className="text-xs font-bold truncate">View Source Code</p>
            </div>
          </a>
          <a href={task?.liveProjectUrl} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 bg-indigo-50 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all group">
            <FaExternalLinkAlt size={18} />
            <div className="overflow-hidden">
              <p className="text-[10px] font-black uppercase opacity-50 text-indigo-400 group-hover:text-white">Live URL</p>
              <p className="text-xs font-bold truncate text-indigo-700 group-hover:text-white">Visit Live Site</p>
            </div>
          </a>
        </div>

        {/* ZIP Information */}
        <div className="bg-slate-50 rounded-[2rem] p-6 mb-8 border border-slate-100">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-3xl">📦</div>
                <div>
                  <p className="text-sm font-black text-slate-800">{task?.zipMeta?.name || "attachment.zip"}</p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">
                    Size: {(task?.zipMeta?.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <a href={task?.zipFileUrl} download className="bg-white p-4 rounded-2xl text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                <FaDownload />
              </a>
           </div>
        </div>

        {/* Developer Notes */}
        <div className="mb-8">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Developer Notes</p>
           <div className="p-5 bg-slate-50 rounded-2xl text-sm font-medium text-slate-600 leading-relaxed italic border-l-4 border-indigo-600">
              "{task?.notes || "No notes provided by the developer."}"
           </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => handleAction('Accept', task?.solverId)}
            disabled={mutation.isPending || task?.status === "Accept"}
            className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-100 disabled:text-slate-400 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all"
          >
            {mutation.isPending && mutation.variables?.action === 'Accept' ? (
                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : <><FaCheck /> Accept Task</>}
          </button>

          <button
            onClick={() => handleAction('Rejected', task?.solverId,)}
            disabled={mutation.isPending || task?.status === "Rejected"}
            className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-rose-100 hover:border-rose-500 disabled:border-slate-50 disabled:text-slate-300 text-rose-500 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all"
          >
            {mutation.isPending && mutation.variables?.action === 'Rejected' ? "Rejecting..." : <><FaTimes /> Reject</>}
          </button>
        </div>
      </div>

  
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

export default SubmittedTaskView;