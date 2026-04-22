'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiUser, FiMail, FiLock, FiPhone, 
  FiDollarSign, FiZap, FiCamera, FiArrowRight, 
  FiCheckCircle, FiBriefcase, FiUserCheck,
  FiTarget, FiMapPin 
} from 'react-icons/fi';
import { Loader2, ChevronLeft, EyeOff, Eye, AlertCircle } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Logo from '../Logo/Logo';

const countryCodes = [
  { name: "BD", code: "+880" },
  { name: "IN", code: "+91" },
  { name: "US", code: "+1" },
];

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); 
  const [role, setRole] = useState(null); 
  const [imagePreview, setImagePreview] = useState(null);
  const [showPass, setShowPass] = useState(false);
   const [modal, setModal] = useState({ 
      open: false, 
      type: 'success', 
      title: '', 
      msg: '' 
    });
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    mode: "onChange" 
  });

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
          callbackUrl: "/Dashboard"
        });
     
                setModal({ 
          open: true, 
          type: 'success', 
          title: 'Register Successfully', 
          msg:result.message, 
        });
        
        
      
      } else {

          
                setModal({ 
          open: true, 
          type: 'error', 
          title: 'Register', 
          msg:result.message || "Registration failed", 
        });
          refetch()
        
     
      }

    } catch (err) {
      console.error("Registration Error:", err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

 
  const ErrorMsg = ({ name }) => (
    errors[name] && (
      <motion.p 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[10px] text-red-500 font-bold mt-1 flex items-center gap-1 ml-1"
      >
        <AlertCircle size={10} /> {errors[name].message}
      </motion.p>
    )
  );

  return (
    <div className="min-h-screen flex -mt-20 items-center justify-center bg-[#f8fafc] p-4 md:p-8 relative overflow-hidden">
      
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
          <div className="relative space-y-5 z-10">
           <Logo></Logo>
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
                  <div className={`flex items-center gap-6 p-4 bg-slate-50 rounded-[2rem] border ${errors.photo ? 'border-red-300' : 'border-slate-100'} group transition-all`}>
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
                            required: "Photo is required",
                            onChange: (e) => {
                              const file = e.target.files[0];
                              if (file) setImagePreview(URL.createObjectURL(file));
                            }
                          })} 
                        />
                      </label>
                      <ErrorMsg name="photo" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Username</label>
                      <div className="relative group">
                        <FiUser className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.username ? 'text-red-400' : 'text-slate-400'}`} />
                        <input 
                          {...register('username', { 
                            required: "Username is required",
                            minLength: { value: 3, message: "Too short (min 3)" }
                          })} 
                          className={`w-full bg-slate-50 border ${errors.username ? 'border-red-300 focus:border-red-500' : 'border-slate-100 focus:border-indigo-500'} rounded-2xl py-3.5 pl-12 text-sm font-bold outline-none transition-all`} 
                          placeholder="john_doe" 
                        />
                      </div>
                      <ErrorMsg name="username" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Email</label>
                      <div className="relative group">
                        <FiMail className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.userEmail ? 'text-red-400' : 'text-slate-400'}`} />
                        <input 
                          {...register('userEmail', { 
                            required: "Email is required",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address"
                            }
                          })} 
                          className={`w-full bg-slate-50 border ${errors.userEmail ? 'border-red-300 focus:border-red-500' : 'border-slate-100 focus:border-indigo-500'} rounded-2xl py-3.5 pl-12 text-sm font-bold outline-none transition-all`} 
                          placeholder="name@email.com" 
                        />
                      </div>
                      <ErrorMsg name="userEmail" />
                    </div>
                  </div>

                  {/* Role Based Fields */}
                  {role === "Buyer" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Company Name</label>
                        <div className="relative">
                          <FiTarget className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input {...register('company', { required: "Company name is required" })} className={`w-full bg-slate-50 border ${errors.company ? 'border-red-300' : 'border-slate-100'} rounded-2xl py-4 pl-12 text-sm font-bold outline-none focus:border-indigo-500 transition-all`} placeholder="Acme Inc." />
                        </div>
                        <ErrorMsg name="company" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Location</label>
                        <div className="relative">
                          <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input {...register('location', { required: "Location is required" })} className={`w-full bg-slate-50 border ${errors.location ? 'border-red-300' : 'border-slate-100'} rounded-2xl py-4 pl-12 text-sm font-bold outline-none focus:border-indigo-500 transition-all`} placeholder="Dhaka, BD" />
                        </div>
                        <ErrorMsg name="location" />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Expertise / Skill</label>
                        <div className="relative">
                          <FiZap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input {...register('skill', { required: "Skill is required" })} className={`w-full bg-slate-50 border ${errors.skill ? 'border-red-300' : 'border-slate-100'} rounded-2xl py-4 pl-12 text-sm font-bold outline-none focus:border-indigo-500 transition-all`} placeholder="Full Stack Developer" />
                        </div>
                        <ErrorMsg name="skill" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Hourly Rate ($)</label>
                        <div className="relative">
                          <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input type="number" {...register('hourlyRate', { required: "Rate is required", min: { value: 1, message: "Must be > 0"} })} className={`w-full bg-slate-50 border ${errors.hourlyRate ? 'border-red-300' : 'border-slate-100'} rounded-2xl py-4 pl-12 text-sm font-bold outline-none focus:border-indigo-500 transition-all`} placeholder="25.00" />
                        </div>
                        <ErrorMsg name="hourlyRate" />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Phone Number</label>
                      <div className={`flex bg-slate-50 border ${errors.phoneno ? 'border-red-300' : 'border-slate-100'} rounded-2xl focus-within:border-indigo-500 transition-all overflow-hidden`}>
                        <select className="bg-transparent pl-4 pr-1 py-4 text-xs font-black outline-none">
                          {countryCodes.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
                        </select>
                        <input 
                          {...register('phoneno', { 
                            required: "Phone required", 
                            pattern: { value: /^[0-9]+$/, message: "Digits only" },
                            minLength: { value: 10, message: "Too short" }
                          })} 
                          className="bg-transparent flex-1 py-4 px-2 text-sm font-bold outline-none" 
                          placeholder="1700000000" 
                        />
                      </div>
                      <ErrorMsg name="phoneno" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Password</label>
                      <div className="relative group">
                        <FiLock className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.password ? 'text-red-400' : 'text-slate-400'}`} />
                        <input 
                          type={showPass ? "text" : "password"} 
                          {...register('password', { 
                            required: "Password required",
                            minLength: { value: 6, message: "Min 6 characters" },
                            pattern: {
                              value: /^(?=.*[A-Z])(?=.*[0-9])/,
                              message: "Need 1 Uppercase & 1 Number"
                            }
                          })} 
                          className={`w-full bg-slate-50 border ${errors.password ? 'border-red-300 focus:border-red-500' : 'border-slate-100 focus:border-indigo-500'} rounded-2xl py-4 pl-12 pr-12 text-sm font-bold outline-none transition-all`} 
                          placeholder="••••••••" 
                        />
                        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors">
                          {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      <ErrorMsg name="password" />
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

export default RegisterForm;