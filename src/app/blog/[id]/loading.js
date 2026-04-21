'use client'

import React from 'react';
import { motion } from "framer-motion";

const BlogDetailsSkeleton = () => {
  // Pulse animation for the skeleton effect
  const pulse = {
    initial: { opacity: 0.6 },
    animate: { 
      opacity: [0.6, 1, 0.6],
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden bg-white">
      
      {/* --- Smooth Progress Bar Skeleton --- */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-slate-100 z-[100]"></div>

      {/* --- Top Navigation Skeleton --- */}
      <nav className="max-w-7xl mx-auto px-8 py-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-slate-100" />
          <div className="h-3 w-24 bg-slate-100 rounded shadow-sm" />
        </div>
        <div className="flex gap-3">
          <div className="h-10 w-32 bg-slate-100 rounded-full hidden md:block" />
          <div className="h-10 w-10 bg-slate-100 rounded-full" />
        </div>
      </nav>

      {/* --- Header Section Skeleton --- */}
      <header className="max-w-5xl mx-auto px-6 text-center space-y-10 pt-10">
        <div className="flex justify-center">
          <div className="h-8 w-40 bg-slate-100 rounded-full" />
        </div>
        
        <motion.div variants={pulse} initial="initial" animate="animate" className="space-y-4">
          <div className="h-16 md:h-24 w-full bg-slate-200 rounded-3xl" />
          <div className="h-16 md:h-24 w-3/4 mx-auto bg-slate-200 rounded-3xl" />
        </motion.div>

        <div className="flex justify-center items-center gap-8">
          <div className="h-8 w-32 bg-slate-100 rounded-full" />
          <div className="h-4 w-20 bg-slate-50 rounded" />
          <div className="h-4 w-24 bg-slate-50 rounded" />
        </div>
      </header>

      {/* --- Main Banner Image Skeleton --- */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-20">
        <motion.div 
          variants={pulse} 
          initial="initial" 
          animate="animate"
          className="h-[65vh] md:h-[85vh] rounded-[4rem] bg-slate-200 shadow-sm" 
        />
      </div>

      {/* --- Article Body Skeleton --- */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 mt-32">
        <div className="lg:col-span-8 lg:col-start-3 space-y-12">
          
          {/* Excerpt Skeleton */}
          <div className="space-y-4 mb-16">
            <div className="h-8 w-full bg-slate-100 rounded" />
            <div className="h-8 w-full bg-slate-100 rounded" />
            <div className="h-8 w-2/3 bg-slate-100 rounded" />
          </div>

          {/* Paragraph Skeletons */}
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-4 w-full bg-slate-50 rounded" />
            ))}
          </div>

          {/* Dynamic Card Skeleton */}
          <div className="my-24 p-12 bg-slate-50 border border-slate-100 rounded-[3.5rem] flex flex-col md:flex-row items-center gap-12">
            <div className="w-24 h-24 bg-slate-200 rounded-[2rem] shrink-0" />
            <div className="space-y-4 w-full">
              <div className="h-8 w-1/2 bg-slate-200 rounded-lg" />
              <div className="h-4 w-full bg-slate-200/50 rounded" />
              <div className="h-4 w-3/4 bg-slate-200/50 rounded" />
            </div>
          </div>

          {/* Author Box Skeleton */}
          <div className="p-12 bg-white border border-slate-100 rounded-[4rem] flex flex-col md:flex-row items-center gap-12">
            <div className="w-32 h-32 rounded-[2.5rem] bg-slate-100 shrink-0" />
            <div className="space-y-4 w-full text-center md:text-left">
              <div className="h-3 w-32 bg-slate-100 rounded mx-auto md:mx-0" />
              <div className="h-10 w-48 bg-slate-200 rounded-xl mx-auto md:mx-0" />
              <div className="h-4 w-full max-w-sm bg-slate-50 rounded mx-auto md:mx-0" />
            </div>
          </div>
        </div>
      </div>

      {/* --- Footer Skeleton --- */}
      <footer className="max-w-7xl mx-auto px-6 mt-40">
        <div className="bg-slate-900 rounded-[4rem] p-12 md:p-24 h-[400px]">
           <div className="flex justify-between items-end h-full">
              <div className="space-y-6">
                <div className="h-20 w-64 bg-slate-800 rounded-2xl" />
                <div className="h-4 w-40 bg-slate-800 rounded" />
              </div>
              <div className="h-16 w-48 bg-slate-800 rounded-full" />
           </div>
        </div>
      </footer>

    </div>
  );
};

export default BlogDetailsSkeleton;