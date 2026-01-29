'use client'
import { signIn } from 'next-auth/react';
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
  
      const [selectedCode, setSelectedCode] = useState(' ');


  const hadleRegister=async(data)=>{
    console.log('click')
     const profileImage = data.userPhoto?.[0];
     if (!profileImage) {
  alert("Please select a profile image");
  return;
}
       const formData = new FormData();
      formData.append('image', profileImage);
        const imageApiUrl = `https://api.imgbb.com/1/upload?&key=${process.env.NEXT_PUBLIC_IMAGE_API_KEY}`;
         const  res=await fetch(imageApiUrl,{
            method:"POST",
            body:formData
         })
         const result = await res.json();
       const photourl=result.data.display_url;
        console.log('imgeurl',photourl)
        console.log(photourl)
          data.userPhoto=photourl

          console.log('data',data)


          const response=await fetch('/api/sign-up',{
              method:'POST',
               headers: {
                    'Content-Type': 'application/json'
                      },
                body: JSON.stringify(data)
          })

          const results = await response.json(); 
         console.log('API Data:', results);
         if(results.success)
         {
               await signIn("credentials", {
            email: data.userEmail,
             password: data.password, 
               redirect: true,
                callbackUrl: "/"
                     });
         }
      
  }
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

        <form onSubmit={handleSubmit(hadleRegister)} className="space-y-6">
          
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
              {...register('username')}
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
                 {...register('userEmail')}
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
               {...register('userPhoto')}
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
          {countryCodes?.map((c,i) => (
            <option key={i} value={c?.code}>
              {c?.name} ({c?.code})
            </option>
          ))}
        </select>

        {/* Phone number input */}
        <input
          type="tel"
          defaultValue={selectedCode}
          placeholder="Phone number"
          className="input  outline-none rounded-l-none flex-1 focus:border-2 focus:border-green-500"
          {...register('phoneno')}
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
     {...register('HourlyRate')}
  />
</div>
          </div>
         
         <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {/* password */}
              <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="input  outline-0  w-full focus:border-2 focus:border-green-500"
                 {...register('password')}
              />
              
            </div>
            {/* Skill */}
            <div>
              <label className="label">
                <span className="label-text">Skill</span>
              </label>
              <input
                type="text"
                placeholder="Your skill"
                className="input input-bordered outline-0  w-full focus:border-2 focus:border-green-500"
                {...register('Skill')}
              />
               
            </div>
         </div>

          <button type='submit' className="btn btn-primary w-full mt-6">
            Register
          </button>
        </form>

      </div>
    </div>
  );
};

export default Register;
