'use client'

import React from 'react';
import { motion } from 'framer-motion';
 const NormalLoading= () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-purple-50 rounded-full blur-[100px] opacity-60" />
      </div>

      <div className="relative flex flex-col items-center">
        {/* Modern Animated Logo/Icon Area */}
        <div className="relative w-24 h-24 mb-8">
          {/* Outer Rotating Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-t-2 border-r-2 border-indigo-600 rounded-full"
          />
          
          {/* Inner Pulsing Circle */}
          <motion.div
            animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-4 bg-indigo-100 rounded-full"
          />

          {/* Center Core */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-indigo-600 rounded-full shadow-[0_0_15px_rgba(79,70,229,1)]" />
          </div>
        </div>

        {/* Text Animation */}
        <div className="text-center space-y-2">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-black text-slate-900 tracking-tighter italic"
          >
            Aura<span className="text-indigo-600">Script</span>
          </motion.h2>
          
          <div className="flex items-center gap-1.5 justify-center">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
              Synchronizing
            </span>
            <motion.span 
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1, times: [0, 0.5, 1] }}
              className="w-1 h-1 bg-indigo-600 rounded-full"
            />
            <motion.span 
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
              className="w-1 h-1 bg-indigo-600 rounded-full"
            />
            <motion.span 
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
              className="w-1 h-1 bg-indigo-600 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NormalLoading;