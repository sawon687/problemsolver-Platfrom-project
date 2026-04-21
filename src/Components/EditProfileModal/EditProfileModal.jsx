"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Camera, X, Github, Globe, User, Phone, Briefcase, DollarSign, MapPin, Cpu, Sparkles, CheckCircle2, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import MessageModal from '../AllModal/MessageModal';
import { div } from 'framer-motion/client';

const EditProfileModal = ({ openEdit, close }) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [modal, setModal] = useState({ open: false, type: 'success', title: '', msg: '' });

  const { register, handleSubmit, setValue, watch } = useForm();

  // Profile data fetch kora
  const { data } = useQuery({
    queryKey: ["profile", session?.email],
    enabled: !!session?.email,
    queryFn: async () => {
      const res = await fetch(`/api/sign-up/${session?.email}`);
      const result = await res.json();
      return result.data;
    },
  });

  // Form default values set kora
  useEffect(() => {
    if (data) {
      const fields = ["username", "phoneno", "Skill", "hourlyRate", "company", "location", "userPhoto", "github", "portfolio"];
      fields.forEach(field => setValue(field, data[field] || ""));
      setImageUrl(data.userPhoto || "");
    }
  }, [data, setValue]);

  // Image upload handling 
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_API_KEY}`, {
        method: "POST",
        body: formData
      });
      
      const imgData = await res.json();
      if (imgData.success) {
        const url = imgData.data.display_url;
        setImageUrl(url);
        setValue("userPhoto", url); // Form state e image url set kora
      }
    } catch (error) {
      console.error("Image upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdateSubmit = async (formData) => {
    try {
      const res = await fetch(`/api/sign-up/${session?.email}`, {
        method: "POST", // API route check korun, POST naki PUT/PATCH
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: session?.email,
          role: session?.role,
          ...formData,
          updateDate: new Date(),
        }),
      });

      const result = await res.json();
      if (result.success) {
        setModal({ 
          open: true, 
          type: 'success', 
          title: 'Success!', 
          msg: 'Your profile has been updated successfully.' 
        });
        queryClient.invalidateQueries(["profile", session?.email]);
        // Modal-ti MessageModal bondho korar por close kora uchit
      }
    } catch (error) {
      setModal({ open: true, type: 'error', title: 'Error', msg: 'Something went wrong!' });
    }
  };

  const inputBaseClass = "w-full pl-12 pr-4 py-4 bg-gray-50/40 border border-gray-200/60 rounded-2xl outline-none transition-all duration-300 font-bold text-sm text-gray-900 focus:ring-2 focus:ring-indigo-600/60 focus:border-indigo-600 focus:bg-white shadow-sm";
  const labelClass = "block ml-2 mb-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 group-focus-within:text-indigo-600 transition-colors duration-300";
  const iconClass = "absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-indigo-600 transition-all duration-300";

  if (!openEdit) return null;

  return (
    <div className="fixed inset-0 mt-15 bg-black/60 backdrop-blur-md flex justify-center items-center z-[100] px-4 py-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-2xl max-h-[90vh] rounded-[3rem] shadow-2xl overflow-hidden relative flex flex-col"
      >
        {/* HEADER */}
        <div className="p-8 pb-4 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="text-indigo-600" size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">Identity Hub</span>
            </div>
            <h2 className="text-3xl font-black text-gray-900">Edit Profile</h2>
          </div>
          <button onClick={close} className="p-3 bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-2xl transition-all">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleUpdateSubmit)} className="flex-1 overflow-y-auto p-8 pt-4 custom-scrollbar">
          <div className="space-y-8">
            
            {/* IMAGE SECTION */}
            <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-indigo-50/20 rounded-[2.5rem] border border-indigo-100/30">
              <div className="relative group">
                <div className="w-24 h-24 rounded-[2rem] overflow-hidden ring-4 ring-white shadow-lg">
                  <img src={imageUrl || "https://i.pravatar.cc/150"} className="w-full h-full object-cover" alt="Profile" />
                </div>
                <label className="absolute -bottom-1 -right-1 bg-indigo-600 text-white p-2.5 rounded-2xl cursor-pointer hover:scale-110 transition-all">
                  <Camera size={16} />
                  <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                </label>
                {isUploading && 
                ( <div className='absolute inset-0 flex items-center justify-center'>

                  <Loader2 className='animate-spin text-indigo-600 w-5 h-5'></Loader2>
                </div>)}
              </div>
              <div className="text-center sm:text-left">
                <h4 className="text-lg font-black flex items-center gap-2">Display Picture <CheckCircle2 size={16} className="text-indigo-500" /></h4>
                <p className="text-sm text-gray-500">Update your professional avatar</p>
              </div>
            </div>

            {/* INPUTS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group space-y-1">
                <label className={labelClass}>Full Name</label>
                <div className="relative">
                  <User className={iconClass} size={18}/>
                  <input {...register("username")} className={inputBaseClass} />
                </div>
              </div>

              <div className="group space-y-1">
                <label className={labelClass}>Contact Number</label>
                <div className="relative">
                  <Phone className={iconClass} size={18}/>
                  <input {...register("phoneno")} className={inputBaseClass} />
                </div>
              </div>

              <div className="md:col-span-2 group space-y-1">
                <label className={labelClass}>Key Expertise</label>
                <div className="relative">
                  <Cpu className={iconClass} size={18}/>
                  <input {...register("Skill")} className={inputBaseClass} placeholder="Next.js, Tailwind..." />
                </div>
              </div>

              <div className="group space-y-1">
                <label className={labelClass}>
                  {session?.role === "Worker" ? "Hourly Rate ($)" : "Organization"}
                </label>
                <div className="relative">
                  {session?.role === "Worker" ? <DollarSign className={iconClass} size={18}/> : <Briefcase className={iconClass} size={18}/>}
                  {/* Fixed: Conditional name in register */}
                  <input 
                    {...register(session?.role === "Worker" ? "hourlyRate" : "company")} 
                    className={inputBaseClass} 
                  />
                </div>
              </div>

              <div className="group space-y-1">
                <label className={labelClass}>Base Location</label>
                <div className="relative">
                  <MapPin className={iconClass} size={18}/>
                  <input {...register("location")} className={inputBaseClass} />
                </div>
              </div>

              {/* SOCIALS */}
              <div className="md:col-span-2 pt-4 flex items-center gap-4 text-indigo-400">
                <div className="h-px flex-1 bg-gray-100"></div>
                <span className="text-[10px] font-black uppercase tracking-widest">Social Presence</span>
                <div className="h-px flex-1 bg-gray-100"></div>
              </div>

              <div className="group space-y-1">
                <label className={labelClass}>GitHub</label>
                <div className="relative">
                  <Github className={iconClass} size={18}/>
                  <input {...register("github")} className={inputBaseClass} />
                </div>
              </div>

              <div className="group space-y-1">
                <label className={labelClass}>Portfolio</label>
                <div className="relative">
                  <Globe className={iconClass} size={18}/>
                  <input {...register("portfolio")} className={inputBaseClass} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-6 pt-12 pb-4">
            <button type="button" onClick={close} className="text-[11px] font-black uppercase text-gray-400 hover:text-gray-900">Discard</button>
            <button type="submit" className="bg-gray-900 text-white px-12 py-4 rounded-2xl font-black text-sm shadow-xl hover:scale-[1.02] transition-all">
              Save Changes
            </button>
          </div>
        </form>

        <MessageModal
          isOpen={modal.open} 
          type={modal.type} 
          title={modal.title} 
          message={modal.msg} 
          onClose={() => {
            setModal({ ...modal, open: false });
            if(modal.type === 'success') close(); // Success holei modal close hobe
          }}
        />
      </motion.div>
    </div>
  );
};

export default EditProfileModal;