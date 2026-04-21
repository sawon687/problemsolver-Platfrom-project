'use client'

import { motion } from "framer-motion";
import { IoRocketOutline, IoShieldCheckmarkOutline, IoStatsChartOutline, IoLayersOutline } from "react-icons/io5";

const bannerImg = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1470&q=80";

const AboutPage = () => {
  return (
    <div className="min-h-screen -mt-20 text-slate-900 font-sans">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-30 pb-32 px-6 overflow-hidden">
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-50 rounded-full blur-[120px] -z-10 opacity-60" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-50 rounded-full blur-[120px] -z-10 opacity-60" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <IoRocketOutline size={16} />
              Empowering Solvers
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Redefining the <span className="text-indigo-600">Marketplace</span> for Problems.
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-lg mb-10 font-medium">
              RacoAI is the bridge between complex challenges and elite solvers. We facilitate academic, technical, and creative breakthroughs.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl shadow-slate-900/20 hover:bg-indigo-600 transition-all active:scale-95">
                Get Started Now
              </button>
              <button className="bg-white border-2 border-slate-100 text-slate-600 px-8 py-4 rounded-2xl font-bold hover:border-indigo-100 hover:text-indigo-600 transition-all">
                Our Story
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[40px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-8 border-white">
              <img src={bannerImg} alt="Team collaboration" className="w-full h-[500px] object-cover" />
            </div>
            {/* Floating Achievement Card */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -bottom-10 -left-10 z-20 bg-white p-6 rounded-[24px] shadow-2xl border border-slate-50 hidden md:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                  <IoStatsChartOutline size={24} />
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase">Active Solvers</p>
                  <p className="text-2xl font-black text-slate-900">12,400+</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- MISSION & VISION (CARDS) --- */}
      <section className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white p-12 rounded-[40px] shadow-sm border border-slate-100 group transition-all"
          >
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <IoLayersOutline size={30} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4">Our Mission</h2>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              To democratize problem-solving by providing a secure, transparent, and rewarding ecosystem where talent meets opportunity regardless of geography.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-slate-900 p-12 rounded-[40px] shadow-2xl shadow-slate-900/20 group transition-all"
          >
            <div className="w-14 h-14 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-500 group-hover:text-white transition-all">
              <IoShieldCheckmarkOutline size={30} />
            </div>
            <h2 className="text-3xl font-black text-white mb-4">Our Vision</h2>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              Building the world's most intelligent collaboration engine, where AI and human creativity merge to solve the next generation of global challenges.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- WHY CHOOSE US (FEATURES) --- */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">Why RacoAI?</h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Experience the Future of Work</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            { 
              title: "Smart Matching", 
              desc: "Our neural engine matches solvers to projects based on real competency, not just keywords.",
              color: "bg-blue-50 text-blue-600"
            },
            { 
              title: "Escrow Security", 
              desc: "Payments are locked in escrow and released only when you are 100% satisfied with the solution.",
              color: "bg-indigo-50 text-indigo-600"
            },
            { 
              title: "Global Network", 
              desc: "Access a worldwide pool of verified professionals and academic experts in minutes.",
              color: "bg-violet-50 text-violet-600"
            }
          ].map((item, i) => (
            <div key={i} className="group relative">
              <div className={`w-16 h-16 ${item.color} rounded-[20px] flex items-center justify-center mb-6 font-black text-2xl group-hover:scale-110 transition-transform`}>
                0{i+1}
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- TEAM SECTION --- */}
      <section className="py-24 border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-slate-900 mb-12">Driven by Innovation</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["System Architects", "Product Designers", "AI Researchers", "Security Engineers"].map((role, i) => (
              <span key={i} className="bg-white border border-slate-200 px-6 py-3 rounded-2xl text-slate-600 font-bold hover:border-indigo-600 hover:text-indigo-600 transition-all cursor-default shadow-sm">
                {role}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;