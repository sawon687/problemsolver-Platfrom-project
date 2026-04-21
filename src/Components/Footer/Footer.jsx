'use client'
import { IoMail, IoLocationSharp, IoArrowForward, IoRocket } from "react-icons/io5";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Link from 'next/link';
import { useSession } from 'next-auth/react';
  const roleLinks = {
    Admin: [
      { to: "/Dashboard", label: "Admin Overview" },
      { to: "/Dashboard/ManageUsers", label: "Manage Users" },
      { to: "/Dashboard/ManageProject", label: "Manage Project" },
    ],
    Buyer: [
      { to: "/Dashboard", label: "Buyer Dashboard" },
      { to: "/Dashboard/CreateProject", label: "Post Project" },
      { to: "/Dashboard/Project-list", label: "My Projects" },
    ],
    Worker: [
      { to: "/Dashboard", label: "Solver Desk" },
      { to: "/Dashboard/My-Requsts", label: "My Applications" },
      { to: "/Dashboard/Profile", label: "My Portfolio" },
    ]
  };

  const generalLinks = [
    { label: "Home", to: "/" },
    { label: "Projects", to: "/Project" },
    { label: "About Us", to: "/About" },
    { label: "Blog", to: "/blog" },
    { label: "Contact", to: "/Contact" },
  ];
const Footer = () => {
  const { data: session } = useSession();
  const userRole = session?.role || 'Worker';
  const pathname = usePathname();



    const hideNavbarPaths = [
    "/Dashboard", 
    "/Register", 
    "/Login", 
    "/404", 
    "/not-found",
    '/unauthorized'
  ];


  const shouldHide = hideNavbarPaths.some(path => pathname.startsWith(path));


  if (shouldHide) return null;

  // if (pathname.startsWith("/Dashboard") || pathname.startsWith('/Register') || pathname.startsWith('/Login')) return null;

  return (
    <footer className="relative bg-[#020617] text-slate-400 pt-20 pb-10 overflow-hidden border-t border-slate-900">
      {/* Background Atmosphere - Logoer Indigo Color er sathe match kore */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-16">
          
          {/* Branding Section */}
          <div className="lg:col-span-5 space-y-8">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500/30 blur-xl rounded-full group-hover:bg-indigo-500/50 transition-all duration-500"></div>
                <div className="relative w-14 h-14 bg-slate-950 rounded-2xl flex items-center justify-center text-white shadow-2xl group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 border border-white/10">
                  <IoRocket size={28} className="text-indigo-500" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-3xl tracking-tighter text-white leading-none">
                  Aura<span className="text-indigo-500">.</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 mt-1">
                  Next-Gen Engineering Hub
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-lg leading-relaxed max-w-sm font-medium">
              Empowering the world's most innovative problem solvers. Build, manage, and scale your vision with Aura.
            </p>

            <div className="flex space-x-4">
              {[FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub].map((Icon, idx) => (
                <a key={idx} href="#" className="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-900/50 hover:bg-indigo-600 text-slate-400 hover:text-white transition-all duration-300 border border-slate-800 hover:border-indigo-400 shadow-lg">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-12">
            {/* Explore */}
            <div>
              <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-8">Explore</h3>
              <ul className="space-y-4">
                {generalLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.to} className="group flex items-center hover:text-indigo-400 transition-colors font-medium">
                      <IoArrowForward className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-indigo-500 mr-2" size={14} />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Role Links */}
            <div>
              <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-8 text-indigo-500">
                {userRole}
              </h3>
              <ul className="space-y-4">
                {roleLinks[userRole]?.map((link) => (
                  <li key={link.label}>
                    <Link href={link.to} className="group flex items-center hover:text-indigo-400 transition-colors font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-700 mr-3 group-hover:bg-indigo-500 transition-all"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-8">Support</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-3 group cursor-pointer">
                  <IoMail className="text-indigo-500 mt-1" size={18} />
                  <div>
                    <p className="text-sm text-white font-semibold">Email Us</p>
                    <p className="text-xs text-slate-500">hello@aura.io</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 group cursor-pointer">
                  <IoLocationSharp className="text-indigo-500 mt-1" size={18} />
                  <div>
                    <p className="text-sm text-white font-semibold">HQ Office</p>
                    <p className="text-xs text-slate-500">Dhaka, Bangladesh</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm font-medium">
            &copy; {new Date().getFullYear()} <span className="text-white tracking-tight">AURA<span className="text-indigo-500">.</span></span>
          </div>
          
          <div className="flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;