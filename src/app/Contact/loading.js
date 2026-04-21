'use client'

import { motion } from "framer-motion";

const ContactSkeleton = () => {
  // Shimmer animation variants
  const pulse = {
    initial: { opacity: 0.6 },
    animate: { 
      opacity: [0.6, 1, 0.6],
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/30 -mt-20 overflow-x-hidden">
      
      {/* --- HERO BANNER SKELETON --- */}
      <div className="relative h-[450px] w-full bg-slate-200 overflow-hidden">
        <motion.div 
          variants={pulse}
          initial="initial"
          animate="animate"
          className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-center text-center"
        >
          {/* Badge Skeleton */}
          <div className="h-6 w-32 bg-slate-300 rounded-full mb-6" />
          {/* Title Skeleton */}
          <div className="h-12 md:h-16 w-3/4 max-w-xl bg-slate-300 rounded-2xl mb-6" />
          {/* Description Skeleton */}
          <div className="h-4 w-2/3 max-w-lg bg-slate-300 rounded-lg mb-2" />
          <div className="h-4 w-1/2 max-w-md bg-slate-300 rounded-lg" />
        </motion.div>
      </div>

      {/* --- CONTENT SKELETON --- */}
      <div className="max-w-7xl mx-auto px-6 -mt-24 pb-24 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT: INFO CARDS SKELETON */}
          <div className="lg:col-span-1 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                <motion.div variants={pulse} initial="initial" animate="animate">
                  <div className="w-12 h-12 bg-slate-200 rounded-2xl mb-6" />
                  <div className="h-3 w-20 bg-slate-200 rounded mb-2" />
                  <div className="h-6 w-48 bg-slate-200 rounded mb-2" />
                  <div className="h-3 w-32 bg-slate-200 rounded" />
                </motion.div>
              </div>
            ))}
          </div>

          {/* RIGHT: FORM SKELETON */}
          <div className="lg:col-span-2 bg-white rounded-[40px] p-8 md:p-12 border border-slate-100 shadow-sm">
            <motion.div variants={pulse} initial="initial" animate="animate" className="space-y-8">
              {/* Form Header */}
              <div>
                <div className="h-8 w-64 bg-slate-200 rounded-lg mb-3" />
                <div className="h-4 w-80 bg-slate-200 rounded-md" />
              </div>

              {/* Input Skeletons */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="h-3 w-20 bg-slate-100 rounded ml-1" />
                  <div className="h-14 bg-slate-50 rounded-2xl border border-slate-100" />
                </div>
                <div className="space-y-3">
                  <div className="h-3 w-28 bg-slate-100 rounded ml-1" />
                  <div className="h-14 bg-slate-50 rounded-2xl border border-slate-100" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="h-3 w-24 bg-slate-100 rounded ml-1" />
                <div className="h-14 bg-slate-50 rounded-2xl border border-slate-100" />
              </div>

              <div className="space-y-3">
                <div className="h-3 w-20 bg-slate-100 rounded ml-1" />
                <div className="h-32 bg-slate-50 rounded-2xl border border-slate-100" />
              </div>

              {/* Button Skeleton */}
              <div className="h-16 w-full bg-slate-200 rounded-[24px]" />
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactSkeleton;