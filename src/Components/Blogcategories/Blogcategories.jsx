'use client';
import React, { useState } from 'react';
import { Calendar, Search, ArrowUpRight, Sparkles, Filter, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const categories = ['All Stories', 'Technology', 'Design', 'Engineering', 'Tutorial', 'UI/UX', 'Security', 'Career'];

const Blogcategories = ({ allBlogs }) => {
  const [activeCategory, setActiveCategory] = useState('All Stories');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBlogs = allBlogs.slice(1).filter((blog) => {
    const matchesCategory = activeCategory === 'All Stories' || blog.category === activeCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 mt-16">
      
      {/* Category Buttons */}
      <div className="flex items-center justify-center gap-3 overflow-x-auto no-scrollbar pb-6 px-2 w-full">
        {categories.map((cat) => (
          <button 
            key={cat} 
            onClick={() => setActiveCategory(cat)}
            className={`px-8 py-3.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
              activeCategory === cat 
              ? 'bg-gray-900 text-white shadow-lg' 
              : 'bg-white border-slate-200 text-slate-500 hover:border-gray-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* --- New Search & Stats Bar --- */}
      <div className="flex flex-col lg:flex-row justify-between items-center py-10 gap-6 w-full border-t border-slate-100 mt-4">
        
        {/* Left Side: Stats with Badge */}
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Filter size={20} />
          </div>
          <div>
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Live Archives</h4>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-slate-900">{filteredBlogs.length}</span>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-md uppercase tracking-tighter">Results</span>
            </div>
          </div>
        </div>

        {/* Right Side: Enhanced Search Input */}
        <div className="relative w-full lg:w-[500px] group">
          {/* Outer Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-[2rem] blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
          
          <div className="relative flex items-center bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
            
            {/* Left Feature: Dropdown/Button inside Search */}
            <button className="hidden sm:flex items-center gap-2 px-5 py-5 border-r border-slate-100 hover:bg-slate-50 transition-colors text-slate-600">
              <span className="text-[10px] font-black uppercase tracking-widest">Recent</span>
              <ChevronDown size={14} />
            </button>

            {/* Icon */}
            <div className="pl-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
              <Search size={18} />
            </div>

            {/* Input */}
            <input 
              type="text" 
              placeholder="Search by title, topic or author..." 
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-5 text-sm font-bold bg-transparent outline-none placeholder:text-slate-300 placeholder:uppercase placeholder:text-[9px] placeholder:tracking-[0.2em]" 
            />

            {/* Right Feature: Sparkle Action */}
            <div className="pr-4">
              <button className="h-10 w-10 bg-slate-900 rounded-xl flex items-center justify-center text-white hover:bg-indigo-600 hover:scale-105 active:scale-95 transition-all duration-300">
                <Sparkles size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <Link 
              href={`/blog/${blog.id}`} 
              key={blog.id} 
              className="group flex flex-col bg-white rounded-[2.5rem] p-4 border border-transparent hover:border-indigo-500/30 hover:shadow-[0_30px_60px_-15px_rgba(79,70,229,0.15)] transition-all duration-500"
            >
              <div className="relative h-64 w-full mb-6 overflow-hidden rounded-[2rem] shadow-inner bg-slate-100">
                <Image
                  src={blog.image} 
                  alt={blog.title} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-slate-900/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black uppercase text-white tracking-[0.1em]">
                    {blog.category}
                  </span>
                </div>
              </div>

              <div className="px-4 pb-4 space-y-4">
                <div className="flex items-center gap-3 text-[10px] font-black text-indigo-500 uppercase tracking-widest">
                  <Calendar size={14} />
                  <span>{blog.date}</span>
                </div>
                <h3 className="text-xl font-black text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 font-medium">
                  {blog.excerpt}
                </p>

                <div className="pt-4 flex items-center justify-between border-t border-slate-50">
                   <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-black text-white">
                        {blog.author[0]}
                      </div>
                      <span className="text-[11px] font-black text-slate-900 uppercase tracking-tighter">{blog.author}</span>
                   </div>
                   <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <ArrowUpRight size={18} />
                   </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No articles found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogcategories;