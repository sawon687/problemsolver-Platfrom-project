'use client'

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const banners = [
  {
    id: 1,
    title: "Welcome to RacoAI Marketplace",
    subtitle: "Connect, manage, and deliver projects efficiently.",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 2,
    title: "Hire Problem Solvers",
    subtitle: "Find talented problem solvers for your projects.",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 3,
    title: "Submit and Track Tasks",
    subtitle: "Manage tasks, timelines, and deliverables seamlessly.",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1470&q=80",
  },
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // mouse hover pause
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!isPaused) {
        setCurrentIndex((prev) => (prev + 1) % banners.length);
      }
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [isPaused]);

  return (
    <div className="px-4">

    <div
      className="relative w-[1400px] h-80 md:h-[600px] rounded-xl shadow-2xl overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence>
        {banners.map((banner, index) =>
          index === currentIndex ? (
            <motion.div
              key={banner.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 z-20 flex flex-col h-full  justify-center items-center text-center px-6"
              style={{
                backgroundImage: `url(${banner.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0  bg-opacity-50"></div>

              {/* Text */}
              <motion.h2
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative text-3xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg"
              >
                {banner.title}
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative text-lg md:text-2xl text-white font-semibold drop-shadow-md"
              >
                {banner.subtitle}
              </motion.p>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
        {banners.map((_, idx) => (
          <span
            key={idx}
            className={`w-4 h-4 rounded-full cursor-pointer transition-all
              ${idx === currentIndex ? "bg-white scale-150" : "bg-gray-400"}`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
    </div>
  );
};

export default Banner;
