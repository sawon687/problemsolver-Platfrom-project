"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Moon, Sun, Bell, Users, Plus, Upload, Folder, CheckCircle, DollarSign, ClipboardList, Activity } from "lucide-react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

// ================= Animated Count Component =================
const Count = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = end / (duration * 60);
    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(counter);
  }, [end, duration]);
  return <>{count}</>;
};

// ================= Modern Dashboard =================
const DashboardHome = () => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const { data: session } = useSession();
  useEffect(() => {
  if (!session?.email) return;
  const role = localStorage.getItem("role");
  const isRoleSaved = localStorage.getItem("roleSaved");
  console.log("role:", role, "saved:", isRoleSaved);
  // ✅ already saved হলে আর call হবে না
  if (role && !isRoleSaved) {
    fetch("/api/save-role", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: session.email, role }),
    })
      .then(res => res.json())
      .then(data => {
        console.log("role saved:", data);

        localStorage.setItem("roleSaved", "true");
        localStorage.removeItem("role");
      })
      .catch(err => console.log(err));
  }
}, [session]);
console.log('sesstion',session)
  const { data = {} } = useQuery({
    queryKey: ['dashboard-data', session?.role],
    queryFn: async () => {
      let result;
      if (session?.role === 'Admin') {
        result = await (await fetch('/api/Admindata')).json();
      } else if (session?.role === 'Buyer') {
        result = await (await fetch('/api/BuyerData')).json();
      }
      return result.result;
    },
    enabled: !!session?.role
  });

  console.log('user dashboard data',data)

 const items = [
    {
      icon: <Plus size={18} />,
      title: `New Project Created (${data?.newProjectsCount||0})`,
      time: "Last 24h",
      bg: "bg-blue-100 dark:bg-blue-900",
    },
    {
      icon: <CheckCircle size={18} />,
      title: `Project Completed (${data?.newCompleted||0})`,
      time: "Last 24h",
      bg: "bg-green-100 dark:bg-green-900",
    },
    {
      icon: <Users size={18} />,
      title: `New User Joined (${data?.newUser||0})`,
      time: "Last 24h",
      bg: "bg-purple-100 dark:bg-purple-900",
    },
  ];
  // ================= Stats =================
  const adminstats = [
    { id: 1, title: "Total Users", value: data?.TotalUser || 0, icon: <Users />, gradient: "from-blue-500 to-indigo-600" },
    { id: 2, title: "Total Buyers", value: data?.TotalBuyer || 0, icon: <Users />, gradient: "from-cyan-500 to-blue-600" },
    { id: 3, title: "Total Projects", value: data?.TotalProjects || 0, icon: <Folder />, gradient: "from-emerald-500 to-green-700" },
    { id: 4, title: "Pending Requests", value: data?.pendingCompleteReq?.length || 0, icon: <ClipboardList />, gradient: "from-yellow-400 to-orange-500" },
    { id: 5, title: "Completed Projects", value: data?.completeProject|| 0, icon: <CheckCircle />, gradient: "from-green-600 to-emerald-800" },
    { id: 6, title: "Revenue", value: data?.revenue || 0, icon: <DollarSign />, gradient: "from-purple-500 to-indigo-600" }
  ];

  const Buyerstats = [
    { title: "Total Projects", value: data?.TotalProjects, icon: <Folder className="w-7 h-7 text-white" />, gradient: "from-blue-500 to-indigo-500" },
    { title: "Active Projects", value: data?.activeProject, icon: <Activity className="w-7 h-7 text-white" />, gradient: "from-yellow-400 to-orange-500" },
    { title: "Completed", value: data?.completeProject, icon: <CheckCircle className="w-7 h-7 text-white" />, gradient: "from-green-400 to-teal-500" },
    { title: "Total Proposals", value: data?.totalProposals, icon: <ClipboardList className="w-7 h-7 text-white" />, gradient: "from-purple-400 to-pink-500" },
    { title: "Hired", value: data?.HiredFree, icon: <Users className="w-7 h-7 text-white" />, gradient: "from-indigo-400 to-blue-600" },
    { title: "Total Spending", value: "$1200", icon: <DollarSign className="w-7 h-7 text-white" />, gradient: "from-emerald-400 to-green-600" }
  ];

  const projectAnalytics = useMemo(() => {
    if (!data?.Projects) return [];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const counts = [0, 0, 0, 0, 0, 0, 0];
    data.Projects.forEach(project => {
      const dayIndex = new Date(project.createdAt).getDay();
      counts[dayIndex] += 1;
    });
    return days.map((day, i) => ({ day, value: counts[i] }));
  }, [data]);

  // ================= AreaChart Data =================
  const analyticsData = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jully","Aug","Sep","oct",'Nov',"Dec"];
    return months.map((month, i) => {
      if (session?.role === 'Admin') {
        return {
          month,
          projects: data?.Projects?.slice(0, (i + 1) * 2).length || 0,
          users: Math.floor((data?.TotalUser || 0) / (i + 1)),
        };
      } else if (session?.role === 'Buyer') {
        return {
          month,
          projects: data?.activeProject || 0,
          users: data?.totalProposals || 0,
        };
      } else {
        return { month, projects: 0, users: 0 };
      }
    });
  }, [data, session?.role]);


  const roleSate = session?.role === 'Admin' ? adminstats : session?.role === 'Buyer' ? Buyerstats : [];
  const requestStatusData = [
    { name: "Pending", value: data?.pendingCompleteReq?.length || 0 },
    { name: "Completed", value: data?.completeProject || 0 },
  ];
  const COLORS = ["#facc15", "#22c55e"];

   const completedvalue=useMemo(()=>{
         const completedProg=   data?.TotalProjects ? Number(((data.completeProject || 0) / data.TotalProjects) * 100) : 0;

         return completedProg.toFixed(1)
   },[data])


 const assignedProject=useMemo(()=>{
         const assignedProject=   data?.TotalProjects ? Number(((data.assignedProject
 || 0) / data.TotalProjects) * 100) : 0;

         return assignedProject.toFixed(1)
   },[data])


   
   console.log('progress',completedvalue)
   
   console.log('assginedprogress',assignedProject)
  return (
    <div className={`${darkMode ? "bg-gray-950 text-gray-200" : " text-gray-900"} min-h-screen transition-colors space-y-10`}>

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6 rounded-b-3xl shadow-lg flex flex-col lg:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Hello Sawon 👋</h1>
          <p className="text-blue-100 mt-1">Welcome back! Here's your marketplace overview.</p>
        </div>
        <div className="flex items-center gap-4">
          <Bell className="cursor-pointer" />
          <button onClick={toggleDarkMode} className="bg-blue-500 p-2 rounded-full hover:bg-blue-400 transition">
            {darkMode ? <Sun /> : <Moon />}
          </button>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-3 p-6">
        <button className="bg-green-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow hover:shadow-xl transition transform hover:-translate-y-1">
          <Plus size={18} /> Add Project
        </button>
        <button className="border px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-800 transition">
          <Upload size={18} /> Import Data
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        {roleSate.map(stat => (
          <motion.div key={stat.id} whileHover={{ scale: 1.05 }} className={`bg-gradient-to-br ${stat.gradient} p-5 rounded-xl shadow-xl text-white`}>
            <div className="flex justify-between">
              <p className="text-sm opacity-80">{stat.title}</p>
              {stat.icon}
            </div>
            <h2 className="text-3xl font-bold mt-2">
              <Count end={stat.value} />
            </h2>
          </motion.div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Weekly Projects */}
<div className="bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] p-8 rounded-4xl shadow-2xl hover:shadow-3xl text-white border border-white/20 backdrop-blur-xl">
  <h3 className="font-semibold text-xl mb-6 text-white/90">Weekly Projects</h3>
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={projectAnalytics} barCategoryGap="25%">
      <defs>
        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity={1}/>
          <stop offset="50%" stopColor="#22c55e" stopOpacity={0.9}/>
          <stop offset="100%" stopColor="#4ade80" stopOpacity={0.5}/>
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.25} />
      <XAxis dataKey="day" axisLine={false} tickLine={false} stroke="#94a3b8" tick={{ fontSize: 14 }}/>
      <YAxis axisLine={false} tickLine={false} stroke="#94a3b8" tick={{ fontSize: 14 }}/>
      <Tooltip contentStyle={{ background: "#111827", borderRadius: "12px", color: "#fff", backdropFilter: "blur(12px)" }}/>
      <Bar dataKey="value" fill="url(#barGradient)" radius={[16,16,0,0]} barSize={30} animationDuration={1800} />
    </BarChart>
  </ResponsiveContainer>
</div>

        {/* Multi-purpose AreaChart */}
      <div className="bg-gradient-to-br from-[#2b1e59] to-[#1b1140] p-6 rounded-3xl shadow-lg text-white">
  <h3 className="font-semibold mb-4">Analytics Overview</h3>

  <ResponsiveContainer width="100%" height={300}>
    <AreaChart data={analyticsData}>
      <defs>
        <linearGradient id="projectsGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00f5a0" stopOpacity={0.7} />
          <stop offset="100%" stopColor="#00f5a0" stopOpacity={0} />
        </linearGradient>

        <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00d9ff" stopOpacity={0.7} />
          <stop offset="100%" stopColor="#00d9ff" stopOpacity={0} />
        </linearGradient>
      </defs>

      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
      
      <XAxis 
        dataKey="month" 
        stroke="#cbd5e1"
        axisLine={false}
        tickLine={false}
      />
      
      <YAxis 
        stroke="#cbd5e1"
        axisLine={false}
        tickLine={false}
      />

      <Tooltip 
        contentStyle={{
          backgroundColor: "#111827",
          border: "none",
          borderRadius: "10px",
          color: "#fff"
        }}
      />

      <Area
        type="monotone"
        dataKey="projects"
        stroke="#00f5a0"
        strokeWidth={3}
        fill="url(#projectsGradient)"
        dot={{ r: 4 }}
        activeDot={{ r: 6 }}
      />

      <Area
        type="monotone"
        dataKey="users"
        stroke="#00d9ff"
        strokeWidth={3}
        fill="url(#usersGradient)"
        dot={{ r: 4 }}
        activeDot={{ r: 6 }}
      />
    </AreaChart>
  </ResponsiveContainer>
</div>

      </div>

  
{/* ===== BOTTOM ANALYTICS SECTION (Thick & Modern) ===== */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

  {/* Request Status */}
  <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl 
  w-full h-auto p-6 rounded-3xl 
  shadow-2xl hover:shadow-3xl transition-all duration-500 
  border border-gray-200 dark:border-gray-800 flex flex-col">

    {/* Header */}
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold text-gray-700 dark:text-gray-200 text-lg">
        Request Status
      </h3>
      <span className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500">
        Live
      </span>
    </div>

    {/* Chart */}
    <div className="flex justify-center items-center relative flex-1">
      <PieChart width={340} height={280}>
        <defs>
          <linearGradient id="colorApproved" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="colorPending" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <linearGradient id="colorRejected" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f87171" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
        </defs>

        <Pie
          data={requestStatusData}
          dataKey="value"
          innerRadius={80}
          outerRadius={120}
          paddingAngle={4}
          cornerRadius={14}
          animationDuration={1200}
        >
          <Cell fill="url(#colorApproved)" />
          <Cell fill="url(#colorPending)" />
          <Cell fill="url(#colorRejected)" />
        </Pie>

        <Tooltip
          contentStyle={{
            borderRadius: "12px",
            border: "none",
            boxShadow: "0 15px 40px rgba(0,0,0,0.18)",
            backgroundColor: "#111827",
            color: "#fff",
          }}
        />
      </PieChart>

      {/* Center Text */}
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-bold text-gray-800 dark:text-white">
          {requestStatusData.reduce((a,b)=>a+b.value,0)}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-300">Total</span>
      </div>
    </div>

    {/* Legend */}
    <div className="flex justify-center gap-6 mt-4 text-sm">
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
        <span className="text-gray-600 dark:text-gray-300">Approved</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-blue-500"></span>
        <span className="text-gray-600 dark:text-gray-300">Pending</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-red-500"></span>
        <span className="text-gray-600 dark:text-gray-300">Rejected</span>
      </div>
    </div>
  </div>

  {/* Recent Activity */}
  <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 h-[380px] flex flex-col">
    <h3 className="font-semibold mb-4 text-lg">Recent Activity</h3>
    <div className="space-y-5 overflow-y-auto">
  
      {items.map((item, idx)=>(
        <div key={idx} className="flex gap-3 items-center">
          <div className={`w-10 h-10 ${item.bg} rounded-full flex items-center justify-center`}>
            {item.icon}
          </div>
          <div>
            <p className="text-sm font-medium">{item.title}</p>
            <span className="text-xs text-gray-500 dark:text-gray-400">{item.time}</span>
          </div>
        </div>
      ))}
    </div>
  </div>

{/* Performance */}
<div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 h-[380px] flex flex-col">
  <h3 className="font-semibold mb-4 text-lg">Performance</h3>
  <div className="space-y-6 mt-2">
    {[
      { 
        title: "Project Completion", 
        value: completedvalue, 
        color: "bg-green-500" 
      },
      { 
        title: "AssignedProject", 
        value: assignedProject,
        color: "bg-blue-500" 
      },
      { 
        title: "Revenue Target", 
        value: data?.revenueTarget ? Number(data.revenueTarget).toFixed(1) : 0, 
        color: "bg-purple-500" 
      },
    ].map((item, idx) => (
      <div key={idx}>
        <div className="flex justify-between text-sm mb-1">
          <span>{item.title}</span>
          <span>{item.value}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-800 h-3 rounded-full">
          <div 
            className={`${item.color} h-3 rounded-full`} 
            style={{ width: `${item.value}%` }}
          ></div>
        </div>
      </div>
    ))}
  </div>
</div>


</div>
    </div>
  );
};

export default DashboardHome;