import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, X, ArrowRight, ShieldCheck } from 'lucide-react';

const MessageModal = ({ isOpen, type = 'success', title, message, onClose }) => {
  const isSuccess = type === 'success';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          
          {/* Professional Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-[400px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(79,70,229,0.15)] overflow-hidden border border-indigo-50/50"
          >
            
            {/* Header Accent */}
            <div className={`h-1.5 w-full ${isSuccess ? 'bg-indigo-500' : 'bg-rose-500'}`} />

            {/* Close Button - Subtle & Modern */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-xl hover:bg-slate-50 text-slate-400 transition-all active:scale-90"
            >
              <X size={18} />
            </button>

            <div className="px-8 pt-10 pb-8 flex flex-col items-center text-center">
              
              {/* Icon Section - Professional Indigo Style */}
              <div className="relative mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className={`w-20 h-20 rounded-[1.75rem] flex items-center justify-center ${
                    isSuccess ? 'bg-indigo-50 text-indigo-600' : 'bg-rose-50 text-rose-600'
                  }`}
                >
                  {isSuccess ? <ShieldCheck size={40} strokeWidth={1.5} /> : <AlertCircle size={40} strokeWidth={1.5} />}
                </motion.div>
                
                {/* Decorative Ring */}
                <div className={`absolute -inset-2 rounded-[2rem] border-2 border-dashed opacity-20 ${
                  isSuccess ? 'border-indigo-400 animate-spin-slow' : 'border-rose-400'
                }`} />
              </div>

              {/* Text Content */}
              <h2 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">
                {title || (isSuccess ? 'Successfully Processed' : 'Attention Required')}
              </h2>
              
              <p className="text-slate-500 text-[15px] leading-relaxed mb-8 px-2">
                {message || (isSuccess 
                  ? 'The action has been completed securely. You can now proceed to the next step.' 
                  : 'We encountered a small issue. Please verify your details and try again.')}
              </p>

              {/* Action Button - Indigo Gradient */}
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                onClick={onClose}
                className={`group w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                  isSuccess 
                  ? 'bg-indigo-600 text-white shadow-indigo-200 hover:bg-indigo-700' 
                  : 'bg-slate-900 text-white shadow-slate-200 hover:bg-black'
                }`}
              >
                <span>{isSuccess ? 'Dismiss' : 'Try Again'}</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>

              {/* Minimal Footer */}
              <div className="mt-6 flex items-center gap-2 opacity-40">
                <div className="h-[1px] w-8 bg-slate-300" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Verified</span>
                <div className="h-[1px] w-8 bg-slate-300" />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MessageModal;