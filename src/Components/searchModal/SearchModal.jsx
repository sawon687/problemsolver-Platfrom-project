'use client'
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { IoSearch } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const SearchModal = ({ isOpen, setIsOpen }) => {
  const { register, watch , setValue } = useForm({
    defaultValues: { search: '' }
  });
  const searchValue = watch('search');
  const router = useRouter();
  const timerRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);

  // Typing debounce → fetch suggestions + search + close modal
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    // 500ms debounce: last typing finished
    timerRef.current = setTimeout(async () => {
      if (!searchValue) {
        setSuggestions([]);
        return;
      }

      try {
        const params = new URLSearchParams();
        params.set('search', searchValue);

        // Suggestions fetch (optional, can skip if you want)
        const res = await fetch(`/api/user-project?${params.toString()}`);
        const data = await res.json();
        setSuggestions(data.result || []);

        // Input typing finished → search & close modal
        router.push(`/Project?${params.toString()}`);
        setIsOpen(false);
        setValue('search','');
      } catch (err) {
        console.error(err);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timerRef.current);
  }, [searchValue]);

  // Click suggestion → search
  const handleClickSuggestion = (title) => {
    const params = new URLSearchParams();
    params.set('search', title);
    router.push(`/Project?${params.toString()}`);
    setIsOpen(false);
    setValue('search','');
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
              onClick={() => {setIsOpen(false); setValue('search','')}}
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

          {/* Suggestions */}
          <div className="flex-1 overflow-auto">
            {suggestions.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg max-h-[400px] overflow-auto">
                {suggestions.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => handleClickSuggestion(item.ProjectTitle)}
                    className="px-4 py-3 hover:bg-emerald-100 cursor-pointer text-gray-700 border-b border-green-500 last:border-b-0"
                  >
                    {item.ProjectTitle}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
};

export default SearchModal;