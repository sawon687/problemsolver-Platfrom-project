'use client'
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { IoSearch } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const SearchModal = ({ isOpen, setIsOpen }) => {
  const { register, watch , setValue} = useForm({
  defaultValues: {
    search: '' // ekhane default set korbo
  }});
  const searchValue = watch('search');
  const router = useRouter();
  const timerRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);

  // Debounce + fetch suggestions
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(async () => {
      if (!searchValue) {
        setSuggestions([]); // empty input → no suggestions
        return;
      }
      try {
        const params = new URLSearchParams(window.location.search);
        params.set('search', searchValue);
        router.push(`/Project?${params.toString()}`);
   
        
        const res = await fetch(`/api/user-project?${params.toString()}`);
        const data = await res.json();
        
        setSuggestions(data.result || []);
             setIsOpen(false);
      } catch (err) {
        console.error(err);
      }
    }, 200); // faster debounce 200ms

    return () => clearTimeout(timerRef.current);
  }, [searchValue]);

  console.log('searchValu',searchValue)
  // handle click suggestion → navigate Project page

  const handleClickSuggestion = (title , searchValue) => {
    const params = new URLSearchParams(window.location.search);
    if (title) params.set('search', title|| searchValue);
    router.push(`/Project?${params.toString()}`);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[999] flex items-center justify-center "
    >
      <motion.div
        initial={{ scale: 0.95, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-2xl rounded-3xl bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 shadow-[0_0_80px_rgba(16,185,129,0.5)] p-1"
      >
        <div className="bg-white rounded-xl p-6 relative min-h-[500px] max-h-[80vh] flex flex-col">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-700">Search Projects</h2>
            <button
              onClick={() => {setIsOpen(false)
                setValue('search','')
              }}
              className="text-gray-400 hover:text-red-500 text-sm"
            >
              Close
            </button>
          </div>

          {/* Search Input */}
          <div className="relative mb-4">
            <IoSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-emerald-500 text-2xl" />
            <input
              type="text"
              placeholder="Type to search..."
              className="w-full outline-0 border border-gray-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 pl-14 pr-4 py-4 rounded-xl text-gray-700 shadow-sm text-lg transition"
              {...register('search')}
              autoFocus
              
            />
          </div>

          {/* Suggestions dropdown – always first */}
          <div className="flex-1 overflow-auto">
            {suggestions.length > 0 ? (
              <div className="bg-white rounded-xl shadow-lg max-h-[400px] overflow-auto">
                {suggestions.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => handleClickSuggestion(item.ProjectTitle , searchValue)}
                    className="px-4 py-3 hover:bg-emerald-100 cursor-pointer text-gray-700 border-b border-green-500 last:border-b-0"
                  >
                    {item.ProjectTitle}
                  </div>
                ))}
              </div>
            ) : (
              searchValue && (
                <p className="text-gray-400 mt-2 text-center">No matching projects found</p>
              )
            )}
          </div>

          {/* Hint Section – optional */}
          {!searchValue && (
            <div className="mt-4 flex flex-col gap-4 text-center text-gray-600">
              <p className="text-lg font-semibold text-emerald-700">Start typing to see suggestions</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Projects', 'Requests', 'Users', 'Tasks'].map((item) => (
                  <span
                    key={item}
                    className="bg-white  p-1 rounded-full border border-emerald-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className="text-sm text-emerald-400 mt-2">
                Tip: Try keywords like "React", "Frontend", "Design"
              </p>
            </div>
          )}

        </div>
      </motion.div>
    </motion.div>
  );
};

export default SearchModal;