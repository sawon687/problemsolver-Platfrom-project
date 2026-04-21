import React from 'react';
import { IoRocket } from 'react-icons/io5'; 
import Link from 'next/link';

const Logo = ({colorName}) => {
  return (
   <Link href="/" className="flex items-center gap-4 group relative z-10">
      
   
      <div className="relative">
 
        <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full group-hover:bg-indigo-500/40 shadow-md shadow-indigo-400 transition-all duration-500"></div>
        
        <div className="relative w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white shadow-2xl group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 border border-white/10">
          <IoRocket size={24} className="text-indigo-500 group-hover:text-white transition-colors" />
        </div>
      </div>
      

      <div className="flex flex-col">
        <div className="flex items-baseline gap-1">
          <span className={`font-black text-3xl tracking-tighter ${colorName} leading-none`}>
            Aura<span className="text-indigo-600">.</span>
          </span>
         
          <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-pulse"></div>
        </div>
        
        <div className="flex items-center gap-2 mt-1">
           <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 leading-none">
             Next-Gen Engineering Hub
           </span>
        </div>
      </div>
      </Link>

  );
};

export default Logo;