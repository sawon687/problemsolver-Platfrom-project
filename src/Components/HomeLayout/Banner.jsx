"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { IoRocketOutline, IoBriefcaseOutline, IoArrowForward } from "react-icons/io5";



const Banner = ({banners}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const { data } = useSession();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!isPaused) {
        setCurrentIndex((prev) => (prev + 1) % banners.length);
      }
    }, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused]);

  return (
    <section className="w-full  py-10 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[550px]">
          
          {/* Left Side */}
          <div
            className="lg:col-span-8 relative rounded-[32px] overflow-hidden shadow-2xl group border border-slate-200"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 w-full h-full"
                style={{
                  backgroundImage: `url(${banners[currentIndex].img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Modern Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent" />
                
                <div className="relative h-full flex flex-col justify-center items-start px-8 md:px-16 z-10">
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 bg-indigo-500/20 backdrop-blur-md border border-indigo-400/30 text-indigo-200 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
                  >
                    <IoRocketOutline className="animate-bounce" /> Platform Highlights
                  </motion.div>

                  <motion.h2
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl md:text-6xl font-black text-white mb-5 leading-[1.1] max-w-2xl"
                  >
                    {banners[currentIndex].title}
                  </motion.h2>

                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg md:text-xl text-slate-300 max-w-lg mb-8 leading-relaxed"
                  >
                    {banners[currentIndex].subtitle}
                  </motion.p>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-indigo-600/30 transition-all flex items-center gap-2 group"
                  >
                    Get Started Now <IoArrowForward className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Modern Indicators */}
            <div className="absolute bottom-8 left-8 md:left-16 flex items-center gap-3 z-20">
              {banners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    idx === currentIndex ? "w-12 bg-indigo-500" : "w-4 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT SIDE - ACTION CARDS (4 Columns) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* HIRE SOLVER CARD */}
            <div className="flex-1 rounded-[32px] bg-slate-900 border border-slate-800 p-8 relative overflow-hidden group shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 rounded-full -mr-10 -mt-10 blur-3xl group-hover:bg-indigo-600/20 transition-all" />
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-indigo-600/20 rounded-2xl flex items-center justify-center text-indigo-400 mb-6">
                    <IoBriefcaseOutline size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-3 tracking-tight">Hire Expert Solvers</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Post your projects and get bids from verified experts globally.
                  </p>
                </div>

                {!data ? (
                  <button onClick={() => (window.location.href = "/login")} className="mt-6 w-full py-4 bg-white text-slate-900 rounded-2xl font-bold hover:bg-slate-100 transition-colors shadow-lg">
                    Login to Post
                  </button>
                ) : (data).role !== "buyer" ? (
                  <button onClick={() => (window.location.href = "/Dashboard/Profile")} className="mt-6 w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20">
                    Become a Buyer
                  </button>
                ) : (
                  <button onClick={() => (window.location.href = "/Dashboard/CreateProject")} className="mt-6 w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20">
                    Post Project
                  </button>
                )}
              </div>
            </div>

            {/* BECOME SOLVER CARD */}
            <div className="flex-1 rounded-[32px] bg-gradient-to-br from-indigo-600 to-violet-700 p-8 relative overflow-hidden group shadow-xl shadow-indigo-900/10">
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white/5 backdrop-blur-3xl transform translate-y-1/2 rounded-full" />
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white mb-6">
                    <IoRocketOutline size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-3 tracking-tight">Become a Solver</h3>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    Start earning by solving complex problems and delivering excellence.
                  </p>
                </div>

                <button className="mt-6 w-full py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl font-bold hover:bg-white hover:text-indigo-700 transition-all">
                  Join the Network
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;