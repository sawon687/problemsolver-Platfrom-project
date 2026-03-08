"use client";

import React, { useState, useEffect } from "react";
import { Moon, Sun, Bell, Users, Plus, Upload, Folder, CheckCircle, DollarSign, ClipboardList } from "lucide-react";
import { motion } from "framer-motion";

import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  LineChart,
} from "recharts";
import BuyerApplyForm from "@/Components/BuyerApplyFrom/BuyerApplyFrom";
import BuyerApply from "@/Components/DashboardHome/BuyerApply";

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

  // Stats with icons
  const stats = [
    { id: 1, title: "Total Projects", value: 50, icon: <Folder className="text-white w-6 h-6" /> },
    { id: 2, title: "Submitted Projects", value: 35, icon: <CheckCircle className="text-white w-6 h-6" /> },
    { id: 3, title: "Pending Requests", value: 8, icon: <ClipboardList className="text-white w-6 h-6" /> },
    { id: 4, title: "Completed Requests", value: 25, icon: <CheckCircle className="text-white w-6 h-6" /> },
    { id: 5, title: "Buyers", value: 12, icon: <Users className="text-white w-6 h-6" /> },
    { id: 6, title: "Revenue", value: 1400, icon: <DollarSign className="text-white w-6 h-6" /> },
  ];

  const projectAnalytics = [
    { day: "Sun", value: 4 },
    { day: "Mon", value: 8 },
    { day: "Tue", value: 6 },
    { day: "Wed", value: 10 },
    { day: "Thu", value: 5 },
    { day: "Fri", value: 7 },
    { day: "Sat", value: 9 },
  ];

  const revenueData = [
    { month: "Jan", revenue: 400 },
    { month: "Feb", revenue: 800 },
    { month: "Mar", revenue: 600 },
    { month: "Apr", revenue: 1200 },
    { month: "May", revenue: 900 },
    { month: "Jun", revenue: 1400 },
  ];

  const requestStatusData = [
    { name: "Pending", value: 8 },
    { name: "Completed", value: 25 },
  ];

  const COLORS = ["#facc15", "#22c55e"];

  const [requests, setRequests] = useState([
    { id: 1, name: "John Doe", project: "Project A", status: "pending" },
    { id: 2, name: "Alice Smith", project: "Project B", status: "pending" },
    { id: 3, name: "Bob Johnson", project: "Project C", status: "pending" },
  ]);

  const [buyers, setBuyers] = useState([{ id: 1, name: "Existing Buyer" }]);

  const approveRequest = (requestId) => {
    const request = requests.find((r) => r.id === requestId);
    if (!request) return;
    setBuyers((prev) => [...prev, { id: buyers.length + 1, name: request.name }]);
    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: "completed" } : r))
    );
  };

  const cardStayle = {

    'Total Projects': 'bg-gradient-to-r from-green-400 to-green-600',
    'Submitted Projects': 'bg-gradient-to-r from-blue-400 to-blue-600',
    'Pending Requests': 'bg-gradient-to-r from-yellow-400 to-yellow-600',
    'Completed Requests': 'bg-gradient-to-r from-green-600 to-emerald-700',
    'Buyers': 'bg-gradient-to-r from-teal-500 to-teal-700',
    'Revenue': 'bg-gradient-to-r from-blue-500 to-blue-300'

  }
  return (
    <div className={`${darkMode ? "bg-gray-950 text-gray-200" : " text-gray-900"} min-h-screen transition-colors`}>
      {/* ================= HEADER ================= */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6 rounded-b-3xl shadow-lg flex flex-col lg:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Hello Sawon 👋</h1>
          <p className="text-blue-100 mt-1">Welcome back! Here's your marketplace overview.</p>
        </div>
        <div className="flex items-center gap-4">
          <Bell className="cursor-pointer" />
          <button
            onClick={toggleDarkMode}
            className="bg-blue-500 p-2 rounded-full hover:bg-blue-400 transition"
          >
            {darkMode ? <Sun /> : <Moon />}
          </button>
        </div>
      </div>

      {/* ================= ACTION BUTTONS ================= */}
      <div className="flex gap-3 p-6">
        <button className="bg-green-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow hover:shadow-xl transition transform hover:-translate-y-1">
          <Plus size={18} /> Add Project
        </button>
        <button className="border px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-800 transition">
          <Upload size={18} /> Import Data
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* ================= STATS CARDS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              className={`${cardStayle[stat.title]} p-5 rounded-xl shadow-lg text-white flex flex-col justify-between transform hover:-translate-y-2 hover:shadow-2xl transition`}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex justify-between items-center mb-2">
                <h1 className="text-sm  opacity-80">{stat.title}</h1>
                {stat.icon}
              </div>
              <h2 className="text-3xl font-bold">
                <Count end={stat.value} duration={2} />
              </h2>
            </motion.div>
          ))}
        </div>

        {/* ================= CHARTS ================= */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Weekly Projects */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-lg">
            <h3 className="font-semibold mb-4 text-gray-700 dark:text-gray-200">Weekly Projects</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={projectAnalytics}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4ade80" />
                    <stop offset="100%" stopColor="#16a34a" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" opacity={0.2} />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="url(#barGradient)" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue Overview */}
          <div className="bg-white w-full dark:bg-gray-900 p-6 rounded-3xl shadow-lg">
            <h3 className="font-semibold mb-4 text-gray-700 dark:text-gray-200">Revenue Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" opacity={0.1} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#ffffff"
                  strokeWidth={3}
                  fill="url(#revenueGradient)"
                  dot={{ r: 4, fill: "#10b981" }}
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>



        </div>

        <div className="flex  gap-6 h-auto  w-full ">
          {/* user byuer  application  */}
           <BuyerApply></BuyerApply>
          {/* Request Status */}
          <div className="bg-white w-[450px] h-[350px] dark:bg-gray-900 p-6 rounded-3xl shadow-lg flex flex-col items-center justify-center">
            <h3 className="font-semibold mb-4 text-gray-700 dark:text-gray-200">Request Status</h3>
            <PieChart width={280} height={280}>
              <Pie data={requestStatusData} dataKey="value" innerRadius={60} outerRadius={120}>
                {requestStatusData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardHome;