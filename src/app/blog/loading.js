'use client'

import React from 'react';
import { motion } from "framer-motion";

const BlogSkeleton = () => {
  // Pulse animation configuration
  const pulse = {
    initial: { opacity: 0.6 },
    animate: { 
      opacity: [0.6, 1, 0.6],
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <div className="min-h-screen bg-white -mt-20 pb-20 overflow-x-hidden">
      
      {/* --- HERO BANNER SKELETON --- */}
      <div className="relative h-[70vh] md:h-[85vh] w-full bg-slate-200 overflow-hidden">
        <motion.div 
          variants={pulse}
          initial="initial"
          animate="animate"
          className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-20"
        >
          <div className="max-w-4xl space-y-6">
            {/* Badge Skeleton */}
            <div className="h-8 w-40 bg-slate-300 rounded-full" />
            {/* Title Skeletons */}
            <div className="h-16 md:h-24 w-full bg-slate-300 rounded-2xl" />
            <div className="h-16 md:h-24 w-2/3 bg-slate-300 rounded-2xl" />
            
            {/* Buttons Row */}
            <div className="flex items-center gap-6 pt-10">
              <div className="h-16 w-48 bg-slate-300 rounded-full" />
              <div className="h-10 w-32 bg-slate-300/50 rounded-full border border-slate-300" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* --- CONTENT SKELETON --- */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 mt-16">
        
        {/* Category Buttons Skeleton */}
        <div className="flex items-center justify-center gap-3 pb-10">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-12 w-28 bg-slate-100 rounded-full shrink-0" />
          ))}
        </div>

        {/* Search Bar Skeleton */}
        <div className="flex flex-col lg:flex-row justify-between items-center py-10 gap-6 border-t border-slate-100">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-slate-100 rounded-2xl" />
            <div className="space-y-2">
              <div className="h-3 w-20 bg-slate-100 rounded" />
              <div className="h-6 w-12 bg-slate-100 rounded" />
            </div>
          </div>
          <div className="h-16 w-full lg:w-[500px] bg-slate-50 rounded-2xl border border-slate-100" />
        </div>

        {/* Blog Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-[2.5rem] p-4 border border-slate-100 shadow-sm">
              <motion.div variants={pulse} initial="initial" animate="animate" className="space-y-6">
                {/* Image Area */}
                <div className="relative h-64 w-full bg-slate-100 rounded-[2rem]" />
                
                {/* Text Content */}
                <div className="px-4 pb-4 space-y-4">
                  <div className="h-3 w-24 bg-slate-100 rounded" />
                  <div className="space-y-2">
                    <div className="h-6 w-full bg-slate-100 rounded" />
                    <div className="h-6 w-2/3 bg-slate-100 rounded" />
                  </div>
                  <div className="space-y-2 pt-2">
                    <div className="h-3 w-full bg-slate-50 rounded" />
                    <div className="h-3 w-full bg-slate-50 rounded" />
                  </div>

                  {/* Footer Area */}
                  <div className="pt-6 flex items-center justify-between border-t border-slate-50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100" />
                      <div className="h-3 w-20 bg-slate-100 rounded" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-50" />
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSkeleton;