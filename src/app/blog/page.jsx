import React from 'react';
import { blogs } from '../../lib/blogdata'; 
import { ArrowUpRight, Clock, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Blogcategories from '../../Components/Blogcategories/Blogcategories';

export default async function BlogPage() {
  const featuredBlog = blogs[0];

  return (
    <div className="min-h-screen text-slate-900 -mt-20 pb-20">
      
      {/* --- Featured Hero (Server Side) --- */}
      <section className="relative w-full h-[70vh] md:h-[85vh]  overflow-hidden bg-slate-900">
        <Image 
          src={featuredBlog.image}
          alt="Featured"
          fill
          priority
          className="object-cover opacity-60 scale-105"
        />
        <div className="absolute  inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-white" />

        <div className="relative h-full max-w-7xl  mx-auto px-6 flex flex-col justify-end pb-5 ">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex  items-center gap-2 px-4 py-2 bg-indigo-600/90 backdrop-blur-md rounded-full text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">
              <Zap size={14} className="fill-white" /> Editor's Choice
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.95] tracking-tighter">
              {featuredBlog.title}
            </h1>
            
            <div className="flex flex-wrap items-center py-10 gap-6 pt-4">
              <Link href={`/blog/${featuredBlog.id}`}>
                <button className="group px-10 py-5 bg-slate-900 text-white rounded-full font-black text-sm flex items-center gap-3 hover:bg-indigo-600 transition-all shadow-2xl">
                  Explore Story <ArrowUpRight size={22} className="group-hover:rotate-45 transition-transform" />
                </button>
              </Link>
              <div className="flex items-center gap-3 text-slate-400 font-bold text-xs uppercase tracking-widest bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <Clock size={16} /> {featuredBlog.readTime}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Client Component for Filtering --- */}
      <Blogcategories allBlogs={blogs} />
      
    </div>
  );
}