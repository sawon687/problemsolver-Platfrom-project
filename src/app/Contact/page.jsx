'use client'

import { motion } from "framer-motion";
import { IoMailOutline, IoCallOutline, IoLocationOutline, IoSendSharp } from "react-icons/io5";

const bannerImg = "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1470&q=80";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-slate-50/30 text-slate-900 overflow-x-hidden">
      
      {/* --- HERO BANNER --- */}
      <div className="relative h-[450px] w-full overflow-hidden">
        <img
          src={bannerImg}
          alt="Contact RacoAI"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        {/* Modern Multi-layered Overlay */}
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-center text-center"
        >
          <span className="bg-indigo-500/20 text-indigo-300 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-4 border border-indigo-400/30 backdrop-blur-md">
            Get in Touch
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
            How can we <span className="text-indigo-400">help?</span>
          </h1>
          <p className="text-lg text-slate-200 max-w-2xl font-medium leading-relaxed">
            Have a technical challenge or a partnership proposal? Our team is ready to collaborate and find the perfect solution for you.
          </p>
        </motion.div>
      </div>

      {/* --- CONTACT CONTENT --- */}
      <div className="max-w-7xl mx-auto px-6 -mt-24 pb-24 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT: INFO CARDS (1 Column) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1 space-y-4"
          >
            {[
              { icon: <IoMailOutline size={24} />, title: "Email Us", detail: "support@racoai.com", sub: "Response within 24 hours" },
              { icon: <IoCallOutline size={24} />, title: "Call Support", detail: "+880 1234-567890", sub: "Mon-Fri, 9am - 6pm" },
              { icon: <IoLocationOutline size={24} />, title: "Office Location", detail: "Dhaka, Bangladesh", sub: "HQ Tech Hub" }
            ].map((info, i) => (
              <div key={i} className="group bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 hover:border-indigo-100 transition-all hover:shadow-xl hover:shadow-indigo-500/5">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  {info.icon}
                </div>
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">{info.title}</h3>
                <p className="text-xl font-bold text-slate-900 mb-1">{info.detail}</p>
                <p className="text-sm text-slate-500 font-medium">{info.sub}</p>
              </div>
            ))}
          </motion.div>

          {/* RIGHT: CONTACT FORM (2 Columns) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-white shadow-2xl shadow-slate-200/50 rounded-[40px] p-8 md:p-12 border border-slate-100"
          >
            <div className="mb-10">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Send us a Message</h2>
              <p className="text-slate-500 font-medium">Fill out the form below and we'll get back to you shortly.</p>
            </div>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full bg-slate-50 border-none rounded-2xl p-4 text-slate-900 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    className="w-full bg-slate-50 border-none rounded-2xl p-4 text-slate-900 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Subject</label>
                <input
                  type="text"
                  placeholder="How can we help you?"
                  className="w-full bg-slate-50 border-none rounded-2xl p-4 text-slate-900 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Message</label>
                <textarea
                  rows="5"
                  placeholder="Describe your project or query in detail..."
                  className="w-full bg-slate-50 border-none rounded-2xl p-4 text-slate-900 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none font-medium resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="group w-full bg-slate-900 text-white font-black py-5 rounded-[24px] hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-200 active:scale-[0.98] flex items-center justify-center gap-3 text-sm uppercase tracking-widest"
              >
                Send Message
                <IoSendSharp className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;