'use client'
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, Folder, ClipboardList, DollarSign, CheckCircle, Edit } from "lucide-react";
import Link from "next/link";
import BuyerApplyFrom from "@/Components/BuyerApplyFrom/BuyerApplyFrom";

// Import your BuyerApplyForm component


const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "Sawon Islam",
    email: "sawon@example.com",
    role: "user", // user / buyer / solver
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    stats: {
      totalProjects: 50,
      submittedProjects: 35,
      pendingRequests: 8,
      completedRequests: 25,
      revenue: 1400,
    },
    recentActivity: [
      "✅ Project A completed",
      "🟡 New request received",
      "👤 Updated profile",
      "💰 Revenue increased by 12%",
    ],
  });

  return (
    <div className="min-h-screen text-gray-900 dark:text-gray-200 px-4 md:px-10 py-6">
      
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-4 border-green-500"
          />
          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
            <span className={`mt-1 inline-block px-3 py-1 rounded-full text-sm font-semibold ${
              user.role === "buyer"
                ? "bg-green-200 text-green-800"
                : user.role === "solver"
                ? "bg-blue-200 text-blue-800"
                : "bg-gray-200 text-gray-800"
            }`}>
              {user.role.toUpperCase()}
            </span>
          </div>
        </div>
        <Link href={'/Dashboard/Profile/EditProfile'}>
          <button className="mt-4 md:mt-0 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition">
            <Edit size={18}/> Edit Profile
          </button>
        </Link>
      </div>

      {/* ================= STATS CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-8">
        <motion.div whileHover={{ scale: 1.05 }} className="bg-gradient-to-r from-green-400 to-green-600 p-5 rounded-xl shadow-lg text-white flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-sm opacity-80">Total Projects</p>
            <Folder className="w-6 h-6"/>
          </div>
          <h2 className="text-3xl font-bold mt-2">{user.stats.totalProjects}</h2>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="bg-gradient-to-r from-blue-400 to-blue-600 p-5 rounded-xl shadow-lg text-white flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-sm opacity-80">Submitted Projects</p>
            <CheckCircle className="w-6 h-6"/>
          </div>
          <h2 className="text-3xl font-bold mt-2">{user.stats.submittedProjects}</h2>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-5 rounded-xl shadow-lg text-white flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-sm opacity-80">Pending Requests</p>
            <ClipboardList className="w-6 h-6"/>
          </div>
          <h2 className="text-3xl font-bold mt-2">{user.stats.pendingRequests}</h2>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="bg-gradient-to-r from-green-600 to-emerald-700 p-5 rounded-xl shadow-lg text-white flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-sm opacity-80">Completed Requests</p>
            <CheckCircle className="w-6 h-6"/>
          </div>
          <h2 className="text-3xl font-bold mt-2">{user.stats.completedRequests}</h2>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="bg-gradient-to-r from-teal-500 to-teal-700 p-5 rounded-xl shadow-lg text-white flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-sm opacity-80">Revenue</p>
            <DollarSign className="w-6 h-6"/>
          </div>
          <h2 className="text-3xl font-bold mt-2">${user.stats.revenue}</h2>
        </motion.div>
      </div>

      {/* ================= BUYER APPLICATION FORM ================= */}
      {user.role === "user" && (
        <div className="bg-white dark:bg-gray-900 p-16 rounded-3xl shadow-lg mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
            Apply to Become a Buyer
          </h3>
          <BuyerApplyFrom />
        </div>
      )}

      {user.role === "buyer" && (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-lg mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
            Buyer Status
          </h3>
          <p>You are already a verified Buyer ✅</p>
        </div>
      )}

      {/* ================= RECENT ACTIVITY ================= */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Recent Activity</h3>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
          {user.recentActivity.map((item, idx) => (
            <li key={idx}>• {item}</li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default ProfilePage;