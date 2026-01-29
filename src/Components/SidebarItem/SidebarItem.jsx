'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
const SidebarItem = ({ to, icon, label }) => {
    const pahtname=usePathname()

    const isActive=pahtname.startsWith(to)
  return (
    <li className="relative group">
      <Link
        href={to}
        className={
          `flex items-cente  gap-3 px-3 py-2 bg-base-100 rounded-md font-medium transition-all duration-300 shadow-lg ${
            isActive
              ? " scale-105 text-white bg-primary"
              : "hover:scale-105 hover:text-white hover:bg-primary"
          }`
        }
      >
        {icon}
        <span className="is-drawer-close:hidden">{label}</span>
      </Link>

      {/* Tooltip */}
      <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1 rounded-2xl bg-gray-900 text-white text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out whitespace-nowrap shadow-xl z-50">
        {label}
      </span>
    </li>
  );
};

export default SidebarItem;
