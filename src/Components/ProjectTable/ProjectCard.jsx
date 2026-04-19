'use client'
import React, { useState } from 'react';
import { IoEyeOutline, IoCalendarOutline } from 'react-icons/io5';
import { HiOutlineBadgeCheck } from "react-icons/hi";
import RequstesModal from './RequstesModal';

const statusConfig = {
  "unAssigned": "bg-blue-50 text-blue-600 border-blue-100",
  "assigned": "bg-amber-50 text-amber-600 border-amber-100",
  "Completed": "bg-emerald-50 text-emerald-600 border-emerald-100",
  "reject": "bg-rose-50 text-rose-600 border-rose-100"
};

const ProjectCard = ({ project, index }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <tr className="hover:bg-slate-50/80 transition-all duration-200 group">
      {/* Index */}
      <td className="px-6 py-5">
        <span className="text-slate-400 font-mono text-xs">{String(index + 1).padStart(2, '0')}</span>
      </td>

      {/* Project Info */}
      <td className="px-6 py-5">
        <div className="flex flex-col">
          <span className="font-bold text-slate-800 text-base group-hover:text-indigo-600 transition-colors">
            {project.ProjectTitle}
          </span>
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-tighter">
            {project.ProjectCategory}
          </span>
        </div>
      </td>

      {/* Budget */}
      <td className="px-6 py-5">
        <div className="flex flex-col">
          <span className="text-sm font-extrabold text-slate-700">${project.ProjectBudget}</span>
          <span className="text-[10px] text-slate-400 font-medium">Total Funding</span>
        </div>
      </td>

      {/* Deadline */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-2 text-slate-600">
          <IoCalendarOutline className="text-slate-400" />
          <span className="text-xs font-semibold">{project.ProjectDeadline}</span>
        </div>
      </td>

      {/* Status Badge */}
      <td className="px-6 py-5 text-center">
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-widest shadow-sm ${statusConfig[project.status] || 'bg-slate-100'}`}>
          {project.status}
        </span>
      </td>

      {/* Task Status */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-1.5 text-indigo-600-600 bg-emerald-50 w-fit px-2 py-1 rounded-lg border border-emerald-100">
          <HiOutlineBadgeCheck size={14} />
          <span className="text-[10px] font-bold uppercase tracking-tight">
            {project.tasks?.[0]?.status || 'Pending'}
          </span>
        </div>
      </td>

      {/* Action */}
      <td className="px-6 py-5 text-right">
        <button 
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 w-34 px-2 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-indigo-600 hover:shadow-lg hover:shadow-emerald-200 transition-all duration-300"
        >
          <IoEyeOutline size={16} />
          View Requests
        </button>
        <RequstesModal 
          reqData={project?.requests} 
          isOpen={isOpen} 
          setOpen={setOpen} 
        />
      </td>
    </tr>
  );
};

export default ProjectCard;