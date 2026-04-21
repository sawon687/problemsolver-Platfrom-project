"use client";
import React, { useState, useMemo } from "react";
import { 
  Moon, Sun, Users, CheckCircle, ClipboardList, 
  Activity, TrendingUp, XCircle, LayoutGrid, Zap 
} from "lucide-react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, 
  Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import DashboardSkeletonAdmin from '../LoadinSKelation/DashboardSkeletonAdmin';


// --- Animated Count Component ---
const Count = ({ end, duration = 2 }) => {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    let start = 0;
    const final = Number(end) || 0;
    if (final === 0) return setCount(0);
    const increment = final / (duration * 60);
    const counter = setInterval(() => {
      start += increment;
      if (start >= final) {
        setCount(final);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(counter);
  }, [end, duration]);
  return <>{count.toLocaleString()}</>;
};

const AdminDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { data: session } = useSession();

  const { data: apiData = {}, isLoading } = useQuery({
    queryKey: ['dashboard-data', session?.role],
    queryFn: async () => {
      const res = await fetch(`/api/Admin/Admindata`);
      const result = await res.json();
      console.log('result data',result)
      return result.result;
    },
    enabled: !!session?.role,
    refetchOnWindowFocus: false,
  });

  
          //   Weeck Permormance
  const weeklyData = useMemo(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const counts = days.map(day => ({ d: day, v: 0 }));
    
  
    if (apiData?.projects) {
      apiData.projects.forEach(proj => {
        const dayIndex = new Date(proj.createdAt).getDay();
        counts[dayIndex].v += 1;
      });
    }
    return counts;
  }, [apiData]);

  // --- Monthly Growth Logic ---
  const growthData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = months.map(m => ({ n: m, v: 0 }));

    if (apiData?.projects) {
      apiData.projects.forEach(proj => {
        const monthIndex = new Date(proj.createdAt).getMonth();
        data[monthIndex].v += 1;
      });
    }

    const currentMonth = new Date().getMonth();
    return data.slice(0, currentMonth + 1);
  }, [apiData]);


  const efficiency = useMemo(() => {
    const total = apiData?.totalProjects || 0;
    const completed = apiData?.completeProject || 0;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  }, [apiData]);

  const stats = useMemo(() => [
    { id: 1, title: "Total Projects", value: apiData?.totalProjects || 0, icon: <LayoutGrid size={22}/>, color: "from-indigo-600 to-blue-500" },
    { id: 2, title: "Pending Reviews", value: apiData?.pendingCompleteReq?.length || 0, icon: <ClipboardList size={22}/>, color: "from-amber-500 to-orange-400" },
    { id: 3, title: "Completed", value: apiData?.completeProject || 0, icon: <CheckCircle size={22}/>, color: "from-emerald-600 to-teal-500" },
    { id: 4, title: "Assigned", value: apiData?.assignedProject || 0, icon: <Users size={22}/>, color: "from-slate-800 to-slate-600" },
    { id: 5, title: "Total Users", value: apiData?.totalUser || 0, icon: <Activity size={22}/>, color: "from-violet-600 to-purple-500" },
    { id: 6, title: "Rejected", value: apiData?.totalRejectProject || 0, icon: <XCircle size={22}/>, color: "from-rose-600 to-pink-500" },
  ], [apiData]);

  const distributionData = useMemo(() => [
    { name: 'Completed', value: apiData?.completeProject || 0, color: '#10b981' },
    { name: 'Assigned', value: apiData?.assignedProject || 0, color: '#6366f1' },
    { name: 'Rejected', value: apiData?.totalRejectProject || 0, color: '#f43f5e' },
  ], [apiData]);

  if (isLoading) return <DashboardSkeletonAdmin></DashboardSkeletonAdmin>
  return (
    <div className={` min-h-screen pb-20 transition-colors duration-500 font-sans`}>
      
      {/* --- Header --- */}
      <header className="backdrop-blur-md bg-white/70  border-b border-slate-200/50  px-8 py-4">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-500/30">
              <Zap size={22} fill="white" />
            </div>
            <h1 className="text-lg font-black tracking-tighter uppercase">Nexus <span className="text-indigo-600 italic">Core</span></h1>
          </div>
          <div className="flex items-center gap-6">
          
            <div className="flex items-center gap-3 bg-white p-1 pr-4 rounded-full border border-slate-200 ">
               <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white uppercase border-2 border-white">{session?.user?.name?.[0] || 'A'}</div>
               <span className="text-[11px] font-black uppercase tracking-tight">{session?.user?.name || "Sawon Ahmed"}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-8 mt-10 space-y-8">
        
        {/* --- Stats Cards --- */}
        <section className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
          {stats.map((stat) => (
            <motion.div key={stat.id} whileHover={{ y: -5 }} className="bg-white  p-6 rounded-[2rem] border border-slate-100  shadow-sm flex flex-col gap-4">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{stat.title}</p>
                <h3 className="text-2xl font-black tracking-tighter"><Count end={stat.value} /></h3>
              </div>
            </motion.div>
          ))}
        </section>

        {/* --- Area Chart (Growth Velocity) --- */}
        <section className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          <div className="xl:col-span-8 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
            <h3 className="text-xs font-black tracking-[0.2em] text-slate-400 mb-10 uppercase flex items-center gap-2">
              <TrendingUp size={16} className="text-indigo-600" /> Monthly Growth Velocity
            </h3>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthData}>
                  <defs>
                    <linearGradient id="pGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "#1e293b" : "#f1f5f9"} />
                  <XAxis dataKey="n" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: '800', fill: '#94a3b8'}} dy={10} />
                  <Tooltip contentStyle={{ borderRadius: '15px', border: 'none', fontWeight: '900' }} />
                  <Area type="monotone" dataKey="v" stroke="#6366f1" strokeWidth={4} fill="url(#pGrad)" dot={{ r: 5, fill: "#6366f1", strokeWidth: 2, stroke: "#fff" }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="xl:col-span-4 bg-indigo-600 p-10 rounded-[3rem] text-white flex flex-col items-center justify-center relative overflow-hidden group">
            <h3 className="text-sm font-black tracking-widest uppercase mb-10 opacity-80 italic">Efficiency Score</h3>
            <div className="relative w-52 h-52 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="104" cy="104" r="85" stroke="rgba(255,255,255,0.15)" strokeWidth="14" fill="transparent" />
                <motion.circle 
                  cx="104" cy="104" r="85" stroke="white" strokeWidth="14" fill="transparent" 
                  strokeDasharray="534" initial={{ strokeDashoffset: 534 }} 
                  animate={{ strokeDashoffset: 534 - (534 * efficiency) / 100 }} 
                  transition={{ duration: 2 }}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-6xl font-black italic tracking-tighter">{efficiency}%</span>
                <p className="text-[9px] font-bold uppercase tracking-widest opacity-70">Accuracy</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Bar Chart & Status Distribution --- */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xs font-black tracking-widest text-slate-400 uppercase">Weekly Performance</h3>
            </div>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <XAxis dataKey="d" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: '800', fill: '#94a3b8'}} />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="v" fill="#6366f1" radius={[12, 12, 12, 12]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center">
            <div className="h-[250px] w-[250px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={distributionData} innerRadius={70} outerRadius={95} paddingAngle={8} dataKey="value" stroke="none">
                    {distributionData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-black">{apiData?.totalProjects || 0}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Total</span>
              </div>
            </div>
            <div className="flex-1 space-y-3 w-full ml-0 md:ml-10">
              {distributionData.map((item, i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100/50">
                  <span className="text-[11px] font-black uppercase text-slate-500">{item.name}</span>
                  <span className="text-sm font-black">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;