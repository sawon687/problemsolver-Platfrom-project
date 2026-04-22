'use client';

import React from "react";
import ProjectCard from "../ProjectCard/ProjectCard";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { IoFilterOutline, IoGridOutline } from "react-icons/io5";

const categories = [
  { label: "All Projects", value: "All" },
  { label: "Web Dev", value: "web-development" },
  { label: "App Dev", value: "app-development" },
  { label: "UI/UX Design", value: "ui/ux design" },
  { label: "Backend", value: "backend-development" },
  { label: "Frontend", value: "frontend-development" },
  { label: "Full Stack", value: "fullstack-development" }
];

const ProjectCardContainer = ({ project }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const active = searchParams.get("category") || "All";

  const handleCategory = (category) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category && category !== "All") {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="min-h-screen mt-5 bg-slate-50/50">
      
      {/* CATEGORY BAR */}
      <div className="sticky top-20 z-40 w-full bg-white/70 backdrop-blur-xl border-b border-slate-200/60 py-4 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 flex items-center justify-between">

          <div className="flex items-center gap-2 text-slate-500 font-bold text-sm uppercase hidden md:flex">
            <IoFilterOutline size={18} />
            Filter By:
          </div>

          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar px-5 py-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => handleCategory(cat.value)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-2xl font-bold text-sm border transition-all ${
                  active === cat.value
                    ? "bg-indigo-600 border-indigo-600 text-white"
                    : "bg-white border-slate-200 text-slate-600"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2 text-slate-400">
            <span className="text-xs font-bold uppercase tracking-widest">
              {project?.length || 0} Results
            </span>
            <IoGridOutline size={18} />
          </div>

        </div>
      </div>

      {/* GRID */}
      <div className="max-w-[1600px] mx-auto py-12 px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          <AnimatePresence mode="sync">
            {project?.length > 0 ? (
              project.map((p) => (
                <motion.div
                  key={p._id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectCard project={p} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-40">
                No Projects Found
              </div>
            )}
          </AnimatePresence>

        </div>
      </div>

    </div>
  );
};

export default ProjectCardContainer;