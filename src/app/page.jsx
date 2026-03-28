'use client'
import Banner from "@/Components/Banner/Banner";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [stats, setStats] = useState({ projects: 0, users: 0, collaborations: 0 });

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

    const interval = setInterval(() => { if ( current.projects >= target.projects && current.users >= target.users && current.collaborations >= target.collaborations ) {
        clearInterval(interval);
        setStats(target);
        return;
      }

      current.projects = Math.min(current.projects + increment.projects, target.projects);
      current.users = Math.min(current.users + increment.users, target.users);
      current.collaborations = Math.min(current.collaborations + increment.collaborations, target.collaborations);
      setStats({ ...current });
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 overflow-hidden">

      <Banner />

    

      {/* CATEGORIES */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Browse Categories</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {["Web Apps", "Mobile Apps", "AI Tools", "Open Source"].map((cat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-green-50 rounded-2xl shadow-sm text-center cursor-pointer"
            >
              <h3 className="font-semibold">{cat}</h3>
            </motion.div>
          ))}
        </div>
      </section>
<div className="grid md:grid-cols-3 gap-8">
  {[1, 2, 3].map((item) => (
    <motion.div
      key={item}
      whileHover={{ y: -10 }}
      className="p-6 bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition border"
    >
      <div className="h-40 bg-gradient-to-r from-gray-100 to-gray-200 rounded mb-4"></div>
      <h3 className="font-semibold text-lg">Project Title</h3>
      <p className="text-gray-500 text-sm mt-2">
        Short description of project.
      </p>
    </motion.div>
  ))}
</div>

  <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto px-6">
  {[
    { value: stats.projects, label: "Projects" },
    { value: stats.users, label: "Developers" },
    { value: stats.collaborations, label: "Collaborations" },
  ].map((item, i) => (
    <motion.div
      key={i}
      whileHover={{ scale: 1.05 }}
      className="p-10 rounded-2xl bg-white shadow-lg border"
    >
      <h3 className="text-4xl font-bold text-green-600">
        {Math.floor(item.value).toLocaleString()}+
      </h3>
      <p className="text-gray-500 mt-2">{item.label}</p>
    </motion.div>
  ))}
</div>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-green-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {["Create Profile", "Upload Project", "Connect & Collaborate"].map((step, i) => (
              <div key={i} className="p-6 bg-white rounded-2xl shadow-sm">
                <h3 className="font-semibold">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-12">What Developers Say</h2>
        <div className="max-w-3xl mx-auto bg-green-50 p-8 rounded-2xl">
          <p className="text-gray-600">"This platform helped me showcase my portfolio and find collaborators!"</p>
        </div>
      </section>



      {/* NEWSLETTER */}
    <section className="py-32 w-full bg-gradient-to-r from-green-500 to-emerald-600 relative overflow-hidden">
       <div className="absolute w-72 h-72 bg-white/10 rounded-full blur-3xl top-0 left-0 animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-white/10 rounded-full blur-3xl bottom-0 right-0 animate-pulse"></div>
         <div className="max-w-4xl mx-auto text-center px-6 relative z-10"> <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="bg-white/10 backdrop-blur-xl border border-white/20 p-12 rounded-3xl shadow-2xl space-y-6"> <h2 className="text-4xl font-bold text-white">Stay in the Loop 🚀</h2>
          <p className="text-white/80">Get the latest projects, updates & community news directly in your inbox.</p>
           <div className="flex flex-col md:flex-row gap-4 mt-6"> <input type="email" placeholder="Enter your email address" className="flex-1 p-4 rounded-xl bg-white/90 text-black outline-none focus:ring-2 focus:ring-white" /> <button className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition shadow-lg"> Subscribe Now </button>
            </div> </motion.div> </div> </section>
    </div>
  );
}
