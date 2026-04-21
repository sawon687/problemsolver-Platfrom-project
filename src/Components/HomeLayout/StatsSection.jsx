'use client'
import React, { useEffect, useState } from 'react'
import { motion, useSpring, useTransform, animate } from "framer-motion";


const Counter = ({ target }) => {
  const count = useSpring(0, { stiffness: 30, damping: 20 });
  const display = useTransform(count, (latest) => Math.floor(latest).toLocaleString());

  useEffect(() => {
    // ০ থেকে টার্গেট পর্যন্ত এনিমেট হবে
    const controls = animate(count, target, { duration: 2, ease: "easeOut" });
    return controls.stop;
  }, [target, count]);

  return <motion.span>{display}</motion.span>;
};

const StatsSection = () => {
  const statsData = [
    { target: 10000, label: "Projects Completed", icon: "🚀", color: "from-indigo-600 to-blue-500", shadow: "shadow-indigo-100", delay: 0 },
    { target: 5000, label: "Expert Solvers", icon: "⚡", color: "from-violet-600 to-purple-500", shadow: "shadow-violet-100", delay: 0.1 },
    { target: 2000, label: "Partners Reached", icon: "🌐", color: "from-cyan-500 to-blue-400", shadow: "shadow-cyan-100", delay: 0.2 },
  ];

  return (
    <section className="py-32  relative overflow-hidden font-sans">
      {/* Soft Background Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-50 rounded-full blur-[120px] opacity-50" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-50 rounded-full blur-[120px] opacity-50" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20 space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-100"
          >
            Live Performance
          </motion.span>
          <h2 className="text-4xl font-black text-slate-950 tracking-tighter">
            Impact <span className="text-indigo-600">Measured.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {statsData.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: item.delay }}
              className="group relative"
            >
              {/* Main Card */}
              <div className={`h-full bg-white border border-slate-100 rounded-[2.5rem] p-10 transition-all duration-500 hover:border-transparent hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] flex flex-col items-start overflow-hidden relative`}>
                
                {/* Decorative Icon Circle */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-3xl shadow-lg mb-8 group-hover:scale-110 transition-transform duration-500`}>
                  {item.icon}
                </div>

                <div className="space-y-2 relative z-10">
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                    {item.label}
                  </p>
                  
                  {/* Counter Logic with Fixed Formatting */}
                  <h3 className="text-6xl font-black text-slate-900 tracking-tighter flex items-baseline">
                    <Counter target={item.target} />
                    <span className={`text-2xl font-black ml-1 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>+</span>
                  </h3>
                </div>

                <p className="text-slate-500 text-sm mt-4 font-medium leading-relaxed">
                  Trusted by users worldwide to deliver exceptional results.
                </p>

                {/* Animated Bottom Line */}
                <div className="mt-8 w-full h-1 bg-slate-50 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ x: "-100%" }}
                    whileInView={{ x: "0%" }}
                    transition={{ duration: 1.5, delay: 0.5 + item.delay, ease: "circOut" }}
                    className={`h-full w-full bg-gradient-to-r ${item.color}`}
                  />
                </div>
              </div>

              {/* Back Glow Effect on Hover */}
              <div className={`absolute -inset-2 bg-gradient-to-r ${item.color} rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;