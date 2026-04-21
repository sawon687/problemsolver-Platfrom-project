'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { Mail, Lock, ArrowRight, Loader2, Eye, EyeOff, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import GoogleSIngupButton from '../GoogleSingupButton/GoogleSIngupButton';
import MessageModal from '../AllModal/MessageModal';
import Logo from '../Logo/Logo';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [modal, setModal] = useState({
    open: false,
    type: 'success',
    title: '',
    msg: ''
  });

  const handleLogin = async (data) => {
    try {
      setLoading(true);
      const result = await signIn("credentials", {
        redirect: false,
        email: data.userEmail,
        password: data.password,
      });

      if (result?.error) {
        setModal({
          open: true,
          type: 'error',
          title: 'Login Failed',
          msg: result.error || 'Invalid credentials',
        });
      } else if (result?.ok) {
        setModal({
          open: true,
          type: 'success',
          title: 'Welcome Back!',
          msg: 'Login has been successful.',
        });
        setTimeout(() => {
          window.location.href = "/Dashboard";
        }, 2000);
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen -mt-20 flex items-center justify-center p-4 overflow-hidden relative">
      
      {/* --- Dynamic Background Elements --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[1000px] grid lg:grid-cols-2 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] overflow-hidden shadow-2xl shadow-black/50"
      >
        
        {/* --- Left Side: Content & Branding (From AuthPage) --- */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-indigo-600 to-violet-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          
          <div className="relative z-10 space-y-5">
          <Logo colorName={'text-white'}></Logo>
            <h1 className="text-5xl font-black text-white leading-tight">
              Build the future <br /> with <span className="text-indigo-200">Aura Hub.</span>
            </h1>
            <p className="mt-6 text-indigo-100/70 text-lg font-medium max-w-sm">
              Enter your credentials to access the world's most advanced platform for next-gen engineering.
            </p>
          </div>

          <div className="relative z-10 bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/10">
            <p className="text-white font-bold italic">"Design is not just what it looks like, it's how it works."</p>
            <span className="text-indigo-200 text-sm mt-2 block">— Engineering Excellence</span>
          </div>
        </div>

        {/* --- Right Side: Login Form Area --- */}
        <div className="p-8 md:p-14 bg-indigo-50">
          <div className="mb-10 text-left">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-slate-400 mt-2 font-medium">
              Please enter your details to sign in to your node.
            </p>
          </div>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
            
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-2">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors" size={18} />
                <input
                  {...register('userEmail', { required: true })}
                  type="email"
                  placeholder="dev@aura.io"
                  className="w-full pl-14 pr-6 py-4 bg-white border border-gray-300 focus:border-indigo-500/50 rounded-2xl outline-none text-gray-700 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between ml-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Password</label>
                <Link href="#" className="text-[10px] font-black text-indigo-500 uppercase tracking-widest hover:text-white transition-colors">Forgot?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors" size={18} />
                <input
                  {...register('password', { required: true })}
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-14 pr-12 py-4 bg-white border border-gray-300 focus:border-indigo-500/50 rounded-2xl outline-none text-gray-700 transition-all placeholder:text-slate-600"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPass(!showPass)} 
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-500 transition-colors"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              disabled={loading}
              className="w-full group bg-indigo-600 hover:bg-indigo-500 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all flex items-center justify-center gap-3 shadow-xl shadow-indigo-500/20 active:scale-95 mt-4"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sing Up <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Social Auth */}
          <div className="mt-8 flex flex-col gap-4">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-full border-t border-white/5" />
              <span className="relative bg-[#020617] lg:bg-transparent px-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">Secure Connect</span>
            </div>
            <div className="w-full">
              <GoogleSIngupButton />
            </div>
          </div>

          <p className="mt-10 text-center text-sm font-medium text-slate-500">
            New here? 
            <Link 
              href="/Register" 
              className="ml-2 text-indigo-500 hover:text-white transition-colors font-black uppercase tracking-tighter"
            >
              Request Access
            </Link>
          </p>
        </div>
      </motion.div>

      {/* Message Modal */}
      <MessageModal
        isOpen={modal.open}
        type={modal.type}
        title={modal.title}
        message={modal.msg}
        onClose={() => setModal({ ...modal, open: false })}
      />
    </div>
  );
};

export default Login;