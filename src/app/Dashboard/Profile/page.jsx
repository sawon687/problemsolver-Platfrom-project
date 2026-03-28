"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Folder,
  ClipboardList,
  DollarSign,
  CheckCircle,
  Edit,
  Bell,
  Plus,
  Upload,
} from "lucide-react";
import { useSession } from "next-auth/react";
import EditProfileModal from "@/Components/EditProfileModal/EditProfileModal";

const Page = () => {
  const { data: session } = useSession();
  const [openEdit, setOpenEdit] = useState(false);

  // 🔥 Dynamic Greeting
  const hour = new Date().getHours();
  const greeting =
    hour < 12
      ? "Good Morning ☀️"
      : hour < 18
      ? "Good Afternoon 🌤️"
      : "Good Evening 🌙";

  // 🔥 Stats Data
  const stats = [
    {
      title: "Total Projects",
      icon: <Folder className="w-6 h-6" />,
      value: 50,
      color: "from-green-400 to-green-600",
    },
    {
      title: "Submitted",
      icon: <CheckCircle className="w-6 h-6" />,
      value: 35,
      color: "from-blue-400 to-blue-600",
    },
    {
      title: "Pending",
      icon: <ClipboardList className="w-6 h-6" />,
      value: 10,
      color: "from-yellow-400 to-yellow-600",
    },
    {
      title: "Completed",
      icon: <CheckCircle className="w-6 h-6" />,
      value: 25,
      color: "from-emerald-500 to-emerald-700",
    },
    {
      title: "Revenue",
      icon: <DollarSign className="w-6 h-6" />,
      value: "$1200",
      color: "from-teal-500 to-teal-700",
    },
  ];

  return (
    <div className="min-h-screen px-4 md:px-10 py-6 bg-gray-50 dark:bg-gray-900">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div className="flex items-center gap-4">
          <img
            src={session?.userPhoto || "https://i.pravatar.cc/150?img=12"}
            alt="profile"
            className="w-24 h-24 rounded-full border-4 border-green-500 object-cover"
          />

          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              {session?.username || "User Name"}
            </h1>

            <p className="text-gray-500 dark:text-gray-300">
              {session?.email}
            </p>

            {/* Role Badge */}
            <p
              className={`mt-2 px-3 py-1 text-xs rounded-full w-fit font-medium
              ${session?.role === "Buyer" && "bg-green-100 text-green-600"}
              ${session?.role === "Admin" && "bg-purple-100 text-purple-600"}
              ${session?.role === "Seller" && "bg-blue-100 text-blue-600"}
            `}
            >
              {session?.role}
            </p>

            {/* Greeting */}
            <p className="mt-2 text-sm text-gray-500">
              {greeting}, {session?.username}
            </p>
          </div>
        </div>

        {/* Right Buttons */}
        <div className="flex gap-3">
          <button className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow">
            <Bell />
          </button>

          <button
            onClick={() => setOpenEdit(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 shadow-md transition"
          >
            <Edit size={18} /> Edit
          </button>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">

        {/* 🔥 Role Based Button */}
        {session?.role === "Admin" ? (
          <button className="bg-purple-500 text-white p-4 rounded-xl">
            Manage Projects
          </button>
        ) : (
          <button className="bg-green-500 text-white p-4 rounded-xl flex items-center justify-center gap-2">
            <Plus /> Add Project
          </button>
        )}

        <button className="bg-blue-500 text-white p-4 rounded-xl flex items-center justify-center gap-2">
          <Upload /> Upload
        </button>

        <button className="bg-yellow-500 text-white p-4 rounded-xl">
          Requests
        </button>

        <button className="bg-purple-500 text-white p-4 rounded-xl">
          Analytics
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className={`bg-gradient-to-r ${item.color} p-6 rounded-2xl shadow-xl text-white h-[140px] flex flex-col justify-between`}
          >
            <div className="flex justify-between">
              <p className="text-sm opacity-80">{item.title}</p>
              {item.icon}
            </div>

            <h2 className="text-3xl font-bold">{item.value}</h2>
          </motion.div>
        ))}
      </div>

      {/* PROGRESS */}
      <div className="mt-10 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Project Progress</h3>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Completed</span>
              <span>70%</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-green-500 h-2 rounded-full w-[70%]"></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Pending</span>
              <span>20%</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-yellow-500 h-2 rounded-full w-[20%]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="mt-10 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>

        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
          <p>✅ Project "E-commerce" submitted</p>
          <p>📝 New request received</p>
          <p>💰 Payment $200 received</p>
          <p>📁 New project created</p>
        </div>
      </div>

      {/* MODAL */}
      {openEdit && (
        <EditProfileModal
          openEdit={() => setOpenEdit(true)}
          close={() => setOpenEdit(false)}
        />
      )}
    </div>
  );
};

export default Page;