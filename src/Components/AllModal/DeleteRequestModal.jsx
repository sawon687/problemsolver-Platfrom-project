"use client";

import React, { useState } from 'react';
import { Trash2, AlertTriangle, X } from 'lucide-react';
import MessageModal from './MessageModal';

export default function DeleteRequestModal({ requestId, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
 const [modal, setModal] = useState({ 
    open: false, 
    type: 'success', 
    title: '', 
    msg: '' 
  });
  const handleDelete = async () => {
    setIsDeleting(true);
  const response=  await onDelete(requestId); 
   if(response.success)
   {      setIsOpen(false);
       setIsDeleting(false);
        setModal({ 
          open: true, 
          type: 'success', 
          title: 'Delete Requets', 
          msg:'Your Requests Assined has been successfully', 
        });
        

   }else{
        setModal({ 
          open: true, 
          type: 'error', 
          title: 'Project Assined', 
          msg:'Your project Assined has been successfully', 
        });
   }
  
   
  };

  return (
    <>
    
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
      >
        <Trash2 size={18} />
      </button>

    
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-red-50 p-3 rounded-2xl">
                <AlertTriangle className="text-red-500" size={24} />
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">Are you sure?</h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              Do you really want to delete this request? This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 px-4 py-2.5 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
        <MessageModal
            isOpen={modal.open} 
            type={modal.type} 
            title={modal.title} 
            message={modal.msg} 
            onClose={() => setModal({ ...modal, open: false })}
          />
    </>
  );
}