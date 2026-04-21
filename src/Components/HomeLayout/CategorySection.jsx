'use client'
import React from 'react'
import { motion } from "framer-motion";
import { IoLayersOutline, IoHardwareChipOutline, IoGlobeOutline, IoCodeSlashOutline } from "react-icons/io5";
const CategorySection = () => {
  return (
    <div>
<section className="py-24 max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-4">Explore <span className='text-indigo-600'>Ecosystem</span></h2>
          <p className="text-slate-500 max-w-2xl mx-auto uppercase text-xs font-bold tracking-[0.2em]">Our Popular Service Categories</p>
        </div>
        
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8">
          {[
            { name: "Web Apps", icon: <IoLayersOutline />, color: "bg-indigo-500" },
            { name: "Mobile Apps", icon: <IoGlobeOutline />, color: "bg-violet-500" },
            { name: "AI Tools", icon: <IoHardwareChipOutline />, color: "bg-blue-500" },
            { name: "Open Source", icon: <IoCodeSlashOutline />, color: "bg-slate-800" }
          ].map((cat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="p-10 rounded-[40px] shadow-sm border border-slate-200/60 bg-white/80 backdrop-blur-md text-center group transition-all hover:shadow-2xl hover:border-indigo-200"
            >
              <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl ${cat.color} flex items-center justify-center text-white text-3xl shadow-lg shadow-indigo-200 group-hover:rotate-12 transition-transform`}>
                {cat.icon}
              </div>
              <h3 className="font-bold text-xl text-slate-800">{cat.name}</h3>
              <p className="text-slate-500 mt-3 text-sm leading-relaxed">Top tier solutions for {cat.name.toLowerCase()} architecture.</p>
            </motion.div>
          ))}
        </div>
      </section>


    </div>
  )
}

export default CategorySection