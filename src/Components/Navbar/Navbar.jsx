"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMenu, IoClose, IoSearchOutline, IoRocket, IoNotificationsOutline, IoChevronDown } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";
import SearchModal from "../searchModal/SearchModal";
import NotificationDropdown from '../AllModal/NotificationDropdown';

const Navbar = () => {
  const { data, status } = useSession();
  const pathname = usePathname();

  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const profileRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (pathname.startsWith("/Dashboard") || pathname.startsWith('/Register') || pathname.startsWith('/Login')) return null;

  const navItems = [
    { name: "Home", to: "/" },
    { name: "Project", to: "/Project" },
    { name: "About", to: "/About" },
    { name: "Contact", to: "/Contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "py-2 md:py-4" : "py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Main Container with Glassmorphism */}
          <div className={`flex items-center justify-between px-4 md:px-8 py-3 rounded-[32px] transition-all duration-700 border relative ${
            scrolled 
            ? "bg-white/70 backdrop-blur-2xl border-white/40 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)]" 
            : "bg-transparent border-transparent"
          }`}>
            
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-3 group relative z-10">
              <div className="w-11 h-11 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <IoRocket size={22} />
              </div>
              <div className="flex flex-col -space-y-1">
                <span className="font-black text-2xl tracking-tighter text-slate-900 leading-none">
                  Raco<span className="text-indigo-600">AI</span>
                </span>
                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-400">Innovation</span>
              </div>
            </Link>

            {/* Desktop Navigation - Pill Design */}
            <nav className="hidden lg:block absolute left-1/2 -translate-x-1/2">
              <ul className="flex items-center p-1 bg-slate-100/40 backdrop-blur-md rounded-[22px] border border-slate-200/30">
                {navItems.map((item) => (
                  <li key={item.to} className="relative">
                    <Link
                      href={item.to}
                      className={`px-6 py-2.5 rounded-[18px] text-[11px] font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-1.5 ${
                        pathname === item.to 
                        ? "bg-white text-indigo-600 shadow-sm" 
                        : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      {item.name}
                      {pathname === item.to && <motion.div layoutId="dot" className="w-1 h-1 bg-indigo-600 rounded-full" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3 relative z-10" ref={profileRef}>
              
              {/* Premium Search */}
              <button 
                onClick={() => setSearchOpen(true)}
                className="hidden md:flex w-10 h-10 items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-300 border border-transparent hover:border-indigo-100"
              >
                <IoSearchOutline size={20} />
              </button>

              {status === "authenticated" && (
                <div className="flex items-center gap-2">
                  {/* Notification Bell with Badge */}
                  <div className="relative">
                    <button 
                      onClick={() => setNotifOpen(!notifOpen)}
                      className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all relative ${notifOpen ? "bg-indigo-600 text-white shadow-lg" : "text-slate-500 hover:bg-slate-100"}`}
                    >
                      <IoNotificationsOutline size={20} />
                      <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white ring-2 ring-rose-500/20"></span>
                    </button>
                    
                    <AnimatePresence>
                      {notifOpen && (
                       
                         <NotificationDropdown></NotificationDropdown>
                       
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Profile Section */}
                  <div 
                    className="flex items-center gap-2 pl-2 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-[20px] hover:border-indigo-300 hover:bg-white transition-all cursor-pointer group shadow-sm"
                    onClick={() => setProfileOpen(!profileOpen)}
                  >
                    <img
                      src={data?.userPhoto || "/avatar.png"}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-md"
                      alt="User"
                    />
                    <IoChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${profileOpen ? 'rotate-180' : ''}`} />
                  </div>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                        className="absolute right-0 mt-[180px] min-w-[260px]"
                      >
                        <ProfileDropdown toggle={profileOpen} setToggle={setProfileOpen} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {status === "unauthenticated" && (
                <div className='flex items-center gap-3'>
                  <Link
                    href="/Login"
                    className="hidden sm:block text-[11px] font-black uppercase tracking-widest text-slate-600 hover:text-indigo-600 px-4 transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/Register"
                    className="bg-slate-900 text-white px-7 py-3 rounded-[18px] text-[11px] font-black uppercase tracking-widest hover:bg-indigo-600 shadow-xl shadow-slate-200 transition-all active:scale-95 flex items-center gap-2"
                  >
                    Start Free
                  </Link>
                </div>
              )}

              {/* Mobile Toggle */}
              <button
                className="lg:hidden w-11 h-11 flex items-center justify-center text-slate-600 bg-slate-100 rounded-[18px] ml-1"
                onClick={() => setMobileOpen(true)}
              >
                <IoMenu size={26} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[60]"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            />
            <motion.div
              className="fixed right-0 top-0 h-full w-full max-w-[320px] bg-white z-[70] p-8 shadow-2xl flex flex-col"
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="flex justify-between items-center mb-16">
                 <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                      <IoRocket size={16} />
                    </div>
                    <span className="font-black text-xl tracking-tighter text-slate-900">RacoAI</span>
                 </div>
                <button onClick={() => setMobileOpen(false)} className="w-10 h-10 flex items-center justify-center bg-rose-50 text-rose-500 rounded-xl">
                  <IoClose size={24} />
                </button>
              </div>

              <nav className="flex flex-col gap-8 flex-grow">
                {navItems.map((item, idx) => (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={item.to}
                  >
                    <Link
                      href={item.to}
                      onClick={() => setMobileOpen(false)}
                      className={`text-3xl font-black tracking-tighter ${
                        pathname === item.to ? "text-indigo-600" : "text-slate-300 hover:text-slate-900"
                      } transition-colors`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="pt-10 border-t border-slate-100">
                 <Link 
                   href="/Register" 
                   onClick={() => setMobileOpen(false)}
                   className="w-full block text-center py-5 bg-indigo-600 text-white rounded-[24px] font-black uppercase tracking-widest text-xs shadow-2xl shadow-indigo-100"
                 >
                    Create Account
                 </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <SearchModal isOpen={searchOpen} setIsOpen={setSearchOpen} />
    </>
  );
};

export default React.memo(Navbar);