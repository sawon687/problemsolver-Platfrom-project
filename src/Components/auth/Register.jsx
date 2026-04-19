'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from "framer-motion";
import { signIn } from 'next-auth/react';
import { 
  FiUser, FiMail, FiLock, FiPhone, 
  FiDollarSign, FiZap, FiCamera, FiArrowRight, 
  FiBriefcase, FiUserCheck, FiMapPin, FiTarget
} from 'react-icons/fi';
import { Loader2, ChevronLeft, Eye, EyeOff } from 'lucide-react';
import GoogleSIngupButton from '../GoogleSingupButton/GoogleSIngupButton';

const countryCodes = [
  { name: "BD", code: "+880" },
  { name: "IN", code: "+91" },
  { name: "US", code: "+1" },
];

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); 
  const [role, setRole] = useState(null); // 'Buyer' or 'problem_solver'
  const [imagePreview, setImagePreview] = useState(null);
  const [showPass, setShowPass] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  // Image Preview and ImgBB Logic
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = async (data) => {
    setLoading(true);
    try {
      const file = data.photo?.[0];
      if (!file) return alert("Please select a profile image");

      // 1. Upload to ImgBB
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_API_KEY}`, {
        method: "POST",
        body: formData
      });
      const imgData = await res.json();

      // 2. Prepare Final Data
      const finalData = {
        ...data,
        userPhoto: imgData.data.display_url,
        role: role
      };

      // 3. Post to API
      const response = await fetch('/api/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData)
      });
      const result = await response.json();

      if (result.success) {
        await signIn("credentials", {
          email: data.email,
          password: data.password,
          callbackUrl: "/"
        });
      }
    } catch (err) {
      console.error("Registration Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4 md:p-8 relative overflow-hidden">
      
      {/* Dynamic Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-100 rounded-full blur-[120px] opacity-50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[100px] opacity-50" />
      </div>

      <motion.div 
        layout
        className="w-full max-w-6xl bg-white border border-slate-200 shadow-2xl rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row min-h-[700px]"
      >
        
        {/* Left Branding Panel (Dark Design) */}
        <div className="md:w-[35%] bg-slate-900 p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-indigo-500/20">
              <FiZap size={24} />
            </div>
            <h2 className="text-4xl font-black leading-tight tracking-tight">
              {step === 1 ? "Choose Your Path." : "Setup Your Profile."}
            </h2>
            <p className="mt-6 text-slate-400 font-medium">
              {step === 1 
                ? "Join our ecosystem of buyers and experts to build something legendary." 
                : `You are joining as a ${role === 'Buyer' ? 'Buyer' : 'Problem Solver'}. Just a few more details!`}
            </p>
          </div>
          
          <div className="relative z-10">
            <div className="flex -space-x-3 mb-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-[10px] font-bold">U{i}</div>
              ))}
            </div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Joined by 10k+ visionaries</p>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="md:w-[65%] p-8 md:p-14 relative bg-white">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: ROLE SELECTION */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full flex flex-col justify-center"
              >
                <div className="mb-10">
                  <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Who are you?</h3>
                  <p className="text-slate-500 font-medium">Select your role to get started</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                  <button 
                    onClick={() => { setRole('problem_solver'); setStep(2); }}
                    className="group p-8 border-2 border-slate-100 rounded-[2.5rem] hover:border-indigo-500 hover:bg-indigo-50/50 transition-all text-left"
                  >
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-indigo-500 group-hover:text-white transition-all text-slate-400">
                      <FiBriefcase size={28} />
                    </div>
                    <h4 className="text-xl font-black text-slate-800">Expert / Worker</h4>
                    <p className="text-sm text-slate-400 mt-2 font-medium">I want to work and earn money.</p>
                  </button>

                  <button 
                    onClick={() => { setRole('Buyer'); setStep(2); }}
                    className="group p-8 border-2 border-slate-100 rounded-[2.5rem] hover:border-indigo-500 hover:bg-indigo-50/50 transition-all text-left"
                  >
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-indigo-500 group-hover:text-white transition-all text-slate-400">
                      <FiUserCheck size={28} />
                    </div>
                    <h4 className="text-xl font-black text-slate-800">Buyer / Client</h4>
                    <p className="text-sm text-slate-400 mt-2 font-medium">I want to post tasks and hire talent.</p>
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: DYNAMIC FORM */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <button 
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-8 hover:text-indigo-600 transition-colors"
                >
                  <ChevronLeft size={16} /> Back to Roles
                </button>

                <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
                  
                  {/* Photo Upload with Preview */}
                  <div className="flex items-center gap-6 p-5 bg-slate-50 rounded-[2.5rem] border border-slate-100 group">
                    <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-3xl bg-white border-2 border-indigo-100 shadow-inner">
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                          <FiCamera size={24} />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-700 mb-1">Profile Identity</p>
                      <label className="text-xs font-bold text-indigo-600 cursor-pointer hover:underline">
                        Click to upload photo
                        <input type="file" className="hidden" accept="image/*" {...register('photo')} onChange={handleImageChange} />
                      </label>
                    </div>
                  </div>

                  {/* Shared Fields Row 1 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Username</label>
                      <div className="relative">
                        <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input {...register('username', {required: true})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 text-sm font-bold outline-none focus:border-indigo-500 transition-all" placeholder="john_doe" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Email</label>
                      <div className="relative">
                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input {...register('email', {required: true})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 text-sm font-bold outline-none focus:border-indigo-500 transition-all" placeholder="name@email.com" />
                      </div>
                    </div>
                  </div>

                  {/* CONDITIONAL FIELDS (Role Specific) */}
                  {role === "Buyer" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Company Name</label>
                        <div className="relative">
                          <FiTarget className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input {...register('company')} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 text-sm font-bold outline-none focus:border-indigo-500 transition-all" placeholder="Acme Inc." />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Location</label>
                        <div className="relative">
                          <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input {...register('location')} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 text-sm font-bold outline-none focus:border-indigo-500 transition-all" placeholder="Dhaka, BD" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Expertise / Skill</label>
                        <div className="relative">
                          <FiZap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input {...register('skill')} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 text-sm font-bold outline-none focus:border-indigo-500 transition-all" placeholder="Full Stack Developer" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Hourly Rate ($)</label>
                        <div className="relative">
                          <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input type="number" {...register('hourlyRate')} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 text-sm font-bold outline-none focus:border-indigo-500 transition-all" placeholder="25.00" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Phone & Password Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Phone Number</label>
                      <div className="flex bg-slate-50 border border-slate-100 rounded-2xl focus-within:border-indigo-500 transition-all overflow-hidden">
                        <select className="bg-transparent pl-4 pr-1 py-4 text-xs font-black outline-none border-none">
                          {countryCodes.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
                        </select>
                        <input {...register('phoneno')} className="bg-transparent flex-1 py-4 px-2 text-sm font-bold outline-none" placeholder="1700000000" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Password</label>
                      <div className="relative group">
                        <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type={showPass ? "text" : "password"} {...register('password', {required: true})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-12 text-sm font-bold outline-none focus:border-indigo-500 transition-all" placeholder="••••••••" />
                        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors">
                          {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Submission */}
                  <div className="pt-2 space-y-4">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      disabled={loading}
                      className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-white bg-indigo-600 shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 disabled:bg-slate-300"
                    >
                      {loading ? <Loader2 className="animate-spin" size={20} /> : <>Create Account <FiArrowRight /></>}
                    </motion.button>
                    
                    <div className="relative flex items-center justify-center py-2">
                      <div className="absolute w-full h-[1px] bg-slate-100"></div>
                      <span className="relative bg-white px-4 text-[10px] font-black text-slate-300 uppercase tracking-widest">Social Connect</span>
                    </div>

                    <GoogleSIngupButton role={role} />
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;