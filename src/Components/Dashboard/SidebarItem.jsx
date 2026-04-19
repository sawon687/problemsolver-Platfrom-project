"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";

const SidebarItem = ({ to, icon, label, isCollapsed }) => {
  const pathname = usePathname();
  const isActive = pathname === to;
  const Icon = LucideIcons[icon];

  return (
    <Link href={to} className="relative block group">
      <div
        className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all relative z-10 ${
          isActive ? "text-indigo-600" : "text-slate-500 hover:text-slate-900"
        } ${isCollapsed ? "justify-center" : ""}`}
      >
        <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
        
        {!isCollapsed && (
          <motion.span 
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-sm font-bold tracking-tight whitespace-nowrap"
          >
            {label}
          </motion.span>
        )}

        {/* Active Tab Motion Background */}
        {isActive && (
          <motion.div
            layoutId="activePill"
            className="absolute inset-0 bg-indigo-50 border border-indigo-100 rounded-2xl -z-10 shadow-sm shadow-indigo-100/50"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </div>

      {/* Tooltip for Collapsed view */}
      {isCollapsed && (
        <div className="fixed left-24 px-3 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-[100] shadow-xl">
          {label}
        </div>
      )}
    </Link>
  );
};

export default SidebarItem;