'use client';
import React, { useEffect, useRef, useState } from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { IoFilterOutline, IoGridOutline } from 'react-icons/io5';
import ProjectSkeleton from '../LoadinSKelation/ProjectSkeleton';



const categories = [
    { label: 'All Projects', value: 'All' },
    { label: 'Web Dev', value: 'web-development' },
    { label: 'App Dev', value: 'app-development' },
    { label: 'UI/UX Design', value: 'ui/ux design' },
    { label: 'Backend', value: 'backend-development' },
    { label: 'Frontend', value: 'frontend-development' },
    { label: 'Full Stack', value: 'fullstack-development' }
];

const ProjectCardContainer = ({ project }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [active, setActive] = useState('All');
    const [isLoading, setIsLoading] = useState(true);
    const timeRef = useRef(null);

    useEffect(() => {
       
        if (project) {
            const timer = setTimeout(() => setIsLoading(false), 100);
            const currentCategory = searchParams.get('category') || 'All';
            setActive(currentCategory);
            return () => clearTimeout(timer);
        }
    }, [searchParams, project]);

    const handleCategory = (category) => {
        setActive(category);
        setIsLoading(true); 

        if (timeRef.current) clearTimeout(timeRef.current);

        timeRef.current = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (category && category !== 'All') {
                params.set('category', category);
            } else {
                params.delete('category');
            }
            router.push(`?${params.toString()}`, { scroll: false });
        }, 300);
    };

    return (
        <div className="min-h-screen bg-slate-50/50">
            {/* --- STICKY CATEGORY NAV --- */}
            <div className="sticky top-20 z-40 w-full bg-white/70 backdrop-blur-xl border-b border-slate-200/60 py-4 shadow-sm">
                <div className="max-w-[1440px] mx-auto px-6 lg:px-10 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-500 font-bold text-sm uppercase tracking-wider hidden md:flex">
                        <IoFilterOutline size={18} />
                        Filter By:
                    </div>

                    <div className="flex items-center gap-3 overflow-x-auto no-scrollbar px-5 py-2">
                        {categories.map((cat) => (
                            <button
                                key={cat.value}
                                onClick={() => handleCategory(cat.value)}
                                className={`whitespace-nowrap px-5 py-2.5 rounded-2xl font-bold text-sm transition-all duration-300 border ${
                                    active === cat.value
                                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/20 scale-105'
                                        : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600'
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 text-slate-400 hidden lg:flex">
                        <span className="text-xs font-bold uppercase tracking-widest">
                            {isLoading ? '...' : project?.length || 0} Results
                        </span>
                        <IoGridOutline size={18} />
                    </div>
                </div>
            </div>

            {/* --- PROJECT GRID --- */}
            <div className="max-w-[1600px] mx-auto py-12 px-6 lg:px-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="sync">
                        {isLoading ? (
                            // Loading Skeleton State
                            [...Array(9)].map((_, i) => (
                                <motion.div
                                    key={`skeleton-${i}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <ProjectSkeleton />
                                </motion.div>
                            ))
                        ) : project?.length > 0 ? (
                            // Real Data State
                            project.map((p) => (
                                <motion.div
                                    key={p._id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ProjectCard project={p} />
                                </motion.div>
                            ))
                        ) : (
                            // Empty State
                            <motion.div
                                className="col-span-full flex flex-col items-center justify-center py-40"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4 text-4xl">
                                    🔎
                                </div>
                                <h3 className="text-xl font-black text-slate-800">No Projects Found</h3>
                                <p className="text-slate-500">Try adjusting your filters or search criteria.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default ProjectCardContainer;