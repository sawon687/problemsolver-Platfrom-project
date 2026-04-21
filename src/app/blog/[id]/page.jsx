import React from 'react';
import { Calendar, User, Clock, ArrowLeft, Share2, Bookmark, Twitter, Facebook, Link as LinkIcon, Instagram, Zap, MoveRight, Heart } from 'lucide-react';
import Link from 'next/link';
import { blogs } from '../../../lib/blogdata';

const BlogDetails = async({params}) => {
  const { id } = await params
  const blog = blogs.find((item) => item.id === parseInt(id));

  if (!blog) return (
    <div className="h-screen flex items-center justify-center font-black text-2xl tracking-tighter italic">
      AuraScript: Content Not Found.
    </div>
  );
const iconsyle=' text-slate-400 hover:text-white transition-colors hover:bg-gray-900 px-2 py-2 rounded-full'
  return (
    <article className="min-h-screen  pb-20 selection:bg-indigo-600 selection:text-white selection:bg-indigo-300">
      
      {/* --- Fixed Side Interactions  --- */}
      <aside className="hidden xl:flex fixed left-12 top-1/2 -translate-y-1/2 flex-col items-center gap-8 z-50">
          <div className="flex flex-col gap-6 p-4 bg-white/80 backdrop-blur-md border border-slate-100 shadow-2xl shadow-slate-200/50 rounded-full">
            <button className={iconsyle}><Twitter size={20}/></button>
            <button className={iconsyle}><Instagram size={20}/></button>
            <button className={iconsyle}><Facebook size={20}/></button>
            <div className="h-px w-6 bg-slate-100 mx-auto"></div>
            <button className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Heart size={20}/></button>
          </div>
          <p className="vertical-text text-[9px] font-black uppercase tracking-[0.4em] text-slate-300">Spread the word</p>
      </aside>

      {/* --- Smooth Progress Bar --- */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-sle-50 z-[100]">
        <div className="h-full bg-indigo-600 w-1/2 shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all duration-500"></div>
      </div>

      {/* --- Top Navigation --- */}
      <nav className="max-w-7xl mx-auto px-8 py-10 flex itemsat-center justify-between relative z-10">
        <Link href="/blog" className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-slate-900">
          <div className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500 shadow-sm">
            <ArrowLeft size={16} /> 
          </div>
          AuraScript Feed
        </Link>
        <div className="flex gap-3">
           <button className="px-6 py-2.5 bg-white border border-slate-100 hover:bg-black hover:text-white rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-sm hidden md:block">Save Article</button>
           <button className="p-3 bg-white border border-slate-100 hover:bg-black hover:text-white rounded-full transition-all shadow-sm"><Share2 size={18}/></button>
        </div>
      </nav>

      {/* --- Header Section --- */}
      <header className="max-w-5xl mx-auto px-6 text-center space-y-10 pt-10">
        <div className="inline-flex items-center gap-3 px-6 py-2 bg-white border border-slate-100 rounded-full shadow-sm">
           <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>
           <span className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.3em]">{blog.category}</span>
        </div>
        
        <h1 className="text-5xl md:text-9xl font-black text-slate-900 leading-[0.85] tracking-tightest">
          {blog.title}
        </h1>

        <div className="flex flex-wrap justify-center items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          <span className="flex items-center gap-2 text-slate-900 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm"><User size={14}/> {blog.author}</span>
          <span>{blog.date}</span>
          <span className="flex items-center gap-2"><Clock size={14}/> {blog.readTime}</span>
        </div>
      </header>

      {/* --- Main Banner Image --- */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-20">
        <div className="relative h-[65vh] md:h-[85vh] rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)]">
          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* --- Article Body --- */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 mt-32">
        <div className="lg:col-span-8 lg:col-start-3 space-y-16">
          <div className="prose prose-slate prose-2xl max-w-none prose-p:text-slate-600 prose-p:leading-[1.8] prose-headings:font-black prose-headings:tracking-tighter">
            <p className="text-3xl font-bold text-slate-900 mb-16 leading-snug tracking-tight">
              {blog.excerpt}
            </p>
            
            <p>
              In the rapidly evolving world of technology, <strong>AuraScript</strong> represents more than just a blog—it is a manifesto for the next decade of digital engineering. We focus on the intersection of aesthetic brilliance and technical performance.
            </p>

            {/* Dynamic Card */}
            <div className="my-24 p-12 bg-white border border-slate-100 rounded-[3.5rem] shadow-xl shadow-slate-100/50 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
               <div className="w-24 h-24 bg-black rounded-[2rem] flex items-center justify-center text-white shrink-0 rotate-3">
                  <Zap size={36} fill="white" />
               </div>
               <div className="space-y-4">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">The Future of Aura</h3>
                  <p className="text-slate-500 text-lg leading-relaxed">Our architecture is built on the principle of <strong>Zero-Latency UI</strong>. Every millisecond saved is a user gained.</p>
               </div>
            </div>

            <h2 className="text-4xl md:text-6xl">Architectural Soul</h2>
            <p>
              Whitespace isn't a void; it's a structural element. At AuraScript, we treat design as a dialogue between the system and the human experience.
            </p>
          </div>

          {/* Author Box */}
          <div className="p-12 bg-white border border-slate-100 rounded-[4rem] flex flex-col md:flex-row items-center gap-12 shadow-sm relative group overflow-hidden">
             <div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-700 opacity-[0.02]"></div>
             <div className="relative w-32 h-32 rounded-[2.5rem] overflow-hidden shrink-0 border-4 border-slate-50 shadow-2xl rotate-3 group-hover:rotate-0 transition-all duration-500">
                <img 
                  src={`https://api.dicebear.com/7.x/shapes/svg?seed=${blog.author}&backgroundColor=0f172a`} 
                  alt="author" 
                  className="w-full h-full object-cover p-3 bg-[#0f172a]"
                />
             </div>
             <div className="space-y-3 text-center md:text-left relative z-10">
                <p className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.4em]">Chief Architect</p>
                <h4 className="text-4xl font-black text-slate-900 tracking-tightest">{blog.author}</h4>
                <p className="text-slate-500 text-sm max-w-sm leading-relaxed font-medium italic">"Building the future of modern engineering at AuraScript Editorial Group."</p>
             </div>
          </div>
        </div>
      </div>

      {/* --- Minimalist & Powerful Footer --- */}
      <footer className="max-w-7xl mx-auto px-6 mt-40">
        <div className="bg-black rounded-[4rem] p-12 md:p-24 relative overflow-hidden group">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px]"></div>

          <div className="relative z-10 space-y-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
               <div className="space-y-8">
                  <h2 className="text-6xl md:text-[11rem] font-black text-white leading-[0.8] tracking-tighter">
                    Aura<span className="text-indigo-600">.</span>
                  </h2>
                  <div className="flex items-center gap-6">
                     <div className="h-px w-16 bg-indigo-600"></div>
                     <p className="text-slate-500 font-black text-[10px] uppercase tracking-[0.6em]">Next-Gen Engineering Hub</p>
                  </div>
               </div>
               
               <button className="px-12 py-6 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-4 hover:bg-indigo-600 hover:text-white transition-all shadow-2xl transform active:scale-95">
                  Let's Build Together <MoveRight size={20} />
               </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-16 border-t border-white/10">
               <div className="space-y-4">
                  <p className="text-white text-[10px] font-black uppercase tracking-widest">Connect</p>
                  <div className="flex gap-6 text-slate-500">
                     <Twitter size={18} className="hover:text-white transition-colors cursor-pointer"/>
                     <Instagram size={18} className="hover:text-white transition-colors cursor-pointer"/>
                     <Facebook size={18} className="hover:text-white transition-colors cursor-pointer"/>
                  </div>
               </div>
               <div className="space-y-4">
                  <p className="text-white text-[10px] font-black uppercase tracking-widest">AuraScript</p>
                  <p className="text-slate-500 text-xs leading-relaxed max-w-[200px]">Defining the new standard for web architecture and creative engineering.</p>
               </div>
               <div className="flex flex-col md:items-end justify-center gap-2">
                  <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.2em]">© 2026 AuraScript Hub</p>
                  <div className="flex gap-4 text-[9px] font-black uppercase tracking-widest text-slate-700">
                     <a href="#" className="hover:text-white transition-colors">Privacy</a>
                     <a href="#" className="hover:text-white transition-colors">Terms</a>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </footer>

     
    </article>
  );
};

export default BlogDetails;