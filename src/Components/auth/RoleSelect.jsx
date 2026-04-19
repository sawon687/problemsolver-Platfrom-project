'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiUser, FiMail, FiLock, FiPhone, 
  FiDollarSign, FiZap, FiCamera, FiArrowRight, 
  FiCheckCircle, FiBriefcase, FiUserCheck,
  FiTarget, FiMapPin // এই আইকনগুলো ইমপোর্ট করা ছিল না
} from 'react-icons/fi';
import { Loader2, ChevronLeft, EyeOff, Eye } from 'lucide-react';
import { signIn } from 'next-auth/react';

const countryCodes = [
  { name: "BD", code: "+880" },
  { name: "IN", code: "+91" },
  { name: "US", code: "+1" },
];

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); 
  const [role, setRole] = useState(null); // 'worker' or 'buyer'
  const [imagePreview, setImagePreview] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const handleRegister = async (data) => {
    setLoading(true);
    try {
      const file = data.photo[0];
      if (!file) {
        alert('Photo is required');
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append('image', file);
      
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_API_KEY}`, {
        method: "POST",
        body: formData
      });
      
      const imgData = await res.json();
      if (!imgData.success) throw new Error("Image upload failed");

      const finalData = {
        ...data,
        userPhoto: imgData.data.display_url,
        role: role 
      };

      const response = await fetch('/api/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData)
      });
      
      const result = await response.json();

      if (result.success) {
        await signIn("credentials", {
          email: data.userEmail, 
          password: data.password,
          callbackUrl: "/"
        });
        alert(result.message);
      } else {
        alert(result.message || "Registration failed");
      }

    } catch (err) {
      console.error("Registration Error:", err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4 md:p-8 relative overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-100 rounded-full blur-[120px] opacity-50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[100px] opacity-50" />
      </div>

      <motion.div 
        layout
        className="w-full max-w-5xl bg-white border border-slate-200 shadow-2xl rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row min-h-[650px]"
      >
        {/* Left Branding Panel */}
        <div className="md:w-[35%] bg-slate-900 p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-indigo-500/20">
              <FiZap size={24} />
            </div>
            <h2 className="text-4xl font-black leading-tight tracking-tight">
              {step === 1 ? "Choose Your Path." : "Create Your Profile."}
            </h2>
          </div>
          
          <div className="relative z-10">
             <div className="flex -space-x-3 mb-4">
                {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-[10px] font-bold">U{i}</div>
                ))}
             </div>
             <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Joined by 10k+ users</p>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="md:w-[65%] p-8 md:p-12 relative">
          <AnimatePresence mode="wait">
            
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full flex flex-col justify-center"
              >
                <div className="mb-8">
                  <h3 className="text-3xl font-black text-slate-900 mb-2">Who are you?</h3>
                  <p className="text-slate-500 font-medium">Select your account type to continue</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                  <button 
                    type="button"
                    onClick={() => { setRole('Worker'); setStep(2); }}
                    className="group p-6 border-2 border-slate-100 rounded-[2rem] hover:border-indigo-500 hover:bg-indigo-50/50 transition-all text-left"
                  >
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-indigo-500 group-hover:text-white transition-all text-slate-400">
                      <FiBriefcase size={28} />
                    </div>
                    <h4 className="text-xl font-black text-slate-800">Worker</h4>
                    <p className="text-sm text-slate-400 mt-2 font-medium">I want to find tasks and earn money.</p>
                  </button>

                  <button 
                    type="button"
                    onClick={() => { setRole('Buyer'); setStep(2); }}
                    className="group p-6 border-2 border-slate-100 rounded-[2rem] hover:border-indigo-500 hover:bg-indigo-50/50 transition-all text-left"
                  >
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-indigo-500 group-hover:text-white transition-all text-slate-400">
                      <FiUserCheck size={28} />
                    </div>
                    <h4 className="text-xl font-black text-slate-800">Buyer</h4>
                    <p className="text-sm text-slate-400 mt-2 font-medium">I want to post tasks and hire people.</p>
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-6 hover:text-indigo-600 transition-colors"
                >
                  <ChevronLeft size={16} /> Back to Roles
                </button>

                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    Register as <span className="text-indigo-600 capitalize">{role}</span>
                  </h3>
                  <div className="w-12 h-12 rounded-full border-4 border-indigo-50 border-t-indigo-500 flex items-center justify-center text-[10px] font-black">2/2</div>
                </div>

                <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">
                  {/* Photo Upload */}
                  <div className="flex items-center gap-6 p-4 bg-slate-50 rounded-[2rem] border border-slate-100 group">
                    <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded-2xl bg-white border-2 border-indigo-100 shadow-inner">
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                          <FiCamera size={30} />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-700 mb-1">Profile Photo</p>
                      <label className="text-xs font-bold text-indigo-600 cursor-pointer hover:underline">
                        Click to upload
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          {...register('photo', { 
                            required: true,
                            onChange: (e) => {
                              const file = e.target.files[0];
                              if (file) setImagePreview(URL.createObjectURL(file));
                            }
                          })} 
                        />
                      </label>
                        <p className="text-[10px] text-slate-400 mt-1 uppercase">JPG, PNG or WebP</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Username</label>
                      <div className="relative group">
                        <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input {...register('username', {required: true})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 text-sm font-bold outline-none focus:border-indigo-500 transition-all" placeholder="john_doe" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Email</label>
                      <div className="relative group">
                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input {...register('userEmail', {required: true})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 text-sm font-bold outline-none focus:border-indigo-500 transition-all" placeholder="name@email.com" />
                      </div>
                    </div>
                  </div>

                  {/* Role Based Fields (Fixed condition) */}
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Phone Number</label>
                      <div className="flex bg-slate-50 border border-slate-100 rounded-2xl focus-within:border-indigo-500 transition-all overflow-hidden">
                        <select className="bg-transparent pl-4 pr-1 py-4 text-xs font-black outline-none">
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

                  <motion.button
                    whileHover={!loading ? { scale: 1.01 } : {}}
                    whileTap={!loading ? { scale: 0.99 } : {}}
                    disabled={loading}
                    type='submit'
                    className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-white bg-indigo-600 shadow-xl flex items-center justify-center gap-3 disabled:bg-slate-300"
                  >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : <>Create Account <FiArrowRight /></>}
                  </motion.button>
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