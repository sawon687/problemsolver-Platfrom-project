// ProjectCard.jsx
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';
import React from "react";
import { IoTimeOutline, IoWalletOutline, IoArrowForwardOutline, IoFlashOutline } from "react-icons/io5";
import UserRequestModal from '../AllModal/UserRequestModal';

const ProjectCard = ({ project }) => {
  return (
      
    <div className="group bg-white border border-slate-200/60 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)] rounded-[32px] p-6 flex flex-col justify-between hover:shadow-[0_30px_60px_-15px_rgba(79,70,229,0.15)] hover:border-indigo-100 transition-all duration-500 relative overflow-hidden h-full">
      
      {/* Top Decorative Glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700" />

      <div>
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-xl border border-indigo-100/50">
            <IoFlashOutline className="text-sm" />
            <span className="text-[10px] font-black uppercase tracking-[0.15em]">
              {project.Category || "Development"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-bold uppercase">Active</span>
          </div>
        </div>

        {/* Project Title */}
        <h2 className="text-xl font-black text-slate-900 mb-3 tracking-tight group-hover:text-indigo-600 transition-colors duration-300 line-clamp-1">
          {project.ProjectTitle}
        </h2>

        {/* Description */}
        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-6 font-medium">
          {project.ProjectDescription}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="flex flex-col gap-1 p-3 rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-white group-hover:border-indigo-100 transition-all">
            <div className="flex items-center gap-1.5 text-slate-400">
              <IoWalletOutline size={14} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Budget</span>
            </div>
            <span className="text-sm font-black text-slate-800">${project.ProjectBudget}</span>
          </div>
          
          <div className="flex flex-col gap-1 p-3 rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-white group-hover:border-indigo-100 transition-all">
            <div className="flex items-center gap-1.5 text-slate-400">
              <IoTimeOutline size={14} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Deadline</span>
            </div>
            <span className="text-sm font-black text-slate-800">{project.ProjectDeadline}</span>
          </div>
        </div>
      </div>

      {/* --- Action Buttons (Flex Row) --- */}
      <div className="flex items-center gap-3">
       <UserRequestModal id={project._id}></UserRequestModal>
        
        <Link 
          href={`/Project/${project?._id}`} 
          className="flex-1 bg-white border border-slate-200 text-slate-500 font-bold py-4 rounded-2xl hover:border-indigo-600 hover:text-indigo-600 transition-all duration-300 text-[11px] uppercase tracking-widest flex items-center justify-center group/btn shadow-sm"
        >
           View Details
          <IoArrowForwardOutline size={18} className="group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
      
    </div>
   
  );
};

export default ProjectCard;