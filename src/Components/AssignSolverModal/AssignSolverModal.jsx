'use client';
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, UserCheck, Clock, ChevronRight, Loader2, Sparkles, UserCircle, CalendarDays } from "lucide-react";
import MessageModal from '../AllModal/MessageModal';
import { useSession } from 'next-auth/react';

  
const AssignSolverModal = ({ isOpen, onClose, id,  refetch, requests, isLoading,projectTitle}) => {
  if (!isOpen) return null;
 const [modal, setModal] = useState({ 
    open: false, 
    type: 'success', 
    title: '', 
    msg: '' 
  });
  const {data:session}=useSession()
  const buyerEmail=session?.email
  const onAssign = async (solverEmail,solverId,action) => {
    try {
      const res = await fetch(`/api/Project/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ solverEmail,buyerEmail,solverId, projectTitle , action }),
      });
      const result = await res.json();
      if (result.ok || result.success) {
                setModal({ 
          open: true, 
          type: 'success', 
          title: 'Project Assined', 
          msg:'Your project Assined has been successfully', 
        });
          refetch()
        
      }
    } catch (error) {
      console.error("Assignment failed", error);
            setModal({ 
          open: true, 
          type: 'error', 
          title: 'Project Assined', 
          msg:'Assignment failed', 
        });
        
    }
  };

  // Date format function
  const formatAppliedDate = (dateString) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-[100] p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col border border-white/20"
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
        >
          {/* TOP ACCENT BAR */}
          <div className="h-2 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" />

          {/* HEADER SECTION */}
          <div className="relative px-8 pt-8 pb-5">
            <button 
              onClick={onClose}
              className="absolute right-6 top-6 p-2 bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all duration-300"
            >
              <X size={20} />
            </button>
            
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-indigo-600 rounded-[22px] flex items-center justify-center text-white shadow-xl shadow-indigo-200 rotate-3">
                <UserCheck size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
                  Select <span className="text-indigo-600 tracking-normal not-italic font-bold">Expert</span>
                </h2>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5 flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                   {requests?.length || 0} Expert Submissions
                </p>
              </div>
            </div>
          </div>

          {/* CONTENT AREA */}
          <div className="px-6 pb-6 flex-1 overflow-hidden">
            <div className="max-h-[360px] overflow-y-auto pr-2 custom-scrollbar">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
                </div>
              ) : !requests || requests.length === 0 ? (
                <div className="py-16 text-center">
                  <UserCircle size={48} className="mx-auto text-slate-100 mb-3" />
                  <p className="text-slate-400 font-bold text-sm">No applications found yet.</p>
                </div>
              ) : (
                <div className="grid gap-3">
                  {requests.map((solver) => (
                    <motion.div
                      layout
                      key={solver.solverId}
                      className="group flex items-center justify-between p-4 bg-slate-50/60 hover:bg-white rounded-[1.8rem] border border-transparent hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-100/30 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                          <Sparkles size={20} />
                        </div>
                        
                        <div className="flex flex-col gap-1">
                          <h4 className="font-bold text-slate-900 text-base leading-none">
                            {solver.name || "Talent Expert"}
                          </h4>
                          
                          <div className="flex flex-wrap items-center gap-2">
                            {/* Created Date & Time */}
                            <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-white border border-slate-100 px-2 py-0.5 rounded-md">
                              <CalendarDays size={12} className="text-indigo-400" />
                              {formatAppliedDate(solver.createdAt)}
                            </span>

                            {/* Timeline */}
                            <span className="flex items-center gap-1 text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                              <Clock size={12} />
                              {solver.expectedTimeline}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => onAssign(solver.contactEmail,solver.solverId , 'assigned')}
                        className="h-11 px-5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all flex items-center gap-2 active:scale-95"
                      >
                        Assign <ChevronRight size={14} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* MINIMAL FOOTER */}
          <div className="px-8 py-4 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
              Automated Solver Verification Active
            </span>
            <button
              className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-rose-500 transition-colors"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: #e2e8f0; 
          border-radius: 10px; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #6366f1; }
      `}</style>
       <MessageModal
            isOpen={modal.open} 
            type={modal.type} 
            title={modal.title} 
            message={modal.msg} 
            onClose={() => setModal({ ...modal, open: false })}
          />
    </AnimatePresence>
       
  );
};

export default AssignSolverModal;