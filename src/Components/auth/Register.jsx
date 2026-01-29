'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
const countryCodes = [
  { name: "Bangladesh", code: "+880" },
  { name: "India", code: "+91" },
  { name: "USA", code: "+1" },
  { name: "UK", code: "+44" },
  { name: "Canada", code: "+1" },
];
const Register = () => {
     const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
      const [selectedCode, setSelectedCode] = useState("+880");
  const [phone, setPhone] = useState("");

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-2xl bg-base-100 shadow-xl rounded-2xl p-8">
        
        <div className="text-center mb-8">
  <h2 className="text-3xl font-bold text-green-600">
    Create Account
  </h2>
  <p className="text-gray-500 mt-2">
    Join us and start your journey 🚀
  </p>
</div>

        <form onSubmit={handleSubmit()} className="space-y-6">
          
          {/* Username */}
        <div className='grid gap-3 grid-cols-1 md:grid-cols-2'>
              <div>
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="input input-bordered w-full outline-0 focus:border-2 focus:border-green-500"
            />
          </div>
           <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter email"
                className="input input-bordered outline-0  w-full focus:border-2 focus:border-green-500"
              />
            </div>
        </div>

          {/* Photo - full width */}
          <div>
            <label className="label">
              <span className="label-text">Profile Photo</span>
            </label>
            <input
              type="file"
              className="file-input  file-input-bordered outline-0  w-full focus:border-2 focus:border-green-500"
            />
          </div>

           <div>
              <label className="label">
                <span className="label-text">Skill</span>
              </label>
              <input
                type="text"
                placeholder="Your skill"
                className="input input-bordered outline-0  w-full focus:border-2 focus:border-green-500"
              />
            </div>
          {/* Two Column Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
           

  <div>
      <label className="label">
        <span className="label-text font-medium">Phone</span>
      </label>

      <div className="flex">
        {/* Country selector */}
        <select
          value={selectedCode}
          onChange={(e) => setSelectedCode(e.target.value)}
          className="select  rounded-r-none w-28 outline-none focus:border-2 focus:border-green-500"
        >
          {countryCodes.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name} ({c.code})
            </option>
          ))}
        </select>

        {/* Phone number input */}
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone number"
          className="input  outline-none rounded-l-none flex-1 focus:border-2 focus:border-green-500"
        />
      </div>
    </div>

    <div>
  <label className="label">
    <span className="label-text font-medium">Hourly Rate ($)</span>
  </label>
  <input
    type="number"
    min="0"
    placeholder="Enter your hourly rate"
    className="input input-bordered w-full outline-0 focus:border-2 focus:border-green-500"
  />
</div>


           

          </div>

           <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="input  outline-0  w-full focus:border-2 focus:border-green-500"
              />
            </div>

          <button className="btn btn-primary w-full mt-6">
            Register
          </button>
        </form>

      </div>
    </div>
  );
};

export default Register;
