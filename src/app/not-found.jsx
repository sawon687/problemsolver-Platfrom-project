'use client'
import Link from 'next/link';
import { IoRocket, IoArrowBack, IoHomeOutline } from "react-icons/io5";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center -mt-20 justify-center px-6 overflow-hidden relative">
      
      {/* Background Decor - Indigo Glows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-2xl w-full text-center space-y-8 relative">
        
        {/* Animated Rocket & 404 */}
        <div className="relative inline-block">
          <h1 className="text-[150px] md:text-[200px]  font-black text-slate-900 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center animate-bounce duration-[3000ms]">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500/40 blur-2xl rounded-full"></div>
              <div className="relative bg-slate-950 p-6 rounded-3xl border border-white/10 shadow-2xl rotate-12 group hover:rotate-0 transition-transform duration-500">
                <IoRocket size={60} className="text-indigo-500 group-hover:text-indigo-400 transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Oops! Lost in Space<span className="text-indigo-500">.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-md mx-auto">
            The page you are looking for has drifted into deep space. Let's get you back to the hub.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <Link 
            href="/"
            className="flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95"
          >
            <IoHomeOutline size={20} />
            Back to Home
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 font-bold rounded-2xl transition-all duration-300 shadow-xl"
          >
            <IoArrowBack size={20} />
            Go Back
          </button>
        </div>

        {/* Decorative Particles (Optional) */}
        <div className="pt-12 flex justify-center gap-2">
            {[...Array(3)].map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full bg-indigo-500/30 animate-ping`} style={{ animationDelay: `${i * 0.5}s` }}></div>
            ))}
        </div>
      </div>

      {/* Branding Footer for 404 */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-600 leading-none">
          Aura Next-Gen Engineering Hub
        </p>
      </div>
    </div>
  );
}