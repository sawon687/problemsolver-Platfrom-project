'use client'

import { motion } from "framer-motion";

const bannerImg =
  "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1470&q=80";

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white px-6 py-16">
      <div className="max-w-6xl mx-auto">

        {/* HERO BANNER */}
        <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl mb-20">

          {/* Background Image */}
          <img
            src={bannerImg}
            alt="About RacoAI"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-green-700/60 to-transparent"></div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 h-full flex flex-col justify-center px-10 md:px-16 text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About RacoAI Marketplace
            </h1>

            <p className="text-lg max-w-xl text-green-100">
              RacoAI connects buyers with skilled problem solvers to complete academic,
              technical and real-world challenges efficiently.
            </p>

            <button className="mt-6 bg-white text-green-600 font-semibold px-6 py-3 rounded-lg w-fit hover:scale-105 transition">
              Explore Platform
            </button>
          </motion.div>
        </div>

        {/* MISSION & VISION */}
        <div className="grid md:grid-cols-2 gap-10 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-xl rounded-2xl p-8 border-t-4 border-green-500"
          >
            <h2 className="text-2xl font-semibold text-green-600 mb-3">Our Mission</h2>
            <p className="text-gray-600">
              To empower students and professionals by providing a trusted platform
              where they can solve problems, earn money, and grow their skills.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-xl rounded-2xl p-8 border-t-4 border-green-500"
          >
            <h2 className="text-2xl font-semibold text-green-600 mb-3">Our Vision</h2>
            <p className="text-gray-600">
              To become the leading AI-powered problem-solving marketplace
              connecting global talent with real-world challenges.
            </p>
          </motion.div>
        </div>

        {/* WHY CHOOSE US */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-green-600 mb-10">
            Why Choose Us?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Smart Matching",
                desc: "AI helps match the right solver to the right project quickly.",
              },
              {
                title: "Secure Payments",
                desc: "Built-in system ensures safe transactions.",
              },
              {
                title: "Skill Growth",
                desc: "Solve real-world problems & build your portfolio.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-2xl shadow-lg text-center"
              >
                <h3 className="text-xl font-semibold text-green-600 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* TEAM */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-green-600 mb-6">Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            We are passionate developers and innovators committed to building
            the future of smart collaboration platforms.
          </p>

          <div className="flex justify-center gap-6 flex-wrap">
            {["Developer", "Designer", "AI Specialist"].map((role, i) => (
              <div
                key={i}
                className="bg-white shadow-md px-6 py-4 rounded-xl border border-green-100"
              >
                <p className="font-medium text-green-600">{role}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default page;
