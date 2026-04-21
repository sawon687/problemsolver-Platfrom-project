'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, ArrowLeft, Home, Lock } from 'lucide-react';
import Link from 'next/link';

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen bg-[#020617] -mt-20 flex items-center justify-center p-6 overflow-hidden relative">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] bg-red-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[20%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl w-full text-center"
      >
        {/* Animated Icon Container */}
        <div className="relative inline-block mb-8">
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0] 
            }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="w-24 h-24 bg-red-500/10 border border-red-500/20 rounded-[32px] flex items-center justify-center text-red-500 shadow-2xl shadow-red-500/10"
          >
            <ShieldAlert size={48} />
          </motion.div>
          
          <div className="absolute -bottom-2 -right-2 bg-slate-900 border border-white/10 p-2 rounded-xl text-white shadow-lg">
            <Lock size={16} />
          </div>
        </div>

        {/* Content */}
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">
          RESTRICTED <span className="text-red-500">ACCESS</span>
        </h1>
        
        <p className="text-slate-400 text-lg font-medium mb-10 max-w-md mx-auto leading-relaxed">
          Tumi ekhon je section-e dhukar chesta korcho, sheti access korar <span className="text-white font-bold">Permission</span> tumar account-er nei. Anugraho kore Admin-er sathe jogajog koro.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/Dashboard" className="w-full sm:w-auto group">
            <button className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 shadow-xl shadow-indigo-500/20">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Dashboard
            </button>
          </Link>

          <Link href="/" className="w-full sm:w-auto group">
            <button className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95">
              <Home size={16} />
              Return Home
            </button>
          </Link>
        </div>

        {/* System Info */}
        <div className="mt-16 pt-8 border-t border-white/5">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">
            Aura Security Protocol v3.04
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default UnauthorizedPage;