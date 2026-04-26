"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Clock, DollarSign, MessageSquare, User, Zap, Sparkles, Layout } from "lucide-react";
import MessageModal from './MessageModal';
import { useRouter } from 'next/navigation';


const UserRequestModal = ({ id }) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router=useRouter()
  const [modal, setModal] = useState({ 
    open: false, 
    type: 'success', 
    title: '', 
    msg: '' 
  });

  
  const { register, handleSubmit, reset } = useForm();
  

  const handleRequest = async (data) => {
    setLoading(true);
    data.solverId = session?._id;
    data.contactEmail = session?.user?.email;
    data.projectId = id;
    
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
          title: 'Proposal Sent!', 
          msg: 'Your expertise has been presented to the buyer.', 
        });
        reset();
      } else {
        setIsModalOpen(false);
        setModal({ 
          open: true, 
          type: 'error', 
          title: 'Submission Failed', 
          msg: response.message || 'Something went wrong.', 
        });
      }
    } catch (error) {
      setLoading(false);
      setIsModalOpen(false);
      setModal({ 
        open: true, 
        type: 'error', 
        title: 'Network Error', 
        msg: error.message, 
      });
      reset();
    }
  };


  return (
    <>
      {/* Premium Trigger Button */}
      <button 
        onClick={() =>{
          
            if(!session)
          {
            return router.push('/Login')
          }
          
          setIsModalOpen(true)


        }} 
        className="group flex-1 w-full relative bg-indigo-600 overflow-hidden text-white text-[#0f172a] py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all hover:bg-indigo-500 hover:text-white active:scale-95 shadow-xl flex items-center justify-center gap-2"
      >
        <span className="relative z-10 flex items-center gap-2">
          Apply for this project <Zap size={14} fill="currentColor" />
        </span>
      
      </button>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop with Dynamic Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-[#020617]/90 backdrop-blur-[12px]"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, rotateX: -10 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.9, opacity: 0, rotateX: -10 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="relative w-full max-w-lg bg-[#0f172a] border border-white/10 rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              {/* Animated Glow Effect */}
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-600/20 rounded-full blur-[80px]" />
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px]" />

              <div className="relative p-8 md:p-12">
                {/* Close Button */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute right-8 top-8 p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-full transition-all"
                >
                  <X size={20} />
                </button>

                {/* Modal Header */}
                <div className="mb-10">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-4 text-indigo-400">
                    <Sparkles size={14} className="animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Expert Application</span>
                  </div>
                  <h2 className="text-4xl font-black text-white tracking-tight">Pitch Your Skill</h2>
                  <p className="text-slate-400 text-sm mt-2 font-medium">Show the client why you're the perfect match.</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(handleRequest)} className="space-y-5">
                  
                  {/* Name (Pre-filled & Styled) */}
                  <div className="relative group">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                    <input
                      {...register("name", { required: true })}
                      defaultValue={session?.user?.name || session?.username}
                      className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/5 focus:border-indigo-500/50 rounded-2xl outline-none text-sm text-white transition-all placeholder:text-slate-600 focus:bg-white/10"
                      placeholder="Your Full Name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    {/* Bid Input */}
                    <div className="relative group">
                      <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                      <input
                        type="number"
                        {...register("userBitBudget", { required: true })}
                        className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/5 focus:border-indigo-500/50 rounded-2xl outline-none text-sm text-white transition-all placeholder:text-slate-600 focus:bg-white/10"
                        placeholder="Bid (৳)"
                      />
                    </div>

                    {/* Timeline Input */}
                    <div className="relative group">
                      <Clock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                      <input
                        {...register("expectedTimeline")}
                        className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/5 focus:border-indigo-500/50 rounded-2xl outline-none text-sm text-white transition-all placeholder:text-slate-600 focus:bg-white/10"
                        placeholder="E.g. 5 Days"
                      />
                    </div>
                  </div>

                  {/* Message/Pitch Textarea */}
                  <div className="relative group">
                    <MessageSquare className="absolute left-5 top-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                    <textarea
                      {...register("message")}
                      rows={4}
                      className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/5 focus:border-indigo-500/50 rounded-[2rem] outline-none text-sm text-white transition-all placeholder:text-slate-600 resize-none focus:bg-white/10"
                      placeholder="Detail your approach and experience..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    disabled={loading}
                    className="w-full mt-4 relative group/btn overflow-hidden bg-indigo-600 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:text-[#0f172a] transition-all duration-500 active:scale-95 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto" />
                    ) : (
                      <span className="flex items-center justify-center gap-3">
                        Transmit Proposal <Send size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
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