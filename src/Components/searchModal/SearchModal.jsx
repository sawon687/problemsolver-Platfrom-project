'use client'
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { Search, X, Command, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { IoSearch } from 'react-icons/io5';

const SearchModal = ({ isOpen, setIsOpen }) => {
  const { register, watch, setValue } = useForm({
    defaultValues: { search: '' }
  });
  const searchValue = watch('search');
  const router = useRouter();
  const timerRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Suggestions Fetching Logic (Debounced)
 useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    // CRITICAL FIX: Modal bondho thakle ba search khali thakle fetch hobe na
    if (!isOpen || !searchValue?.trim()) {
      setSuggestions([]);
      return;
    }
console.log('search',searchValue)

    setIsSearching(true);
    timerRef.current = setTimeout(async () => {
      try {
        const params = new URLSearchParams();
       
        const res = await fetch(`/api/user-project?${params.toString()}`);
        const data = await res.json();
        setSuggestions(data.result || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsSearching(false);
      }
    }, 400); // 400ms delay to feel snappy

    return () => clearTimeout(timerRef.current);
  }, [searchValue]);

  // Escape key to close
  useEffect(() => {
    const handleEsc = (e) => {
      
      if (e.key === "Escape") closeSearch();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const closeSearch = () => {
    setIsOpen(false);
    setValue('search', '');
    setSuggestions([]);
  };

  const handleSearchTrigger = (title) => {
    const query = title || searchValue;
    if (!query) return;
    
    const params = new URLSearchParams();
    params.set('search', query);
    router.push(`/Project?${params.toString()}`);
    closeSearch();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[10vh] px-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSearch}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="w-full max-w-2xl bg-white rounded-3xl shadow-[0_20px_70px_-10px_rgba(0,0,0,0.1)] border border-slate-200 overflow-hidden relative z-10"
          >
            {/* Input Wrapper */}
            <div className="relative flex items-center p-4 border-b border-slate-100">
              <Search className={`w-6 h-6 ml-2 transition-colors ${isSearching ? 'text-indigo-500 animate-pulse' : 'text-slate-400'}`} />
              <input
                {...register('search')}
                autoFocus
                type="text"
                onKeyDown={(e) => e.key === 'Enter' && handleSearchTrigger()}
                placeholder="Search projects, tasks, or members..."
                className="w-full px-4 py-3 bg-transparent outline-none text-slate-700 text-lg font-medium placeholder:text-slate-400"
              />
              <div className="flex items-center gap-2">
                 <kbd className="hidden sm:flex h-6 select-none items-center gap-1 rounded border border-slate-200 bg-slate-50 px-1.5 font-mono text-[10px] font-medium text-slate-500">
                    <span className="text-xs">ESC</span>
                 </kbd>
                 <button onClick={closeSearch} className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
                    <X size={20} className="text-slate-400" />
                 </button>
              </div>
            </div>

            {/* Results Area */}
            <div className="max-h-[60vh] overflow-y-auto no-scrollbar bg-slate-50/50">
              {suggestions.length > 0 ? (
                <div className="p-3 space-y-1">
                  <p className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    Top Results
                  </p>
                  {suggestions.map((item) => (
                    <button
                      key={item._id}
                      onClick={() => handleSearchTrigger(item.ProjectTitle)}
                      className="w-full flex items-center justify-between px-4 py-3.5 bg-white border border-transparent hover:border-indigo-100 hover:bg-indigo-50/50 rounded-2xl group transition-all"
                    >
                      <div className="flex items-center gap-4 text-left">
                        <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:border-indigo-200 transition-all shadow-sm">
                           <Command size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">
                            {item.ProjectTitle}
                          </p>
                          <p className="text-[11px] text-slate-400 font-medium">Project</p>
                        </div>
                      </div>
                      <ArrowRight size={16} className="text-slate-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </button>
                  ))}
                </div>
              ) : searchValue && !isSearching ? (
                <div className="py-20 text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="text-slate-300" size={30} />
                  </div>
                  <p className="text-slate-500 font-bold">No results found for "{searchValue}"</p>
                  <p className="text-slate-400 text-xs mt-1">Try checking for typos or use different keywords.</p>
                </div>
              ) : (
                <div className="p-10 text-center">
                   <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full text-indigo-600 text-xs font-black uppercase tracking-widest mb-4">
                      <IoSearch /> Quick Search
                   </div>
                   <h3 className="text-slate-700 font-bold mb-1">Search anything on RacoAI</h3>
                   <p className="text-slate-400 text-sm">Type project titles, buyer names, or categories.</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-white border-t border-slate-100 flex justify-between items-center">
               <div className="flex gap-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                    <span className="p-1 bg-slate-100 rounded">Enter</span> to select
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                    <span className="p-1 bg-slate-100 rounded">Esc</span> to close
                  </div>
               </div>
               <p className="text-[10px] font-black text-indigo-600 uppercase tracking-tighter">RacoAI Search v2.0</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;