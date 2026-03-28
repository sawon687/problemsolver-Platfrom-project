'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import GoogleSIngupButton from '../GoogleSingupButton/GoogleSIngupButton';
const countryCodes = [
  { name: "Bangladesh", code: "+880" },
  { name: "India", code: "+91" },
  { name: "USA", code: "+1" },
  { name: "UK", code: "+44" },
  { name: "Canada", code: "+1" },
];

const RoleSelect = () => {
  const [selectedRole, setSelectedRole] = useState(null); // null, 'buyer', 'problem_solver'
  const [selectedCode, setSelectedCode] = useState(countryCodes[0].code);
  const [loading,setLoading]=useState(false)
  const { register, handleSubmit } = useForm();
    
  const handleRegister = async (data) => {
     setLoading(true)
   try {
        
          const profileImage = data.photo?.[0];
          console.log('profile image',profileImage)
         if (!profileImage) return alert("Please select a profile image");

    const formData = new FormData();
    formData.append('image', profileImage);
    const imageApiUrl = `https://api.imgbb.com/1/upload?&key=${process.env.NEXT_PUBLIC_IMAGE_API_KEY}`;
    const res = await fetch(imageApiUrl, { method: "POST", body: formData });
    const result = await res.json();
    data.userPhoto = result.data.display_url;
    data.role = selectedRole;

    const response = await fetch('/api/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const results = await response.json();
    if (results.success) {
       
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl: "/"
      });
       setLoading(false)
    }
   } catch (error) {

         console.log('register somthing worng',error)
           setLoading(false)
   }finally
  {
  setLoading(false)
}
  }

  const roleData = {
    Buyer: { title: "Hire Talent", description: "Find skilled developers, designers, and experts for your projects",
      image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      color: "blue"
    },
    problem_solver: {
      title: "Work as Solver",
      description: "Showcase your skills and earn money by solving real-world projects",
      image: "https://cdn-icons-png.flaticon.com/512/1995/1995574.png",
      color: "green"
    }
  }

  return (
    <div className="flex items-center  justify-center w-full min-h-screen bg-gray-50">
      {!selectedRole ? (
        // Role Selection Cards
        <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-8 p-6 md:p-12 bg-gray-50 rounded-3xl shadow-2xl">
          {["Buyer", "problem_solver"].map(role => (
            <motion.div
              key={role}
              whileHover={{ scale: 1.05 }}
              className={`relative group flex flex-col items-center justify-center p-10 bg-white/70 backdrop-blur-md rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-200`}
              onClick={() => setSelectedRole(role)}
            >
              <div className={`absolute -top-10 ${role === "buyer" ? "-left-10 bg-blue-400" : "-right-10 bg-green-400"} w-80 h-80 opacity-20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700`}></div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <img
                  src={roleData[role].image}
                  alt={role}
                  className="w-32 md:w-40 mb-6 drop-shadow-xl group-hover:scale-110 transition-transform duration-500"
                />
                <h2 className="text-2xl md:text-3xl font-extrabold mb-3 text-gray-800">{roleData[role].title}</h2>
                <p className="text-gray-600 mb-6 max-w-xs">{roleData[role].description}</p>
                <button className={`bg-gradient-to-r ${role === "buyer" ? "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700" : "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"} text-white px-8 py-3 rounded-md shadow-lg transition-all duration-500`}>
                  Join as {role === "Buyer" ? "Buyer" : "Solver"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        // Signup Form with Left Role Info
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-2xl rounded-3xl overflow-hidden">
            
            {/* Left Role Info */}
            <div className={`hidden md:flex flex-col items-center justify-center p-10 bg-${roleData[selectedRole].color}-100 w-1/2`}>
              <img src={roleData[selectedRole].image} alt="role" className="w-40 mb-6" />
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{roleData[selectedRole].title}</h2>
              <p className="text-gray-600 text-center">{roleData[selectedRole].description}</p>
              <button onClick={() => setSelectedRole(null)} className="mt-6 flex px-7 justify-center items-center btn bg-white  text-sm text-gray-700  hover:text-gray-900">
               <FaLongArrowAltLeft className='text-center' /> <span>Back</span>
              </button>
            </div>

            {/* Right - Form */}
            <div className="w-full md:w-1/2 p-8 bg-gray-50">
              <div className="text-center mb-8 md:hidden">
                <h2 className="text-3xl font-bold text-green-600">{roleData[selectedRole].title}</h2>
                <p className="text-gray-500 mt-2">{roleData[selectedRole].description}</p>
              </div>

            {/* RIGHT FORM */}
            <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">

              <h2 className="text-2xl font-bold mb-6 text-center">
                Create Account
              </h2>

              {/* Name + Email */}
              <div className="grid md:grid-cols-2 gap-4">
                <input {...register("username")} placeholder="Username "
                  className="input input-bordered w-full focus:border-none  focus:outline-none focus:ring-2 focus:ring-green-500" />

                <input {...register("email")} placeholder="Email"
                  className="input input-bordered w-full focus:border-none  focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>

              {/* Photo */}
              <input type="file"
                {...register("photo")}
                className="file-input file-input-bordered w-full focus:border-none  focus:outline-none focus:ring-2 focus:ring-green-500" />

              {/* Buyer Fields */}
              {selectedRole === "Buyer" && (
                <div className="grid md:grid-cols-2 gap-4">
                  <input {...register("company")}
                    placeholder="Company Name"
                    className="input input-bordered w-full focus:border-none  focus:outline-none focus:ring-2 focus:ring-green-500" />

                  <input {...register("location")}
                    placeholder="Location"
                    className="input input-bordered w-full focus:border-none  focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
              )}

              {/* Solver Fields */}
              {selectedRole === "problem_solver" && (
                <div className="grid md:grid-cols-2 gap-4">
                  <input {...register("skill")}
                    placeholder="Your Skill"
                    className="input input-bordered w-full focus:border-none  focus:outline-none focus:ring-2 focus:ring-green-500" />

                  <input type="number"
                    {...register("hourlyRate")}
                    placeholder="Hourly Rate ($)"
                    className="input input-bordered w-full focus:border-none  focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
              )}

              {/* Phone */}
              <div className="flex">
                <select
                  value={selectedCode}
                  onChange={(e) => setSelectedCode(e.target.value)}
                  className="select rounded-r-none w-28 focus:border-none  focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {countryCodes.map((c, i) => (
                    <option key={i} value={c.code}>{c.code}</option>
                  ))}
                </select>

                <input
                  type="tel"
                  placeholder="Phone"
                  {...register("phoneno")}
                  className="input rounded-l-none flex-1 focus:border-none  focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Password */}
              <input
                type="password"
                {...register("password")}
                placeholder="Password"
                className="input input-bordered w-full focus:border-none  focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              {/* Button */}
              <button
                disabled={loading}
                className={`w-full py-3  rounded-md text-white font-semibold
                ${selectedRole === "buyer"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-green-600 hover:bg-green-700"}`}
              >{loading ? "Creating..." : "Create Account 🚀"}
              
              </button>
                 <GoogleSIngupButton role={selectedRole}></GoogleSIngupButton>
     
            </form>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default RoleSelect;