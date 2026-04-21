'use client'
import React, { useTransition } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from 'next/navigation';

const Pagination = ({ pageNumber }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, setTransition] = useTransition();
  
  const currentPage = Number(searchParams.get('page')) || 1;

  const gopage = (page) => {
  
 

    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    
    setTransition(() => {
      router.push(`/Project?${params.toString()}`, { scroll: false });
    });
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 py-10">
      
 
      {currentPage > 1 && (
        <motion.button
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.95 }}
          disabled={isPending}
          onClick={() => gopage(currentPage - 1)}
          className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 font-bold text-xs uppercase tracking-widest rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft size={16} strokeWidth={3} />
          <span className="hidden sm:inline">Prev</span>
        </motion.button>
      )}

      <div className="flex items-center gap-2">
        {[...Array(pageNumber)].map((_, i) => {
          const page = i + 1;
          return (
            <motion.button
              key={i}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => gopage(page)}
              className={`relative h-10 w-10 flex items-center justify-center rounded-xl font-bold text-sm transition-all duration-300 shadow-sm
                ${
                  currentPage === page
                    ? "bg-indigo-600 text-white shadow-indigo-200 dark:shadow-none"
                    : "bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
            >
              {page}
              {currentPage === page && (
                <motion.div
                  layoutId="activeGlow"
                  className="absolute inset-0 bg-indigo-500 rounded-xl blur-lg opacity-20 -z-10"
                />
              )}
            </motion.button>
          );
        })}
      </div>

   
      {currentPage < pageNumber && (
        <motion.button
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.95 }}
          disabled={isPending}
          onClick={() => gopage(currentPage + 1)}
          className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 font-bold text-xs uppercase tracking-widest rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={16} strokeWidth={3} />
        </motion.button>
      )}
    </div>
  );
};

export default Pagination;