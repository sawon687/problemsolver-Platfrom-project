'use client'
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import BuyerApplyFrom from "../BuyerApplyFrom/BuyerApplyFrom";

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
  const [open,setOpen]=useState(false)
  const {data}=useSession()
  console.log('session',data)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!isPaused) {
        setCurrentIndex((prev) => (prev + 1) % banners.length);
      }
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [isPaused]);

  return (
    <>
  <div className=" pt-10 w-full px-25 mx-auto h-[400px] md:h-[520px] grid grid-cols-1 md:grid-cols-2 gap-5">

    {/* LEFT SIDE - SLIDER */}
    <div
      className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200"
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
              className="absolute w-full inset-0 flex flex-col justify-center items-start px-10 text-left"
              style={{
                backgroundImage: `url(${banner.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

              {/* Text */}
              <motion.h2
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="relative text-3xl md:text-5xl font-bold text-white mb-4 leading-tight"
              >
                {banner.title}
              </motion.h2>

              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative text-lg md:text-xl text-gray-200 max-w-md"
              >
                {banner.subtitle}
              </motion.p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="relative mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition"
              >
                Get Started
              </motion.button>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
        {banners.map((_, idx) => (
          <span
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              idx === currentIndex ? "bg-white scale-125" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>

    {/* RIGHT SIDE */}
    <div className="grid grid-rows-2 gap-5">

      {/* HIRE SOLVER */}
      <div className="rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-white shadow-lg flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-bold mb-2">
            Hire Expert Solvers
          </h3>
          <p className="text-sm text-green-100">
            Post your project & get matched with verified problem solvers instantly.
          </p>
        </div>

        {!data ? (
  <button
    onClick={() => (window.location.href = "/login")}
    className="mt-4 bg-white text-green-600 font-semibold px-5 py-2 rounded-lg w-fit hover:scale-105 transition"
  >
    Login to Post Project
  </button>
) : data.role !== "buyer" ? (
  <button
    onClick={() => (window.location.href = "/Dashboard/Profile")}
    className="mt-4 bg-white text-green-600 font-semibold px-5 py-2 rounded-lg w-fit hover:scale-105 transition"
  >
    Become a Buyer
  </button>
) : (
  <button
    onClick={() => (window.location.href = "/Dashboard/CreateProject")}
    className="mt-4 bg-white text-green-600 font-semibold px-5 py-2 rounded-lg w-fit hover:scale-105 transition"
  >
    Post Project
  </button>
)}
      </div>

      {/* BECOME SOLVER */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-white shadow-lg flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-bold mb-2">
            Become a Solver
          </h3>
          <p className="text-sm text-blue-100">
            Join our network & earn by solving real-world problems.
          </p>
        </div>

        <button className="mt-4 bg-white text-blue-600 font-semibold px-5 py-2 rounded-lg w-fit hover:scale-105 transition">
          Join Now
        </button>
      </div>

    </div>
  </div>
  </>
);

};

export default Banner;
