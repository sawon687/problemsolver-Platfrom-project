'use client'
import Banner from "@/Components/Banner/Banner";
import FAQs from "@/Components/Homepage/FAQs";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { IoLayersOutline, IoHardwareChipOutline, IoGlobeOutline, IoCodeSlashOutline, IoCheckmarkCircle } from "react-icons/io5";
import Testimonials from '../Components/Homepage/Testimonials';

export default function Home() {
  const [stats, setStats] = useState({ projects: 0, users: 0, collaborations: 0 });
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const testimonials = [
    { name: "Alice", role: "Full Stack Developer", text: "This platform helped me showcase my portfolio to the right audience!" },
    { name: "Bob", role: "UI/UX Designer", text: "The collaboration tools are top-notch and very intuitive." },
    { name: "Charlie", role: "Software Engineer", text: "Finally a marketplace that understands the tech ecosystem." }
  ];

  const pricingPlans = [
    { title: "Free", price: "$0", features: ["3 Active Projects", "Community Support", "Basic Dashboard"], highlighted: false },
    { title: "Pro", price: "$29/mo", features: ["Unlimited Projects", "Priority Support", "Advanced Analytics", "Custom Profile"], highlighted: true },
    { title: "Enterprise", price: "$99/mo", features: ["Team Management", "Dedicated Support", "API Access", "White-labeling"], highlighted: false },
  ];

  // Counter Animation Logic
  useEffect(() => {
    const target = { projects: 10000, users: 5000, collaborations: 2000 };
    const duration = 2000;
    const intervalTime = 20;
    const steps = duration / intervalTime;
    const increment = {
      projects: target.projects / steps,
      users: target.users / steps,
      collaborations: target.collaborations / steps,
    };
    let current = { projects: 0, users: 0, collaborations: 0 };
    const interval = setInterval(() => {
      current.projects = Math.min(current.projects + increment.projects, target.projects);
      current.users = Math.min(current.users + increment.users, target.users);
      current.collaborations = Math.min(current.collaborations + increment.collaborations, target.collaborations);
      setStats({ ...current });
      if (current.projects >= target.projects && current.users >= target.users && current.collaborations >= target.collaborations) {
        clearInterval(interval);
      }
    }, intervalTime);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const circles = [
    { top: '5%', left: '85%', size: 'w-80 h-80', color: 'bg-indigo-300', opacity: 'opacity-20', animate: 'animate-pulse' },
    { bottom: '10%', left: '-5%', size: 'w-96 h-96', color: 'bg-violet-400', opacity: 'opacity-10', animate: 'animate-bounce-slow' },
    { top: '40%', right: '0%', size: 'w-64 h-64', color: 'bg-blue-300', opacity: 'opacity-15', animate: 'animate-pulse' },
  ];

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
      
      {/* Floating Light Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {circles.map((c, i) => (
          <div key={i} className={`absolute ${c.size} rounded-full ${c.color} ${c.opacity} ${c.animate} blur-[120px]`}
            style={{ top: c.top, bottom: c.bottom, left: c.left, right: c.right }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <Banner />
      </div>

      {/* Categories Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-4">Explore Ecosystem</h2>
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

      {/* Stats Section */}
      <section className="py-32 relative z-10 bg-slate-900 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {[
              { value: stats.projects, label: "Success Projects", icon: "📁", color: "from-indigo-400 to-indigo-600" },
              { value: stats.users, label: "Expert Solvers", icon: "👨‍💻", color: "from-violet-400 to-violet-600" },
              { value: stats.collaborations, label: "Global Partners", icon: "🤝", color: "from-blue-400 to-blue-600" },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: i * 0.2 }} viewport={{ once: true }}>
                <div className="text-6xl mb-6 opacity-80">{item.icon}</div>
                <h3 className="text-5xl font-black text-white mb-2 tracking-tighter">
                  {Math.floor(item.value).toLocaleString()}+
                </h3>
                <p className="text-indigo-200 font-medium text-lg opacity-60 uppercase tracking-widest text-sm">{item.label}</p>
                <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-500 to-transparent mx-auto mt-6 rounded-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FAQs />

      {/* Pricing Section */}
      <section className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-slate-900 mb-4">Investment Plans</h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto rounded-full" />
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className={`relative p-10 rounded-[35px] flex flex-col justify-between transition-all duration-500 border ${
                  plan.highlighted 
                  ? "bg-slate-900 border-indigo-500 shadow-2xl shadow-indigo-900/20" 
                  : "bg-slate-50 border-slate-200"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-6 py-1 rounded-full text-xs font-black uppercase">Most Popular</div>
                )}
                <div>
                  <h3 className={`text-xl font-bold mb-2 ${plan.highlighted ? "text-indigo-400" : "text-slate-800"}`}>{plan.title}</h3>
                  <p className={`text-4xl font-black mb-8 ${plan.highlighted ? "text-white" : "text-slate-900"}`}>{plan.price}</p>
                  <ul className="space-y-4 mb-10">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-medium opacity-80">
                        <IoCheckmarkCircle className={plan.highlighted ? "text-indigo-400" : "text-indigo-600"} size={18} />
                        <span className={plan.highlighted ? "text-slate-300" : "text-slate-600"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button className={`w-full py-4 rounded-2xl font-black transition-all ${
                  plan.highlighted 
                  ? "bg-indigo-600 text-white hover:bg-indigo-700" 
                  : "bg-white border-2 border-slate-200 text-slate-900 hover:border-indigo-600 hover:text-indigo-600"
                }`}>
                  Choose {plan.title}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials></Testimonials>

      {/* Newsletter - Indigo/Slate High Contrast */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto bg-indigo-600 rounded-[50px] overflow-hidden shadow-[0_30px_60px_-15px_rgba(79,70,229,0.3)] relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[80px] -mr-40 -mt-40" />
          
          <div className="relative z-10 py-20 px-10 md:px-20 text-center md:text-left flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">Stay Ahead <br />of the Curve 🚀</h2>
              <p className="text-indigo-100 font-medium opacity-80">Join 10,000+ developers receiving our weekly tech insights.</p>
            </div>
            <div className="flex-1 w-full flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Work email address"
                className="flex-1 p-5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-indigo-200 outline-none focus:bg-white/20 transition-all font-bold"
              />
              <button className="bg-white text-indigo-700 px-10 py-5 rounded-2xl font-black shadow-xl hover:scale-105 transition-transform active:scale-95">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}