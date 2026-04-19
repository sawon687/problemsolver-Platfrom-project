"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { createPortal } from "react-dom";

const SidebarItem = ({ to, icon, label }) => {
  const pathname = usePathname();
  const isActive = pathname === to;
  const [hover, setHover] = useState(false);

  return (
    <li
      className="relative list-none"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link
        href={to}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
          isActive
            ? "bg-indigo-50 text-indigo-600 shadow-sm"
            : "text-slate-500 hover:bg-slate-50 hover:text-indigo-600"
        }`}
      >
        <span className={`${isActive ? "text-indigo-600" : "text-slate-400"}`}>
          {icon}
        </span>
        <span className="lg:block hidden">{label}</span>
      </Link>

      {/* Tooltip for Mobile/Collapsed view */}
      {hover && (
        <div className="lg:hidden">
          {createPortal(
            <span className="fixed left-20 top-auto px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold shadow-xl z-[9999] whitespace-nowrap">
              {label}
            </span>,
            document.body
          )}
        </div>
      )}
    </li>
  );
};

export default SidebarItem;