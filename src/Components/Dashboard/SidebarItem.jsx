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
    <Link href={to} className="relative block group outline-none">
      <motion.div
        whileHover={{ x: isCollapsed ? 0 : 4 }}
        whileTap={{ scale: 0.97 }}
        className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all relative z-10 ${
          isActive 
            ? "text-white" 
            : "text-slate-400 hover:text-white"
        } ${isCollapsed ? "justify-center px-0 mx-auto w-12" : "mx-2"}`}
      >
    
        <div className={`relative flex items-center justify-center ${isActive ? "drop-shadow-[0_0_8px_rgba(79,70,229,0.6)]" : ""}`}>
          <Icon size={isCollapsed ? 24 : 20} strokeWidth={isActive ? 2.5 : 2} />
        </div>
        
        {!isCollapsed && (
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`text-[13px] font-bold tracking-wide whitespace-nowrap transition-colors duration-300 ${
               isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"
            }`}
          >
            {label}
          </motion.span>
        )}

      
        {isActive && (
          <motion.div
            layoutId="activePill"
            className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-indigo-600/5 border border-indigo-500/30 rounded-2xl -z-10"
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          >
            {/* Left border indicator */}
            {!isCollapsed && (
              <motion.div 
                layoutId="activeIndicator"
                className="absolute left-0 top-3 bottom-3 w-1 bg-indigo-500 rounded-r-full shadow-[0_0_15px_rgba(99,102,241,0.8)]"
              />
            )}
          </motion.div>
        )}
      </motion.div>

      {/* --- Tooltip for Collapsed view (Floating Design) --- */}
      {isCollapsed && (
        <div className="absolute left-[calc(100%+15px)] top-1/2 -translate-y-1/2 px-3 py-2 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.15em] rounded-xl opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 pointer-events-none transition-all duration-200 z-[100] shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/10">
          {label}
          {/* Tooltip Arrow */}
          <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-indigo-600 rotate-45"></div>
        </div>
      )}
    </Link>
  );
};

export default SidebarItem;