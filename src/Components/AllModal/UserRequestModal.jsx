"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Clock, DollarSign, MessageSquare, User, Zap, Sparkles } from "lucide-react";
import MessageModal from './MessageModal';

const UserRequestModal = ({ id }) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modal, setModal] = useState({ 
    open: false, 
    type: 'success', 
    title: '', 
    msg: '' 
  });
  const { register, handleSubmit ,reset} = useForm();
       console.log('id project',id)
  const handleRequest = async (data) => {
    setLoading(true);
    data.solverId = session?._id;
    data.contactEmail = session?.user?.email;
    data.projectId=id
    console.log('data req',data)
    try {
      const res = await fetch(`/api/Worker/user-request/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const response = await res.json();
      setLoading(false);

      if (response.success) {
        setIsModalOpen(false);
          
          setModal({ 
          open: true, 
          type: 'success', 
          title: 'Project Request successfully!', 
          msg: response.message || 'Your project has been successfully posted.', 
        });
       reset()
      } else {
           setIsModalOpen(false);
           reset()
          setModal({ 
          open: true, 
          type: 'error', 
          title: 'Project not inserted!', 
          msg: response.message || 'Your project has been successfully posted.', 
        });
      }
    } catch (error) {
      setLoading(false);
         setIsModalOpen(false);
                     setModal({ 
          open: true, 
          type: 'error', 
          title: 'server error!', 
          msg: error.message , 
        });
       reset()
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button 
        onClick={() => setIsModalOpen(true)} 
        className="group flex-1 relative w-full overflow-hidden bg-indigo-600 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs text-white transition-all hover:bg-indigo-700 active:scale-95 shadow-[0_10px_30px_rgba(79,70,229,0.3)]"
      >
        <span className="relative z-10 flex items-center justify-center gap-2 transition-all">
          Apply Now <Zap size={14} fill="currentColor" />
        </span>
      </button>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop with Heavy Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Premium Compact Modal */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-[#0d0e12] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden"
            >
              {/* Subtle Gradient Glow at Top */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

              <div className="relative p-6 md:p-10">
                {/* Close Icon */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute right-6 top-6 p-1.5 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                  <X size={18} />
                </button>

                {/* Header Section - Height Reduced */}
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-3 text-indigo-400">
                    <Sparkles size={12} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.1em]">Fast Application</span>
                  </div>
                  <h2 className="text-2xl font-black text-white tracking-tight">Send Proposal</h2>
                  <p className="text-slate-500 text-sm mt-1">Briefly explain why you're the best fit.</p>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit(handleRequest)} className="space-y-4">
                  
                  {/* Name Input */}
                  <div className="group relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors" size={16} />
                    <input
                      {...register("name", { required: true })}
                      defaultValue={session?.user?.name|| session?.username}
                      className="w-full pl-12 pr-4 py-3 bg-white/[0.03] border border-white/5 focus:border-indigo-500/50 rounded-xl outline-none text-sm text-white transition-all placeholder:text-slate-600 focus:bg-white/[0.06]"
                      placeholder="Your Full Name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Bid Input */}
                    <div className="group relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors" size={16} />
                      <input
                        type="number"
                        {...register("userBitBudget", { required: true })}
                        className="w-full pl-12 pr-4 py-3 bg-white/[0.03] border border-white/5 focus:border-indigo-500/50 rounded-xl outline-none text-sm text-white transition-all placeholder:text-slate-600 focus:bg-white/[0.06]"
                        placeholder="Bid (৳)"
                      />
                    </div>

                    {/* Timeline Input */}
                    <div className="group relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors" size={16} />
                      <input
                        {...register("expectedTimeline")}
                        className="w-full pl-12 pr-4 py-3 bg-white/[0.03] border border-white/5 focus:border-indigo-500/50 rounded-xl outline-none text-sm text-white transition-all placeholder:text-slate-600 focus:bg-white/[0.06]"
                        placeholder="Timeline"
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="group relative">
                    <MessageSquare className="absolute left-4 top-4 text-slate-600 group-focus-within:text-indigo-400 transition-colors" size={16} />
                    <textarea
                      {...register("message")}
                      rows={3}
                      className="w-full pl-12 pr-4 py-3 bg-white/[0.03] border border-white/5 focus:border-indigo-500/50 rounded-xl outline-none text-sm text-white transition-all placeholder:text-slate-600 resize-none focus:bg-white/[0.06]"
                      placeholder="Pitch your solution briefly..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    disabled={loading}
                    className="w-full mt-2 relative group/btn overflow-hidden bg-white text-black py-4 rounded-xl font-black uppercase tracking-[0.1em] text-xs hover:bg-indigo-500 hover:text-white transition-all duration-300 active:scale-95 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin mx-auto" />
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Submit Proposal <Send size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </span>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
          <MessageModal
        isOpen={modal.open} 
        type={modal.type} 
        title={modal.title} 
        message={modal.msg} 
        onClose={() => setModal({ ...modal, open: false })}
      />
      </AnimatePresence>
    </>
  );
};

export default UserRequestModal;