'use client'
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  DollarSign, 
  Briefcase, 
  AlignLeft, 
  Calendar, 
  PlusCircle,
  ArrowRight,
  Loader2 // Add Loader icon
} from 'lucide-react';
import MessageModal from '../AllModal/MessageModal';

const ProjectCreate = () => {
  const { data: userInfo } = useSession();
  const [loading, setLoading] = useState(false); // Loading state
  const [modal, setModal] = useState({ 
    open: false, 
    type: 'success', 
    title: '', 
    msg: '' 
  });

  const {
    register,
    handleSubmit,
    reset, // Reset function for form
    formState: { errors },
  } = useForm();

  const handleCreate = async (data) => {
    setLoading(true); // Start loading
    
    data.buyerId = userInfo?._id;
    data.status = "pending";
    data.requests = [];

    try {
      const response = await fetch('/api/Buyer/Project-Create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setModal({ 
          open: true, 
          type: 'success', 
          title: 'Project Launched!', 
          msg: result.message || 'Your project has been successfully posted.', 
        });
        reset(); // Clear form after success
      } else {
        setModal({ 
          open: true, 
          type: 'error', 
          title: 'Failed to Launch', 
          msg: result.message || 'Something went wrong.', 
        });
      }
    } catch (error) {
      setModal({ 
        open: true, 
        type: 'error', 
        title: 'Connection Error', 
        msg: 'Server connectivity issue. Please try again.', 
      });
    } finally {
      setLoading(false); // Stop loading regardless of outcome
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
      
      {/* Background Decor (Same as your code) */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-50 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-50 rounded-full blur-3xl opacity-60" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-4xl bg-white border border-slate-200 rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 overflow-hidden grid md:grid-cols-5"
      >
        {/* Left Side: Info Panel (Keep your design) */}
        <div className="md:col-span-2 bg-slate-900 p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-indigo-500/20">
              <PlusCircle className="text-white" size={28} />
            </div>
            <h2 className="text-3xl font-black leading-tight mb-4">
              Deploy Your <br />
              <span className="text-indigo-400">Next Big Idea</span>
            </h2>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              Fill out the technical specifications to find the perfect talent for your deployment.
            </p>
          </div>

          <div className="relative z-10 space-y-6 mt-12 md:mt-0">
             <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                   <Rocket size={18} className="text-indigo-400" />
                </div>
                <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">Global Reach</p>
             </div>
             <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                   <Briefcase size={18} className="text-indigo-400" />
                </div>
                <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">Expert Talent</p>
             </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl" />
        </div>

        {/* Right Side: Form Panel */}
        <div className="md:col-span-3 p-10 md:p-12">
          <form onSubmit={handleSubmit(handleCreate)} className="space-y-7">
            
            {/* Project Title */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">
                <PlusCircle size={14} className="text-indigo-500" /> Project Title
              </label>
              <input
                type="text"
                placeholder="e.g. Real-time Crypto Dashboard"
                className={`w-full bg-slate-50 border ${errors.ProjectTitle ? 'border-rose-400' : 'border-slate-200'} px-5 py-4 rounded-[1.2rem] focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all font-medium text-slate-700`}
                {...register('ProjectTitle', { required: true })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Budget */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">
                  <DollarSign size={14} className="text-indigo-500" /> Budget ($)
                </label>
                <input
                  type="number"
                  placeholder="Amount"
                  className="w-full bg-slate-50 border border-slate-200 px-5 py-4 rounded-[1.2rem] outline-none font-medium text-slate-700"
                  {...register('ProjectBudget', { required: true })}
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">
                  <Briefcase size={14} className="text-indigo-500" /> Category
                </label>
                <select
                  className="w-full bg-slate-50 border border-slate-200 px-5 py-4 rounded-[1.2rem] outline-none font-medium text-slate-700 cursor-pointer"
                  {...register('ProjectCategory', { required: true })}
                >
                  <option value="">Select Domain</option>
                  <option value="Web Development">Web Development</option>
                  <option value="App Development">App Development</option>
                  <option value="UI/UX Design">UI / UX Design</option>
                  <option value="Fullstack">Full Stack</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">
                <AlignLeft size={14} className="text-indigo-500" /> Technical Details
              </label>
              <textarea
                rows={4}
                placeholder="Briefly describe the stack..."
                className="w-full bg-slate-50 border border-slate-200 px-5 py-4 rounded-[1.2rem] outline-none font-medium text-slate-700 resize-none"
                {...register('ProjectDescription', { required: true })}
              />
            </div>

            {/* Deadline */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">
                <Calendar size={14} className="text-indigo-500" /> Milestone Deadline
              </label>
              <input
                type="date"
                className="w-full bg-slate-50 border border-slate-200 px-5 py-4 rounded-[1.2rem] outline-none font-medium text-slate-700"
                {...register('ProjectDeadline', { required: true })}
              />
            </div>

            {/* Submit Button with Loading */}
            <motion.button
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className={`w-full ${loading ? 'bg-slate-400' : 'bg-indigo-600 hover:bg-indigo-700'} text-white font-bold py-5 rounded-[1.5rem] shadow-xl shadow-indigo-200 transition-all flex items-center justify-center gap-3 mt-4`}
            >
              {loading ? (
                <>Processing <Loader2 size={18} className="animate-spin" /></>
              ) : (
                <>Launch Project <ArrowRight size={18} /></>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>

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

export default ProjectCreate;