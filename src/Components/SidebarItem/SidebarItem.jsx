'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { createPortal } from "react-dom";

const SidebarItem = ({ to, icon, label }) => {
  const pathname = usePathname();
  const isActive = pathname.endsWith(to) || pathname.startsWith(to);
  const [hover, setHover] = useState(false);

  return (
    <li
      className="relative group"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link
        href={to}
        className={`flex items-center is-drawer-close:justify-center gap-3 px-3 py-2 bg-base-100 rounded-md font-medium transition-all duration-300 shadow-lg ${
          isActive
            ? "scale-105 text-white bg-primary"
            : "hover:scale-105 hover:text-white hover:bg-primary"
        }`}
      >
        {icon}
        <span className="is-drawer-close:hidden">{label}</span>
      </Link>

      {/* Tooltip using Portal */}
      {hover &&
        createPortal(
          <span
            className="
              fixed
              left-full
              top-1/2
              -translate-y-1/2
              ml-2
              px-3 py-1
              rounded-md
              bg-gray-900 text-white text-xs
              whitespace-nowrap
              shadow-lg
              z-[9999]
            "
            style={{
              transform: "translateY(-50%)",
              left: window.innerWidth > 300 ? "calc(64px + 8px)" : "72px",
            }}
          >
            {label}
          </span>,
          document.body
        )}
    </li>
  );
};

export default SidebarItem;