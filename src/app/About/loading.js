'use client'

import React from 'react';
import { motion } from "framer-motion";
import { IoRocketOutline, IoShieldCheckmarkOutline, IoStatsChartOutline, IoLayersOutline } from "react-icons/io5";

const AboutPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      
      {/* --- HERO SECTION SKELETON --- */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        {/* Background Blobs (Static) */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-50 rounded-full blur-[120px] -z-10 opacity-60" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-50 rounded-full blur-[120px] -z-10 opacity-60" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-pulse">
            <div className="h-8 w-40 bg-indigo-100 rounded-full mb-6" />
            <div className="h-16 w-full bg-slate-200 rounded-2xl mb-4" />
            <div className="h-16 w-3/4 bg-slate-200 rounded-2xl mb-6" />
            <div className="space-y-3 mb-10">
              <div className="h-4 w-full bg-slate-100 rounded" />
              <div className="h-4 w-5/6 bg-slate-100 rounded" />
            </div>
            <div className="flex gap-4">
              <div className="h-14 w-40 bg-slate-300 rounded-2xl" />
              <div className="h-14 w-40 bg-slate-100 rounded-2xl border border-slate-200" />
            </div>
          </div>

          <div className="relative animate-pulse">
            <div className="rounded-[40px] bg-slate-200 h-[500px] w-full" />
            {/* Floating Card Skeleton */}
            <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-[24px] shadow-xl border border-slate-50 hidden md:flex items-center gap-4 w-64">
              <div className="w-12 h-12 bg-indigo-100 rounded-2xl" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-1/2 bg-slate-100 rounded" />
                <div className="h-5 w-3/4 bg-slate-200 rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MISSION & VISION SKELETON --- */}
      <section className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white p-12 rounded-[40px] shadow-sm border border-slate-100 animate-pulse">
              <div className="w-14 h-14 bg-slate-100 rounded-2xl mb-8" />
              <div className="h-8 w-1/2 bg-slate-200 rounded-lg mb-4" />
              <div className="space-y-3">
                <div className="h-4 w-full bg-slate-100 rounded" />
                <div className="h-4 w-5/6 bg-slate-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FEATURES GRID SKELETON --- */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center mb-20 animate-pulse">
          <div className="h-10 w-64 bg-slate-200 rounded-lg mb-4" />
          <div className="h-4 w-48 bg-slate-100 rounded" />
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="w-16 h-16 bg-slate-100 rounded-[20px] mb-6" />
              <div className="h-6 w-3/4 bg-slate-200 rounded mb-3" />
              <div className="h-4 w-full bg-slate-100 rounded mb-2" />
              <div className="h-4 w-5/6 bg-slate-100 rounded" />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default AboutPageSkeleton;